import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { getData, patchData, postData } from "../../libs/fetchData";
import { getNotify } from "@/stores/notifyReducer";
import { useDispatch } from "react-redux";
import { generateRandomString, toSlug } from "@/libs/helperData";
import { useRouter } from "next/router";
import { IMG_URL } from "@/constant";
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
  const [imagePath, setImagePath] = useState("");
  const [avatar, setAvatar] = useState(null);
  const handleChangeAvatar = (e) => {
    const file = e.target?.files?.length > 0 ? e.target.files[0] : null;
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePath(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  let userId;
  if (
    typeof window !== "undefined" &&
    localStorage &&
    localStorage.getItem("userId")
  ) {
    userId = JSON.parse(localStorage.getItem("userId"));
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: async () => {
      if (userId) {
        try {
          const res = await getData("users/get-user/" + userId);
          const values = res.data.user;
          setAvatar(values.avatar);
          setImagePath(`${IMG_URL}/${values.avatar}`);
          if (values.birthday) {
            const date = new Date(values.birthday);
            values.birthday = date.toISOString().slice(0, 10);
          }
          return values;
        } catch (error) {
          console.log(error);
        }
      } else return {};
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", avatar);
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    try {
      const res = await patchData("users/update/" + userId, formData);
      dispatch(
        getNotify({
          success: true,
          message: res.data.success,
        })
      );
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
                type="file"
                name="avatar"
                placeholder="file"
                className="imageUpload"
                onChange={handleChangeAvatar}
              />
              <img
                src={
                  imagePath
                    ? imagePath
                    : "https://t3.ftcdn.net/jpg/02/18/21/86/360_F_218218632_jF6XAkcrlBjv1mAg9Ow0UBMLBaJrhygH.jpg"
                }
                alt="upload"
              />
            </div>
            <div className="formGroup">
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
                {errors.lastName && (
                  <span>Field {errors.lastName.message}</span>
                )}
              </div>
            </div>
            <div className="formGroup">
              <div className="formInput">
                <label htmlFor="">Phone</label>
                <input type="string" {...register("phoneNumber")} />
              </div>
              <div className="formInput">
                <label htmlFor="">Birth Day</label>
                <input type="date" {...register("birthday")} />
              </div>
            </div>
            <div className="formGroup">
              <div className="formInput">
                <label htmlFor="">Address</label>
                <input {...register("address")} />
              </div>
            </div>

            <div className="titleForm">
              <span>Sign-In Information</span>
            </div>
            <div className="formGroup">
              <div className="formInput">
                <label htmlFor="">UserName</label>
                <input {...register("username")} type="username" />
              </div>
              <div className="formInput">
                <label htmlFor="">Email</label>
                <input
                  readOnly
                  style={{ backgroundColor: "#888" }}
                  {...register("email")}
                  type="email"
                />
              </div>
            </div>
            <div className="formGroup">
              <div className="formInput">
                <label htmlFor="">Password</label>
                <input {...register("password")} type="password" />
              </div>
              <div className="formInput">
                <label htmlFor="">Confirm Password</label>
                <input {...register("confirmPassword")} type="password" />
                {errors.confirmPassword && (
                  <span>Field {errors.confirmPassword.message}</span>
                )}
              </div>
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
