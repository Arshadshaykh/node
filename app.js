const http = require('http');

const bodyParser=require('body-parser')
const express = require('express');

const app = express();
const adminRoutes = require('./routes/admin');

// app.use('/', (req, res, next) => {
//     console.log('this will always run!')
//     next();
// });
app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRoutes);
app.use('/', (req, res, next) => {
    res.send('<h1>you are at the Root</h1>');

});

app.listen(3000);
