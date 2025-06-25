const Restaurant = require('../models/restaurant');

// Get all restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json({ restaurants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch restaurants' });
  }
};

// Create a new restaurant (admin only — for now anyone can add)
exports.createRestaurant = async (req, res) => {
  try {
    const {
      name,
      cuisineType,
      description,
      address,
      latitude,
      longitude,
      open,
      close,
      minimumOrderAmount,
      deliveryFee,
      averagePrepTime,
      status,
      rating,
    } = req.body;

    const restaurant = await Restaurant.create({
      name,
      cuisineType,
      description,
      address,
      location: { latitude, longitude },
      operatingHours: { open, close },
      minimumOrderAmount,
      deliveryFee,
      averagePrepTime,
      status,
      rating,
    });

    res.status(201).json({ message: 'Restaurant created successfully', restaurant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create restaurant' });
  }
};
