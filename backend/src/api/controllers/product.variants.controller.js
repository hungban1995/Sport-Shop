import ProductsVariants from "../models/products.variants.model";
import Products from "../models/products.model";

import * as service from "../services/products.variants.service";
import { productsVariantValidate } from "../validation/products.validate";
//create
export const createProductVariant = async (req, res, next) => {
  try {
    const validateErr = await productsVariantValidate(req);

    if (validateErr) {
      return next(validateErr);
    }
    const { error, productVariants } = await service.createProductVariant(req);
    if (error) {
      return next(error);
    }
    const newRecord = await ProductsVariants.create(productVariants);
    res.status(200).json({
      success: "Tạo mới thành công",
      variants: newRecord,
    });
  } catch (error) {
    next(error);
  }
};
//update
export const updateProductVariant = async (req, res, next) => {
  try {
    const { error, variantUpdate } = await service.updateProductVariant(req);
    if (error) {
      return next(error);
    }
    const { id } = req.params;
    const productVariant = await ProductsVariants.findById(id);
    if (!productVariant) {
      return next({
        status: 404,
        error: "ProductVat not found",
      });
    }
    if (variantUpdate.onSale && variantUpdate.price) {
      if (variantUpdate.onSale >= variantUpdate.price) {
        return next({
          status: 400,
          error: "On sale price must be less than regular price",
        });
      }
    }
    if (!variantUpdate.price && variantUpdate.onSale) {
      if (variantUpdate.onSale >= productVariant.price) {
        return next({
          status: 400,
          error: "On sale price must be less than regular price",
        });
      }
    }
    const dataUpdate = await ProductsVariants.findByIdAndUpdate(
      id,
      variantUpdate,
      { new: true }
    );
    res.status(200).json({
      success: "Update ProductVat success",
      dataUpdate,
    });
  } catch (error) {
    next(error);
  }
};
//----------Delete----------//
export const deleteProductVariant = async (req, res, next) => {
  try {
    const { error } = await service.deleteProductVariant(req);
    if (error) {
      return next(error);
    }
    const { id } = req.params;
    const variantsDel = await ProductsVariants.findById(id);
    if (!variantsDel) {
      return next({
        status: 404,
        error: "Variants not found",
      });
    }
    const updateProduct = await Products.findById(variantsDel.ofProduct);
    if (updateProduct) {
      updateProduct.variants = updateProduct.variants.filter(
        (item) => item.toString() !== variantsDel._id.toString()
      );
      await updateProduct.save();
    }
    await ProductsVariants.findByIdAndDelete(id);
    res.status(200).json({
      success: "Delete variants success",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
