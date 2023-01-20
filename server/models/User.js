import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 255,
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    dateRegistered: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("User", userSchema);