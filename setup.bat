@echo off
setlocal enabledelayedexpansion

:: Get the directory where the script is located
set "PROJECT_ROOT=%~dp0"
cd /d "%PROJECT_ROOT%"

:: Check for Administrator rights
net session >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] This script requires Administrator rights to install dependencies.
    echo Please right-click setup.bat and select 'Run as administrator'.
    pause
    exit /b 1
)

echo ==========================================
echo Aether Logistics Local Setup ^& Run Script
echo ==========================================

echo [1/5] Detecting dependencies...

:: 1. Check Python 3.11
py -3.11 --version >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [!] Python 3.11 not found. Attempting to install via winget...
    call winget install -e --id Python.Python.3.11 --silent --accept-package-agreements --accept-source-agreements
) else (
    echo [+] Python 3.11 is detected.
)

:: 2. Check Node.js
node -v >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [!] Node.js not found. Attempting to install via winget...
    call winget install -e --id OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements
) else (
    echo [+] Node.js is detected.
)

set "PATH=%PATH%;C:\Windows\System32;C:\Windows"

echo [2/5] Setting up Backend...
cd /d "%PROJECT_ROOT%backend"

set "NEED_VENV=1"
if exist venv (
    venv\Scripts\python --version 2>nul | findstr "3.11" >nul
    if !ERRORLEVEL! equ 0 (
        echo [+] Existing venv (Python 3.11) detected. Skipping creation.
        set "NEED_VENV=0"
    ) else (
        echo [!] Existing venv is NOT Python 3.11. Recreating...
        rmdir /s /q venv
    )
)

if !NEED_VENV! equ 1 (
    echo Creating virtual environment (Python 3.11)...
    call py -3.11 -m venv venv
    call venv\Scripts\activate
    call python -m pip install --upgrade pip
    call python -m pip install -r requirements.txt
)

echo [3/5] Seeding Database (SQLite)...
if not exist aether.db (
    echo Running seeder...
    call venv\Scripts\activate
    call python scripts/seed.py
) else (
    echo [+] Database 'aether.db' already exists.
)

echo [4/5] Setting up Frontend...
cd /d "%PROJECT_ROOT%frontend"
if not exist node_modules (
    echo Installing npm packages...
    call npm install --legacy-peer-deps
) else (
    echo [+] node_modules detected. Skipping npm install.
)

echo [5/5] Launching Application...
echo.
start "Aether Backend" cmd /k "cd /d "%PROJECT_ROOT%backend" && venv\Scripts\activate && uvicorn app.main:app --reload --port 8000"
call npm run dev

pause
