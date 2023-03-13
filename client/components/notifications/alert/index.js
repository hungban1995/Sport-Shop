import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../../libs/fetchData";
import { clearAlert, getAlert, getNotify } from "../../../stores/notifyReducer";
function Popover({ id }) {
  const { alert } = useSelector((state) => state.notify);
  const dispatch = useDispatch();
  const handleAccept = async () => {
    try {
      if (alert && alert.delete.user) {
        const res = await deleteData("users/delete/" + id);
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
    dispatch(getAlert({}));
  };

  return (
    <div
      className={`${
        alert?.open && alert?.delete?.user === id ? "alert" : "d-none"
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
            dispatch(getAlert());
          }}
        >
          Hủy
        </button>
      </div>
    </div>
  );
}

export default Popover;
