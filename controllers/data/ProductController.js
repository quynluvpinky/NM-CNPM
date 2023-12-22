const Product = require('../../models/Product');

class ProductController {
    // [GET] /data/product?page=..&per_page=..
    async getPage(req, res){
        const result = await Product.getGroupInPage(Number(req.query.page), Number(req.query.per_page));
        res.status(200).json(result);
    }
    // [GET] /data/product
    async getAll(req, res){
        const result = await Product.getAll();
        res.status(200).json(result);
    }
}

module.exports = new ProductController;