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
    static async KiemTraSoLuong(_orderid) {
        const foods = await db.manyOrNone(`
        SELECT "name", food."quantity", foodorder."quantity" AS require FROM food INNER JOIN foodorder ON food.itemid = foodorder.itemid
        WHERE foodorder.orderid = ${_orderid};
        `)
        const products = await db.manyOrNone(`
        SELECT "name", product."quantity", productorder."quantity" AS require FROM product INNER JOIN productorder ON product.itemid = productorder.itemid
        WHERE productorder.orderid = ${_orderid}
        `)
        var rs = 1;
        foods.forEach(food => {
            if (food.quantity < food.require) {
                rs = food.name;
            }
        })
        products.forEach(product => {
            console.log(product.quantity);
            console.log(product.require);
            if (product.quantity < product.require) {
                rs = product.name;
                console.log(rs);
            }
        })
        return rs;
    }
    static async KiemTraSoLuongTruocKhiNhapXuat(data) {
        var check =1;
        data.forEach(async (element) => {
            let curQuantity = await db.one(`
        SELECT quantity FROM product
        WHERE name = '${element.name}'
        `)
            let sum = parseInt(curQuantity.quantity) + parseInt(element.value);
            if (sum < 0) {
                check = 0;
            }
        })
        return check;
    }
    static async XacNhanDonHang(_orderid, _quantity) {
        
            //Thay đổi số lượng tồn kho
            await db.none(`
            UPDATE food
            SET quantity = food.quantity - fo.quantity
            FROM foodOrder fo
            WHERE fo.orderID = ${_orderid}
            AND food.itemID = fo.itemID;
            
            UPDATE product
            SET quantity = product.quantity - po.quantity
            FROM productOrder po
            WHERE po.orderID = ${_orderid}
            AND product.itemID = po.itemID;
            `)

            // Thay trạng thái đơn hàng để xác nhận
            await db.none(`
            UPDATE "order"
            SET order_status = 'purchased'
            WHERE orderid = ${_orderid}
            `)
            return 1
        
    }
    static async HuyDonHang(_orderid) {
        await db.none(`
        UPDATE "order"
        SET order_status = 'deleted'
        WHERE orderid = ${_orderid}
        `)
    }
}