const express = require('express')
const router = express.Router();
const siteController = require('../../controllers/user/SiteController')

router.get('/', siteController.index);
router.get('/cart', siteController.cart);
router.get('/detail/:type/:id', siteController.detail);
module.exports = router;
