const express=require('express');
const router=express.Router();


router.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="Product-name"><br><button type="submit">Add Product</button></form>');

});
router.use('/product',(req,res)=>{
    console.log(req.body)
    res.redirect('/')
});

module.exports=router;