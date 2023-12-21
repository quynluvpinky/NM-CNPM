const db = require('../utilities/db');

module.exports = class Daban {
    constructor({ id, ngay, maso, soluong }) {
        this.id = id;
        this.ngay = ngay;
        this.maso = maso;
        this.soluong = soluong;
    }

    static async getAll() { 
        try {
            const resultOrderMonan = await db.manyOrNone(`SELECT id, ngay, mamon AS maso, soluongmon AS soluong FROM public."ordermonan"`);
            const resultChitietMuahang = await db.manyOrNone(`SELECT id, ngay, masanpham AS maso, soluongsanpham AS soluong FROM public."chitietmuahang"`);

            if (resultOrderMonan.length > 0 || resultChitietMuahang.length > 0) {
                return await db.many(`
                SELECT 
                    o.id, 
                    o.ngay, 
                    o.mamon AS maso, 
                    o.soluongmon AS soluong 
                FROM public."ordermonan" o

                UNION ALL

                SELECT 
                    id, 
                    ngay, 
                    masanpham AS maso, 
                    soluongsanpham AS soluong 
                FROM public."chitietmuahang"
                `);
            } else {
                return [];
            }
            
        }
        catch (error) {
            console.error('Error retrieving data from the database:', error);
            throw error; // Rethrow the error to handle it further up the call stack if needed.
        }
    }
    static async getByDate(ngay) {
        const allData = await this.getAll();
        return allData.filter(item => item.ngay === ngay);
    }


};
