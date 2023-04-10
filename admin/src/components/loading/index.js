import React from "react";
import "./loading.scss";
import { useSelector } from "react-redux";
function Loading() {
  const { loading } = useSelector((state) => state.notify);
  return (
    <div className={loading ? "loading" : "hide"}>
      <div className="item"></div>
    </div>
  );
}

export default Loading;
