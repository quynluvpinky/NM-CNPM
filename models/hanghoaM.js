const db = require('../utilities/db');

module.exports = class HANGHOA {
    static async getAllDonHang() {
        const rs = await db.getDonHang();
        return rs;
    }
    static async getSanPhamTonKho() {
        const rs = await db.getSanPhamTonKho();
        return rs;
    }
}