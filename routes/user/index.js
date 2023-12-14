const express = require('express')
const router = express.Router();
const siteController = require('../../controllers/user/SiteController')

router.get('/', siteController.index)

module.exports = router;
