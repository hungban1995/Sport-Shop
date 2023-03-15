import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { postData } from "../../libs/fetchData";
import { getNotify } from "@/stores/notifyReducer";
import { useDispatch } from "react-redux";
import { getCount } from "@/stores/userReducer";
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data) => {
    try {
      const res = await postData("users/login", data);
      localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(res.data.refreshToken)
      );
      localStorage.setItem("userId", JSON.stringify(res.data.user._id));
      dispatch(
        getNotify({
          success: true,
          message: res.data.success,
        })
      );
      dispatch(getCount());
      router.push("/");
    } catch (error) {
      console.log(error);
      dispatch(
        getNotify({
          error: true,
          message: error.response.data.error,
        })
      );
    }
  };
  return (
    <div className="login">
      <div className="title">
        <span>Customer Login</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formInput">
          <label htmlFor="">Email</label>
          <input {...register("email")} type="email" />
          {errors.email && <span>Field {errors.email.message}</span>}
        </div>
        <div className="formInput">
          <label htmlFor="">Password</label>
          <input {...register("password")} type="password" />
          {errors.password && <span>Field {errors.password.message}</span>}
        </div>
        <div className="submit">
          <span>
            Don't have account? <Link href="/register">Register!</Link>
          </span>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
