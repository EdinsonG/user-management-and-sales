const House = require('../models/House');

exports.getAllHouses = async (req, res) => {
  try {
    const houses = await House.findAll();
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
