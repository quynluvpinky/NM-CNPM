require('dotenv').config();
// mọi truy vấn đều lowercase
const pgp = require('pg-promise')({
	capSQL: true
})
// [db] Kết nối đến database của bạn
const db = pgp({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DB,
	user: process.env.DB_USER,
	password: process.env.DB_PW,
});

/* ************************************************************************************* */
// LƯU Ý: PHẢI CÓ postgres_db thì mới sử dụng được các hàm [postgres_db]
// [postgres_db] Kết nối đến postgres
const postgres_db = pgp({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: 'postgres',
	user: process.env.DB_USER,
	password: process.env.DB_PW,
});

// [postgres_db] Hàm tạo database
async function createDatabase(databaseName) {
	try {
		await postgres_db.none(`CREATE DATABASE ${databaseName}`);
		console.log(`Database ${databaseName} created successfully`);
	} catch (error) {
		console.error('Error creating database', error);
	}
}

// [postgres_db] Hàm kiểm tra sự tồn tại của database
async function checkDatabaseExists(databaseName) {
	try {
		// LƯU Ý: [databaseName] không được đổi thành chữ thường dù có (capSQL: true) -> lỗi
		const result = await postgres_db.oneOrNone('SELECT 1 FROM pg_database WHERE datname = $1', [databaseName]);
		return !!result;
	} catch (error) {
		console.error('Error checking database existence', error);
		return false;
	}
}
/* ************************************************************************************* */



// Hàm chính 
async function main() {
	// LƯU Ý: [databaseName] không được đổi thành chữ thường dù có (capSQL: true) -> lỗi
	// vì vậy DB_DB phải là lowercase
	const databaseName = process.env.DB_DB;

	try {
		// postgres_db
		/*******************************************************************/
		const databaseExists = await checkDatabaseExists(databaseName);

		// tạo database nếu chưa có 
		if (databaseExists) {
			console.log('Database already exists.');
		} else {
			await createDatabase(databaseName);
			// init database db
			const fs = require('fs');
			const path = require('path')
			const sqlFile = fs.readFileSync(path.join(__dirname, '..', 'data', 'QLCANTIN.sql'), 'utf8');
			try {
				// db
				await db.query(sqlFile);
				console.log('Database initialized successfully.');
			} catch (error) {
				console.error('Error initializing database:', error); 
			}
		}
		/*******************************************************************/

	} finally {
		// pgp.end(); 
	}
}

// Gọi hàm chính
main();

module.exports = {
    db: db,
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
	getDonHang: async () => {
		const rs = await db.manyOrNone('SELECT TENSANPHAM,PHOTO, CHITIETMUAHANG.SOLUONGSANPHAM, SUM(SOLUONGSANPHAM*GIACA) AS TONGTIEN FROM CHITIETMUAHANG INNER JOIN SANPHAMTONKHO ON CHITIETMUAHANG.MASANPHAM = SANPHAMTONKHO.MASANPHAM GROUP BY TENSANPHAM,CHITIETMUAHANG.SOLUONGSANPHAM,PHOTO');
		return rs;
	},
    getSanPhamTonKho: async() => {
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