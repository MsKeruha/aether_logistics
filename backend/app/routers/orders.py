from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import uuid
from ..database import get_db
from .. import models, schemas, dependencies

router = APIRouter(prefix="/orders", tags=["orders"])

@router.get("/", response_model=List[schemas.Order])
def get_orders(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(dependencies.get_current_active_user)
):
    if current_user.role == models.UserRole.CLIENT:
        # Get customer profile
        customer = db.query(models.Customer).filter(models.Customer.user_id == current_user.id).first()
        if not customer:
            return []
        return db.query(models.ServiceOrder).filter(models.ServiceOrder.customer_id == customer.id).all()
    
    # Staff can see all orders
    return db.query(models.ServiceOrder).all()

@router.post("/", response_model=schemas.Order)
def create_order(
    order_in: schemas.OrderCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(dependencies.get_current_active_user)
):
    # Generate unique order number
    order_num = f"AE-{uuid.uuid4().hex[:8].upper()}"
    
    new_order = models.ServiceOrder(
        order_number=order_num,
        customer_id=order_in.customer_id,
        device_name=order_in.device_name,
        device_serial=order_in.device_serial,
        problem_description=order_in.problem_description,
        priority=order_in.priority
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order

@router.get("/{order_id}", response_model=schemas.Order)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(dependencies.get_current_active_user)
):
    order = db.query(models.ServiceOrder).filter(models.ServiceOrder.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Check access
    if current_user.role == models.UserRole.CLIENT:
        customer = db.query(models.Customer).filter(models.Customer.user_id == current_user.id).first()
        if order.customer_id != customer.id:
            raise HTTPException(status_code=403, detail="Not allowed")
            
    return order

@router.patch("/{order_id}", response_model=schemas.Order)
def update_order(
    order_id: int,
    order_update: schemas.OrderUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(dependencies.get_current_active_user)
):
    order = db.query(models.ServiceOrder).filter(models.ServiceOrder.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Only staff can update status/technician
    if current_user.role == models.UserRole.CLIENT:
        raise HTTPException(status_code=403, detail="Clients cannot update orders")

    update_data = order_update.model_dump(exclude_unset=True)
    
    # Log history if status changed
    if "status" in update_data and update_data["status"] != order.status:
        history = models.OrderHistory(
            order_id=order.id,
            old_status=order.status,
            new_status=update_data["status"],
            changed_by_id=current_user.id
        )
        db.add(history)

    for key, value in update_data.items():
        setattr(order, key, value)
        
    db.commit()
    db.refresh(order)
    return order
