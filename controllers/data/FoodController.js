const Food = require('../../models/Food');

class FoodController{
    //[GET] data/food?page=..&per_page=..
    async getPage(req, res){
        const result = await Food.getGroupInPage(Number(req.query.page), Number(req.query.per_page));
        res.status(200).json(result);
    }
    //[GET] data/food
    async getAll(req, res){
        const result = await Food.getAll();
        res.status(200).json(result);
    }
}
module.exports = new FoodController;