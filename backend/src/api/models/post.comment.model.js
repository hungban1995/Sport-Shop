import mongoose from "mongoose";
const postCommentSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "users" },
    post: { type: String },
    content: { type: String },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const postComment =
  mongoose.models.postComment ||
  mongoose.model("postComment", postCommentSchema);
export default postComment;
