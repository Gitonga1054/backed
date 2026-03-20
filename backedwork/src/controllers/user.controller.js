import { user } from "../models/user.model.js";
const registerUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        //basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "all fields are required!" })
        }
        // check if user exists already
        const existing = await user.findOne({ email: email.toLowerCase });
        if (existing) {
            return res.status(400).json({ message: " user already exists" })
        }
        //create user
        const newUser = await user.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });
        res.status(201).json({
            message: "user registered",
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
export {
    registerUser
}