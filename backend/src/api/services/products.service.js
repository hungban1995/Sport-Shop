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
    let categories = [];
    if (req.body.category) {
      categories = req.body.category;
    }
    req.body.category = categories;
    if (req.fileValidationError) {
      return {
        error: {
          status: 400,
          error: "Upload file error",
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
    const { files } = req;
    if (files && files.length > 0) {
      const images = [];
      const dateTime = format(new Date(), "MM-yyyy");
      files.forEach((item) => {
        images.push(`uploads/${dateTime}/${item.filename}`);
      });
      req.body.images = images;
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
    if (req.fileValidationError) {
      return {
        error: {
          status: 400,
          error: "Upload file error",
        },
      };
    }
    const { files } = req;
    const images = [];
    if (files && files.length > 0) {
      const dateTime = format(new Date(), `MM-yyyy`);
      let image = "";
      files.forEach((item) => {
        image = `uploads/${dateTime}/${item.filename}`;
        images.push(image);
      });
      req.body.images = images;
    }
    return { productUpdate };
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
