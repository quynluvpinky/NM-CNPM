const db = require('../utilities/db')

class SiteController{

    // [GET] /:  
    index(req, res) {
        const user = req.user;
        res.render('home')
    }
}
module.exports = new SiteController; 