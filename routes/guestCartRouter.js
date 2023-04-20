const express = require('express');
const router = express.Router();
const guestCartController = require('../controllers/guestCartController');

router.get('/guestcarts', guestCartController.getAllItems);
router.post('/guestcarts', guestCartController.createGuestCartItem);
router.delete('/guestcarts/:id', guestCartController.deleteGuestCartById);
router.patch('/guestcarts/:id', guestCartController.updateGuestCarts);

module.exports = router;
