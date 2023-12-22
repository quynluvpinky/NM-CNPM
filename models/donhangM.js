const db = require('../utilities/db');

module.exports = class DONHANG {
    static async getAllDonHang() {
        const rs = await db.manyOrNone(`
        SELECT "order".orderid,TO_CHAR(date::timestamp,'DD-MM-YYYY') as date,clientname, clientphone, food.name,food.photo, foodorder.quantity, food.price, SUM(foodorder.quantity * food.price) AS total 
        FROM "order" INNER JOIN foodorder ON "order".orderid = foodorder.orderid 
        INNER JOIN food ON food.itemid = foodorder.itemid
        WHERE order_status = 'not purchased'
        GROUP BY "order".orderid,date,clientname, clientphone, food.name,food.photo, foodorder.quantity, food.price
        UNION
        SELECT "order".orderid,TO_CHAR(date::timestamp,'DD-MM-YYYY') as date,clientname, clientphone, product.name,product.photo, productorder.quantity, product.price, SUM(productorder.quantity * product.price) AS total
        FROM "order" INNER JOIN productorder ON "order".orderid = productorder.orderid 
        INNER JOIN product ON product.itemid = productorder.itemid
        WHERE order_status = 'not purchased'
        GROUP BY "order".orderid,date,clientname, clientphone, product.name,product.photo, productorder.quantity, product.price
        ORDER BY orderid
        `);
        return rs;
    }
    static async XacNhanDonHang(_orderid) {
        await db.none(`
        UPDATE "order"
        SET order_status = 'purchased'
        WHERE orderid = ${_orderid}
        `)
    }
    static async HuyDonHang(_orderid) {
        await db.none(`
        UPDATE "order"
        SET order_status = 'deleted'
        WHERE orderid = ${_orderid}
        `)
    }
}