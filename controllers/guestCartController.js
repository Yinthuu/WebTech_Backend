const express = require('express');
const GuestCart  = require('../models/guestCart');

// GET all items in guest cart
exports.getAllItems = async (req, res) => {
    try {
      const guestcarts = await GuestCart.find().populate('products', 'title image pricing');;
      console.log(guestcarts);
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
