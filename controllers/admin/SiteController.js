const db = require('../../utilities/db')
const hanghoaM = require('../../models/hanghoaM')

class SiteController{

    // [GET] /:  
    index(req, res) {
        res.redirect('./xu_li_don_dat_hang')
    }
    // [GET] /:  
    async xu_li_don_dat_hang(req, res, next) {
        try {
            const donphanan = await 
            const donhang = await hanghoaM.getAllDonHang();
            res.render('xu_li_don_dat_hang', {donhang: donhang});
        }
        catch (e) {
            next(e);
        }
    }
    // [GET] /:  
    nhap_xuat_hang(req, res) {
        res.render('nhap_xuat_hang')
    }
    // [GET] /:  
    async kiem_tra_kho(req, res, next) {
        try {
            const hangtonkho = await hanghoaM.getSanPhamTonKho();
            console.log(hangtonkho);
            res.render('kiem_tra_kho', {hangtonkho: hangtonkho});
        }
        catch (e) {
            next(e);
        }
    }
    // [GET] /:  
    bao_cao_doanh_thu(req, res) {
        res.render('bao_cao_doanh_thu')
    }
    // [GET] /:  
    chi_tieu_cac_mon(req, res) {
        res.render('chi_tieu_cac_mon')
    }
    // [GET] /:  
    logout(req, res) {
        res.render('logout')
    }

}
module.exports = new SiteController;