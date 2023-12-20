const express = require('express');
const router = express.Router();
const SanPhamTonKhoController = require('../../controllers/data/SanPhamTonKhoController');

router.get('/changePage',SanPhamTonKhoController.getPage);
router.get('/', SanPhamTonKhoController.getAll)
module.exports = router;