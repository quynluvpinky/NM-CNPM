const express = require('express');
// index.js này để set tất cả routes
const userRouter = require('./user/index')
const adminRouter = require('./admin/index')

function route(app) {
    // Routes for admin
    app.use('/admin', (req, res, next) => {
        // Thiết lập đường dẫn views riêng cho admin
        app.set("views", './views/admin'); 
        adminRouter(req, res, next);
    });

    // Routes for user
    app.use('/', (req, res, next) => {
        // Thiết lập đường dẫn views riêng cho user
        app.set("views", './views/user'); 
        userRouter(req, res, next);
    });
}
module.exports = route; 