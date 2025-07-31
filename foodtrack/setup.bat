@echo off
echo ========================================
echo FoodTrack - Setup do Projeto
echo ========================================

echo.
echo 1. Configurando o Backend (Django)...
cd backend

echo Criando ambiente virtual...
python -m venv venv

echo Ativando ambiente virtual...
call venv\Scripts\activate

echo Instalando dependências do Python...
pip install -r requirements.txt

echo Executando migrações...
python manage.py makemigrations
python manage.py migrate

echo.
echo 2. Configurando o Frontend (Angular)...
cd ..

echo Instalando dependências do Node.js...
npm install

echo.
echo ========================================
echo Setup concluído!
echo ========================================
echo.
echo Para iniciar o projeto:
echo.
echo 1. Backend (Django):
echo    cd backend
echo    venv\Scripts\activate
echo    python manage.py runserver
echo.
echo 2. Frontend (Angular):
echo    npm start
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:4200
echo.
pause 