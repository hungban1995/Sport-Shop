import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../../libs/fetchData";
import { refreshCatPost } from "../../../stores/categoriesPostReducer";
import { refreshCat } from "../../../stores/categoriesReducer";
import { clearAlert, getNotify } from "../../../stores/notifyReducer";
import { refreshPosts } from "../../../stores/postsReducer";
import { refreshVar } from "../../../stores/productVariants";
import { refreshUser } from "../../../stores/usersReducer";
import { refreshProducts } from "../../../stores/productsReducer";
import { refreshOrders } from "../../../stores/ordersReducer";
import "./alert.scss";
const REFRESH_FUNCTIONS = {
  users: refreshUser,
  categories: refreshCat,
  "categories-posts": refreshCatPost,
  posts: refreshPosts,
  "products-variants": refreshVar,
  products: refreshProducts,
  orders: refreshOrders,
};
function AlertDel({ idItem, idDel }) {
  const { alert } = useSelector((state) => state.notify);
  const dispatch = useDispatch();

  const handleAccept = async () => {
    const { type } = alert?.delete || {};
    try {
      const url = `${type}/delete/${idItem}`;
      const res = await deleteData(url);
      if (type === "products-variants") {
        idDel(idItem);
      }
      if (REFRESH_FUNCTIONS[type]) {
        dispatch(REFRESH_FUNCTIONS[type]());
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
