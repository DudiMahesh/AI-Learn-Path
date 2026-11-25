@echo off
echo =================================================
echo   AI LearnPath - Starting Development Server
echo =================================================
echo.

REM Check if virtual environment exists
if not exist "backend\venv\Scripts\activate.bat" (
    echo [1/5] Creating Python virtual environment...
    cd backend
    python -m venv venv
    cd ..
) else (
    echo [1/5] Virtual environment found.
)

echo [2/5] Installing/Updating Python dependencies...
cd backend
call venv\Scripts\activate.bat
pip install -r requirements.txt -q
cd ..

echo [3/5] Starting Flask backend on port 5000...
start "Flask Backend" cmd /k "cd backend && call venv\Scripts\activate.bat && python app.py"

echo [4/5] Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo [5/5] Starting React frontend on port 3000...
start "React Frontend" cmd /k "cd frontend && npm run dev"

REM Open browser automatically
timeout /t 2 /nobreak > nul
start http://localhost:3000

echo.
echo =================================================
echo   Servers started!
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo   API Docs: http://localhost:5000/api/health
echo =================================================
echo.
echo Admin Login: admin@ailearnpath.com / AdminPass123!
echo.
pause
