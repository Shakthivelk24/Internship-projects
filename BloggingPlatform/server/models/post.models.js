import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title:{ type: String, required: true,  min: [5, "Age must be at least 5"],
    max: [100, "Age must be below 100"]},
    content: { type: String , required: true, min: [10, "Content must be at least 10 characters"],
    max: [500, "Content must be below 500 characters"]},
    postImage:{type:String , required:true},
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    ownerName:{type:String, required:true}
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
