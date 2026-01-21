import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../controllers/user.controllers.js";
import {addPost} from "../controllers/user.controllers.js";
import multer from "../middleware/multer.js";
import {getUserPosts} from "../controllers/user.controllers.js";
import {getThePostByID} from "../controllers/user.controllers.js";
import {updatePostByID} from "../controllers/user.controllers.js";
import {deletePostByID} from "../controllers/user.controllers.js";
import {getAllPosts} from "../controllers/user.controllers.js";

const userRoutes = express.Router();

userRoutes.get("/current", isAuth, getCurrentUser);
userRoutes.post("/addpost", isAuth,multer.single("postImage"),addPost);
userRoutes.get("/myposts", isAuth, getUserPosts);
userRoutes.get("/post/:id", isAuth ,getThePostByID);
userRoutes.put("/editpost/:id", isAuth, multer.single("postImage"), updatePostByID);
userRoutes.delete("/deletepost/:id", isAuth, deletePostByID);
userRoutes.get("/allposts", isAuth, getAllPosts);
userRoutes.get("/allposts/public", getAllPosts); // Public route to get all posts without authentication


export default userRoutes;