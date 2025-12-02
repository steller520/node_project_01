const { getCart, addItemToCart, removeItemFromCart, updateItemQuantity, emptyCart } = require("../controllers/cart.controller");
const verifyToken = require("../middleware/verify");
const validate = require("../middleware/validator");
const { cartSchema, updateCartSchema } = require("../validation/cart.validation");

// cart routes
function cartRoutes(app) {
  // Cart routes with token verification and validation
  app.get("/cart", verifyToken, getCart);
  app.post("/cart", verifyToken, validate(cartSchema), addItemToCart);
  app.put("/cart", verifyToken, validate(updateCartSchema), updateItemQuantity);
  app.delete("/cart", verifyToken, emptyCart); // Empties the entire cart
  app.delete("/cart/:productId", verifyToken, removeItemFromCart); // Removes one item
}

module.exports = cartRoutes;
