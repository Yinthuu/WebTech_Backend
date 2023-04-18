const express = require('express');
const router = express.Router();
const guestCartController = require('../controllers/guestCartController');

router.get('/guestcarts', guestCartController.getAllItems);
router.post('/guestcarts', guestCartController.createGuestCartItem);

module.exports = router;
