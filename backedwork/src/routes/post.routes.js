import { Router } from "express";
import {
    createpost,
    deletePost,
    getPosts,
    updatePost
} from "../controllers/post.controller.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Posts route working");
});
router.route("/create").post(createpost);
router.route("/getPosts").get(getPosts);
router.route("/update/:id").patch(updatePost);
router.route("/delete/:id").delete(deletePost);

export default router;