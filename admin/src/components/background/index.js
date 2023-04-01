import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./background.scss";
import { setBackground } from "../../stores/themeWebReducer";
import { setCreateCat, setCatEdit } from "../../stores/categoriesReducer";
import {
  setCatPostEdit,
  setCreateCatPost,
} from "../../stores/categoriesPostReducer";
import { getUpdateOrder } from "../../stores/ordersReducer";
import { getManyDelete } from "../../stores/deleteDataReducer";
const ACTION_DISPATCH = {
  editCat: setCatEdit,
  createCat: setCreateCat,
  editCatPost: setCatPostEdit,
  createCatPost: setCreateCatPost,
  editOrder: getUpdateOrder,
  manyDel: getManyDelete,
};
function Background() {
  const { background } = useSelector((state) => state.themeWeb);
  const dispatch = useDispatch();
  return (
    <div
      className={"background " + (background?.active ? "active" : "")}
      onClick={() => {
        const { type } = background;
        if (ACTION_DISPATCH[type]) {
          dispatch(ACTION_DISPATCH[type]());
        }
        dispatch(setBackground(null));
      }}
    ></div>
  );
}

export default Background;
