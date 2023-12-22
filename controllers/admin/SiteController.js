const db = require('../../utilities/db')
const donhangM = require('../../models/donhangM')

class SiteController {

    // [GET] /:  
    index(req, res) {
        res.redirect('./xu_li_don_dat_hang')
    }
    // [GET] /:  
    async xu_li_don_dat_hang(req, res, next) {
        try {
            const donhang = await donhangM.getAllDonHang();
            
            // Tạo mảng mới
            const newArray = [];
            const map = new Map();

            for (const item of donhang) {
                const key = item.orderid + item.date + item.clientname + item.clientphone;

                if (!map.has(key)) {
                    map.set(key, true);

                    newArray.push({
                        orderid: item.orderid,
                        date: item.date,
                        clientname: item.clientname,
                        clientphone: item.clientphone,
                        items: []
                    });
                }

                const newItem = {
                    name: item.name,
                    photo: item.photo,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.total
                };
                    
                newArray.find(element => element.orderid === item.orderid).items.push(newItem);
            }
            
            //Thêm thuộc tính final total:
            for (var i = 0; i < newArray.length; i++) {
                var currentObject = newArray[i];
            
                // Sử dụng reduce để tính tổng các total trong items
                var sumOfTotal = currentObject.items.reduce(function (accumulator, currentItem) {
                    return accumulator + parseInt(currentItem.total);
                }, 0);
            
                // Thêm thuộc tính final_total
                currentObject.final_total = sumOfTotal;
            }
            res.render('xu_li_don_dat_hang', { donhang: newArray });
        }
        catch (e) {
            next(e);
        }
    }
    async xac_nhan_don_hang(req,res,next) {
        try {
            const id = req.body.orderid;
            donhangM.XacNhanDonHang(id);
            res.status(200).send('Status: OK');
        }
        catch (e) {
            next(e);
        }
    }
    async huy_don_hang(req,res,next) {
        try {
            const id = req.body.orderid;
            donhangM.HuyDonHang(id);
            res.status(200).send('Status: OK');

        }
        catch(e) {
            next(e)
        }
    }

    ////////////////////NHAP XUAT HANG /////////////////////  
    nhap_xuat_hang(req, res) {
        res.render('nhap_xuat_hang')
    }
    
    /////////////// KIEM TRA KHO /////////////////////////////
    async kiem_tra_kho(req, res, next) {
        try {
            const hangtonkho = await db.manyOrNone(`SELECT 
            SANPHAMTONKHO.MASANPHAM,
            SANPHAMTONKHO.TENSANPHAM,
            SANPHAMTONKHO.PHOTO,
            SANPHAMTONKHO.SOLUONG,
            LOAISANPHAM.TENLOAI
        FROM 
            SANPHAMTONKHO
        INNER JOIN 
            LOAISANPHAM ON SANPHAMTONKHO.LOAISANPHAM = LOAISANPHAM.MALOAI`)
            res.render('kiem_tra_kho', { hangtonkho: hangtonkho });
        }
        catch (e) {
            next(e);
        }
    }
    // [GET] /:  
    bao_cao_doanh_thu(req, res) {
        res.render('bao_cao_doanh_thu')
    }
    // [GET] /:  
    chi_tieu_cac_mon(req, res) {
        res.render('chi_tieu_cac_mon')
    }
    // [GET] /:  
    logout(req, res) {
        req.session.destroy(err => {
            res.redirect('/');
        })
    }

}
module.exports = new SiteController;