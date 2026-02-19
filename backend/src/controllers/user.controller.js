const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  try {
    // Excluimos la contraseña por seguridad al listar
    const users = await User.findAll({ 
      attributes: { exclude: ['password'] } 
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password, isActive } = req.body;
    const authenticatedUserId = req.user.id;

    if (parseInt(id) !== authenticatedUserId) {
      return res.status(403).json({ 
        message: "No tienes permiso para editar el perfil de otros usuarios." 
      });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const updateData = { name };

    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await user.update(updateData);
    res.json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const authenticatedUserId = req.user.id;

    if (parseInt(id) === authenticatedUserId) {
      return res.status(400).json({ 
        message: "No puedes eliminar tu propia cuenta desde el panel de administración." 
      });
    }

    const deleted = await User.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: "Usuario eliminado con éxito" });
    } else {
      res.status(404).json({ message: "El usuario no existe" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};