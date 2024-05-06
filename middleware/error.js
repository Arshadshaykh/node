const ErrorResponse = require("../helpers/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error={...err}

    console.log(err);

    // mongose bad object ID with wrong format  
    if (err.name==='CastError') {
        const message=`Resource not found with the ID of ${err.value}`;
        error = new ErrorResponse(message,404);
    }
    // mongose bad object ID with rightFormat format  
    else if(err.name==='Error'){
        const message=err.message;
        error = new ErrorResponse(message,404);
    }

    // mongose duplicate key  
    if (err.code===11000) {
        const message='Duplicate field entered'
        error = new ErrorResponse(message,400)
    }
    res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error' });
}

module.exports = errorHandler;