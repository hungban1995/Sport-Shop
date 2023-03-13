import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { postData } from "../../libs/fetchData";
import { getNotify } from "@/stores/notifyReducer";
import { useDispatch } from "react-redux";
import { generateRandomString, toSlug } from "@/libs/helperData";
import { useRouter } from "next/router";
const schema = yup.object({
  firstName: yup.string(),
  lastName: yup.string(),
  phoneNumber: yup.string(),
  birthday: yup
    .date()
    .max(new Date(), "Birthday can't be in the future")
    .min(new Date("1900-01-01"), "Birthday must be after 1900-01-01"),
  phoneNumber: yup.string().matches(/^\+84\d{9}$/, "Invalid phone number"),
  password: yup.string(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords does not match"),
});
function Profile() {
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
    // try {
    //   const res = await postData("users/register", newData);
    //   dispatch(
    //     getNotify({
    //       status: "success",
    //       message: res.data.success,
    //     })
    //   );
    //   router.push("/login");
    // } catch (error) {
    //   console.log(error);
    //   dispatch(
    //     getNotify({
    //       status: "error",
    //       message: error.response.data.error,
    //     })
    //   );
    // }
  };
  return (
    <div className="profile">
      <div className="title">
        <span>My Account</span>
      </div>
      <div className="bottom">
        <div className="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="titleForm">
              <span>Personal Profile</span>
            </div>
            <div className="upload">
              <input
                className="uploadImg"
                type="file"
                {...register("avatar")}
              />
              <img
                alt="avatar"
                src="https://t3.ftcdn.net/jpg/02/18/21/86/360_F_218218632_jF6XAkcrlBjv1mAg9Ow0UBMLBaJrhygH.jpg"
              ></img>
            </div>
            <div className="formInput">
              <label htmlFor="">First Name</label>
              <input {...register("firstName")} />
              {errors.firstName && (
                <span>Field {errors.firstName.message}</span>
              )}
            </div>
            <div className="formInput">
              <label htmlFor="">Last Name</label>
              <input {...register("lastName")} />
              {errors.lastName && <span>Field {errors.lastName.message}</span>}
            </div>
            <div className="formInput">
              <label htmlFor="">Address</label>
              <input {...register("address")} />
            </div>
            <div className="formInput">
              <label htmlFor="">Phone</label>
              <input type="string" {...register("phoneNumber")} />
            </div>
            <div className="formInput">
              <label htmlFor="">Birth Day</label>
              <input type="date" {...register("birthday")} />
            </div>
            <div className="titleForm">
              <span>Sign-In Information</span>
            </div>
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
            <div className="formInput">
              <label htmlFor="">Confirm Password</label>
              <input {...register("confirmPassword")} type="password" />
              {errors.confirmPassword && (
                <span>Field {errors.confirmPassword.message}</span>
              )}
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
        <div className="right">order</div>
      </div>
    </div>
  );
}

export default Profile;
