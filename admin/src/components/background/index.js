import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./background.scss";
import { setBackground } from "../../stores/themeWebReducer";
import { setCreateCat, setDataEdit } from "../../stores/categoriesReducer";
function Background() {
  const { background } = useSelector((state) => state.themeWeb);
  const dispatch = useDispatch();
  return (
    <div
      className={"background " + (background ? "active" : "")}
      onClick={() => {
        dispatch(setBackground(false));
        dispatch(setDataEdit(false));
        dispatch(setCreateCat(false));
      }}
    ></div>
  );
}

export default Background;
