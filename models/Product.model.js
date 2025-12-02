const mongoose = require('mongoose');
const { Schema } = mongoose;

// This defines the schema for the Product model
const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    stock: { type: Number, default: 0 }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;