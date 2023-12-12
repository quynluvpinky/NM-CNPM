const express = require('express');
// index.js này để set tất cả routes
const siteRouter = require('./site')

function route(app) {
    app.use('/', siteRouter);
}
module.exports = route;