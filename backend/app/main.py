from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth, orders
from . import models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Aether Logistics API",
    description="Business Process Management System for Service Centers",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(orders.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to Aether Logistics API",
        "status": "operational",
        "version": "1.0.0"
    }

@app.get("/stats")
def get_stats():
    # Placeholder for dashboard stats
    return {
        "active_orders": 12,
        "completed_today": 5,
        "pending_diagnostics": 3,
        "customer_satisfaction": "98%"
    }
