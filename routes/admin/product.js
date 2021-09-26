const express = require('express');

const router = express.Router();

const productController = require('../../controllers/admin/product');

const uploadImage = require('../../libs/uploadImage')

router.get('/manage', productController.renderProductManage);
router.get('/register', productController.renderProductRegister);
router.get('/detail', productController.renderProductDetail);
router.get('/edit', productController.renderEditPage);
router.post('/filter', productController.getProductsAsFilter);
router.post('/register', uploadImage.fields([{name: 'thumbnail'}, {name: 'images'}]), productController.registerProduct);
router.post('/edit', uploadImage.fields([{name: 'thumbnail'}, {name: 'images'}]), productController.editProduct);

module.exports = router;