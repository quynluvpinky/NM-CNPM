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
		}
		/*******************************************************************/

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
	} finally { 
		pgp.end(); 
	}	
}

// Gọi hàm chính
main();

module.exports = db;

