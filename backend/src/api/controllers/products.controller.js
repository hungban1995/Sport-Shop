import Products from "../models/products.model";
import ProductsVariants from "../models/products.variants.model";

import * as service from "../services/products.service";

//create
export const createProduct = async (req, res, next) => {
  try {
    const { product, error } = await service.createProduct(req);
    if (error) {
      return next(error);
    }
    const newProduct = await Products.create(product);
    for (let item of newProduct.variants) {
      await ProductsVariants.findByIdAndUpdate(item, {
        ofProduct: newProduct._id,
      });
    }
    res.status(200).json({ success: "Tạo mới thành công" });
  } catch (error) {
    next(error);
  }
};
//get all
export const getAll = async (req, res, next) => {
  try {
    const products = await Products.find()
      .populate({ path: "category", select: "title" })
      .populate({ path: "variants", select: "-createdAt -updatedAt -__v" });
    if (products.length === 0) {
      return next({ status: 404, error: "No product found" });
    }
    res.status(200).json({
      success: "Get product success",
      products: products,
    });
  } catch (error) {
    next(error);
  }
};
//getById
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id, { __v: 0 })
      .populate({ path: "category", select: "title" })
      .populate({ path: "variants", select: "-createdAt -updatedAt -__v" });
    if (!product) {
      return next({ status: 404, error: "No product found" });
    }
    res.status(200).json({ success: "Get product success", product });
  } catch (error) {
    next(error);
  }
};
//update
export const updateProduct = async (req, res, next) => {
  try {
    const { productUpdate, error } = await service.updateProduct(req);
    if (error) {
      return next(error);
    }
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product) {
      return next({
        status: 404,
        error: "Product not found",
      });
    }
    const update = await Products.findByIdAndUpdate(id, productUpdate);
    for (let item of update.variants) {
      await ProductsVariants.findByIdAndUpdate(item, {
        ofProduct: update._id,
      });
    }
    res.status(200).json({
      success: "Update product success",
    });
  } catch (error) {
    next(error);
  }
};
//delete
export const deleteProduct = async (req, res, next) => {
  try {
    const { error } = await service.deleteProduct(req);
    if (error) {
      return next(error);
    }
    const { id } = req.params;
    const product = await Products.findById(id);
    console.log(product);
    if (!product) {
      return next({
        status: 404,
        error: "Product not found",
      });
    }
    if (product.variants.length > 0) {
      let productVariant = product.variants;
      await Promise.all(
        productVariant?.map(async (item) => {
          await ProductsVariants.findByIdAndDelete(item);
        })
      );
    }
    await Products.findByIdAndDelete(id);
    res.status(200).json({
      success: "Delete product success",
    });
  } catch (error) {
    next(error);
  }
};
//create rating
export const createRating = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product) {
      return next({
        status: 404,
        error: "Product not found",
      });
    }
    const { user, rating, comment } = req.body;
    product.ratings.push({ user, rating, comment });
    await product.save();

    res.status(201).json({
      success: "New rating added successfully",
    });
  } catch (error) {
    next(error);
  }
};
//update rating
export const updateRating = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user, rating, comment } = req.body;

    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { $push: { ratings: { user, rating, comment } } },
      { new: true }
    );

    if (!updatedProduct) {
      return next({
        status: 404,
        error: "Product not found",
      });
    }

    res.status(200).json({
      success: "Rating update successfully",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};
