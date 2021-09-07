const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
// TODO: order_id PK로 주문을 찾을 때, 사용되지 않는 user_id는 토큰 검증시 사용
router.get('/:user_id/orders', userController.readOrders);
router.post('/:user_id/orders', userController.createOrder);
router.get('/:user_id/orders/:order_id', userController.readOrderById);
router.delete('/:user_id/orders/:order_id', userController.deleteOrder);

module.exports = router;