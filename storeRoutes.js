// routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// GET all stores
router.get('/', storeController.getAllStores);

// POST new store
router.post('/', storeController.createStore);

module.exports = router;
