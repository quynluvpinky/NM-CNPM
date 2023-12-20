const db = require('../utilities/db');
const tbName = 'sanphamtonkho';
module.exports = class SanPhamTonKho{
    constructor({masanpham,tensanpham,photo,soluong,giaca,loaisanpham, mota}){
        this.masanpham = masanpham; 
        this.tensanpham = tensanpham; 
        this.photo = photo; 
        this.soluong = soluong;
        this.giaca = giaca; 
        this.loaisanpham = loaisanpham;
        this.mota = mota;
    }
    static async getAll(){
        return await db.many(`
            SELECT * FROM public."${tbName}"
        `)
    }
    static async getOneById(id){
        const res = await db.oneOrNone(`
            SELECT * FROM public."${tbName}"
            WHERE "masanpham" = $1
        `,[id]);
        if(res){
            return new SanPhamTonKho({...res});
        }
        return res;
    }
    static async getGroupInPage(page = 1, per_page = 8){
        let arr = await db.many(`SELECT s.*,l.tenloai FROM public."${tbName}" s left join public."loaisanpham" l on s.loaisanpham = l.maloai`);;
        const total_pages = Math.floor((arr.length + per_page - 1)/ per_page); 
        const data = arr.slice((page - 1) * per_page, page * per_page)
        return {page, per_page, total_pages, data};
    }
}