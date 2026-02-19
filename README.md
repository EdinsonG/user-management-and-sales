⚙️ Instalación y Configuración

Pre-requisitos

Node.js (v18 o superior)
PostgreSQL (instancia local o remota)

1. Clonar el repositorio

Bash
git clone https://github.com/EdinsonG/user-management-and-sales.git
cd user-management-and-sales

2. Configurar el Backend

Bash
cd backend
npm install

Crea un archivo .env en la carpeta backend siguiendo este esquema:

Fragmento de códigoPORT=4000
DB_NAME=tu_base_de_datos
DB_USER=tu_usuario
DB_PASS=tu_password
DB_HOST=localhost
JWT_SECRET=tu_secreto_super_seguro

Inicia el servidor:

Bash
npm run dev

3. Configurar el Frontend

Bash
cd ../frontend

npm install

Inicia la aplicación:

Bash
npm run dev

Estructura del Proyecto
Plaintext

├── backend/
│   ├── src/
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── models/       # Modelos de Sequelize
│   │   ├── routes/       # Definición de Endpoints
│   │   └── middleware/   # Auth y validaciones
├── frontend/
│   ├── src/
│   │   ├── components/   # UI Reutilizable
│   │   ├── hooks/        # Lógica de React personalizada
│   │   ├── services/     # Llamadas a la API (Axios)
│   │   └── pages/        # Vistas principales