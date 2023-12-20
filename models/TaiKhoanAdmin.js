const db = require('../utilities/db');
const tbName = 'taikhoanadmin';
module.exports = class TaiKhoanAdmin{
    constructor({taikhoan,matkhau}){
        this.taikhoan = taikhoan;
        this.matkhau = matkhau;
    }
    static async getOneByUsername(username){
        const res = await db.oneOrNone(`
            SELECT * FROM public."${tbName}"
            WHERE "taikhoan" = $1
        `,[username]);
        if(res){
            return new TaiKhoanAdmin({...res});
        }
        return res;
    }
}