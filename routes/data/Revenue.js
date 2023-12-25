const express = require('express');
const router = express.Router();
const RevenueController = require('../../controllers/data/RevenueController');

router.get('/by-date', RevenueController.getRevenueByDate);
router.get('/by-month', RevenueController.getRevenueByMonth);

module.exports = router;