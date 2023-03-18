import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../../libs/fetchData";
import { refreshCatPost } from "../../../stores/categoriesPostReducer";
import { refreshCat } from "../../../stores/categoriesReducer";
import { clearAlert, getNotify } from "../../../stores/notifyReducer";
import { refreshUser } from "../../../stores/usersReducer";
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
        dispatch(refreshUser());
      }
      if (alert?.delete?.type === "category") {
        const res = await deleteData("categories/delete/" + id);
        dispatch(
          getNotify({
            status: "success",
            message: res.data.success,
          })
        );
        dispatch(refreshCat());
      }
      if (alert?.delete?.type === "category-post") {
        const res = await deleteData("categories-posts/delete/" + id);
        dispatch(
          getNotify({
            status: "success",
            message: res.data.success,
          })
        );
        dispatch(refreshCatPost());
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
