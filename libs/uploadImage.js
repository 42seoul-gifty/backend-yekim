const UPLOAD_FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const multer = require('multer');
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'thumbnail') {
            cb(null, 'public/tmp/uploads_example/thumbnails');
        } else if (file.fieldname === 'images') {
            cb(null, 'public/tmp/uploads_example/images');
        }
    },
    filename: function (req, file, cb) {
        const mimeType = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${mimeType}`);
    }
});

module.exports = multer({
    storage: storage,
    limits: { fileSize: UPLOAD_FILE_SIZE_LIMIT },
});