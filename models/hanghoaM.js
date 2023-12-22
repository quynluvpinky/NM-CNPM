const db = require('../utilities/db');

module.exports = class HANGHOA {
    static async getAllDonHang() {
        const rs = await await db.manyOrNone(`
        SELECT "order".orderid,TO_CHAR(date::timestamp,'DD-MM-YYYY') as date,clientname, clientphone, food.name,food.photo, foodorder.quantity, food.price, SUM(foodorder.quantity * food.price) AS total 
        FROM "order" INNER JOIN foodorder ON "order".orderid = foodorder.orderid 
        INNER JOIN food ON food.itemid = foodorder.itemid
        GROUP BY "order".orderid,date,clientname, clientphone, food.name,food.photo, foodorder.quantity, food.price
        UNION
        SELECT "order".orderid,TO_CHAR(date::timestamp,'DD-MM-YYYY') as date,clientname, clientphone, product.name,product.photo, productorder.quantity, product.price, SUM(productorder.quantity * product.price) AS total
        FROM "order" INNER JOIN productorder ON "order".orderid = productorder.orderid 
        INNER JOIN product ON product.itemid = productorder.itemid
        GROUP BY "order".orderid,date,clientname, clientphone, product.name,product.photo, productorder.quantity, product.price
        ORDER BY orderid
        `);
        return rs;
    }
    static async getSanPhamTonKho() {
        const rs = await db.manyOrNone(`SELECT 
        SANPHAMTONKHO.MASANPHAM,
        SANPHAMTONKHO.TENSANPHAM,
        SANPHAMTONKHO.PHOTO,
        SANPHAMTONKHO.SOLUONG,
        LOAISANPHAM.TENLOAI
    FROM 
        SANPHAMTONKHO
    INNER JOIN 
        LOAISANPHAM ON SANPHAMTONKHO.LOAISANPHAM = LOAISANPHAM.MALOAI`)
        return rs;
    }
}