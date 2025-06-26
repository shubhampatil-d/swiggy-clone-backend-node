const Cart = require('../models/cart');

exports.addToCart = async (req, res) => {
  const { menuItem, restaurant, quantity, specialInstructions } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      // Ensure same restaurant
      if (cart.restaurant.toString() !== restaurant) {
        return res.status(409).json({ message: 'You can only order from one restaurant at a time' });
      }

      const existingItem = cart.items.find(item => item.menuItem.toString() === menuItem);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ menuItem, quantity, specialInstructions });
      }

      await cart.save();
    } else {
      // Create new cart
      cart = await Cart.create({
        user: req.user._id,
        restaurant,
        items: [{ menuItem, quantity, specialInstructions }],
      });
    }

    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('restaurant')
      .populate('items.menuItem');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json({ cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};
