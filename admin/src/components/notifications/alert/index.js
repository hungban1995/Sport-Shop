import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../../libs/fetchData";
import { clearAlert, getNotify } from "../../../stores/notifyReducer";
import "./alert.scss";
function Popover({ id }) {
  const { alert } = useSelector((state) => state.notify);
  const dispatch = useDispatch();
  const handleAccept = async () => {
    try {
      if (alert?.delete?.type === "user") {
        const res = await deleteData("users/delete/" + id);
        dispatch(
          getNotify({
            status: "success",
            message: res.data.success,
          })
        );
      }
      if (alert?.delete?.type === "category") {
        const res = await deleteData("categories/delete/" + id);
        dispatch(
          getNotify({
            status: "success",
            message: res.data.success,
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        getNotify({
          status: "error",
          message: error.response.data.error,
        })
      );
    }
    dispatch(clearAlert());
  };

  return (
    <div
      className={`${
        alert?.open && alert?.delete?.id === id ? "alert" : "d-none"
      }`}
    >
      <div className="content">Bạn chắc chắn muốn xóa chứ!</div>
      <div className="action">
        <button
          className="accept"
          onClick={() => {
            handleAccept();
          }}
        >
          Chấp nhận
        </button>
        <button
          className="cancel"
          onClick={() => {
            dispatch(clearAlert());
          }}
        >
          Hủy
        </button>
      </div>
    </div>
  );
}

export default Popover;
