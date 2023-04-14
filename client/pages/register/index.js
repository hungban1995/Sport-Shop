import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { postData } from "../../libs/fetchData";
import { getLoading, getNotify } from "@/stores/notifyReducer";
import { useDispatch } from "react-redux";
import { generateRandomString, toSlug } from "@/libs/helperData";
import { useRouter } from "next/router";
const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .min(6)
    .required()
    .oneOf([yup.ref("password"), null], "Passwords does not match"),
});
function Register() {
  //Definded router
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
    let firstName = toSlug(data.firstName);
    let randomString = generateRandomString(10);
    let username = `${firstName}-${randomString}`;
    const newData = { ...data, username };
    console.log(newData);
    try {
      dispatch(getLoading(true));

      const res = await postData("users/register", newData);
      dispatch(getLoading(false));

      dispatch(
        getNotify({
          success: true,
          message: res.data.success,
        })
      );
      router.push("/login");
    } catch (error) {
      dispatch(getLoading(false));
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
    <div className="register">
      <div className="title">
        <span>Create new account</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="left">
          <div className="titleForm">
            <span>Personal Profile</span>
          </div>
          <div className="form-input">
            <label htmlFor="">First Name</label>
            <input {...register("firstName")} />
            {errors.firstName && <span>Field {errors.firstName.message}</span>}
          </div>
          <div className="form-input">
            <label htmlFor="">Last Name</label>
            <input {...register("lastName")} />
            {errors.lastName && <span>Field {errors.lastName.message}</span>}
          </div>
          <div className="form-input">
            <label htmlFor="">Address</label>
            <input {...register("address")} />
          </div>
        </div>
        <div className="right">
          <div className="titleForm">
            <span>Sign-In Information</span>
          </div>
          <div className="form-input">
            <label htmlFor="">Email</label>
            <input {...register("email")} type="email" />
            {errors.email && <span>Field {errors.email.message}</span>}
          </div>
          <div className="form-input">
            <label htmlFor="">Password</label>
            <input {...register("password")} type="password" />
            {errors.password && <span>Field {errors.password.message}</span>}
          </div>
          <div className="form-input">
            <label htmlFor="">Confirm Password</label>
            <input {...register("confirmPassword")} type="password" />
            {errors.confirmPassword && (
              <span>Field {errors.confirmPassword.message}</span>
            )}
          </div>
        </div>
        <div className="submit">
          <span>
            Have account? <Link href="/login">Login!</Link>
          </span>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
