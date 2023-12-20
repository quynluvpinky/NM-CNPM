const express = require('express')
const router = express.Router();
const siteController = require('../../controllers/user/SiteController');
const passport = require('passport');
router.get('/login',siteController.login);
router.get('/forbidden',siteController.forbidden);
router.get('/cart', siteController.cart);
router.get('/detail/:type/:id', siteController.detail);
router.get('/', siteController.index);
router.post('/login', passport.authenticate('myS', { successReturnToOrRedirect: '/admin', failureRedirect: '/login?e=* Tài khoản hoặc mật khẩu không chính xác' }))
module.exports = router;
