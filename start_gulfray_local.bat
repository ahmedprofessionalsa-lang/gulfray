@echo off
title GulfRay Medical - Local Showcase Launcher
cd /d "%~dp0"

echo ======================================================================
echo    GulfRay(R) Medical - Saudi Factory & Product Showcase Launcher
echo ======================================================================
echo Checking Python environment...

python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Python detected. Launching local server with network sharing...
    python run_app.py
) else (
    echo Python is not installed on this laptop.
    echo Launching direct offline showcase in your default web browser...
    start "" "%~dp0static\index.html"
)
pause
