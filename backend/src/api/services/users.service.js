import Users from "../models/users.model";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
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
      user: { username: username, email: email, password: hashPassword },
    };
  } catch (error) {
    return { error: error };
  }
};
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
