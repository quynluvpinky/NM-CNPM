const express = require("express");
require("dotenv").config();
//***************************************************//

// create express app
const app = express();

// middleware
const path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); // mọi yêu cầu tĩnh trong public được xử lý trước khi qua route khác

// view
const handlebars = require('express-handlebars');
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {
        eq: (a ,b) => a === b,
        sum: (a, b) => a + b,
        formatCurrency: a => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount * 1000)
    }
}))
app.set("view engine", "hbs");

const Handlebars = require('handlebars');
Handlebars.registerHelper('ifCon',(v1 ,v2) => {
    return 
})

// run route 
const route = require('./routes');  
route(app);  

// listen port
app.listen(process.env.PORT,async () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
}); 
 
