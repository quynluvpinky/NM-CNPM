const express = require('express')
const router = express.Router();
const siteController = require('../../controllers/admin/SiteController')


router.get('/xu_li_don_dat_hang', siteController.xu_li_don_dat_hang);
router.post('/orderConfirm',siteController.xac_nhan_don_hang);
router.post('/orderDenied',siteController.huy_don_hang);

router.get('/nhap_xuat_hang', siteController.nhap_xuat_hang);
router.get('/kiem_tra_kho', siteController.kiem_tra_kho);
router.get('/bao_cao_doanh_thu', siteController.bao_cao_doanh_thu);
router.get('/chi_tieu_cac_mon', siteController.chi_tieu_cac_mon);
router.get('./logout', siteController.logout);
router.get('/', siteController.index)

module.exports = router; 
