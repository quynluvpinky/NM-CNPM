const db = require('../utilities/db');
const tbName = 'monan';
module.exports = class MonAn{
    constructor({mamon, tenmon, photo, gia,mota}){
        this.mamon = mamon;
        this.tenmon = tenmon; 
        this.photo = photo;
        this.gia = gia;
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
            WHERE "mamon" = $1
        `,[id])
        if(res){
            return new MonAn({...res})
        }
        return res;
    }
    static async getGroupInPage(page = 1, per_page = 8){
        let arr = await db.many(`SELECT * FROM public."${tbName}"`);
        const total_pages = Math.floor((arr.length + per_page - 1)/ per_page); 
        const data = arr.slice((page - 1) * per_page, page * per_page)
        return {page, per_page, total_pages, data};
    }
}