import { format } from "date-fns";
import { verifyAccessToken } from "../middleware/auth";
import Categories from "../models/categories.model";
//create
export const createCat = async (req) => {
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
export const updateCat = async (req) => {
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
export const deleteCat = async (req) => {
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
    const category = await Categories.findById(id);
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
