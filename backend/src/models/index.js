const User = require('./user');
const House = require('./house');

User.hasMany(House, { foreignKey: 'sellerId', onDelete: 'CASCADE' });
House.belongsTo(User, { foreignKey: 'sellerId' });

module.exports = { User, House };