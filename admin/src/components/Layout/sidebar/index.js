import React, { useState } from "react";
import "./sidebar.scss";
import {
  MdDashboard,
  MdOutlineKeyboardArrowRight,
  MdPostAdd,
  MdSettings,
} from "react-icons/md";
import { AiOutlineInfoCircle, AiOutlineUser } from "react-icons/ai";
import { BsBoxSeam, BsFilePostFill, BsImages } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDark } from "../../../stores/themeWebReducer";
function SideBar() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [isActiveProduct, setIsActiveProduct] = useState(false);
  const [isActivePost, setIsActivePost] = useState(false);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/">
          <span className="logo">Logo</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <div className="action">
          <p className="title">Main</p>
          <Link to="/">
            <div
              className={"item " + (activeTab === 1 && "active")}
              onClick={() => {
                setActiveTab(1);
              }}
            >
              <MdDashboard className="icon" />
              <span>Dashboard</span>
            </div>
          </Link>
          <p className="title">List</p>
          <Link to="users">
            <div
              className={"item " + (activeTab === 2 && "active")}
              onClick={() => {
                setActiveTab(2);
              }}
            >
              <AiOutlineUser className="icon" />
              <span>Người Dùng</span>
            </div>
          </Link>
          <div className="itemList">
            <button
              className={"accordion " + (isActiveProduct ? "active" : "")}
              onClick={() => {
                setActiveTab(0);
                setIsActiveProduct(!isActiveProduct);
              }}
            >
              <MdOutlineKeyboardArrowRight className="arrowIcon" />
              <BsBoxSeam className="icon" />
              <span>Sản Phẩm</span>
            </button>
            <div className={"panel " + (isActiveProduct ? "active" : "")}>
              <Link to="categories">
                <div
                  className={"panelItem " + (activeTab === 3 && "active")}
                  onClick={() => {
                    setActiveTab(3);
                  }}
                >
                  <BiCategory className="icon" />
                  <span>Danh mục</span>
                </div>
              </Link>
              <Link to="products">
                <div
                  className={"panelItem " + (activeTab === 4 && "active")}
                  onClick={() => {
                    setActiveTab(4);
                  }}
                >
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
                setActiveTab(0);
              }}
            >
              <MdOutlineKeyboardArrowRight className="arrowIcon" />
              <MdPostAdd className="icon" />
              <span>Bài Đăng</span>
            </button>
            <div className={"panel " + (isActivePost ? "active" : "")}>
              <Link to="categories-posts">
                <div
                  className={"panelItem " + (activeTab === 5 && "active")}
                  onClick={() => {
                    setActiveTab(5);
                  }}
                >
                  <BiCategory className="icon" />
                  <span>Danh mục</span>
                </div>
              </Link>
              <Link to="posts">
                <div
                  className={"panelItem " + (activeTab === 6 && "active")}
                  onClick={() => {
                    setActiveTab(6);
                  }}
                >
                  <MdPostAdd className="icon" />
                  <span>Các Bài đăng</span>
                </div>
              </Link>
            </div>
          </div>

          <Link to="orders">
            <div
              className={"item " + (activeTab === 7 && "active")}
              onClick={() => {
                setActiveTab(7);
              }}
            >
              <BsFilePostFill className="icon" />
              <span>Đơn hàng</span>
            </div>
          </Link>

          <p className="title">Service</p>
          <Link to="images">
            <div
              className={"item " + (activeTab === 8 && "active")}
              onClick={() => {
                setActiveTab(8);
              }}
            >
              <BsImages className="icon" />
              <span>Hình ảnh</span>
            </div>
          </Link>
          <div
            className={"item " + (activeTab === 9 && "active")}
            onClick={() => {
              setActiveTab(9);
            }}
          >
            <MdSettings className="icon" />
            <span>Cài đặt</span>
          </div>
          <div
            className={"item " + (activeTab === 10 && "active")}
            onClick={() => {
              setActiveTab(10);
            }}
          >
            <AiOutlineInfoCircle className="icon" />
            <span>Hệ thống</span>
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
