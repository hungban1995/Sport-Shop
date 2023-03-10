import Users from "../models/users.model";
import bcrypt from "bcryptjs";
import { verifyAccessToken, verifyRefreshToken } from "../middleware/auth";
const salt = bcrypt.genSaltSync(10);
//register
export const register = async (req, res) => {
  try {
    const { username, email, firstName, lastName, password, confirmPassword } =
      req.body;
    const alreadyUsername = await Users.findOne({ username: username });
    if (alreadyUsername) {
      return {
        error: { status: 400, error: "Username đã tồn tại" },
      };
    }
    const alreadyEmail = await Users.findOne({ email: email });
    if (alreadyEmail) {
      return {
        error: { status: 400, error: "Email đã tồn tại" },
      };
    }
    if (password !== confirmPassword) {
      return {
        error: { status: 400, error: "Mật khẩu không khớp" },
      };
    }
    const hashPassword = bcrypt.hashSync(password, salt);
    return {
      user: { username, email, password: hashPassword, firstName, lastName },
    };
  } catch (error) {
    return { error: error };
  }
};
//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user) {
      return {
        error: {
          status: 404,
          error: "Người dùng không tồn tại",
        },
      };
    }
    const isMatchPassword = bcrypt.compareSync(password, user.password);
    if (!isMatchPassword) {
      return {
        error: {
          status: 404,
          error: "Mật khẩu đăng nhập không đúng",
        },
      };
    }
    return { user: user };
  } catch (error) {
    return { error: error };
  }
};
//get all
export const getUsers = async (req, res) => {
  try {
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      return { error: { status: 401, error: decode.error } };
    }
    if (decode.role !== "admin") {
      return {
        error: {
          status: 403,
          error: "Bạn không có quyền xem danh sách các user",
        },
      };
    }
    const users = await Users.find({}, { password: 0 });
    if (users.length === 0) {
      return next({
        status: 404,
        error: "Không có user",
      });
    }
    return { users: users };
  } catch (error) {
    return { error: error };
  }
};
//get user by id
export const getUserById = async (req) => {
  try {
    const { id } = req.params;
    const userById = await Users.findOne({ _id: id }, { password: 0 });
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      return { error: { status: 401, error: decode.error } };
    }
    if (
      decode.role !== "admin" &&
      userById._id.toString() !== decode._id.toString()
    ) {
      return {
        error: {
          status: 403,
          error: "Bạn không có quyền xem thông tin người này",
        },
      };
    }
    return { user: userById };
  } catch (error) {
    return { error: error };
  }
};
//update user
export const updateUser = async (req) => {
  try {
    const { id } = req.params;
    const { username, email, password, confirmPassword, avatar, role } =
      req.body;
    const userById = await Users.findById(id);
    const userByUsername = await Users.findOne({ username: username });
    const decode = await verifyAccessToken(req);
    if (!userById) {
      return {
        error: { status: 400, error: "Người dùng không tồn tại" },
      };
    }
    if (decode.error) {
      return { error: { status: 401, error: decode.error } };
    }
    if (
      decode.role !== "admin" &&
      userById._id.toString() !== decode._id.toString()
    ) {
      return {
        error: {
          status: 403,
          error: "Bạn không có quyền sửa thông tin người này",
        },
      };
    }
    if (email && email !== userById.email) {
      return {
        error: {
          status: 400,
          error: "Email không được sửa",
        },
      };
    }
    if (username && username === userByUsername) {
      return {
        error: {
          status: 400,
          error: "Username đã tồn tại",
        },
      };
    }
    if (role && decode.role !== "admin" && role !== userById.role) {
      return {
        error: {
          status: 403,
          error: "Bạn không thể thay đổi quyền người dùng",
        },
      };
    }
    let hashPassword = undefined;
    if (password) {
      if (password !== confirmPassword) {
        return {
          error: {
            status: 400,
            error: "Mật khẩu không giống nhau",
          },
        };
      }
      hashPassword = bcrypt.hashSync(password, salt);
    }
    return {
      userUpdate: {
        _id: userById._id,
        username,
        password: hashPassword,
        avatar,
        role,
      },
    };
  } catch (error) {
    return { error: error };
  }
};
//delete user
export const deleteUser = async (req) => {
  try {
    const { id } = req.params;
    const userById = await Users.findById(id);
    const decode = await verifyAccessToken(req);
    if (decode.error) {
      return { error: { status: 401, error: decode.error } };
    }
    if (decode.role !== "admin") {
      return {
        error: {
          status: 403,
          error: "Bạn không có quyền xóa người dùng",
        },
      };
    }
    if (!userById) {
      return {
        error: {
          status: 404,
          error: "Không tồn tại user",
        },
      };
    }
    return id;
  } catch (error) {
    return { error: error };
  }
};
//----------Refresh token----------//
export const refreshToken = async (req) => {
  try {
    const decode = await verifyRefreshToken(req);
    if (decode.error) {
      return { error: error };
    }
    return { userId: decode._id };
  } catch (error) {
    return { error: error };
  }
};
