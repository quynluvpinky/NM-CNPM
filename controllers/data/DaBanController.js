const DaBan = require('../../models/DaBan');

class MonAnController {
    //[GET] data/daban?date=..
    async getByDate(req, res) {
        const result = await DaBan.getByDate(Date(req.query.ngay));
        res.status(200).json(result);
    }
    //[GET] data/daban
    async getAll(req, res) {
        const result = await DaBan.getAll();
        res.status(200).json(result);
    }
}
module.exports = new MonAnController; 