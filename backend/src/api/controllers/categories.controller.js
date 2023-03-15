import Categories from "../models/categories.model";
import * as service from "../services/categories.service";
//create
export const createCat = async (req, res, next) => {
  try {
    const { error, category } = await service.create(req);
    if (error) {
      return next(error);
    }
    await Categories.create(category);
    res.status(200).json({ success: "Tạo mới thành công" });
  } catch (error) {
    next(error);
  }
};
//get all
export const getAll = async (req, res, next) => {
  try {
    const categories = await Categories.find(
      {},
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    );
    if (categories.length === 0) {
      return next({
        status: 404,
        error: "No category found",
      });
    }
    res.status(200).json({
      success: "Get categories success",
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
};
//get by id
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Categories.findById(id, {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    if (!category) {
      return next({
        status: 404,
        error: "Category not found",
      });
    }
    res.status(200).json({ success: "Get category success", category });
  } catch (error) {
    next(error);
  }
};
//update
export const updateCat = async (req, res, next) => {
  try {
    const { error, categoryUpdate } = await service.update(req);
    if (error) {
      return next(error);
    }
    const { id } = req.params;
    const category = await Categories.findById(id);
    if (!category) {
      return next({
        status: 404,
        error: "Category not found",
      });
    }
    await Categories.findByIdAndUpdate(id, categoryUpdate, { new: true });
    res.status(200).json({
      success: "Update category success",
    });
  } catch (error) {
    next(error);
  }
};
//delete
export const deleteCat = async (req, res, next) => {
  try {
    const { error, id } = await service.deleteCat(req);
    if (error) {
      return next(error);
    }
    await Categories.findByIdAndDelete(id);
    res.status(200).json({
      success: "Xóa thành công",
    });
  } catch (error) {
    next(error);
  }
};
