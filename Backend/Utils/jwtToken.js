export const sendTokens = (user, statusCode, res, message) => {
    const token = user.getJWTTOKEN();
    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly: true,
        secure: true,
        sameSite: "None"
    };

    res.status(statusCode).cookie("Token", token, options).json({
        success: true,
        message: message,
        token: token,
        user,
    });
};
