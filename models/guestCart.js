const mongoose = require('mongoose');

const guestCartSchema = new mongoose.Schema({
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantities: {
    type: Number,
    required: true
  }
});

const GuestCart = mongoose.model('GuestCart', guestCartSchema);

module.exports = GuestCart;
