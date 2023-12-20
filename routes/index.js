const express = require('express');
const router = express.Router();
// index.js này để set tất cả routes
const userRouter = require('./user')
const adminRouter = require('./admin')
const dataRouter = require('./data')
function route(app) {
    // Routes for admin
    router.use('/admin', (req, res, next)=>{
        if(!req.isAuthenticated()){
            return res.redirect('/forbidden');
        }
        next();
    },(req, res, next) => {
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
    
    router.use('/data', (req, res, next) => { 
        dataRouter(req,res, next);
    })
    app.use(router);
}
module.exports = route; 