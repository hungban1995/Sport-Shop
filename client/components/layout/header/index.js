import React, { useEffect, useState } from "react";
import { CgGym } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getCount } from "@/stores/userReducer";
function Header() {
  const router = useRouter();
  const [refreshToken, setRefreshToken] = useState("");
  const [isActive, setIsActive] = useState("");
  const { count } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage &&
      localStorage.getItem("refreshToken")
    ) {
      setRefreshToken(JSON.parse(localStorage.getItem("refreshToken")));
    } else setRefreshToken("");
  }, [count]);
  return (
    <div className="header">
      <div className="logo">
        <CgGym className="logoIcon" />
        <span>Shop Name</span>
      </div>
      <ul className={`menu ${isActive}`}>
        <li>Home</li>
        <li>Products</li>
        <li>Blog</li>
        <li>Info</li>
        <MdOutlineArrowBackIosNew
          className="icon"
          onClick={() => {
            setIsActive("");
          }}
        />
      </ul>
      <div
        className="menuToggle"
        onClick={() => {
          setIsActive("active");
        }}
      >
        <FiMenu />
      </div>
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
              <div className="action">
                <Link href="/profile">Profile</Link>
              </div>
              <div
                className="action"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  localStorage.removeItem("userId");
                  router.push("/");
                  dispatch(getCount());
                }}
              >
                Logout
              </div>
            </div>
          ) : (
            <div className="user">
              <div className="action">
                <Link href="/login">Login</Link>
              </div>
              <div className="action">
                <Link href="/register">Register</Link>
              </div>
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
