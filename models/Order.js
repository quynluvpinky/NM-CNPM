const db = require('../utilities/db');
const pgp = require('pg-promise')({
	capSQL: true
})
const tbName = 'order';
module.exports = class Order{
    static async insert(order){
        const res = await db.one(`
            INSERT INTO public."${tbName}" (date, clientname, clientphone,order_status)
            VALUES ($1, $2,$3,$4) RETURNING orderid
        `, [new Date(), order.fullName,order.phoneNumber,'not purchased']);
        if(order.food != null){
            const foodData = order.food.map(item => ({...item, orderid: res.orderid}))
            const foodCS = new pgp.helpers.ColumnSet(['itemid', 'quantity', 'orderid'], {table: 'foodorder'})
            await db.none(pgp.helpers.insert(foodData,foodCS));
        }
        if(order.product != null){
            const productData = order.product.map(item => ({...item, orderid: res.orderid}));
            const productCS = new pgp.helpers.ColumnSet(['itemid', 'quantity', 'orderid'], {table: 'productorder'})
            await db.none(pgp.helpers.insert(productData, productCS));
        }
        
    }
}