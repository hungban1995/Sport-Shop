import {
  createAccessToken,
  createRefreshToken,
} from "../helpers/generateToken";
import Users from "../models/users.model";
import * as service from "../services/users.service";
//register
export const register = async (req, res, next) => {
  try {
    const { error, user } = await service.register(req);
    if (error) {
      return next(error);
    }
    const newUser = await Users.create(user);
    res.status(200).json({
      success: "Tạo tài khoản thành công",
      userId: newUser._id,
    });
  } catch (error) {
    next(error);
  }
};
//login
export const login = async (req, res, next) => {
  try {
    const { error, user } = await service.login(req);
    if (error) {
      return next(error);
    }
    user.password = undefined;
    const accessToken = createAccessToken({ _id: user._id });
    const refreshToken = createRefreshToken({ _id: user._id });
    res.status(200).json({
      success: "Đăng nhập thành công",
      user: user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};
// get all user
export const getUsers = async (req, res, next) => {
  try {
    const { error, users, count } = await service.getUsers(req);
    if (error) {
      return next(error);
    }
    res.status(200).json({
      success: "Lấy danh sách user thành công",
      users,
      count,
    });
  } catch (error) {
    next(error);
  }
};
//get by id
export const getUserById = async (req, res, next) => {
  try {
    const { error, user } = await service.getUserById(req);
    if (error) {
      return next(error);
    }
    res.status(200).json({
      success: "Lấy thông tin user thành công",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
//update user
export const updateUser = async (req, res, next) => {
  try {
    const { error, userUpdate } = await service.updateUser(req);
    if (error) {
      return next(error);
    }
    const { id } = req.params;

    await Users.findByIdAndUpdate(id, userUpdate, { new: true });
    res.status(200).json({
      success: "Cập nhật thành công",
    });
  } catch (error) {
    next(error);
  }
};
//delete user
export const deleteUser = async (req, res, next) => {
  try {
    const { error, id } = await service.deleteUser(req);
    if (error) {
      return next(error);
    }
    await Users.findByIdAndDelete(id);
    res.status(200).json({
      success: "Xóa thành công",
    });
  } catch (error) {
    next(error);
  }
};
export const refreshToken = async (req, res, next) => {
  try {
    const { error, userId } = await service.refreshToken(req);
    if (error) {
      return next(error);
    }
    const accessToken = createAccessToken({ _id: userId.toString() });

    res.status(200).json({
      accessToken,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
