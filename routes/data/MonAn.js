const express = require('express');
const router = express.Router();
const MonAnController = require('../../controllers/data/MonAnController');

router.get('/changePage', MonAnController.getPage);
router.get('/', MonAnController.getAll);
module.exports = router;