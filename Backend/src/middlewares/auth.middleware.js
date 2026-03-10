const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const AppError = require("../utils/AppError");
const asyncWrapper = require("../utils/asyncWrapper");
const { redis } = require("../config/cache.js");

const authUser = asyncWrapper(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) throw new AppError("Unauthorized Accsess", 401);

    const isTokenBlacklisted = await redis.get(token);

    if (isTokenBlacklisted) throw new AppError("Token expired", 401);
    
    
    let userDetails;

    try {
        userDetails = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new AppError("Unauthorized Access", 401);
    }

    const user = await userModel.findById(userDetails.userId);

    if (!user) throw new AppError("Unauthorized Accsess", 401);


    req.user = user;
    next();
})

module.exports = { authUser }