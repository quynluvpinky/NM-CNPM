const db = require('../utilities/db');
const tbName = 'taikhoanadmin';
module.exports = class TaiKhoanAdmin{
    constructor({taikhoan,matkhau}){
        this.taikhoan = taikhoan;
        this.matkhau = matkhau;
    }
    static async getAll(){
        return await db.many(`
            SELECT * FROM public."${tbName}"
        `);
    }
    static async getOneByUsername(username){
        const res = await db.get(tbName, 'taikhoan', username);
        if(res){
            return new TaiKhoanAdmin({...res});
        }
        return res;
    }
}