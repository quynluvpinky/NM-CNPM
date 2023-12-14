const db = require('../../utilities/db')

class SiteController{

    // [GET] /:  
    index(req, res) {
        res.render('home');
    }
}
module.exports = new SiteController;