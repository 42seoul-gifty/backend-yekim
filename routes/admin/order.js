const express = require('express');

const router = express.Router();

const orderController = require('../../controllers/admin/order');

router.get('/manage', orderController.renderOrderManage);
router.post('/filter', orderController.getOrders);
router.post('/shipment', orderController.changeShipmentStatus);
// router.post('/ma', uploadImage.fields([{name: 'thumbnail'}, {name: 'images'}]), productController.editProduct);

module.exports = router;