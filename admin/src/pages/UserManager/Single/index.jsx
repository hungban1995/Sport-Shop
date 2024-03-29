import { useState } from "react";
import "./single.scss";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { getData, patchData } from "../../../libs/fetchData";
import { useDispatch } from "react-redux";
import { getNotify } from "../../../stores/notifyReducer";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { BLANK_AVT, IMG_URL } from "../../../constants";
import moment from "moment";
import LibImages from "../../../components/LibImages";
import { styleUpload } from "../../../libs/dataRender";
const schema = yup.object({
  username: yup.string().required(),
  password: yup.string(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords does not match"),
  birthday: yup.date()
    .max(new Date(), "Birthday can't be in the future")
    .min(new Date("1900-01-01"), "Birthday must be after 1900-01-01"),
  phoneNumber: yup.string()
    .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, "Invalid phone number"),
})
function Single() {
  const userLogin=     JSON.parse(localStorage.getItem('userId'))

  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const [chooseSingle, setChooseSingle] = useState(null);
  const [active, setActive] = useState(false)
  const { register, watch, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema), defaultValues: async () => {
      try {
        const res = await getData('users/get-id/' + id)
        const user = res.data.user
        if (user.avatar) {
          setChooseSingle(user.avatar)
        }
        const inputDate = user?.birthday;
        const momentDate = moment.utc(inputDate);

        const isValidDate = momentDate.isValid();
        if (isValidDate) {
          user.birthday = momentDate.format("YYYY-MM-DD");
        } else {
          user.birthday = null
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
    if(userLogin===id){
       dispatch(getNotify({
        status: 'error',
        message: "Bạn không thể sửa thông tin của bạn!"
      }))
      return
    }
    const newData = { ...data, avatar: chooseSingle }
    try {
      const res = await patchData("users/update/" + id, newData);
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
          <div className="avatarUpload" onClick={() => setActive(true)}>
            {chooseSingle ?
              <img className="avatarImg" src={`${IMG_URL}/${chooseSingle}`} alt="" /> : <img className="avatarImg" src={BLANK_AVT} alt="" />
            }
          </div>
          <LibImages
            setChooseSingle={setChooseSingle}
            active={active}
            style={styleUpload}
            setActive={setActive}
          />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-input">
              <label htmlFor="">Username</label>
              <input {...register("username")} />
              {errors.username && (
                <span>Field {errors.username.message}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="">Email</label>
              <input readOnly  {...register("email")} />
            </div>
            <div className="form-input">
              <label htmlFor="">First Name</label>
              <input {...register("firstName")} />
              {errors.firstName && (
                <span>Field {errors.firstName.message}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="">Last Name</label>
              <input {...register("lastName")} />
              {errors.lastName && (
                <span>Field {errors.lastName.message}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="">Birth Day</label>
              <input type="date" {...register("birthday")} value={watch("birthday")} max="2005-01-01" />
              {errors.birthday && <p>{errors.birthday.message}</p>}
            </div>
            <div className="form-input">
              <label htmlFor="">Phone</label>
              <input
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <span>Field {errors.phoneNumber.message}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="">Address</label>
              <input
                {...register("address")}
              />
            </div>
            <div className="form-input">
              <label htmlFor="">Role</label>
              <select {...register("role")}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-input">
              <label htmlFor="">Password</label>
              <input
                type="password"
                {...register("password")} />
              {errors.password && (
                <span>Field {errors.password.message}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="">Confirm Password</label>
              <input
                type="password"
                disabled={!password} {...register("confirmPassword")} />
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
