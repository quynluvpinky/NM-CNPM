const db = require('../utilities/db');
const tbName = 'admin';
module.exports = class Admin{
    constructor({username,password}){
        this.username = username;
        this.password = password;
    }
    static async getOneByUsername(username){
        const res = await db.oneOrNone(`
            SELECT * FROM public."${tbName}"
            WHERE "username" = $1
        `,[username]);
        if(res){
            return new Admin({...res});
        }
        return res;
    }
}