const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    image: { type: String },
    description: { type: String },
})

module.exports = mongoose.model('Cart', cartSchema);