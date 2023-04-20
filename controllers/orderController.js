const Order = require('../models/order');

// GET /orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /orders
exports.createOrders = async (req, res) => {
  const order = new Order({
    orderNumber: req.body.orderNumber,
    user: req.body.user,
    product: req.body.product,
    quantity: req.body.quantity,
    datetime: req.body.datetime
  });
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PATCH /orders/:id
exports.updateOrders = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    //order.orderNumber = req.body.orderNumber;
    //order.user = req.body.user;
    order.product = req.body.product;
    order.quantity = req.body.quantity;
    //order.datetime = req.body.datetime;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /orders/:id
exports.deleteOrders = async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  // GET /orders/userproduct/:userId/:productId
  exports.getOrderByUserandProduct = async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const order = await Order.findOne({ user: userId, product: productId });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };