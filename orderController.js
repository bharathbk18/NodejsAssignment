// controllers/orderController.js
const Order = require('../models/order');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// GET order details by ID and export as PDF
exports.getOrderDetailsPDF = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Create a new PDF document
        const doc = new PDFDocument();
        const filename = `order_${order._id}.pdf`;
        const stream = fs.createWriteStream(filename);
        doc.pipe(stream);

        // PDF content
        doc.fontSize(16).text(`Order Details - ${order._id}`);
        doc.moveDown();
        doc.fontSize(12).text(`Customer Name: ${order.customerName}`);
        doc.moveDown();
        doc.fontSize(12).text('Products:');
        order.products.forEach((product, index) => {
            doc.fontSize(10).text(`${index + 1}. ${product.name} - Qty: ${product.quantity}`);
        });

        // End PDF creation
        doc.end();
        stream.on('finish', () => {
            res.download(filename, filename, (err) => {
                if (err) {
                    console.error('PDF download error:', err);
                }
                // Delete the generated PDF file after download
                fs.unlink(filename, (err) => {
                    if (err) {
                        console.error('Error deleting PDF file:', err);
                    }
                });
            });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
