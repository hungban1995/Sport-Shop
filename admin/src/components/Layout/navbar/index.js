import React, { useEffect, useRef, useState } from "react";
import "./navbar.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { FiBell } from "react-icons/fi";
import { getData } from "../../../libs/fetchData";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRefresh } from "../../../stores/usersReducer";
import { BLANK_AVT, IMG_URL } from "../../../constants";
import { socket } from "../../../libs/socket";

function Navbar() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [valueSearch, setValueSearch] = useState("");
  const [severMessage, setServerMessage] = useState([]);
  const myRef = useRef();
  //cancel click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (myRef.current && !myRef.current.contains(event.target)) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [myRef]);
  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("userId")));
  }, []);
  useEffect(() => {
    if (userId) {
      getData(`users/get-id/${userId}`)
        .then((res) => {
          setCurrentUser(res.data.user);
        })
        .catch((err) => console.log(err));
    }
  }, [userId]);
  useEffect(() => {}, [valueSearch]);
  //listen sever
  useEffect(() => {
    const tmp = severMessage;
    socket.on("server-message", (data) => {
      tmp.push(data);
      setServerMessage([...tmp]);
    });
  }, []);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setValueSearch(e.target.value)}
          />
          <AiOutlineSearch />
        </div>
        <div className="items">
          <div className="item">
            <FiBell className="icon" />
            <div className="counter">{severMessage?.length}</div>
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
            <div ref={myRef} className={active ? "menu-item" : "hide"}>
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
