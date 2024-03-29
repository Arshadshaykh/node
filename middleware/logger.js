// logs the request in the console
const logger=(req,res,next)=>{
    console.log(`${req.method} ${req.originalUrl}`);
    next();
}
module.exports=logger;