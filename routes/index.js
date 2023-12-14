const express = require('express');
const router = express.Router();
// index.js này để set tất cả routes
const userRouter = require('./user/index')
const adminRouter = require('./admin/index')

function route(app) {
    // Routes for admin
    router.use('/admin', (req, res, next) => {
        // Thiết lập đường dẫn views riêng cho admin
        app.set("views", './views/admin'); 
        adminRouter(req, res, next);
    });

    // Routes for user
    router.use('/', (req, res, next) => {
        // Thiết lập đường dẫn views riêng cho user
        app.set("views", './views/user'); 
        userRouter(req, res, next);
    });
    app.use(router);
}
module.exports = route; 