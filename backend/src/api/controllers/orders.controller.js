import Orders from "../models/orders.models";
import * as service from "../services/orders.service";
import validateOrders from "../validation/order.validate";
//create
export const createOrder = async (req, res, next) => {
  try {
    const orderValidate = await validateOrders(req);
    if (orderValidate) {
      return next(orderValidate);
    }
    const { error, order } = await service.createOrder(req);
    if (error) {
      return next(error);
    }
    const createOdr = await Orders.create(order);
    res.status(200).json({ success: "Đặt hàng thành công", order: createOdr });
  } catch (error) {
    next(error);
  }
};
//getAll
export const getAll = async (req, res, next) => {
  try {
    const { error } = await service.getAll(req);
    if (error) {
      return next(error);
    }
    const { page, page_size, sort_by, filter_by } = req.query;
    const filter = filter_by ? JSON.parse(filter_by) : {};
    const orders = await Orders.find(filter, {
      user: 1,
      status: 1,
      paymentMethod: 1,
      orderDetail: 1,
      totalPrice: 1,
      createdAt: 1,
      firstName: 1,
      lastName: 1,
    })
      .populate({
        path: "orderDetail.productVariant",
        select: "-__v -updatedAt -createdAt -inStock -sold",
      })
      .populate({
        path: "user",
        select: "username",
      })
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort(sort_by);
    if (orders.length === 0) {
      return next({ status: 404, error: "No order found" });
    }
    let count = await Orders.countDocuments(filter);
    res.status(200).json({
      success: "Get order success",
      orders,
      count,
    });
  } catch (error) {
    next(error);
  }
};
//getById
export const getById = async (req, res, next) => {
  try {
    const { error, order } = await service.getById(req);
    if (error) {
      return next(error);
    }
    res.status(200).json({
      success: "Get order success",
      order,
    });
  } catch (error) {
    next(error);
  }
};
//update
export const updateOrder = async (req, res, next) => {
  try {
    const { error, id, valueUpdate } = await service.updateOrder(req);
    if (error) {
      return next(error);
    }
    await Orders.findByIdAndUpdate(id, valueUpdate, { new: true });
    res.status(200).json({
      success: "Update order success",
    });
  } catch (error) {
    next(error);
  }
};
//delete
export const deleteOrder = async (req, res, next) => {
  try {
    const { error } = await service.deleteOrder(req);
    if (error) {
      return next(error);
    }
    const { id } = req.params;
    const order = await Orders.findById(id);
    if (!order) {
      return next({
        status: 404,
        error: "Order not found",
      });
    }
    await Orders.findByIdAndDelete(id);
    res.status(200).json({
      success: "Delete order success",
    });
  } catch (error) {
    next(error);
  }
};
