import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotify } from "../../../stores/notifyReducer";
import { BiErrorCircle } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import "./notify.scss";
function Notify() {
  const { notify } = useSelector((state) => state.notify);
  const dispatch = useDispatch();
  useEffect(() => {
    if (notify.status) {
      setTimeout(() => {
        dispatch(clearNotify());
      }, 3000);
    }
  }, [notify]);
  if (!notify.status) return null;
  return (
    <div className={"notify " + (notify?.status === "error" ? "error" : "")}>
      {notify?.status === "error" ? (
        <span>
          <BiErrorCircle
            style={{
              fontSize: "20px",
              marginRight: "5px",
              color: "lightsalmon",
            }}
          />
          {notify?.message}
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
          {notify?.message}
        </span>
      )}
    </div>
  );
}

export default Notify;
