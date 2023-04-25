import { format } from "date-fns";
import { verifyAccessToken } from "../middleware/auth";
import Products from "../models/products.model";
import Orders from "../models/orders.models";

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

//create
export const createRating = async (req) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) return { error: { status: 401, error: decode.error } };
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product) {
      return {
        error: {
          status: 404,
          error: "Product not found",
        },
      };
    }
    const user = decode._id;
    const { rating, comment, orderId } = req.body;

    const orderByUser = await Orders.findOne({
      $and: [{ user: user }, { status: "SUCCESS" }, { _id: orderId }],
    });
    if (!orderByUser) {
      return {
        error: {
          status: 404,
          error: "No order by user",
        },
      };
    }
    let found = false;
    for (let item of product.ratings) {
      if (item.orderId === orderByUser._id.toString()) {
        found = true;
      }
    }
    if (found) {
      return {
        error: {
          status: 404,
          error: "A successful order can only be commented once!",
        },
      };
    }
    product.ratings.push({ user, rating, comment, orderId });
    await product.save();
    return { product };
  } catch (error) {
    return { error: error };
  }
};
// //update rating
// export const updateRating = async (req, res, next) => {
//   try {
//     const decode = await verifyAccessToken(req);
//     if (decode.error) return { error: { status: 401, error: decode.error } };
//     const { id } = req.params;
//     const { rating, comment } = req.body;

//     const updatedProduct = await Products.findByIdAndUpdate(
//       id,
//       { $push: { ratings: { rating, comment } } },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return {error:{
//         status: 404,
//         error: "Product not found",
//       }};
//     }

//  return {}
//   } catch (error) {
//     return { error: error };

//   }
// };
