const express = require("express");
require("dotenv").config();
//***************************************************//

// create express app
const app = express();

// middleware
app.use(express.static('public')); // mọi yêu cầu tĩnh trong public được xử lý trước khi qua route khác 
app.use(express.urlencoded({ extended: true })); // nhận dữ liệu từ người dùng


// view
const handlebars = require('express-handlebars');
app.engine('hbs', handlebars.engine({extname: '.hbs'}))
app.set("view engine", "hbs");
app.set("views", './views');  

// run route
const route = require('./routes');
route(app);  

// listen port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
