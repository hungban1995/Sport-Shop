import React from "react";
import "./navbar.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { HiBars3 } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";

import { FiBell, FiMessageSquare } from "react-icons/fi";

function Navbar() {
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
          <div className="item">
            <img
              className="avatar"
              alt="avatar"
              src="https://roottogether.net/wp-content/uploads/2020/04/img-avatar-blank.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
