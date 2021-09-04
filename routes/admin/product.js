const express = require('express');
const path = require('path');

const router = express.Router();

const productController = require('../../controllers/admin/product');

// req.thumbnail => single의 name으로 input tag의 name 값을 사용해야합니다.
const UPLOAD_FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // if (파일의 형식이 이미지이면)
        //    cb(null, 'uploads/images');
        cb(null, 'tmp/uploads')
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
// router.post('/create', upload.single('thumbnail'), productController.createProduct);
router.get('/', productController.renderProductManage);
router.post('/', productController.displayProduct);
router.get('/register', productController.renderProductRegister);
router.post('/register', productController.registerProduct);

module.exports = router;