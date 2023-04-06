import { format } from "date-fns";
import Images from "../models/images.model";
import fs from "fs";
import { verifyAccessToken } from "../middleware/auth";
export const uploadSingle = async (req, res, next) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) return next(error);
    const { files, fileValidationError } = req;
    if (fileValidationError) {
      return next({
        status: 400,
        error: "Lỗi upload file",
      });
    }
    const date_time = format(new Date(), `MM-yyyy`);
    const image = {
      url: `uploads/${date_time}/${files[0].filename}`,
      title: "",
      alt: "",
      uploadBy: decode._id.toString(),
    };
    const imageUploaded = await Images.create(image);
    res.status(200).json({
      success: "Tải hình ảnh lên thành công",
      image: imageUploaded,
    });
  } catch (error) {
    next(error);
  }
};
export const uploadMultiple = async (req, res, next) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      next(error);
    }
    if (decode.role !== "admin") {
      return next({
        status: 403,
        error: "Bạn không có quyền upload nhiều ảnh",
      });
    }
    const { files, fileValidationError } = req;
    if (fileValidationError) {
      return next({
        status: 400,
        error: "Lỗi upload file",
      });
    }
    const images = [];
    const date_time = format(new Date(), `MM-yyyy`);
    files.forEach((image) => {
      images.push({
        url: `uploads/${date_time}/${image.filename}`,
        title: "",
        alt: "",
        uploadBy: decode._id.toString(),
      });
    });
    await Images.insertMany(images);
    res.status(200).json({
      success: "Tải lên hình ảnh thành công",
    });
  } catch (err) {
    next(err);
  }
};
export const updateImage = async (req, res, next) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      return next(decode.error);
    }
    if (decode.role !== "admin") {
      return next({
        status: 403,
        error: "Bạn không có quyền update thông tin hình ảnh",
      });
    }
    const url = req.body.url;
    const user_id = req.body.user;
    if (!url) {
      return next({
        status: 400,
        error: "Bạn không thể xóa đường dẫn hình ảnh",
      });
    }
    if (!user_id) {
      return next({
        status: 400,
        error: "Bạn không thể xóa người dùng của hình ảnh",
      });
    }
    await Images.findByIdAndUpdate(id, {
      title: req.body.title,
      alt: req.body.alt,
    });
    res.status(200).json({
      success: "Cập nhật thông tin hình ảnh thành công",
    });
  } catch (err) {
    next(err);
  }
};
export const getAll = async (req, res, next) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      return next(decode.error);
    }
    const { page, page_size } = req.query;

    let images = [];
    let count = 0;
    if (decode.role === "admin") {
      images = await Images.find({})
        .populate({
          path: "uploadBy",
          select: "username",
        })
        .skip((page - 1) * page_size)
        .limit(page_size)
        .sort("-createdAt");
      count = await Images.countDocuments({});
    }
    if (decode.role !== "admin") {
      images = await Images.find({ uploadBy: decode._id })
        .populate({
          path: "uploadBy",
          select: "username",
        })
        .skip((page - 1) * page_size)
        .limit(page_size)
        .sort("-createdAt");
      count = await Images.countDocuments({ uploadBy: decode._id });
    }
    if (images.length === 0) {
      return next({ status: 404, error: "Không tồn tại hình ảnh" });
    }
    res.status(200).json({
      success: "Get images success",
      images,
      count,
    });
  } catch (err) {
    next(err);
  }
};
export const getById = async (req, res, next) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      return next(decode.error);
    }

    const { id } = req.params;
    const image = await Images.findById(id, {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    if (!image) {
      return next({
        status: 404,
        error: "Hình ảnh này không tồn tại hoặc đã bị xóa",
      });
    }
    if (decode.role !== "admin" && uploadBy._id.toString()) {
      return next({
        status: 403,
        error: "Nạn không có quyền để xem hình ảnh này",
      });
    }
    res.status(200).json({
      image,
    });
  } catch (err) {
    next(err);
  }
};
export const deleteId = async (req, res, next) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      return next(decode.error);
    }
    const { images } = req.body;
    const images_id = [];
    let i;
    for (i of images) {
      if (i.uploadBy._id !== decode._id.toString() && decode.role !== "admin") {
        return next({
          status: 403,
          error: "Bạn không có quyền xóa hình ảnh này",
        });
      }
      const PATH = "./src/publics/" + i.url;
      const fs_delete = fs.unlink(PATH, (err) => {
        if (err) {
          return { error: err };
        }
      });
      if (fs_delete && fs_delete.error) {
        return next(fs_delete.error);
      }
      images_id.push(i._id);
    }
    await Images.deleteMany({ _id: { $in: images_id } });
    res.status(200).json({
      success: "Xóa hình ảnh thành công",
    });
  } catch (err) {
    next(err);
  }
};
