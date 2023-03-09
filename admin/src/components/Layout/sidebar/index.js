import React from "react";
import "./sidebar.scss";
import { MdDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { BsBoxSeam, BsFilePostFill } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
function SideBar() {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Logo</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <li>
            <MdDashboard className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">List</p>

          <a href="users">
            <li>
              <AiOutlineUser className="icon" />
              <span>Người Dùng</span>
            </li>
          </a>
          <li>
            <BsBoxSeam className="icon" />
            <span>Sản phẩm</span>
          </li>
          <li>
            <BsFilePostFill className="icon" />
            <span>Đơn hàng</span>
          </li>
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
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
}

export default SideBar;
