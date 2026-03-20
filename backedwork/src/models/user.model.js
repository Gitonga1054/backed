import mongoose, { Schema } from "mongoose";
import { kMaxLength } from "node:buffer";
import { type } from "node:os";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 1,
        kMaxLength: 20

    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        kMaxLength: 30
    },
    email: {
        type: email,
        required: true,
        unique: true,
        minLength: 6,
        kMaxLength: 30,
        lowercase: true,
        trim: true
    }
}, {
    timestamps: true
})
export const user = mongoose.model("user", userSchema)