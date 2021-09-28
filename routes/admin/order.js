const express = require('express');

const router = express.Router();

const orderController = require('../../controllers/admin/order');

router.get('/manage', orderController.renderOrderManage);
router.post('/filter', orderController.getOrders);
router.post('/shipment', orderController.changeShipmentStatus);
router.get('/detail', orderController.renderOrderDetail);
router.get('/edit', orderController.renderEditPage);
router.post('/edit', orderController.editOrder);

module.exports = router;