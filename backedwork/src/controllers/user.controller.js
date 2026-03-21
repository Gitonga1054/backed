import { user } from "../models/user.model.js";
import bcrypt from "bcrypt"
//registering user
const registerUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        //basic validation
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "all fields are required!"
            })
        }
        // check if user exists already
        const existing = await user.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: " user already exists" })
        }
        //hashed password 
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const newUser = await user.create({
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
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
//login a user
export const loginUser = async(req, res) => {
        try {
            console.log("LOGIN BODY:", req.body);

            //checking if the user already exists
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password required"
                });
            }

            const foundUser = await user.findOne({
                email: email.toLowerCase()

            });
            if (!foundUser)
                return res.status(400).json({
                    message: "user not found"
                });
            //to compare passwords
            const isMatch = await bcrypt.compare(password, foundUser.password);
            if (!isMatch)
                return res.status(401).json({
                    message: "invalid credentials"
                })

            foundUser.loggedIn = true;
            await foundUser.save();


            res.status(200).json({
                message: "user logged in",
                user: {
                    id: foundUser._id,
                    email: foundUser.email,
                    username: foundUser.username
                }
            })

        } catch (error) {
            res.status(500).json({
                message: "internal server error",
                error: error.message
            });
        }
    }
    //logout user
const logoutUser = async(req, res) => {
    try {
        const { email } = req.body;

        const findUser = await user.findOne({
            email
        });
        if (!findUser) {
            return res.status(404).json({
                message: "user not found"
            });
        }
        findUser.loggedIn = false;
        await findUser.save();
        res.status(200).json({
            message: "logout successfull"
        });


    } catch (error) {
        res.status(500).json({
            message: "internall server error"
        });
    }
}
export {
    registerUser,
    logoutUser
}