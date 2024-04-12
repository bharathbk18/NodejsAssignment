// controllers/storeController.js
const Store = require('../models/store');

// GET all stores
exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST new store
exports.createStore = async (req, res) => {
    try {
        const { name, location } = req.body;
        const store = new Store({ name, location });
        await store.save();
        res.status(201).json(store);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
