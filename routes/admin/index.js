const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('admin/index', { title: 'Admin Index Page' });
});

const productRouter = require('./product');
router.use('/product', productRouter);

module.exports = router;