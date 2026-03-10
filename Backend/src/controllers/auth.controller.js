const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const asyncWrapper = require("../utils/asyncWrapper");
const AppError = require("../utils/AppError");
const { redis } = require("../config/cache");


/***
 * @route post /api/auth/register
 * @description A Register Controller that register a new user on server and stores the data on mongoDB users collection.
 * @access  Public
 */

const registerNewUserController = asyncWrapper(async (req, res, next) => {
    let { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        throw new AppError("Missing credentials", 400);
    }

    fullname = fullname.trim();
    email = email.toLowerCase().trim();
    password = password.trim();

    if (password.length < 8) {
        throw new AppError("Password must be at least 8 characters long", 400);
    }

    const existingUser = await userModel.findOne({
        $or: [{ email }],
    });

    if (existingUser) {
        throw new AppError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    let newUser;

    try {
        newUser = await userModel.create({
            email,
            fullname,
            password: hashedPassword,
        });
    } catch (err) {
        if (err.code === 11000) {
            throw new AppError("User already exists", 409);
        }
        throw err;
    }

    const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" },
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    const user = newUser.toObject();
    delete user.password;

    return res.status(201).json({
        success: true,
        message: "Registration successful",
        user,
    });
});



/***
 * @route POST /api/auth/login
 * @description A Login controller that login the existing user and provide a token string in cookies .
 * @access  Public
 */

const loginUserController = asyncWrapper(async (req, res) => {
    let { email, password } = req.body;

    if ((!email) || (!password)) {
        throw new AppError("Invalid credentials", 401);
    }

    let user = await userModel.findOne({ email }).select("+password");

    if (!user) throw new AppError("Invalid credentials", 401);

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) throw new AppError("Invalid Credentials !", 401);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

    user = user.toObject();
    delete user.password;



    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({ success: true, message: "Logged In", user })
});


/***
 * @route GET /api/auth/getme
 * @description A get me controller that verfies the loggedin user and returns the user object.
 * @access  Private
 */

const getMeController = asyncWrapper(async (req, res) => {

    const user = await userModel.findById(req.user._id);

    if (!user) throw new AppError("Unauthorized user", 401);

    return res.status(200).json({ success: true, message: "User Fetched Success", user });
})



/***
 * @route get /api/auth/logout
 * @description A logout controller that logout the user, remove the current token from cookies and add the token in redis as key and current time as value :
 * @access  Public
 */

const logoutUserController = asyncWrapper(async (req, res) => {
    const token = req.cookies.token;

    res.clearCookie("token");

    await redis.set(token, Date.now().toString());

    return res.status(200).json({ success: true, message: "Logout Successfully !" });
})


module.exports = { registerNewUserController, loginUserController, getMeController, logoutUserController };
