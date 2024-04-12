// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// GET all orders
router.get('/', orderController.getAllOrders);

// POST new order
router.post('/', orderController.createOrder);

// GET order details by ID
router.get('/:id', orderController.getOrderById);

// GET order details by ID and export as PDF
router.get('/:id/pdf', orderController.getOrderDetailsPDF);

module.exports = router;
