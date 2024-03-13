const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/carts', cartController.createCarts);

router.get('/carts/:id', cartController.getCartById);

router.get('/carts', cartController.getAllCarts);

router.patch('/carts/:id', cartController.updateCarts);

router.delete('/carts/:id', cartController.deleteCarts);

//get carts by user Id
router.get('/carts/user/:userId', cartController.getCartByUser);


module.exports = router;
