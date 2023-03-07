import * as yup from "yup";
//user register validate
const usersRegisterSchema = yup.object().shape({
  username: yup.string().required("Username không được để trống"),
  email: yup
    .string()
    .required("Email không được để trống")
    .email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu ít nhất là 6 ký tự"),
  confirmPassword: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu ít nhất là 6 ký tự"),
});
export const usersRegisterSchemaValidate = (req, res, next) => {
  usersRegisterSchema
    .validate(req.body)
    .then(() => next())
    .catch((err) =>
      next({
        status: 400,
        error: err.message,
      })
    );
};
//user login validate
const usersLoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email không được để trống")
    .email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu ít nhất là 6 ký tự"),
});
export const usersLoginSchemaValidate = (req, res, next) => {
  usersLoginSchema
    .validate(req.body)
    .then(() => next())
    .catch((err) =>
      next({
        status: 400,
        error: err.message,
      })
    );
};
