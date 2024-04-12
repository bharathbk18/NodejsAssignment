// controllers/productController.js
const Product = require('../models/product');

// GET all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST new product
exports.createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const product = new Product({ name, price });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
