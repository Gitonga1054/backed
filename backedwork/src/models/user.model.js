import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
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
            type: String,
            required: true,
            unique: true,
            minLength: 6,
            kMaxLength: 30,
            lowercase: true,
            trim: true
        },
        loggedIn: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true
    })
    // before saving any password we must hash it
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) returnext();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
//compare passwords
userSchema.methods.comparepassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}
export const user = mongoose.model("user", userSchema)