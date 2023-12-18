const MonAn = require('../../models/MonAn');

class MonAnController{
    //[GET] data/monan?page=..&per_page=..
    async getPage(req, res){
        const result = await MonAn.getGroupInPage(Number(req.query.page), Number(req.query.per_page));
        res.status(200).json(result);
    }
    //[GET] data/monan
    async getAll(req, res){
        console.log('hello')
        const result = await MonAn.getAll();
        console.log(result);
        res.status(200).json(result);
    }
}
module.exports = new MonAnController;