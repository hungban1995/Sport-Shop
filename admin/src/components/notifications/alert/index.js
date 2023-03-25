import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../../libs/fetchData";
import { refreshCatPost } from "../../../stores/categoriesPostReducer";
import { refreshCat } from "../../../stores/categoriesReducer";
import { clearAlert, getNotify } from "../../../stores/notifyReducer";
import { refreshPosts } from "../../../stores/postsReducer";
import { refreshVar } from "../../../stores/productVariants";
import { refreshUser } from "../../../stores/usersReducer";
import { refreshProducts } from "../../../stores/productsReducer";

import "./alert.scss";
function AlertDel({ idItem, idDel }) {
  const { alert } = useSelector((state) => state.notify);
  const dispatch = useDispatch();
  const handleAccept = async () => {
    try {
      let res;
      if (alert?.delete?.type === "user") {
        res = await deleteData("users/delete/" + idItem);
        dispatch(refreshUser());
      }
      if (alert?.delete?.type === "category") {
        res = await deleteData("categories/delete/" + idItem);
        dispatch(refreshCat());
      }
      if (alert?.delete?.type === "category-post") {
        res = await deleteData("categories-posts/delete/" + idItem);
        dispatch(refreshCatPost());
      }
      if (alert?.delete?.type === "post") {
        res = await deleteData("posts/delete/" + idItem);
        dispatch(refreshPosts());
      }
      if (alert?.delete?.type === "variant") {
        res = await deleteData("products-variants/delete/" + idItem);
        dispatch(refreshVar());
        idDel(idItem);
      }
      if (alert?.delete?.type === "product") {
        res = await deleteData("products/delete/" + idItem);
        dispatch(refreshProducts());
      }
      dispatch(
        getNotify({
          status: "success",
          message: res.data.success,
        })
      );
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
      style={alert?.style}
      className={`${
        alert?.open && alert?.delete?.id === idItem ? "alert" : "d-none"
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

export default AlertDel;
