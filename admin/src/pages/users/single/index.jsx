import { useState } from "react";
import "./single.scss";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { getData, patchData } from "../../../libs/fetchData";
import { useDispatch } from "react-redux";
import { getNotify } from "../../../stores/notifyReducer";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";
import { useForm } from 'react-hook-form'
import { IMG_URL } from "../../../constants";
const schema = yup.object({
  username: yup.string().required(),
  password: yup.string(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords does not match"),
  birthday: yup.date().max(new Date(), "Birthday can't be in the future")
    .min(new Date("1900-01-01"), "Birthday must be after 1900-01-01")
    .required("Birthday is required"),
  phoneNumber: yup.string()
    .matches(/^\+84\d{9}$/, "Invalid phone number")
    .required("Phone number is required"),
})
function Single() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const [imagePath, setImagePath] = useState('');
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
  const { register, watch, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema), defaultValues: async () => {
      try {
        const res = await getData('users/get-user/' + id)
        const user = res.data.user
        if (user.avatar) {
          setAvatar(user.avatar)
          setImagePath(`${IMG_URL}/${user.avatar}`)
        }
        if (user.birthday) {
          const date = new Date(user.birthday);
          user.birthday = date.toISOString().slice(0, 10);
        }
        return user
      } catch (error) {
        console.log(error);
        return {}
      }
    },
    mode: 'all'
  });
  const password = watch("password");
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', avatar);
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    try {
      const res = await patchData("users/update/" + id, formData);
      dispatch(getNotify({
        status: "success",
        message: res.data.success
      }))
    } catch (error) {
      console.log(error);
      dispatch(getNotify({
        status: 'error',
        message: error.response.data.error
      }))
    }
  }
  return (
    <div className="new">
      <div className="top">
        <div className="back" onClick={() => { navigate(-1) }} >
          <BiArrowBack className="icon" />
          <span>Back</span>
        </div>
        <h1>Edit User</h1>
      </div>
      <div className="bottom">
        <div className="left">
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
        <div className="right">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="formInput">
              <label htmlFor="">Username</label>
              <input {...register("username")} />
              {errors.username && (
                <span>Field {errors.username.message}</span>
              )}
            </div>
            <div className="formInput">
              <label htmlFor="">Email</label>
              <input readOnly  {...register("email")} />
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
              {errors.lastName && (
                <span>Field {errors.lastName.message}</span>
              )}
            </div>
            <div className="formInput">
              <label htmlFor="">Birth Day</label>
              <input
                type="date"
                {...register("birthday")}
                value={watch("birthday")}
              />
              {errors.birthday && (
                <span>Field {errors.birthday.message}</span>
              )}
            </div>
            <div className="formInput">
              <label htmlFor="">Phone</label>
              <input
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <span>Field {errors.phoneNumber.message}</span>
              )}
            </div>
            <div className="formInput">
              <label htmlFor="">Address</label>
              <input
                {...register("address")}
              />
            </div>
            <div className="formInput">
              <label htmlFor="">Role</label>
              <select {...register("role")}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="formInput">
              <label htmlFor="">Password</label>
              <input {...register("password")} />
              {errors.password && (
                <span>Field {errors.password.message}</span>
              )}
            </div>
            <div className="formInput">
              <label htmlFor="">Confirm Password</label>
              <input disabled={!password} {...register("confirmPassword")} />
              {errors.confirmPassword && (
                <span>Field {errors.confirmPassword.message}</span>
              )}
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Single;
