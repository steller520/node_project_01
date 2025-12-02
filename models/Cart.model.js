const mongoose = require('mongoose');
const { Schema } = mongoose;

// This defines the schema for a single item within the cart's items array
const cartItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
}, { _id: false }); // _id: false prevents MongoDB from creating a separate ID for each sub-item

// This is the main cart schema
const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Ensures one cart per user
    },
    items: [cartItemSchema] // The cart holds an array of items
}, { timestamps: true }); // timestamps adds createdAt and updatedAt fields

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;