const db = require('../../utilities/db')
const donhangM = require('../../models/donhangM')
const foodM = require('../../models/Food')
const productM = require('../../models/Product');

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
    async xac_nhan_don_hang(req, res, next) {
        try {
            const id = req.body.orderid;
            const rs = await donhangM.KiemTraSoLuong(id);
            console.log(rs);
            if (rs != 1) {
                console.log(rs);
                res.status(501).json({ error: rs })
            }
            else {
                await donhangM.XacNhanDonHang(id);
                res.status(200).send('Status: OK');
            }
        }
        catch (e) {
            next(e);
        }
    }
    async huy_don_hang(req, res, next) {
        try {
            const id = req.body.orderid;
            donhangM.HuyDonHang(id);
            res.status(200).send('Status: OK');

        }
        catch (e) {
            next(e)
        }
    }

    ////////////////////NHAP XUAT HANG /////////////////////  
    async nhap_xuat_hang(req, res, next) {
        try {
            res.render('nhap_xuat_hang')
        }
        catch (e) {
            next(e)
        }
    }

    /////////////// KIEM TRA KHO /////////////////////////////
    async kiem_tra_kho(req, res, next) {
        try {
            // const foods = await foodM.getAll();
            const products = await productM.getAll();
            // const items = foods.concat(products);
            res.render('kiem_tra_kho', { items: products });
        }
        catch (e) {
            next(e);
        }
    }
    async cap_nhap_kho(req, res) {
        try {
            const data = req.body.data;
            var check = 1;
            var falseName;
            var curQuantity = 0;
            for (let i =0;i<data.length;i++) {
                curQuantity = await db.one(`
                SELECT quantity FROM product
                WHERE name = '${data[i].name}'
                `)
                let sum = parseInt(curQuantity.quantity) + parseInt(data[i].value);
                if (sum < 0) {
                    check = 0;
                    falseName = data[i].name;
                    break;
                }
            }
            if (check) {
                data.forEach(element => {
                    db.none(`
                    UPDATE "product" 
                    SET quantity = quantity + ${element.value}
                    WHERE name = '${element.name}';
                    `)
                });
                res.status(200).send("Status: OK");
            }
            else {
                res.status(500).json({ error: falseName });
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }
    async them_hang_moi(req, res, next) {
        res.render('them_hang_moi');
    }
    async cap_nhap_hang_moi(req, res) {
        try {
            const data = req.body.data;
            await productM.insert(data);
            res.status(200).send("Status: OK");
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    async xoa_mat_hang(req, res) {
        try {
            const name = req.body.data;
            const rs = await productM.delete(name);
            if (rs) {
                res.status(200).send("Status: OK");
            }
            else {
                throw new Error("Chưa có dòng nào được thay đổi");
            }
        }
        catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    // [GET] /:  
    bao_cao_doanh_thu(req, res) {
        res.render('bao_cao_doanh_thu')
    }
    // [GET] /:  
    async chi_tieu_cac_mon(req, res, next) {
        try {
            const foods = await foodM.getAll();
            res.render('chi_tieu_cac_mon', { items: foods })
        }
        catch (e) {
            next(e);
        }
    }
    async cap_nhap_chi_tieu(req, res) {
        try {
            const data = req.body.data;
            await foodM.updateQuantity(data);
            res.status(200).send('Status: OK');
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // [GET] /:  
    logout(req, res) {
        req.session.destroy(err => {
            res.redirect('/');
        })
    }

}
module.exports = new SiteController;