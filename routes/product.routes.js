// products routes

const { fetchProducts, fetchProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");
const validate = require("../middleware/validator");
const { productSchema } = require("../validation/product.validation");

function productRoutes(app) {
    app.get('/products',fetchProducts);
    app.get('/products/:id',fetchProductById);
    app.post('/products', validate(productSchema), createProduct);
    app.put('/products/:id', validate(productSchema), updateProduct);
    app.delete('/products/:id',deleteProduct);
}

module.exports = productRoutes;