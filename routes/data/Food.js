const express = require('express');
const router = express.Router();
const FoodController = require('../../controllers/data/FoodController');

router.get('/changePage', FoodController.getPage);
router.get('/', FoodController.getAll);
module.exports = router;