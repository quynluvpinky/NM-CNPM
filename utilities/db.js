require('dotenv').config();

// tạo đối tượng kết nối tới database có sẵn
const pgp = require('pg-promise')();
const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
});

// Đọc file .sql
const fs = require('fs');
const path = require('path')
const sqlFile = fs.readFileSync(path.join(__dirname, '..', 'data', 'QLCANTIN.sql'), 'utf8');

// Tạo database

db.query(sqlFile)
    .then(data => {
        console.log('Database initialized successfully.'); 
    })
    .catch(error => {
        console.error(`Error: `, error);
    });

module.exports = db;             