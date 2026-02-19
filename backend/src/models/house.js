const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const House = sequelize.define('House', {
  address: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  price: { 
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: { min: 0.01 }
  },
  status: {
    type: DataTypes.ENUM('available', 'sold'),
    defaultValue: 'available'
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sellerId'
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'createdAt',
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updatedAt',
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Houses',
  timestamps: true
});

module.exports = House;