# FoodTrack - Sistema de Rastreamento Nutricional

Sistema completo para rastreamento de alimentos e informações nutricionais, desenvolvido com Angular (frontend) e Django (backend).

## Funcionalidades

- ✅ **Autenticação completa**: Login e registro de usuários
- ✅ **API de alimentos**: Integração com USDA FoodData Central
- ✅ **CRUD de alimentos**: Adicionar, visualizar, editar e remover alimentos
- ✅ **Rastreamento diário**: Log de alimentos consumidos por dia
- ✅ **Resumo nutricional**: Calorias, proteínas, carboidratos e gorduras
- ✅ **Interface moderna**: Design responsivo com Tailwind CSS

## Tecnologias Utilizadas

### Backend (Django)
- Django 5.2.4
- Django REST Framework
- Django CORS Headers
- JWT Authentication
- SQLite (desenvolvimento)

### Frontend (Angular)
- Angular 20
- Tailwind CSS
- Reactive Forms
- HTTP Client
- JWT Decode

## Instalação e Configuração

### Pré-requisitos
- Python 3.8+
- Node.js 18+
- npm ou yarn

### Backend (Django)

1. **Navegue para o diretório do backend:**
```bash
cd backend
```

2. **Crie um ambiente virtual:**
```bash
python -m venv venv
```

3. **Ative o ambiente virtual:**
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

4. **Instale as dependências:**
```bash
pip install -r requirements.txt
```

5. **Execute as migrações:**
```bash
python manage.py makemigrations
python manage.py migrate
```

6. **Crie um superusuário (opcional):**
```bash
python manage.py createsuperuser
```

7. **Inicie o servidor Django:**
```bash
python manage.py runserver
```

O backend estará disponível em: http://localhost:8000

### Frontend (Angular)

1. **Navegue para o diretório raiz do projeto:**
```bash
cd ..
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm start
```

O frontend estará disponível em: http://localhost:4200

## Uso do Sistema

### 1. Registro e Login
- Acesse http://localhost:4200
- Clique em "Criar uma nova conta" para se registrar
- Ou faça login se já tiver uma conta

### 2. Dashboard Principal
- Após o login, você será redirecionado para o dashboard
- Selecione a data desejada no seletor de data
- Visualize o resumo nutricional do dia

### 3. Adicionar Alimentos
- Use a barra de pesquisa para buscar alimentos
- Clique em "Adicionar Alimento" para adicionar um novo item
- Selecione o alimento, quantidade e tipo de refeição
- Os alimentos são buscados automaticamente na API do USDA

### 4. Gerenciar Alimentos
- Visualize todos os alimentos registrados por refeição
- Remova alimentos clicando no ícone de lixeira
- O sistema calcula automaticamente as calorias e macronutrientes

## Estrutura do Projeto

```
foodtrack/
├── backend/                 # Backend Django
│   ├── api/                # Aplicação API
│   │   ├── models.py       # Modelos de dados
│   │   ├── views.py        # Views da API
│   │   ├── serializers.py  # Serializers
│   │   └── urls.py         # URLs da API
│   ├── backend/            # Configurações Django
│   └── manage.py           # Script de gerenciamento
├── src/                    # Frontend Angular
│   ├── app/
│   │   ├── components/     # Componentes
│   │   │   ├── auth/       # Componentes de autenticação
│   │   │   └── dashboard/  # Dashboard principal
│   │   ├── services/       # Serviços
│   │   ├── guards/         # Guardas de rota
│   │   └── interceptors/   # Interceptors HTTP
│   └── main.ts
└── README.md
```

## API Endpoints

### Autenticação
- `POST /api/auth/register/` - Registro de usuário
- `POST /api/auth/login/` - Login
- `POST /api/auth/refresh/` - Renovar token

### Alimentos
- `GET /api/foods/` - Listar alimentos
- `POST /api/foods/search/` - Buscar alimentos na API externa
- `GET /api/foods/{id}/` - Detalhes do alimento

### Logs de Alimentos
- `GET /api/food-logs/` - Listar logs do dia
- `POST /api/food-logs/` - Adicionar alimento
- `PUT /api/food-logs/{id}/` - Editar log
- `DELETE /api/food-logs/{id}/` - Remover log
- `GET /api/food-logs/summary/` - Resumo nutricional do dia

## Configuração da API Externa

O sistema utiliza a API do USDA FoodData Central para buscar informações nutricionais. Para usar em produção:

1. Registre-se em: https://fdc.nal.usda.gov/api-key-signup.html
2. Obtenha sua chave de API
3. Substitua `'DEMO_KEY'` pela sua chave em `backend/api/views.py`

## Desenvolvimento

### Adicionando Novos Alimentos
Os alimentos são automaticamente salvos no banco de dados quando buscados na API externa. Para adicionar alimentos manualmente:

1. Acesse o admin Django: http://localhost:8000/admin
2. Faça login com o superusuário
3. Vá para "Foods" e adicione novos alimentos

### Personalizando o Sistema
- Modifique os modelos em `backend/api/models.py`
- Adicione novos endpoints em `backend/api/views.py`
- Personalize a interface em `src/app/components/`

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
