const express = require('express');
const router = express.Router();
const DaBanController = require('../../controllers/data/DaBanController');

router.get('/', DaBanController.getByDate)
router.get('/', DaBanController.getAll);
module.exports = router; 