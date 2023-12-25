const db = require('../utilities/db');
// date: "2023-01-01"
class RevenueModel {
    static async getRevenueByDate(date) {
        try {
            const result = await db.any(`
            SELECT itemid, name, price, SUM(quantity) AS quantity, SUM(price * quantity) AS total
            FROM (
                SELECT fo.itemid, fo.quantity, f.name, f.price
                FROM foodorder fo
                JOIN food f ON f.itemid = fo.itemid
                JOIN "order" o ON o.orderid = fo.orderid
                WHERE o.order_status = 'purchased' AND o.date = $1

                UNION ALL

                SELECT po.itemid, po.quantity, p.name, p.price
                FROM productorder po
                JOIN product p ON p.itemid = po.itemid
                JOIN "order" o ON o.orderid = po.orderid
                WHERE o.order_status = 'purchased' AND o.date = $1
            ) AS combined_data
            GROUP BY itemid, name, price;
            `, date);
            return result;
        } catch (error) {
            console.error('Error fetching revenue data:', error.message || error);
            throw error;
        }
    };
    static async getRevenueByMonth(month) {
        try {
            const result = await db.any(`
            SELECT date, SUM(price * quantity) AS total
            FROM (
                SELECT o.date, fo.itemid, fo.quantity, f.name, f.price
                FROM foodorder fo
                JOIN food f ON f.itemid = fo.itemid
                JOIN "order" o ON o.orderid = fo.orderid
                WHERE o.order_status = 'purchased'

                UNION ALL

                SELECT o.date, po.itemid, po.quantity, p.name, p.price
                FROM productorder po
                JOIN product p ON p.itemid = po.itemid
                JOIN "order" o ON o.orderid = po.orderid
                WHERE o.order_status = 'purchased'
            ) AS combined_data
            GROUP BY date;
            `, month);
            return result;
        } catch (error) {
            console.error('Error fetching revenue data:', error.message || error);
            throw error;
        }
    }
}

module.exports = RevenueModel;
