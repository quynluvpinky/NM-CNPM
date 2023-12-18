const db = require('../utilities/db');
const tbName = 'sanphamtonkho';
module.exports = class SanPhamTonKho{
    constructor({masanpham,tensanpham,photo,soluong,giaca,loaisanpham}){
        this.masanpham = masanpham; 
        this.tensanpham = tensanpham; 
        this.photo = photo; 
        this.soluong = soluong;
        this.giaca = giaca; 
        this.loaisanpham = loaisanpham;
    }
    static async getAll(){
        return await db.many(`
            SELECT * FROM ${tbName}
        `)
    }
    static async getOneById(id){
        const res= await db.get(tbName, '')
    }
    static async getGroupInPage(page = 1, per_page = 8){
        let arr = await db.many(`SELECT s.*,l.tenloai FROM ${tbName} s left join loaisanpham l on s.loaisanpham = l.maloai`);;
        const total_pages = Math.floor((arr.length + per_page - 1)/ per_page); 
        const data = arr.slice((page - 1) * per_page, page * per_page)
        return {page, per_page, total_pages, data};
    }
}