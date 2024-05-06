const jwt = require('jsonwebtoken')
const User = require('../models/user')
const catchAsync = require('../helpers/asyncHandler')
const ErrorResponse = require('../helpers/errorResponse')



const signUp = catchAsync(async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body;
    const user = await User.create({ name, email, password });
    const token = user.getSignedJwtToken();
    res.status(200).json({ "success": true, token });
});


const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    // validate Email and password
    if (!email || !password) {
        return next(new ErrorResponse('please provide email and password', 400));
    }
    // check for user
    const user =await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorResponse('Invalid credential', 401));
    };
    // check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse('No match found', 401));
    }
    // create token
    const token = user.getSignedJwtToken();

    res.status(200).json({ "success": true, token });
});

const getLogedInUser=catchAsync( async(req,res)=>{
    let token;
    if (
        req.headers.authorization &&(
        req.headers.authorization.startsWith("Bearer") || req.headers.authorization.startsWith("bearer")
)    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new ErrorResponse("You are not authorized to access this",401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    res.status(200).json({ "success": true,data:req.user})
})

module.exports = {
    signUp, login,getLogedInUser
}