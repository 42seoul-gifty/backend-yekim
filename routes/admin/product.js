const express = require('express');

const router = express.Router();

const productController = require('../../controllers/admin/product');

const uploadImage = require('../../libs/uploadImage')

router.get('/manage', productController.renderProductManage);
router.post('/manage', productController.displayProduct);
router.get('/register', productController.renderProductRegister);
router.post('/register', uploadImage.single('thumbnail'), productController.registerProduct);

module.exports = router;