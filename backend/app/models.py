from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from .database import Base

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    TECHNICIAN = "technician"
    CLIENT = "client"

class OrderStatus(str, enum.Enum):
    NEW = "new"
    DIAGNOSTICS = "diagnostics"
    WAITING_PARTS = "waiting_parts"
    IN_PROGRESS = "in_progress"
    READY = "ready"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    role = Column(Enum(UserRole), default=UserRole.CLIENT)
    is_active = Column(Boolean, default=True)
    avatar_url = Column(String, nullable=True)

    # Relationships
    assigned_orders = relationship("ServiceOrder", back_populates="technician", foreign_keys="ServiceOrder.technician_id")
    customer_profile = relationship("Customer", back_populates="user", uselist=False)

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    phone = Column(String)
    address = Column(Text, nullable=True)
    
    user = relationship("User", back_populates="customer_profile")
    orders = relationship("ServiceOrder", back_populates="customer")

class ServiceOrder(Base):
    __tablename__ = "service_orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String, unique=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    technician_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    device_name = Column(String)
    device_serial = Column(String, nullable=True)
    problem_description = Column(Text)
    
    status = Column(Enum(OrderStatus), default=OrderStatus.NEW)
    priority = Column(String, default="medium") # low, medium, high, urgent
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    estimated_completion = Column(DateTime, nullable=True)
    total_cost = Column(Integer, default=0)

    # Relationships
    customer = relationship("Customer", back_populates="orders")
    technician = relationship("User", back_populates="assigned_orders", foreign_keys=[technician_id])
    history = relationship("OrderHistory", back_populates="order")

class OrderHistory(Base):
    __tablename__ = "order_history"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("service_orders.id"))
    old_status = Column(String)
    new_status = Column(String)
    comment = Column(Text, nullable=True)
    changed_by_id = Column(Integer, ForeignKey("users.id"))
    changed_at = Column(DateTime(timezone=True), server_default=func.now())

    order = relationship("ServiceOrder", back_populates="history")
