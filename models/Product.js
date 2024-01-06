const db = require('../utilities/db');
const pgp = require('pg-promise')({
	capSQL: true
})

const tbName = 'product';
module.exports = class Product{
    constructor({itemid,name,photo,price,quantity, description}){
        this.itemid = itemid; 
        this.name= name; 
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
        `,[id]);
        if(res){
            return new Product({...res});
        }
        return res;
    }
    static async getGroupInPage(page = 1, per_page = 8){
        let arr = await db.many(`SELECT * FROM public."${tbName}" WHERE quantity > 0;`);
        const total_pages = Math.floor((arr.length + per_page - 1)/ per_page); 
        const data = arr.slice((page - 1) * per_page, page * per_page)
        return {page, per_page, total_pages, data};
    }
    static async insert(data) {
        const query = pgp.helpers.insert(data,['itemid','name','photo','price','quantity','description'],tbName);
        await db.none(query);
    }
    static async delete(_name) {
        const rs = await db.one(`
        UPDATE "product"
        SET quantity = 0
        WHERE "name" = '${_name}'
        RETURNING "itemid"
        `)
        return rs;
    }
}