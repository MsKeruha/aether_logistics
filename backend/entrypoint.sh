#!/bin/bash

# Run seeding script
echo "Running database seeding..."
python scripts/seed.py

# Start the application
echo "Starting Aether Logistics API..."
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
