const express = require('express');
const router = express.Router();
const houseController = require('../controllers/house.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET /houses - Obtener todos los casas (Ruta protegida)
router.get('/', authMiddleware, houseController.getAllHouses);

// PUT /users/:id - Actualizar mi perfil (Ruta protegida)
router.put('/:id', authMiddleware, houseController.updateHouse);

// DELETE /users/:id - Eliminar mi cuenta (Ruta protegida)
router.delete('/:id', authMiddleware, houseController.deleteHouse);

module.exports = router;