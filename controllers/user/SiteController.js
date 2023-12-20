const passport = require('passport');
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
        res.render('detail');
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