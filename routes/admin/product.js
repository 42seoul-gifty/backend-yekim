const express = require('express');

const router = express.Router();

const productController = require('../../controllers/admin/product');

const uploadImage = require('../../libs/uploadImage')

router.get('/manage', productController.renderProductManage);
router.post('/filter', productController.getProducts);
router.get('/detail', productController.getProductDetail);
router.get('/register', productController.renderProductRegister);
router.post('/register', uploadImage.fields([{name: 'thumbnail'}, {name: 'images'}]), productController.registerProduct);
router.get('/edit', productController.renderEditPage);
router.post('/edit', uploadImage.fields([{name: 'thumbnail'}, {name: 'images'}]), productController.editProduct);

module.exports = router;