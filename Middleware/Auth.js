import { catchAsyncErrors } from "./CatchAsyncError.js";
import ErrorHandler from "./ErrorMiddleware.js";
import jwt from "jsonwebtoken"
import { User } from "../Models/UserSchema.js";

export const isAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const {Token} = req.cookies;

    if(!Token){
        return next(new ErrorHandler("User not authenticated.", 400));
    }
    const decoded = jwt.verify(Token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    if(!req.user){
        return next(new ErrorHandler("User not found.", 400));
    }

    next();

});

export const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler("Unauthorized access", 403));
        }
        next();
    };
};