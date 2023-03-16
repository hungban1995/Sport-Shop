import React, { useState } from "react";
import "./sidebar.scss";
import {
  MdDashboard,
  MdOutlineKeyboardArrowRight,
  MdPostAdd,
  MdSettings,
} from "react-icons/md";
import { AiOutlineInfoCircle, AiOutlineUser } from "react-icons/ai";
import { BsBoxSeam, BsFilePostFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDark } from "../../../stores/themeWebReducer";
function SideBar() {
  const dispatch = useDispatch();
  const [isActiveProduct, setIsActiveProduct] = useState(false);
  const [isActivePost, setIsActivePost] = useState(false);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Logo</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <div className="action">
          <p className="title">Main</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="item">
              <MdDashboard className="icon" />
              <span>Dashboard</span>
            </div>
          </Link>
          <p className="title">List</p>
          <Link to="users" style={{ textDecoration: "none" }}>
            <div className="item">
              <AiOutlineUser className="icon" />
              <span>Người Dùng</span>
            </div>
          </Link>
          <div className="itemList">
            <button
              className={"accordion " + (isActiveProduct ? "active" : "")}
              onClick={() => {
                setIsActiveProduct(!isActiveProduct);
              }}
            >
              <MdOutlineKeyboardArrowRight className="arrowIcon" />
              <BsBoxSeam className="icon" />
              <span>Sản Phẩm</span>
            </button>
            <div className={"panel " + (isActiveProduct ? "active" : "")}>
              <Link to="categories" style={{ textDecoration: "none" }}>
                <div className="panelItem">
                  <BiCategory className="icon" />
                  <span>Danh mục</span>
                </div>
              </Link>
              <Link to="products" style={{ textDecoration: "none" }}>
                <div className="panelItem">
                  <BiCategory className="icon" />
                  <span>Các Sản Phẩm</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="itemList">
            <button
              className={"accordion " + (isActivePost ? "active" : "")}
              onClick={() => {
                setIsActivePost(!isActivePost);
              }}
            >
              <MdOutlineKeyboardArrowRight className="arrowIcon" />
              <MdPostAdd className="icon" />
              <span>Bài Đăng</span>
            </button>
            <div className={"panel " + (isActivePost ? "active" : "")}>
              <Link to="categories-posts" style={{ textDecoration: "none" }}>
                <div className="panelItem">
                  <BiCategory className="icon" />
                  <span>Danh mục</span>
                </div>
              </Link>
              <Link to="posts" style={{ textDecoration: "none" }}>
                <div className="panelItem">
                  <MdPostAdd className="icon" />
                  <span>Các Bài đăng</span>
                </div>
              </Link>
            </div>
          </div>

          <Link to="orders" style={{ textDecoration: "none" }}>
            <div className="item">
              <BsFilePostFill className="icon" />
              <span>Đơn hàng</span>
            </div>
          </Link>

          <p className="title">Service</p>

          <div className="item">
            <AiOutlineInfoCircle className="icon" />
            <span>Hệ thống</span>
          </div>
          <div className="item">
            <MdSettings className="icon" />
            <span>Cài đặt</span>
          </div>
        </div>
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
