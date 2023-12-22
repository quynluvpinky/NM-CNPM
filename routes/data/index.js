const express = require('express');
const router = express.Router();
const Food = require('./Food');
const Product = require('./Product');
router.use('/food', Food);
router.use('/product',Product);
module.exports = router;
