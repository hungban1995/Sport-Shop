import React from "react";
import { useSelector } from "react-redux";
function LoadingData() {
  const { loading } = useSelector((state) => state.notify);
  return (
    <div className={"loading " + (loading ? "active" : "")}>
      <span className="text-loading">Waiting server response...</span>
      <div className="item"></div>
    </div>
  );
}

export default LoadingData;
