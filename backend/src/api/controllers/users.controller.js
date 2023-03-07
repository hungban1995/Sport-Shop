import Users from "../models/users.model";
import * as service from "../services/users.service";
export const register = async (req, res, next) => {
  try {
    const { error, user } = await service.register(req);
    if (error) {
      return next(error);
    }
    await Users.create(user);
    res.status(200).json({
      success: "Tạo tài khoản thành công",
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { error, user } = await service.login(req);
    if (error) {
      return next(error);
    }
    console.log(user);
    res.status(200).json({
      success: "Đăng nhập thành công",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
