import Categories from "../models/categories.model";
import * as service from "../services/categories.service";
//create
export const createCat = async (req, res, next) => {
  try {
    const { error, category } = await service.createCat(req);
    if (error) {
      return next(error);
    }
    const newCat = await Categories.create(category);
    res.status(200).json({ success: "Tạo mới thành công", category: newCat });
  } catch (error) {
    next(error);
  }
};
//get all
export const getAll = async (req, res, next) => {
  try {
    const { page, page_size, sort_by, filter_by } = req.query;
    let filter = "";
    if (filter_by) {
      filter = JSON.parse(filter_by);
    }
    const categories = await Categories.find(
      { ...filter },
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    )
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort(sort_by);
    if (categories.length === 0) {
      return next({
        status: 404,
        error: "No category found",
      });
    }
    let count = await Categories.find({ ...filter }).count();
    res.status(200).json({
      success: "Get categories success",
      categories,
      count,
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
    const { error, categoryUpdate } = await service.updateCat(req);
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
