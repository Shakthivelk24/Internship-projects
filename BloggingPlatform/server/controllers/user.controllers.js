import User from "../models/user.models.js";
import Post from "../models/post.models.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId; 
    const user = await User.findById(userId).select("-password"); 
    if (!user) {
      return res.status(404).json({ message: "User not found" }); 
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    let postImage = "";

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path); // Upload file to Cloudinary
      postImage = result.secure_url; // Get the secure URL of the uploaded image
    }

    const post = new Post({
      title,
      content,
      postImage,
      ownerId: req.userId,
      ownerName: req.userName
    });
    await post.save();
    return res.status(201).json(post);
  } catch (err) {
    console.log("ERR:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.userId;
    const posts = await Post.find({ ownerId: userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  } 
};

export const getThePostByID = async (req,res) =>{
  try {
    const postId =  req.params.id;
    const post = await Post.findById(postId);
    if(!post){
      return res.status(404).json({message: "Post not found"});
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const updatePostByID = async (req,res) =>{
  try {
    const {title,content} = req.body;

    let postImage = "";
    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path); // Upload file to Cloudinary
      postImage = result.secure_url; // Get the secure URL of the uploaded image
    }
    const UpdatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, postImage},
      { new: true }
    )
    if(!UpdatedPost){
      return res.status(404).json({message: "Post not found"});
    }
    res.status(200).json(UpdatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const deletePostByID = async (req,res) =>{
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if(!deletedPost){
      return res.status(404).json({message: "Post not found"});
    }
    res.status(200).json({message: "Post deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const getAllPosts = async (req, res) => {
  try {
    let query = {};

    // If user is logged in, exclude his own posts
    if (req.userId) {
       query = { ownerId: { $ne: new mongoose.Types.ObjectId(req.userId) } };
    }

    const posts = await Post.find(query).sort({ createdAt: -1 }); // Sort by newest first

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
