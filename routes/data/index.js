const express = require('express');
const router = express.Router();
const Food = require('./Food');
const Product = require('./Product');
const Revenue = require('./Revenue');
router.use('/food', Food);
router.use('/product', Product);
router.use('/revenue', Revenue);
module.exports = router;
