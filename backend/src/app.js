const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const User = require('./models/User');
const House = require('./models/House');

// Relaciones
User.hasMany(House, { foreignKey: 'sellerId' });
House.belongsTo(User, { foreignKey: 'sellerId' });

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', require('./routes/auth.routes'));
app.use('/users', require('./routes/user.routes'));
// app.use('/houses', require('./routes/house.routes'));

// Sincronización de BD
sequelize.sync({ force: false }).then(() => console.log('DB conectada y sincronizada'));

module.exports = app;