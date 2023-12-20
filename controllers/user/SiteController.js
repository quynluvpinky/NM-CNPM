const { ColumnSet } = require('pg-promise');
const MonanModel = require('../../models/MonAn');
const SanphamModel = require('../../models/SanPhamTonKho');
class SiteController{
    // [GET] /
    async index(req, res) {
        res.render('home'); 
    }
    // [GET] /cart
    async cart(req, res){
        res.render('cart');
    }
    // [GET] /detail/:type/:id
    async detail(req, res){
        let type = req.query.type;
        let id = req.query.id;
        
        let obj = {type,id};
        if(type == 0){
            const result = await MonanModel.getOneById(id);
            if(result == null) return res.redirect('/');
            obj['name'] = result.tenmon;
            obj['photo'] = result.photo;
            obj['price'] = result.gia;
            obj['description'] = result.mota;
        }else if(type == 1){    
            const result = await SanphamModel.getOneById(id);
            if(result == null) return res.redirect('/');
            obj['name'] = result.tensanpham;
            obj['photo'] = result.photo;
            obj['price'] = result.giaca;
            obj['count'] = result.soluong
            obj['description'] = result.mota;
        }
        res.render('detail', obj);
    }
    // [GET] /login
    async login(req, res,next){
        if(req.isAuthenticated()){
            return res.redirect('/admin');
        }
        let err = req.query.e;
        if(err === undefined){
            err = '';
        }
        return res.render('login',{layout: 'other',error: err});
    }
    // [GET] /forbidden
    async forbidden(req,res,next){
        res.render('forbidden',{layout:'other'});
    }
}
module.exports = new SiteController;