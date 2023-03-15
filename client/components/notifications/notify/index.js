import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotify } from "../../../stores/notifyReducer";
import { BiErrorCircle } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";

function Notify() {
  const dispatch = useDispatch();
  const { notify } = useSelector((state) => state.notify);
  const hideNotification = useCallback(() => {
    dispatch(getNotify(null));
  }, [dispatch]);

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      hideNotification();
    }, 3000);

    return () => {
      clearTimeout(notificationTimeout);
    };
  }, [hideNotification, notify]);

  if (!notify) {
    return null;
  }

  const notificationIcon = notify.error ? (
    <BiErrorCircle
      style={{ fontSize: "20px", marginRight: "5px", color: "lightsalmon" }}
    />
  ) : (
    <BsCheckCircle
      style={{ fontSize: "20px", marginRight: "5px", color: "lightgreen" }}
    />
  );

  return (
    <div className={`notify ${notify.error ? "error" : ""}`}>
      {notificationIcon}
      <span>{notify.message}</span>
    </div>
  );
}

export default Notify;
