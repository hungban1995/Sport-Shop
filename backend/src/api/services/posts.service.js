import { format } from "date-fns";
import { verifyAccessToken } from "../middleware/auth";

//create
export const createPost = async (req) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) return { error: { status: 401, error: decode.error } };
    if (decode.role !== "admin") {
      return {
        error: {
          status: 403,
          error: "Bạn không có quyền thực hiện",
        },
      };
    }
    req.body.author = decode._id;
    let categories = [];
    if (req.body.category) {
      categories = req.body.category;
    }
    req.body.category = categories;
    const { title } = req.body;
    if (!title) {
      return {
        error: {
          status: 400,
          error: "Title can not empty",
        },
      };
    }
    return { post: req.body };
  } catch (error) {
    return { error: error };
  }
};
//update
export const updatePost = async (req) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) return { error: { status: 401, error: decode.error } };
    if (decode.role !== "admin") {
      return {
        error: {
          status: 403,
          error: "Bạn không có quyền thực hiện",
        },
      };
    }

    let categories = [];
    if (req.body.category) {
      categories = req.body.category;
    }
    req.body.category = categories;
    const { title } = req.body;
    if (!title) {
      return {
        error: {
          status: 400,
          error: "Title can not empty",
        },
      };
    }
    return { postUpdate: req.body };
  } catch (error) {
    return { error: error };
  }
};
//delete
export const deletePost = async (req) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) return { error: { status: 401, error: decode.error } };
    if (decode.role !== "admin") {
      return {
        error: {
          status: 403,
          error: "Bạn không có quyền thực hiện",
        },
      };
    }
    return {};
  } catch (error) {
    return { error: error };
  }
};
