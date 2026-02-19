const authService = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        message: 'El correo electrónico ya está registrado. Intenta con otro.' 
      });
    }

    res.status(400).json({ 
      message: error.message || 'Error al registrar el usuario' 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};