const db = require('../utilities/db');

module.exports = class HANGHOA {
    static async getAllDonHang() {
        const rs = await await db.manyOrNone('SELECT TENSANPHAM,PHOTO, CHITIETMUAHANG.SOLUONGSANPHAM, SUM(SOLUONGSANPHAM*GIACA) AS TONGTIEN FROM CHITIETMUAHANG INNER JOIN SANPHAMTONKHO ON CHITIETMUAHANG.MASANPHAM = SANPHAMTONKHO.MASANPHAM GROUP BY TENSANPHAM,CHITIETMUAHANG.SOLUONGSANPHAM,PHOTO');
        return rs;
    }
    static async getAllDonPhanAn() {
        const rs = await db.get
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