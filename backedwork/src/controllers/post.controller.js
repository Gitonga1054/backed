import {
    post
} from "../models/post.model.js";

//create a post
const createpost = async(req, res) => {
        try {
            const { name, description, age } = req.body;

            if (!name || !description || !age) {
                return res.status(400).json({
                    message: "all fields are required"
                });
            }
            const newPost = await post.create({ name, description, age });
            res.status(201).json({
                message: "post created successfully",
                post: newPost
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "internal server error",
                error: error.message
            });
        }
    }
    //read all post
const getPosts = async(req, res) => {
        try {

            const posts = await post.find();
            res.status(201).json({
                message: "post created successfully",
                posts
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "internal server error",
                error: error.message
            });
        }
    }
    //update post
const updatePost = async(req, res) => {
        try {
            const { id } = req.params;
            //basic validation to check if body is empty
            if (Object.keys(req.body).length === 0) {
                return res.status(400).json({
                    message: "no data provided for updte"
                });
            }

            const updatedPost = await post.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedPost) {
                return res.status(404).json({
                    message: "post not found"
                });
            }
            res.status(200).json({
                message: "post updated successfully",
                post: updatedPost
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "internal server error",
                error: error.message
            });
        }
    }
    //deleting a post
const deletePost = async(req, res) => {
    try {

        const deleted = await post.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res, status(404).json({
                message: "post not found "
            });
        }
        res.status(201).json({
            message: "post deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
}

export {
    createpost,
    getPosts,
    updatePost,
    deletePost
}