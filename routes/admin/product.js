const express = require('express');
const path = require('path');

const router = express.Router();

const productController = require('../../controllers/admin/product');

const UPLOAD_FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp/uploads/')
    },
    filename: function (req, file, cb) {
        const mimeType = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${mimeType}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: UPLOAD_FILE_SIZE_LIMIT },
});

router.get('/', productController.renderProductManage);
router.post('/', productController.displayProduct);
router.get('/register', productController.renderProductRegister);
router.post('/register', upload.single('thumbnail'), productController.registerProduct);

module.exports = router;