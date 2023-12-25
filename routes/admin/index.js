const express = require('express')
const router = express.Router();
const siteController = require('../../controllers/admin/SiteController')


router.get('/xu_li_don_dat_hang', siteController.xu_li_don_dat_hang);
router.post('/orderConfirm',siteController.xac_nhan_don_hang);
router.post('/orderDenied',siteController.huy_don_hang);

router.get('/nhap_xuat_hang', siteController.nhap_xuat_hang);
router.post('/nhap_xuat_hang',siteController.cap_nhap_kho);
router.get('/them_hang_moi',siteController.them_hang_moi);
router.post('/them_hang_moi',siteController.cap_nhap_hang_moi);
router.post('/xoa_mat_hang',siteController.xoa_mat_hang);

router.get('/kiem_tra_kho', siteController.kiem_tra_kho);
router.get('/bao_cao_doanh_thu', siteController.bao_cao_doanh_thu);
router.get('/chi_tieu_cac_mon', siteController.chi_tieu_cac_mon);
router.post('/chi_tieu_cac_mon',siteController.cap_nhap_chi_tieu);

router.get('/logout', siteController.logout);
router.get('/', siteController.index)

module.exports = router; 
