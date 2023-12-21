const express = require('express');
const router = express.Router();
const MonAn = require('./MonAn');
const SanPhamTonKho = require('./SanPhamTonKho');

router.use('/monan', MonAn);
router.use('/sanphamtonkho', SanPhamTonKho);

module.exports = router;