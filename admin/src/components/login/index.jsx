import React, { useState } from "react";
import "./login.scss";
import { postData } from "../../libs/fetchData";
import { useDispatch } from 'react-redux'
import { getLoading, getNotify } from "../../stores/notifyReducer";
import { getRefresh } from "../../stores/usersReducer";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();
function Login() {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema), mode: 'all'
  });
  const onSubmit = async (data) => {
    try {
      dispatch(getLoading(true))
      const res = await postData("users/login", data);
      dispatch(getLoading(true))

      if (res.data.user.role !== 'admin') {
        dispatch(getNotify({
          status: 'error',
          message: 'Bạn không có quyền đăng nhập!'
        }))
        return
      }
      dispatch(getNotify({
        status: "success",
        message: res.data.success
      }))
      localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(res.data.refreshToken)
      );
      localStorage.setItem('userId', JSON.stringify(res.data.user._id))
      dispatch(getRefresh())
    } catch (error) {
      dispatch(getLoading(true))

      dispatch(getNotify({
        status: 'error',
        message: error.response.data.error
      }))
    }
  }
  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder='Email' />
        {errors.email && <span className="error">Field {errors.email.message}</span>}
        <input type='password' placeholder="Password" {...register("password")} />
        {errors.password && (
          <span className="error">Field {errors.password.message}</span>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login;
