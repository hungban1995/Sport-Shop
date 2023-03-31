import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getManyDelete } from "../../../stores/deleteDataReducer";
import { setBackground } from "../../../stores/themeWebReducer";
import "./toastMessage.scss";
function ToastMessage() {
  const { manyDel } = useSelector((state) => state.delete);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
    } catch (error) {
      console.log(error);
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
