import { verifyAccessToken } from "../middleware/auth";
import postComment from "../models/post.comment.model";
import Posts from "../models/posts.model";

//create
export const createCmt = async (req, res, next) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      return next(decode);
    }
    const postId = req.query.post;
    const post = await Posts.findById(postId);
    if (!post) {
      return next({
        status: 404,
        error: "Post no found",
      });
    }
    const newCmt = await postComment.create({
      user: decode._id,
      post: req.query.post,
      content: req.body.content,
    });
    const currentCmt = post.comment;
    const arrCmt = [...currentCmt, newCmt._id.toString()];
    await Posts.findByIdAndUpdate(postId, { comment: arrCmt });
    await newCmt.populate({ path: "user", select: "username avatar" });
    res.status(200).json({
      success: "Create new comment success",
      comment: {
        user: newCmt.user,
        content: req.body.content,
      },
    });
  } catch (error) {
    next(error);
  }
};
// get by post
export const getByPost = async (req, res, next) => {
  try {
    const postId = req.query.post;
    const post = await Posts.findById(postId);
    if (!post) {
      return next({
        status: 404,
        error: "Post not found",
      });
    }
    const comments = await postComment
      .find({ post: postId }, { post: 0 })
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "username avatar" });
    if (comments.length === 0) {
      return next({
        status: 404,
        error: "No comments found",
      });
    }
    res.status(200).json({
      success: "Get comments success",
      comments,
    });
  } catch (error) {
    next(error);
  }
};
//update
export const updateCmt = async (req, res, next) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      return next(decode);
    }
    const { id } = req.params;
    const comment = await postComment.findById(id);
    if (!comment) {
      return next({
        status: 404,
        error: "Comment not found",
      });
    }
    if (decode._id.toString() !== comment.user && decode.role !== "admin") {
      return next({
        status: 403,
        error: "You do not permission to update post comment",
      });
    }
    await postComment.findByIdAndUpdate(
      id,
      { content: req.body.content },
      { new: true }
    );
    res.status(200).json({
      success: "Update post comment success",
    });
  } catch (error) {
    next(error);
  }
};
//delete
export const deleteCmt = async (req, res, next) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      return next(decode);
    }
    const { id } = req.params;
    const postId = req.query.post;
    const comment = await postComment.findById(id);
    if (!comment) {
      return next({ status: 404, error: "Comment not found" });
    }
    const post = await Posts.findById(postId);
    if (!post) {
      return next({ status: 404, error: "Post not found" });
    }
    if (decode._id.toString() !== comment.user && decode.role !== "admin") {
      return next({
        status: 403,
        error: "You do not permission to delete post comment",
      });
    }
    const arrCmt = post.comment.filter((item) => item !== id);
    await Posts.findByIdAndUpdate(postId, { comment: arrCmt }, { new: true });
    await postComment.findByIdAndDelete(id);
    res.status(200).json({
      success: "Delete post comment success",
    });
  } catch (error) {
    next(error);
  }
};
