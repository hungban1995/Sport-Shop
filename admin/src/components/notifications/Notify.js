import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotify } from "../../stores/notifyReducer";
import { BiErrorCircle } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";

import "./notify.scss";
function Notify() {
  const { status, message } = useSelector((state) => state.notify.notify);
  const dispatch = useDispatch();
  if (status) {
    setTimeout(() => {
      dispatch(getNotify({}));
    }, 5000);
  }

  if (!status) return null;
  return (
    <div className={"notify " + (status === "error" ? "error" : "")}>
      {status === "error" ? (
        <span>
          <BiErrorCircle
            style={{
              fontSize: "20px",
              marginRight: "5px",
              color: "lightsalmon",
            }}
          />
          {message}
        </span>
      ) : (
        <span>
          <BsCheckCircle
            style={{
              fontSize: "20px",
              marginRight: "5px",
              color: "lightgreen",
            }}
          />
          {message}
        </span>
      )}
    </div>
  );
}

export default Notify;
