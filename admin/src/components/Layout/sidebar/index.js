import React, { useState } from "react";
import "./sidebar.scss";
import { MdDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { BsBoxSeam, BsFilePostFill } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDark } from "../../../stores/darkReducer";
function SideBar() {
  const dispatch = useDispatch();
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Logo</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <MdDashboard className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">List</p>
          <Link to="users" style={{ textDecoration: "none" }}>
            <li>
              <AiOutlineUser className="icon" />
              <span>Người Dùng</span>
            </li>
          </Link>
          <Link to="products" style={{ textDecoration: "none" }}>
            <li>
              <BsBoxSeam className="icon" />
              <span>Sản phẩm</span>
            </li>
          </Link>
          <Link to="orders" style={{ textDecoration: "none" }}>
            <li>
              <BsFilePostFill className="icon" />
              <span>Đơn hàng</span>
            </li>
          </Link>
          <li>
            <CiDeliveryTruck className="icon" />
            <span>Giao hàng</span>
          </li>
          <p className="title">Service</p>

          <li>
            <span>Hệ thống</span>
          </li>
          <li>
            <span>Cài đặt</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => {
            dispatch(setDark(false));
          }}
        ></div>
        <div
          className="colorOption"
          onClick={() => {
            dispatch(setDark(true));
          }}
        ></div>
      </div>
    </div>
  );
}

export default SideBar;
