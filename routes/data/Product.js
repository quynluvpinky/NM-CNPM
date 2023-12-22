const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/data/ProductController');

router.get('/changePage',ProductController.getPage);
router.get('/', ProductController.getAll)
module.exports = router;