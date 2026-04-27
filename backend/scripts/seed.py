import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app import models, auth
from app.models import UserRole, OrderStatus
from datetime import datetime, timedelta

def get_or_create_user(db, email, password, full_name, role, avatar_url):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        user = models.User(
            email=email,
            hashed_password=auth.get_password_hash(password),
            full_name=full_name,
            role=role,
            avatar_url=avatar_url
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        print(f"User {email} created.")
    else:
        print(f"User {email} already exists.")
    return user

def seed_data():
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    print(f"Connected to database at {engine.url}")

    try:
        print("Seeding users...")
        admin = get_or_create_user(db, "admin@aether.com", "admin123", "Aether Administrator", UserRole.ADMIN, "https://api.dicebear.com/7.x/avataaars/svg?seed=admin")
        tech1 = get_or_create_user(db, "tech1@aether.com", "tech123", "Ivan Tech", UserRole.TECHNICIAN, "https://api.dicebear.com/7.x/avataaars/svg?seed=ivan")
        tech2 = get_or_create_user(db, "tech2@aether.com", "tech123", "Maria Repair", UserRole.TECHNICIAN, "https://api.dicebear.com/7.x/avataaars/svg?seed=maria")
        client_user = get_or_create_user(db, "client@example.com", "client123", "John Doe", UserRole.CLIENT, "https://api.dicebear.com/7.x/avataaars/svg?seed=john")

        print("Seeding customers...")
        customer = db.query(models.Customer).filter(models.Customer.user_id == client_user.id).first()
        if not customer:
            customer = models.Customer(
                user_id=client_user.id,
                phone="+380991234567",
                address="Kyiv, Polyarna str. 12"
            )
            db.add(customer)
            db.commit()
            db.refresh(customer)
            print("Customer record created.")
        else:
            print("Customer record already exists.")

        print("Seeding orders...")
        existing_orders_count = db.query(models.ServiceOrder).count()
        if existing_orders_count == 0:
            orders = [
                models.ServiceOrder(
                    order_number="AE-7F3A21BC",
                    customer_id=customer.id,
                    technician_id=tech1.id,
                    device_name="MacBook Pro 16 M2",
                    device_serial="SN123456789",
                    problem_description="Мерехтіння екрану та швидке розряджання акумулятора",
                    status=OrderStatus.IN_PROGRESS,
                    priority="high",
                    estimated_completion=datetime.now() + timedelta(days=3),
                    total_cost=4500
                ),
                models.ServiceOrder(
                    order_number="AE-9B2C4D5E",
                    customer_id=customer.id,
                    technician_id=tech2.id,
                    device_name="iPhone 15 Pro",
                    device_serial="SN987654321",
                    problem_description="Розбите заднє скло та проблеми з камерою",
                    status=OrderStatus.WAITING_PARTS,
                    priority="medium",
                    estimated_completion=datetime.now() + timedelta(days=7),
                    total_cost=2800
                ),
                models.ServiceOrder(
                    order_number="AE-1A2B3C4D",
                    customer_id=customer.id,
                    device_name="PlayStation 5",
                    problem_description="Перегрів та раптове вимкнення під час гри",
                    status=OrderStatus.NEW,
                    priority="low"
                )
            ]
            db.add_all(orders)
            db.commit()
            print(f"Created {len(orders)} initial orders.")
        else:
            print(f"Orders already exist ({existing_orders_count} found). Skipping order seed.")

        print("Successfully seeded Aether Logistics database!")

    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
