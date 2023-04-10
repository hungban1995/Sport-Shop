import React, { useState } from "react";
import "./new.scss";
import * as yup from "yup";
import { postData } from "../../../libs/fetchData";
import { useDispatch } from "react-redux";
import { getNotify } from "../../../stores/notifyReducer";
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import LibImages from "../../../components/LibImages";
import { IMG_URL } from "../../../constants";
import { styleUpload } from "../../../libs/dataRender";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().min(6).required(),
  username: yup.string().required(),
});
function New() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const [chooseSingle, setChooseSingle] = useState(null);
  const [active, setActive] = useState(false)
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
    if (chooseSingle) {
      setUser({ ...user, avatar: chooseSingle })
    }
    try {
      const res = await postData("users/register", user);
      dispatch(getNotify({
        status: "success",
        message: res.data.success
      }))
      e.target.reset();
    } catch (error) {
      console.log(error);
      dispatch(getNotify({
        status: 'error',
        message: error.response.data.error
      }))
    }
  };
  return (
    <div className="new">
      <div className="top">
        <div className="back" onClick={() => { navigate(-1) }} >
          <BiArrowBack className="icon" />
          <span>Back</span>
        </div>
        <h1>Add new User</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <div className="avatarUpload" onClick={() => setActive(true)}>
            {chooseSingle ?
              <img className="avatarImg" src={`${IMG_URL}/${chooseSingle}`} alt="" /> : <img className="avatarImg" src="https://t3.ftcdn.net/jpg/02/18/21/86/360_F_218218632_jF6XAkcrlBjv1mAg9Ow0UBMLBaJrhygH.jpg" alt="" />
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
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label htmlFor="">Username</label>
              <input
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
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default New;
