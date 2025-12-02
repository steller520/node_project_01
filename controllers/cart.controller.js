const CartModel = require("../models/Cart.model");
const ProductModel = require("../models/Product.model");

// Get the user's cart
async function getCart(req, res, next) {
    try {
        const cart = await CartModel.findOne({ userId: req.user.id }).populate('items.productId');
        if (!cart) {
            // If no cart, create one
            const newCart = await CartModel.create({ userId: req.user.id, items: [] });
            return res.status(200).json(newCart);
        }
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
}

// Add or update an item in the cart
async function addItemToCart(req, res, next) {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        // Check if product exists
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Find the user's cart
        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            // If no cart, create a new one
            cart = await CartModel.create({ userId, items: [] });
        }

        // Check if the product is already in the cart
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            // If product exists, update the quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // If product does not exist, add it to the items array
            cart.items.push({ productId, quantity });
        }

        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);

    } catch (error) {
        next(error);
    }
}

// Remove an item from the cart
async function removeItemFromCart(req, res, next) {
    const { productId } = req.params;
    const userId = req.user.id;

    try {
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            const err = new Error("Cart not found");
            err.status = 404;
            return next(err);
        }

        // Find the index of the item to remove
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            // Remove the item from the array
            cart.items.splice(itemIndex, 1);
            const updatedCart = await cart.save();
            res.status(200).json(updatedCart);
        } else {
            const err = new Error("Item not found in cart");
            err.status = 404;
            return next(err);
        }

    } catch (error) {
        next(error);
    }
}

// Update an item's quantity in the cart
async function updateItemQuantity(req, res, next) {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            const err = new Error("Cart not found");
            err.status = 404;
            return next(err);
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            // If the new quantity is 0 or less, remove the item
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                // Otherwise, update the quantity
                cart.items[itemIndex].quantity = quantity;
            }
            
            const updatedCart = await cart.save();
            res.status(200).json(updatedCart);
        } else {
            const err = new Error("Item not found in cart");
            err.status = 404;
            return next(err);
        }

    } catch (error) {
        next(error);
    }
}

// Empty the entire cart
async function emptyCart(req, res, next) {
    const userId = req.user.id;

    try {
        let cart = await CartModel.findOne({ userId });
        if (!cart) {
            const err = new Error("Cart not found");
            err.status = 404;
            return next(err);
        }

        cart.items = []; // Empty the items array
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);

    } catch (error) {
        next(error);
    }
}


module.exports = {
    getCart,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    emptyCart
};