from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from .models import UserRole, OrderStatus

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: UserRole
    avatar_url: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

# Customer Schemas
class CustomerBase(BaseModel):
    phone: str
    address: Optional[str] = None

class CustomerCreate(CustomerBase):
    user_id: int

class Customer(CustomerBase):
    id: int
    user_id: int
    
    class Config:
        from_attributes = True

# Order Schemas
class OrderBase(BaseModel):
    device_name: str
    device_serial: Optional[str] = None
    problem_description: str
    priority: str = "medium"

class OrderCreate(OrderBase):
    customer_id: int

class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    technician_id: Optional[int] = None
    estimated_completion: Optional[datetime] = None
    total_cost: Optional[int] = None
    priority: Optional[str] = None

class Order(OrderBase):
    id: int
    order_number: str
    customer_id: int
    technician_id: Optional[int]
    status: OrderStatus
    created_at: datetime
    updated_at: Optional[datetime]
    estimated_completion: Optional[datetime]
    total_cost: int
    
    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None
