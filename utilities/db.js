require('dotenv').config();
const myDB = process.env.myDB;     //db21538
const pgp = require('pg-promise')({
    capSQL: true
});
const {QueryFile} = require('pg-promise');
const path = require('path');
const { create } = require('domain');

//Tạo một kết nối tạm thời đến database postgres để tạo database mới 'db21538'
const tempCN = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PW
}
const tempDB = pgp(tempCN);

// Kết nối đến database 'db21538' sau khi tạo xong
const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.myDB,
    user: process.env.DB_USER,
    password: process.env.DB_PW
}
const db = pgp(cn);

module.exports = {
	createDatabase: async () => {
        await tempDB.oneOrNone('SELECT 1 FROM pg_database WHERE datname = $1', [myDB])
            .then(result => {
                if (result) {
                    throw new Error(`Database '${myDB}' already exists`)
                } else {
                    // Nếu database chưa tồn tại, tạo nó
                    return tempDB.none('CREATE DATABASE $1:name', [myDB]);
                }
            })
            .then(() => {
                console.log(`Database '${myDB}' created successfully.`);
                const queryFile = new QueryFile(path.join(__dirname,'QLCANTIN.sql'),{minify: true});
                db.task(async t => {
                    await t.none(queryFile);
                })
            })
            .catch((e) => {
                console.log("database already exist");
            })
    },
    db: db,
	getDonHang: async () => {
		const rs = await db.manyOrNone('SELECT TENSANPHAM, CHITIETMUAHANG.SOLUONGSANPHAM, SUM(SOLUONGSANPHAM*GIACA) AS TONGTIEN FROM CHITIETMUAHANG INNER JOIN SANPHAMTONKHO ON CHITIETMUAHANG.MASANPHAM = SANPHAMTONKHO.MASANPHAM GROUP BY TENSANPHAM,CHITIETMUAHANG.SOLUONGSANPHAM');
		console.log(rs);
		return rs;
	}
}

