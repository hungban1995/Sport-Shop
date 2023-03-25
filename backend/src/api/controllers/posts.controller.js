import * as service from "../services/posts.service";
import Posts from "../models/posts.model";
//create
export const createPost = async (req, res, next) => {
  try {
    const { post, error } = await service.createPost(req);
    if (error) {
      return next(error);
    }
    await Posts.create(post);
    res.status(200).json({ success: "Tạo mới thành công" });
  } catch (error) {
    next(error);
  }
};
//get all
export const getAll = async (req, res, next) => {
  try {
    const { page, page_size, sort_by, filter_by } = req.query;
    let filter = "";
    if (filter_by) {
      filter = JSON.parse(filter_by);
    }
    console.log(sort_by);
    const posts = await Posts.find({ ...filter })
      .populate({ path: "category", select: "title" })
      .populate({ path: "author", select: "username avatar" })
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort(sort_by);

    if (posts.length === 0) {
      return next({ status: 404, error: "No post found" });
    }
    let count = await Posts.find({ ...filter }).count();
    res.status(200).json({
      success: "Get post success",
      posts,
      count,
    });
  } catch (error) {
    next(error);
  }
};
//getById
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id, { __v: 0 })
      .populate({ path: "category", select: "title" })
      .populate({ path: "author", select: "username avatar" });
    if (!post) {
      return next({ status: 404, error: "No post found" });
    }
    res.status(200).json({ success: "Get post success", post: post });
  } catch (error) {
    next(error);
  }
};
//update
export const updatePost = async (req, res, next) => {
  try {
    const { error, postUpdate } = await service.updatePost(req);
    if (error) {
      return next(error);
    }
    const { id } = req.params;
    const post = await Posts.findById(id);
    if (!post) {
      return next({
        status: 404,
        error: "Post not found",
      });
    }
    await Posts.findByIdAndUpdate(id, postUpdate, { new: true });
    res.status(200).json({
      success: "Update post success",
    });
  } catch (error) {
    next(error);
  }
};
//delete
export const deletePost = async (req, res, next) => {
  try {
    const { error } = await service.deletePost(req);
    if (error) {
      return next(error);
    }
    const { id } = req.params;
    const post = await Posts.findById(id);
    if (!post) {
      return next({
        status: 404,
        error: "Post not found",
      });
    }
    await Posts.findByIdAndDelete(id);
    res.status(200).json({
      success: "Delete post success",
    });
  } catch (error) {
    next(error);
  }
};
