const db = require('../utilities/db');
const pgp = require('pg-promise')({
    capSQL: true // if you want all generated SQL capitalized
 });
const tbName = 'food';
module.exports = class Food{
    constructor({itemid, name, photo, price,quantity, description}){
        this.itemid = itemid; 
        this.name = name; 
        this.photo = photo; 
        this.price = price; 
        this.quantity = quantity; 
        this.description = description; 
    }
    static async getAll(){
        return await db.many(`
            SELECT * FROM public."${tbName}"
        `)
    }
    static async getOneById(id){
        const res = await db.oneOrNone(`
            SELECT * FROM public."${tbName}"
            WHERE "itemid" = $1
        `,[id])
        if(res){
            return new Food({...res})
        }
        return res;
    }
    static async getGroupInPage(page = 1, per_page = 8){
        let arr = await db.many(`SELECT * FROM public."${tbName}"  WHERE quantity > 0;`);
        const total_pages = Math.floor((arr.length + per_page - 1)/ per_page); 
        const data = arr.slice((page - 1) * per_page, page * per_page)
        return {page, per_page, total_pages, data};
    }
    static async updateQuantity(data) {
        const query = pgp.helpers.update(data,['itemid','quantity'],tbName) + 'WHERE v.itemid = t.itemid';
        console.log(query);
        await db.none(query);
    }
}