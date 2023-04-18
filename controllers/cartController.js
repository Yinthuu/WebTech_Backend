const Cart = require('../models/cart');

// GET /carts
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /carts/:id
exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /carts
// exports.createCarts = async (req, res) => {
//   const cart = new Cart({
//     products: req.body.products,
//     quantities: req.body.quantities,
//     user: req.body.user
//   });
//   try {
//     const newCart = await cart.save();
//     res.status(201).json(newCart);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// POST /carts
exports.createCarts = async (req, res) => {
  const { products, quantities, user } = req.body;

  try {
    // Check if there's already a cart for this user and product
    const existingCart = await Cart.findOne({ user, products });

    if (existingCart) {
      // If cart exists, update the quantities
      existingCart.quantities += quantities;
      const updatedCart = await existingCart.save();
      return res.status(200).json(updatedCart);
    }

    // If cart does not exist, create a new one
    const cart = new Cart({
      products,
      quantities,
      user,
    });

    const newCart = await cart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// PATCH /carts/:id
exports.updateCarts = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    //cart.products = req.body.products;
    cart.quantities = req.body.quantities;
    //cart.user = req.body.user;
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /carts/:id
exports. deleteCarts = async (req, res) => {
    try {
      const cart = await Cart.findByIdAndDelete(req.params.id);
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// GET /carts/user/:userId
// exports.getCartByUser = async (req, res) => {
//   try {
//     const carts = await Cart.find({ user: req.params.userId});
//     if (!carts || carts.length === 0) {
//       return res.status(404).json({ message: 'Carts not found' });
//     }
//     res.status(200).json(carts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// GET /carts/user/:userId
exports.getCartByUser = async (req, res) => {
  try {
    const carts = await Cart.find({ user: req.params.userId}).populate('products', 'title image pricing');
    if (!carts || carts.length === 0) {
      return res.status(404).json({ message: 'Carts not found' });
    }
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
