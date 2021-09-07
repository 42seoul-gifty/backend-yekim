const express = require('express');

const router = express.Router();

const productController = require('../../controllers/admin/product');

const uploadImage = require('../../libs/uploadImage')

router.get('/', productController.renderProductManage);
router.post('/', productController.displayProduct);
router.get('/register', productController.renderProductRegister);
router.post('/register', uploadImage.single('thumbnail'), productController.registerProduct);

module.exports = router;