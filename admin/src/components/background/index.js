import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./background.scss";
import { setBackground } from "../../stores/themeWebReducer";
import { setDataEdit } from "../../stores/categoriesReducer";
function Background() {
  const { background } = useSelector((state) => state.themeWeb);
  const dispatch = useDispatch();
  useEffect(() => {}, [background]);
  return (
    <div
      className={"background " + (background ? "active" : "")}
      onClick={() => {
        dispatch(setBackground(false));
        dispatch(setDataEdit(false));
      }}
    ></div>
  );
}

export default Background;
