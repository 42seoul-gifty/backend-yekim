const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

router.get('/', productController.getProductsByPreference);
router.get('/:id', productController.getProductByPk);

module.exports = router;