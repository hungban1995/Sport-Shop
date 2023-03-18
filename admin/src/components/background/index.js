import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./background.scss";
import { setBackground } from "../../stores/themeWebReducer";
import { setCreateCat, setCatEdit } from "../../stores/categoriesReducer";
import {
  setCatPostEdit,
  setCreateCatPost,
} from "../../stores/categoriesPostReducer";
function Background() {
  const { background } = useSelector((state) => state.themeWeb);
  const dispatch = useDispatch();
  return (
    <div
      className={"background " + (background ? "active" : "")}
      onClick={() => {
        dispatch(setBackground(false));
        dispatch(setCatEdit(false));
        dispatch(setCreateCat(false));
        dispatch(setCatPostEdit(false));
        dispatch(setCreateCatPost(false));
      }}
    ></div>
  );
}

export default Background;
