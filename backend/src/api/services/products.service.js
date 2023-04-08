import { format } from "date-fns";
import { verifyAccessToken } from "../middleware/auth";

//create
export const createProduct = async (req) => {
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

    const { title } = req.body;
    if (!title) {
      return {
        error: {
          status: 400,
          error: "Title can not empty",
        },
      };
    }
    if (!req.body.variants || req.body.variants.length === 0) {
      return {
        error: {
          status: 400,
          error: "Variants can not be empty",
        },
      };
    }
    return { product: req.body };
  } catch (error) {
    return { error: error };
  }
};
//update
export const updateProduct = async (req, res, next) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) return { error: { status: 401, error: decode.error } };
    if (decode.role !== "admin") {
      return next({
        status: 403,
        error: "You do not permission to update product",
      });
    }
    return { productUpdate: req.body };
  } catch (error) {
    return { error: error };
  }
};

//delete
export const deleteProduct = async (req) => {
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
