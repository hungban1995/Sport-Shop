import { payment, status } from "../constants";
import { verifyAccessToken } from "../middleware/auth";
import Orders from "../models/orders.models";
import ProductsVariants from "../models/products.variants.model";
//create
export const createOrder = async (req) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error && decode.error !== "Please login") {
      return { error: { status: 400, error: decode.error } };
    }
    if (decode._id) {
      req.body.user = decode._id.toString();
    }
    const { orderDetail } = req.body;
    let item;
    let total = 0;
    for (item of orderDetail) {
      const variant = await ProductsVariants.findById(item.productVariant);
      if (!variant) {
        return {
          error: {
            status: 400,
            error: `Product with variant was deleted or does not exist`,
          },
        };
      }
      if (variant.inStock === 0) {
        return {
          error: {
            status: 400,
            error: `Product with variant is out stock`,
          },
        };
      }
      if (parseInt(item.quantity) > variant.inStock) {
        return {
          error: {
            status: 400,
            error: `Product with variant is is not enough`,
          },
        };
      }
      total += (variant.onSale || variant.price) * item.quantity;
    }
    req.body.totalPrice = total;
    return { order: req.body };
  } catch (error) {
    return { error: error };
  }
};
//get all
export const getAll = async (req) => {
  try {
    const decode = await verifyAccessToken(req);

    if (decode.error) {
      return { error: { status: 401, error: decode.error } };
    }
    if (decode.role !== "admin") {
      return {
        error: {
          status: 403,
          error: "You do not have permission to view the order list",
        },
      };
    }
    return {};
  } catch (error) {
    return { error: error };
  }
};
//get-id
export const getById = async (req) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      return { error: { status: 401, error: decode.error } };
    }
    const { id } = req.params;
    const order = await Orders.findById(id, {
      __v: 0,
    })
      .populate({
        path: "orderDetail.productVariant",
        select: "-__v -updatedAt -createdAt -inStock -sold",
      })
      .populate({
        path: "user",
        select: "username",
      })
      .populate({
        path: "orderDetail.product",
        select: "title",
      });
    if (!order) {
      return { error: { status: 404, error: "Not have a order" } };
    }
    if (
      order.user &&
      decode.role !== "admin" &&
      decode._id.toString() !== order.user
    ) {
      return {
        error: {
          status: 403,
          error: "You do not have permission to view this order",
        },
      };
    }
    if (!order.user && decode.role !== "admin") {
      return {
        error: {
          status: 403,
          error: "You do not have permission to view this order",
        },
      };
    }
    return { order };
  } catch (error) {
    return { error: error };
  }
};
//update
export const updateOrder = async (req) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      return { error: { status: 401, error: decode.error } };
    }
    const { id } = req.params;
    const valueUpdate = req.body;
    const order = await Orders.findById(id);
    if (!order) {
      return { error: { status: 404, error: "Order not found" } };
    }
    if (
      order.user &&
      decode.role !== "admin" &&
      decode._id.toString() !== order.user
    ) {
      return {
        error: {
          status: 403,
          error: "You do not have permission to update this order",
        },
      };
    }
    if (!order.user && decode.role !== "admin") {
      return {
        error: {
          status: 403,
          error: "You do not have permission to update this order",
        },
      };
    }
    if (decode.role !== "admin" && order.status !== "WAITING") {
      return {
        error: {
          status: 403,
          error: `Order is ${order.status} and can't be updated`,
        },
      };
    }

    if (valueUpdate.user && valueUpdate.user !== order.user) {
      return {
        error: {
          status: 403,
          error: "Can't change user",
        },
      };
    }
    if (order.status === "CANCEL" || order.status === "SUCCESS")
      return {
        error: {
          status: 403,
          error: `Order has been ${order.status} and can't be updated`,
        },
      };
    if (valueUpdate.status) {
      const is_match = status.includes(valueUpdate.status);
      if (!is_match)
        return {
          error: {
            status: 404,
            error: `Status type: ${valueUpdate.status} is invalid!`,
          },
        };
    }

    if (decode.role !== "admin" && valueUpdate.status !== "CANCEL") {
      return {
        error: {
          status: 403,
          error: `You do not have permission to update to ${valueUpdate.status}`,
        },
      };
    }
    /// Wating    shiping   success    cancel
    //     1         -1     0          +1
    //      1        0         0         0
    if (order.status === "WAITING" && valueUpdate.status === "SHIPPING") {
      let item;
      let newInStock = 0;
      for (item of order.orderDetail) {
        const updateVariant = await ProductsVariants.findById(
          item.productVariant
        );
        newInStock = updateVariant.inStock - item.quantity;
        await ProductsVariants.findByIdAndUpdate(item.productVariant, {
          inStock: newInStock,
        });
      }
    }
    if (
      (order.status === "SHIPPING" && valueUpdate.status === "CANCEL") ||
      valueUpdate.status === "WAITING"
    ) {
      let item;
      let newInStock = 0;
      for (item of order.orderDetail) {
        const updateVariant = await ProductsVariants.findById(
          item.productVariant
        );
        newInStock = updateVariant.inStock + item.quantity;
        await ProductsVariants.findByIdAndUpdate(item.productVariant, {
          inStock: newInStock,
        });
      }
    }
    if (valueUpdate.status === "SUCCESS") {
      let item;
      let newSold = 0;
      for (item of order.orderDetail) {
        const updateVariant = await ProductsVariants.findById(
          item.productVariant
        );
        newSold = updateVariant.sold + item.quantity;
        await ProductsVariants.findByIdAndUpdate(item.productVariant, {
          sold: newSold,
        });
      }
    }
    return { id, valueUpdate, updateBy: decode._id };
  } catch (error) {
    return { error: error };
  }
};
//delete
export const deleteOrder = async (req) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      return { error: { status: 401, error: decode.error } };
    }
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

//get by user
export const getByUser = async (req) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      return { error: { status: 401, error: decode.error } };
    }
    return {};
  } catch (error) {
    return { error: error };
  }
};
