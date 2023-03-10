import React, { useState } from "react";
import "./edit.scss";
import * as yup from "yup";
import { postData } from "../../../libs/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { getNotify } from "../../../stores/notifyReducer";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().min(6).required(),
  username: yup.string().required(),
});
function Edit() {
  const navigate = useNavigate()

  const { userEdit } = useSelector(state => state.users)
  const [imagePath, setImagePath] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});

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
  const handleChange = async (e) => {
    const { name, value } = e.target;
    try {
      await schema.validateAt(name, { [name]: value });
      setErrors((prevState) => ({ ...prevState, [name]: null }));
    } catch (err) {
      setErrors((prevState) => ({ ...prevState, [name]: err.message }));
    }
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = { ...user, avatar };
    // try {
    //   const res = await postData("users/register", newData);
    //   dispatch(getNotify({
    //     status: "success",
    //     message: res.data.success
    //   }))
    // } catch (error) {
    //   console.log(error);
    //   dispatch(getNotify({
    //     status: 'error',
    //     message: error.response.data.error
    //   }))
    // }
  };
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
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label htmlFor="">Username</label>
              <input
                defaultValue={userEdit.username}
                type="text"
                name="username"
                placeholder="username"
                onChange={handleChange}
              />
              {errors.username && (
                <span className="error">Field {errors.username}</span>
              )}
            </div>
            <div className="formInput">
              <label htmlFor="">email</label>
              <input
                defaultValue={userEdit.email}
                type="email"
                name="email"
                placeholder="email"
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error">Field {errors.email}</span>
              )}
            </div>
            <div className="formInput">
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">Field {errors.password}</span>
              )}
            </div>
            <div className="formInput">
              <label htmlFor="">confirmPassword</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirmPassword"
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error">Field {errors.confirmPassword}</span>
              )}
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
