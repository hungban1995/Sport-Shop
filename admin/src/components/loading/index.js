import React from "react";
import "./loading.scss";
function Loading({ loading }) {
  return (
    <div className={loading ? "loading" : "hide"}>
      <div className="item"></div>
    </div>
  );
}

export default Loading;
