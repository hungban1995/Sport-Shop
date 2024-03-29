import jwt from "jsonwebtoken";
import Users from "../models/users.model";
//Verify access token
export const verifyAccessToken = async (req) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return {
      status: 401,
      error: "Please login",
    };
  }
  const decode = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decode) => {
      if (err) {
        return {
          err: err,
        };
      }
      return decode;
    }
  );
  if (decode.err) {
    if (decode.err.message === "jwt expired") {
      return {
        status: 401,
        error: decode.err.message,
      };
    }
    if (decode.err.message === "jwt not active") {
      return {
        status: 401,
        error: decode.err.message,
      };
    }
    if (decode.err.name === "JsonWebTokenError") {
      return {
        status: 401,
        error: "Invalid authentication",
      };
    }
  }
  const user = await Users.findById(decode._id);
  if (!user) {
    return {
      status: 401,
      error: "Invalid authentication",
    };
  }
  return user;
};
//----------Verify refresh token----------//
export const verifyRefreshToken = async (req) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return { status: 401, error: "Please login" };
  }
  const decode = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decode) => {
      if (err) {
        return {
          err: err,
        };
      }
      return decode;
    }
  );
  if (decode.err) {
    if (decode.err.message === "jwt expired") {
      return {
        status: 401,
        error: decode.err.message,
      };
    }
    if (decode.err.message === "jwt not active") {
      return {
        status: 401,
        error: decode.err.message,
      };
    }
    if (decode.err.name === "JsonWebTokenError") {
      return {
        status: 401,
        error: "Invalid authentication",
      };
    }
  }
  return decode;
};
