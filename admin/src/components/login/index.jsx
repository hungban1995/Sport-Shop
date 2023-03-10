import React, { useState } from "react";
import "./login.scss";
import * as yup from "yup";
import { postData } from "../../libs/fetchData";
import { useDispatch } from 'react-redux'
import { getNotify } from "../../stores/notifyReducer";
import { getRefresh } from "../../stores/usersReducer";
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
function Login() {
  const dispatch = useDispatch()
  const [checkLogin, setCheckLogin] = useState([]);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
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
    try {
      const res = await postData("users/login", user);
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
      setCheckLogin(error.response.data.error);
      dispatch(getNotify({
        status: 'error',
        message: error.response.data.error
      }))
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={handleChange}
        />
        {errors.email && <span className="error">Field {errors.email}</span>}
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        {errors.password && (
          <span className="error">Field {errors.password}</span>
        )}
        <button type="submit">Login</button>
        {checkLogin && <span>{checkLogin}</span>}
      </form>
    </div>
  );
}
export default Login;
