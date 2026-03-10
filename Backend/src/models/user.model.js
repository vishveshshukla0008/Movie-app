const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
        trim: true,
        minlength: [3, "Fullname must be at least 3 characters"]
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Email is required"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false
    },
}, {
    timestamps: true
})

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true })


const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;