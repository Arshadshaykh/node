const jwt = require('jsonwebtoken');
const ErrorResponse = require("../helpers/errorResponse");
const user = require("../models/user");
const catchAsync = require("../helpers/asyncHandler");

const protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&(
        req.headers.authorization.startsWith("Bearer") || req.headers.authorization.startsWith("bearer")
)    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    // else{

    // }
    if (!token) {
        return next(new ErrorResponse("You are not authorized to access this",401))
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const User = await user.findById(decoded.id);
        if(!User){
            return next(new ErrorResponse("User not found",404))    
        }
        req.user = User;
        next();
    } catch (error) {
        return next( new ErrorResponse("You are not authorized to access this",401));
    }
});

const authorize=(...roles)=>{
    (res,req,next)=>{
        if (!roles.includes(req.user.role)) {
            return next( new ErrorResponse(`${req.user.role}s are not authorized to access this`,401));
        }
        
    }
}
module.exports = { protect }