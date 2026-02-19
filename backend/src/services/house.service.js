const { House, User } = require('../models');

class HouseService {
    async getAll(filters) {
        return await House.findAll({ where: filters, include: [{ model: User, attributes: ['name', 'email'] }] });
    }
    async create(data) {
        return await House.create(data);
    }
}
module.exports = new HouseService();