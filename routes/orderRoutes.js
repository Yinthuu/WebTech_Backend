const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/orders', orderController.createOrders);

router.get('/orders/:id', orderController.getOrderById);

router.get('/orders', orderController.getAllOrders);

router.patch('/orders/:id', orderController.updateOrders);

router.delete('/orders/:id', orderController.deleteOrders);

module.exports = router;
