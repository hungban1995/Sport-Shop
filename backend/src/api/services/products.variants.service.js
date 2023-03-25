import { format } from "date-fns";
import { verifyAccessToken } from "../middleware/auth";

//create
export const createProductVariant = async (req) => {
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

    if (req.fileValidationError) {
      return {
        error: {
          status: 400,
          error: "Upload file error",
        },
      };
    }
    const { files } = req;
    let image = "";
    if (files?.length > 0) {
      const dateTime = format(new Date(), `MM-yyyy`);
      image = `uploads/${dateTime}/${files[0].filename}`;
      req.body.image = image;
    }

    let attributes = [];
    if (req.body.attributes) {
      attributes = JSON.parse(req.body.attributes);
    }
    req.body.attributes = attributes;
    return { productVariants: req.body };
  } catch (error) {
    return { error: error };
  }
};
//update
export const updateProductVariant = async (req) => {
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
    if (req.fileValidationError) {
      return {
        error: {
          status: 400,
          error: "Upload file error",
        },
      };
    }
    const { files } = req;
    let image = "";
    if (files?.length > 0) {
      const dateTime = format(new Date(), `MM-yyyy`);
      image = `uploads/${dateTime}/${files[0].filename}`;
      req.body.image = image;
    }
    let attributes = [];
    if (req.body.attributes) {
      attributes = JSON.parse(req.body.attributes);
    }
    req.body.attributes = attributes;
    return { variantUpdate: req.body };
  } catch (error) {
    return { error: error };
  }
};

//delete
export const deleteProductVariant = async (req, res, next) => {
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
