const MonAn = require('../../models/MonAn');

class MonAnController{
    //[GET] data/monan?page=..&per_page=..
    async getPage(req, res){
        const result = await MonAn.getGroupInPage(Number(req.query.page), Number(req.query.per_page));
        res.status(200).json(result);
    }
    //[GET] data/monan
    async getAll(req, res){
        const result = await MonAn.getAll();
        res.status(200).json(result);
    }
}
module.exports = new MonAnController;