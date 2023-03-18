import mongoose from "mongoose";
const PostsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    category: { type: Array, ref: "categoriesPost" },
    images: { type: Array, default: [] },
    author: { type: String, ref: "users" },
    comment: { type: Array, default: [], ref: "postComment" },
  },
  { timestamps: true }
);
const Posts = mongoose.models.posts || mongoose.model("posts", PostsSchema);

export default Posts;
