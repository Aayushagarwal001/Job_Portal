class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        // this.name = 'ErrorHandler';
    }
}


export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error.";

    if(err.name === "CastError"){                    // Like we want user name in string format but user write in something else
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400)
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValues)} Entered.`;
        err = new ErrorHandler(message, 400)
    }

    if(err.name === "jsonWebTokenError"){                    
        const message = `Json Web Token is invalid. Please Try Again...`;
        err = new ErrorHandler(message, 400)
    }    
    
    if(err.name === "TokenExpiredError"){                    
        const message = `Json Web Token is expired. Please Try Again...`;
        err = new ErrorHandler(message, 400)
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}

export default ErrorHandler 