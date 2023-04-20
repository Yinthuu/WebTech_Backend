const express = require('express');
const GuestCart  = require('../models/guestCart');

// GET all items in guest cart
exports.getAllItems = async (req, res) => {
    try {
      const guestcarts = await GuestCart.find().populate('products', 'title image pricing');;
      res.status(200).json(guestcarts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// POST /carts
exports.createGuestCartItem = async (req, res) => {
    const { products, quantities } = req.body;
  
    try {
      // Check if there's already a cart for this product
      const existingGuestCart = await GuestCart.findOne({ products });
  
      if (existingGuestCart) {
        // If cart exists, update the quantities
        existingGuestCart.quantities += quantities;
        const updatedGuestCart = await existingGuestCart.save();
        return res.status(200).json(updatedGuestCart);
      }
  
      // If cart does not exist, create a new one
      const guestCart = new GuestCart({
        products,
        quantities,
      });
  
      const newGuestCart = await guestCart.save();
      res.status(201).json(newGuestCart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // DELETE guestcarts by id
exports.deleteGuestCartById = async (req, res) => {
  try {
    const guestCart = await GuestCart.findByIdAndDelete(req.params.id);
    if (!guestCart) {
      return res.status(404).json({ message: 'GuestCart not found' });
    }
    res.json({ message: 'GuestCart deleted successfully' });
  } catch (error) {
    console.log("error"+error.message);
    res.status(500).json({ message: error.message });
  }
};

// PATCH /carts/:id
exports.updateGuestCarts = async (req, res) => {
  try {
    const guestCart = await GuestCart.findById(req.params.id);
    if (!guestCart) {
      return res.status(404).json({ message: 'Guestcarts not found' });
    }
    guestCart.quantities = req.body.quantities;
    const updatedGuestcarts = await guestCart.save();
    res.json(updatedGuestcarts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
