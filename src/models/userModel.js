import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Provide Username"],
        unique: true,
    },
    email: {
        type: String,
        require: [true, "Provide email"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "Provide Password"],
        unique: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyTokenExpiry: Date,
});



const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;