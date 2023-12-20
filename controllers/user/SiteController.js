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
}
module.exports = new SiteController;