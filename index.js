const express = require("express");
require("dotenv").config();
const db = require('./utilities/db')
//***************************************************//

// create express app
const app = express();

//create database
db.createDatabase();

// middleware
const path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); // mọi yêu cầu tĩnh trong public được xử lý trước khi qua route khác

// view
const handlebars = require('express-handlebars');
app.engine('hbs', handlebars.engine({extname: '.hbs'}))
app.set("view engine", "hbs");

// run route 
const route = require('./routes');  
route(app);  

// listen port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
}); 
 