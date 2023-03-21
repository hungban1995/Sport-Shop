import ProductsVariants from "../models/products.variants.model";
import ProductVariants from "../models/products.variants.model";
import * as service from "../services/products.variants.service";
//create
export const createProductVariant = async (req, res, next) => {
  try {
    const { error, productVariants } = await service.createProductVariant(req);
    if (error) {
      return next(error);
    }
    await ProductVariants.create(productVariants);
    res.status(200).json({ success: "Tạo mới thành công" });
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
    const productVariant = await ProductVariants.findById(id);
    if (!productVariant) {
      return next({
        status: 404,
        error: "ProductVat not found",
      });
    }
    if (variantUpdate.onSale && variantUpdate.onSale >= productVariant.price) {
      {
        return next({
          status: 400,
          error: "On sale price must be less than regular price",
        });
      }
    }
    await ProductVariants.findByIdAndUpdate(id, variantUpdate, { new: true });
    res.status(200).json({
      success: "Update ProductVat success",
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
    const variants = await ProductsVariants.findById(id);
    if (!variants) {
      return next({
        status: 404,
        error: "Variants not found",
      });
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
