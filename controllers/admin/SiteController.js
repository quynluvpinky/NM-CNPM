const db = require('../../utilities/db')

class SiteController{

    // [GET] /:  
    index(req, res) {
        res.redirect('./xu_li_don_dat_hang')
    }
    // [GET] /:  
    xu_li_don_dat_hang(req, res) {
        res.render('xu_li_don_dat_hang')
    }
    // [GET] /:  
    nhap_xuat_hang(req, res) {
        res.render('nhap_xuat_hang')
    }
    // [GET] /:  
    kiem_tra_kho(req, res) {
        res.render('kiem_tra_kho')
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
        req.session.destroy(err => {
            res.redirect('/');
        })
    }

}
module.exports = new SiteController;