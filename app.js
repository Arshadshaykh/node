const http = require('http');

const bodyParser=require('body-parser')
const express = require('express');

const app = express();

// app.use('/', (req, res, next) => {
//     console.log('this will always run!')
//     next();
// });
app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="Product-name"><br><button type="submit">Add Product</button></form>');

});
app.use('/product',(req,res)=>{
    console.log(req.body)
    res.redirect('/')
});
app.use('/', (req, res, next) => {
    res.send('<h1>you are at the Root</h1>');

});

app.listen(3000);
