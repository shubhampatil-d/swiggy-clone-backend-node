const OrderTracking = require('../models/orderTracking');

exports.addTrackingUpdate = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const tracking = await OrderTracking.create({ order: orderId, status });
    res.status(201).json({ message: 'Tracking updated', tracking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update tracking' });
  }
};

exports.getOrderTracking = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updates = await OrderTracking.find({ order: orderId }).sort('timestamp');
    res.json({ tracking: updates });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tracking' });
  }
};
