import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getManyDelete } from "../../../stores/deleteDataReducer";
import { setBackground } from "../../../stores/themeWebReducer";
import "./toastMessage.scss";
import { getNotify } from "../../../stores/notifyReducer";
import { postData } from "../../../libs/fetchData";
import { refreshImage } from "../../../stores/imagesReducer";
const TYPE_DEL = {
  images: refreshImage,
};

function ToastMessage() {
  const { manyDel } = useSelector((state) => state.delete);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const res = await postData(`${manyDel.type}/delete`, {
        [manyDel.type]: manyDel.value.data,
      });
      console.log(res);
      dispatch(
        getNotify({
          status: "success",
          message: res.data.success,
        })
      );
      dispatch(TYPE_DEL[manyDel.type]());
      dispatch(getManyDelete(null));
      dispatch(setBackground(null));
    } catch (error) {
      console.log(error);
      dispatch(
        getNotify({
          status: "error",
          message: error.response.data.error,
        })
      );
    }
  };
  return (
    <div className={manyDel?.active ? "toastContainer" : "hidden"}>
      <div className="header">
        <span>{manyDel?.value?.header}</span>
        <AiOutlineClose
          className="icon"
          onClick={() => {
            dispatch(setBackground(null));
            dispatch(getManyDelete(null));
          }}
        />
      </div>
      <div className="body">
        <span>{manyDel?.value?.body}</span>
      </div>
      <div className="footer">
        <button className="accept" onClick={handleDelete}>
          {manyDel?.accept}
        </button>
        <button
          className="cancel"
          onClick={() => {
            dispatch(setBackground(null));
            dispatch(getManyDelete(null));
          }}
        >
          {manyDel?.cancel}
        </button>
      </div>
    </div>
  );
}

export default ToastMessage;
