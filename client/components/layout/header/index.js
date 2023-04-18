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
import { BLANK_AVT, IMG_URL } from "@/constant";
import { getShowCart } from "@/stores/cartReducer";
function Header(props) {
  const router = useRouter();
  const [isActive, setIsActive] = useState("");
  const dispatch = useDispatch();
  const { cartOrder } = useSelector((state) => state.cart);
  const [user, setUser] = useState(null);
  const [numItem, setNumItem] = useState(0);
  useEffect(() => {
    if (cartOrder.length > 0) {
      let a = 0;
      cartOrder.forEach((item) => {
        a += item.quantity;
      });
      setNumItem(a);
    } else setNumItem(0);
  }, [cartOrder]);
  useEffect(() => {
    setUser(props.user);
  }, [props.user]);
  const handleClick = () => {
    setIsActive("");
  };
  return (
    <div className="header">
      <div className="logo">
        <CgGym className="logoIcon" />
        <span>Shop Name</span>
      </div>
      <div className={`list ${isActive}`}>
        <ul className={`menuList`}>
          <li>
            <Link onClick={() => handleClick()} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link onClick={() => handleClick()} href="/shop">
              Shop
            </Link>
          </li>
          <li>
            <Link onClick={() => handleClick()} href="/blog">
              Blog
            </Link>
          </li>
          <li>
            <Link onClick={() => handleClick()} href="/info">
              Info
            </Link>
          </li>
          <MdOutlineArrowBackIosNew
            className="icon"
            onClick={() => {
              setIsActive("");
            }}
          />
        </ul>
        <div className="menu-use-response">
          {user ? (
            <div className="user-response">
              <div className="action">
                <Link onClick={() => handleClick()} href="/profile">
                  Profile
                </Link>
              </div>
              <div
                className="action"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  localStorage.removeItem("userId");
                  dispatch(getCount());
                  router.push("/");
                }}
              >
                Logout
              </div>
            </div>
          ) : (
            <div className="user-response">
              <div className="action">
                <Link onClick={() => handleClick()} href="/login">
                  Login
                </Link>
              </div>
              <div className="action">
                <Link onClick={() => handleClick()} href="/register">
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
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
          {user ? (
            <img
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={user ? `${IMG_URL}/${user.avatar}` : BLANK_AVT}
              alt="avatar"
            />
          ) : (
            <CiUser className="icon" />
          )}
          {user ? (
            <div className="user">
              <div className="action">
                <Link onClick={() => handleClick()} href="/profile">
                  Profile
                </Link>
              </div>
              <div
                className="action"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  localStorage.removeItem("userId");
                  dispatch(getCount());
                  router.push("/");
                }}
              >
                <span>Logout</span>
              </div>
            </div>
          ) : (
            <div className="user">
              <div className="action">
                <Link onClick={() => handleClick()} href="/login">
                  Login
                </Link>
              </div>
              <div className="action">
                <Link onClick={() => handleClick()} href="/register">
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
        <div
          className="item"
          onClick={() => {
            dispatch(getShowCart(true));
          }}
        >
          <FaOpencart className="icon" />
          <div className="counter">{numItem}</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
