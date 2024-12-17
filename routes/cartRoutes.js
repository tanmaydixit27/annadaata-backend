// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');

router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart items', error });
  }
});


router.post('/', async (req, res) => {
  const { name, price, quantity, image, description } = req.body;
  const newCartItem = new Cart({ name, price, quantity, image, description });
  try {
    const savedItem = await newCartItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const updatedItem = await Cart.findByIdAndUpdate(id, { quantity }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Cart.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
});

module.exports = router;
