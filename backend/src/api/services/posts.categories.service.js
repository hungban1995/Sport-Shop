import { format } from "date-fns";
import { verifyAccessToken } from "../middleware/auth";
import CategoriesPosts from "../models/posts.categories.model";
//create
export const createCatPosts = async (req) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error)
      return {
        error: { status: 401, error: decode.error },
      };
    if (decode.role !== "admin") {
      return {
        error: {
          status: 403,
          error: "Bạn không có quyền thực hiện",
        },
      };
    }

    return { category: req.body };
  } catch (error) {
    return { error: error };
  }
};
//update
export const updateCatPosts = async (req) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error)
      return {
        error: { status: 401, error: decode.error },
      };
    if (decode.role !== "admin") {
      return {
        error: {
          status: 403,
          error: "Bạn không có quyền thực hiện",
        },
      };
    }

    return { categoryUpdate: req.body };
  } catch (error) {
    return { error: error };
  }
};
//delete
export const deleteCatPosts = async (req) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error)
      return {
        error: { status: 401, error: decode.error },
      };
    if (decode.role !== "admin") {
      return {
        error: {
          status: 403,
          error: "Bạn không có quyền thực hiện",
        },
      };
    }
    const { id } = req.params;
    const category = await CategoriesPosts.findById(id);
    if (!category) {
      return {
        error: {
          status: 404,
          error: "Category not found",
        },
      };
    }
    return { id };
  } catch (error) {
    return { error: error };
  }
};
