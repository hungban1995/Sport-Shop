import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { HiBars3 } from "react-icons/hi2";
import { FiBell, FiMessageSquare } from "react-icons/fi";
import { getData } from "../../../libs/fetchData";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRefresh } from "../../../stores/usersReducer";
import { BLANK_AVT, IMG_URL } from "../../../constants";
function Navbar() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const userId = JSON.parse(localStorage.getItem("userId"));
  useEffect(() => {
    getData(`users/get-user/${userId}`)
      .then((res) => {
        setCurrentUser(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <AiOutlineSearch />
        </div>
        <div className="items">
          <div className="item">
            <FiBell className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <FiMessageSquare className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <HiBars3 className="icon" />
          </div>
          <div className="item" onClick={() => setActive(!active)}>
            <span>{currentUser.username || "username"}</span>
            <img
              className="avatar"
              alt="avatar"
              src={
                currentUser.avatar
                  ? `${IMG_URL}/${currentUser.avatar}`
                  : BLANK_AVT
              }
            />
            <div className={active ? "menu-item" : "hide"}>
              <Link to={`users/${userId}`}>
                <span>Profile</span>
              </Link>
              <span
                onClick={() => {
                  localStorage.clear();
                  dispatch(getRefresh());
                }}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
