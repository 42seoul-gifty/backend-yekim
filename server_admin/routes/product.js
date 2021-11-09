const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

const UPLOAD_FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const multer = require('multer');
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'thumbnail') {
            cb(null, '../public/tmp/uploads_example/thumbnails');
        } else if (file.fieldname === 'images') {
            cb(null, '../public/tmp/uploads_example/images');
        }
    },
    filename: function (req, file, cb) {
        const mimeType = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${mimeType}`);
    }
});
const uploadImage = multer({
    storage: storage,
    limits: { fileSize: UPLOAD_FILE_SIZE_LIMIT },
});

router.get('/manage', productController.renderProductManage);
router.get('/register', productController.renderProductRegister);
router.get('/detail', productController.renderProductDetail);
router.get('/edit', productController.renderEditPage);
router.post('/filter', productController.getProductsAsFilter);
router.post('/register', uploadImage.fields([{name: 'thumbnail'}, {name: 'images'}]), productController.registerProduct);
router.post('/edit', uploadImage.fields([{name: 'thumbnail'}, {name: 'images'}]), productController.editProduct);

module.exports = router;