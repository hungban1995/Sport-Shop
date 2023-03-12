import React, { useEffect, useState } from "react";
import { CgGym } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { FaOpencart } from "react-icons/fa";
function Header() {
  const [refreshToken, setRefreshToken] = useState("");
  useEffect(() => {
    if (localStorage && localStorage.getItem("refreshToken")) {
      setRefreshToken(JSON.parse(localStorage.getItem("refreshToken")));
    }
  }, []);
  return (
    <div className="header">
      <div className="logo">
        <CgGym className="logoIcon" />
        <span>Shop Name</span>
      </div>
      <ul className="menu">
        <li>Home</li>
        <li>Products</li>
        <li>Blog</li>
        <li>Info</li>
      </ul>
      <div className="items">
        <div className="item">
          <div className="search">
            <input type="text" placeholder="Search..." />
            <BiSearch className="icon" />
          </div>
        </div>
        <div className="item">
          <CiUser className="icon" />
          {refreshToken ? (
            <div className="user">
              <div className="action">Profile</div>
              <div className="action">Logout</div>
            </div>
          ) : (
            <div className="user">
              <div className="action">Login</div>
              <div className="action">Register</div>
            </div>
          )}
        </div>
        <div className="item">
          <FaOpencart className="icon" />
          <div className="counter">0</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
