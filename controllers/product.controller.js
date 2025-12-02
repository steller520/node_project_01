const ProductModel = require("../models/Product.model");

function fetchProducts(req, res, next) {
  // Logic to fetch all products from the database
  try {
    ProductModel.find({})
      .then((products) => res.status(200).json(products))
      .catch((err) => res.status(500).json({ error: err.message }));
  } catch (error) {
    next(error);
  }
}

function fetchProductById(req, res, next) {
  // Logic to fetch a product by ID from the database
  try {
    const productId = req.params.id;
    ProductModel.findById(productId)
      .then((product) => {
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  } catch (error) {
    next(error);
  }
}

function createProduct(req, res, next) {
  try {
    const newProduct = req.body;
    // Logic to create a new product in the database
    const product = new ProductModel(newProduct);
    product
      .save()
      .then((savedProduct) => res.status(201).json(savedProduct))
      .catch((err) => res.status(400).json({ error: err.message }));
  } catch (error) {
    next(error);
  }
}

function updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updatedProduct = req.body;
    ProductModel.findByIdAndUpdate(productId, updatedProduct, { new: true })
      .then((product) => {
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  } catch (error) {
    next(error);
  }
}

function deleteProduct(req, res, next) {
    try {
      const productId = req.params.id;
      ProductModel.findByIdAndDelete(productId)
        .then((product) => {
          if (!product) {
            return res.status(404).json({ error: "Product not found" });
          }
          res.status(200).json({ message: `Product with ID: ${productId} deleted` });
        })
        .catch((err) => res.status(500).json({ error: err.message }));
    } catch (error) {
      next(error);
    }
}
module.exports = {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
