import React, { useEffect, useRef, useState } from "react";
import "./navbar.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { FiBell } from "react-icons/fi";
import { getData, postData } from "../../../libs/fetchData";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRefresh } from "../../../stores/usersReducer";
import { BLANK_AVT, IMG_URL } from "../../../constants";
import { socket } from "../../../libs/socket";
import { BiMessageCheck } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
import moment from "moment";
import { getNotify } from "../../../stores/notifyReducer";
function Navbar() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [valueSearch, setValueSearch] = useState("");
  const [serverMessage, setServerMessage] = useState([]);
  const [notifyMessage, setNotifyMessage] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [viewNotify, setViewNotify] = useState(false);
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
    socket.on("server-message", (data) => {
      setRefresh((f) => f + 1);
    });
  }, []);
  useEffect(() => {
    getData("notifications/")
      .then((res) => setServerMessage(res.data.notifications))
      .catch((err) => console.log(err));
  }, [refresh]);

  useEffect(() => {
    let numUnread = 0;
    serverMessage.forEach((item) => {
      if (item.read === false) {
        numUnread++;
      }
    });
    setNotifyMessage(numUnread);
  }, [serverMessage]);
  //read notify
  const handleReadNotify = async (id) => {
    const dataUpdate = [id];
    try {
      await postData("notifications/read", dataUpdate);

      setRefresh((f) => f + 1);
    } catch (error) {
      console.log(error);
      dispatch(
        getNotify({
          status: "error",
          message: error.response.data.error,
        })
      );
    }
  };
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
          <div className="item" onClick={() => setViewNotify(!viewNotify)}>
            <FiBell className="icon" />
            <div className="counter">{notifyMessage}</div>
            <div
              className={"list-message " + (viewNotify ? "" : "hide")}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="list-message-header">
                <span>Notifications</span>{" "}
                <span className="icon-message-header">
                  <BiMessageCheck />
                  <span className="text-read">Read All</span>
                </span>
              </div>
              <div className="list-message-content">
                {serverMessage &&
                  serverMessage.map((item, idx) => {
                    return (
                      <div key={idx} className="item-message">
                        <div className="item-message-img">
                          <img
                            src={
                              item.sender
                                ? `${IMG_URL}/${item.sender?.avatar}`
                                : BLANK_AVT
                            }
                            alt="avatar"
                          />
                        </div>
                        <div className="item-message-content">
                          <p>
                            {item.sender?.username || "some one"} has been{" "}
                            {item.message}
                          </p>
                          <span>{moment(item.createdAt).fromNow()}</span>
                        </div>
                        <div className="item-message-action">
                          <GoPrimitiveDot
                            className={
                              "icon-action " + (item?.read ? "read" : "")
                            }
                            onClick={() => handleReadNotify(item._id)}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="list-message-bottom">
                <Link className="view-activity" to={"/activity"}>
                  View all activity
                </Link>
              </div>
            </div>
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
