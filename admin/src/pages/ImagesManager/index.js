import React, { useState } from "react";
import "./images.scss";
import LibImages from "../../components/LibImages";
import { useDispatch } from "react-redux";
import { getManyDelete } from "../../stores/deleteDataReducer";
import { setBackground } from "../../stores/themeWebReducer";

function ImagesManager() {
  const dispatch = useDispatch();
  const [chooseMany, setChooseMany] = useState([]);
  const handleDelImg = async () => {
    dispatch(setBackground({ active: true, type: "manyDel" }));
    dispatch(
      getManyDelete({
        active: true,
        type: "images",
        accept: "Xóa",
        cancel: "Hủy",
        value: {
          data: chooseMany,
          header: "Xóa nhiều danh mục.",
          body: "Bạn đang xóa nhiều dữ liệu trong một lần! Bạn chắc chắn muốn xóa không?",
        },
      })
    );
  };
  return (
    <div className="images">
      <div className="top">
        <div className="title">
          <p>Thu vien anh:</p>
        </div>
        <div className={"select"}>
          <span
            className={"select-del " + (chooseMany.length > 0 ? "active" : "")}
            onClick={() => {
              handleDelImg();
            }}
          >
            Delete Data
          </span>
        </div>
      </div>
      <div className="body">
        <div className="gridLib">
          <LibImages setChooseMany={setChooseMany} active={true} />
        </div>
      </div>
    </div>
  );
}

export default ImagesManager;
