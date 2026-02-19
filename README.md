# Real Estate Management System

## Arquitectura
Se utilizó una arquitectura desacoplada:
- **Backend**: Patrón Service-Controller para separar la lógica de negocio del manejo de peticiones.
- **Frontend**: Context API para estado global y Axios Interceptors para seguridad.

## Instalación
1. **Base de Datos**: Crear DB `real_estate_management` en PostgreSQL.
2. **Backend**:
   - `cd backend`
   - `npm install`
   - Configurar `.env`
   - `npm run dev`
3. **Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Credenciales de prueba
- **User**: admin@test.com / **Pass**: admin123 (requiere registro previo)