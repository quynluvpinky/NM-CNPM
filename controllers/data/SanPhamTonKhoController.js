const SanPhamTonKho = require('../../models/SanPhamTonKho');

class SanPhamTonKhoController {
    // [GET] /data/sanphamtonkho?page=..&per_page=..
    async getPage(req, res){
        const result = await SanPhamTonKho.getGroupInPage(Number(req.query.page), Number(req.query.per_page));
        res.status(200).json(result);
    }
    // [GET] /data/sanphamtonkho
    async getAll(req, res){
        const result = await SanPhamTonKho.getAll();
        res.status(200).json(result);
    }
}

module.exports = new SanPhamTonKhoController;