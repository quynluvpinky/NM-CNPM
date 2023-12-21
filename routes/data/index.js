const express = require('express');
const router = express.Router();
const MonAn = require('./MonAn');
const SanPhamTonKho = require('./SanPhamTonKho');
const DaBan = require('./DaBan')

router.use('/monan', MonAn);
router.use('/sanphamtonkho', SanPhamTonKho);
router.use('/daban', DaBan);

module.exports = router;