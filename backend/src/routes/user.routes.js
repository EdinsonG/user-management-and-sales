const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET /users - Obtener todos los usuarios (Ruta protegida)
router.get('/', authMiddleware, userController.getAllUsers);

// PUT /users/:id - Actualizar mi perfil (Ruta protegida)
router.put('/:id', authMiddleware, userController.updateUser);

// DELETE /users/:id - Eliminar mi cuenta (Ruta protegida)
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;