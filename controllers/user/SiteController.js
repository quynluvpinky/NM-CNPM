const { ColumnSet } = require('pg-promise');
const FoodModel = require('../../models/Food');
const ProductModel = require('../../models/Product');
const OrderModel = require('../../models/Order')
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
        
        let obj = {type};
        let result;
        if(type == 0){
            result = await FoodModel.getOneById(id);
            if(result == null) return res.redirect('/');
        }else if(type == 1){    
            result = await ProductModel.getOneById(id);
            if(result == null) return res.redirect('/');
        }
        obj['data'] = result;
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
    async purchase(req, res, next){
        OrderModel.insert(req.body);
        res.status(200).json(true);
    }
}
module.exports = new SiteController;