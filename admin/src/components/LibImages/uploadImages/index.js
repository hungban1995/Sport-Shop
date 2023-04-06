import React, { useEffect, useState } from "react";
import "./uploadImages.scss";
import { BiUpload } from "react-icons/bi";
import { postData } from "../../../libs/fetchData";
import { useDispatch } from "react-redux";
import { getNotify } from "../../../stores/notifyReducer";
import { refreshImage } from "../../../stores/imagesReducer";

function UploadImages({ multiple }) {
  const [typeUpload, setTypeUpload] = useState(null);
  useEffect(() => {
    if (multiple) {
      setTypeUpload("upload-multiple");
    } else setTypeUpload("upload-single");
  }, [multiple]);
  const dispatch = useDispatch();
  //upload img
  const handleChange = async (e) => {
    e.preventDefault();
    const images = e.target.files;
    const formData = new FormData();
    if (multiple) {
      const fileList = [...images];
      fileList.forEach((item) => {
        formData.append("images", item);
      });
    } else formData.append("image", images[0]);

    try {
      const res = await postData("images/" + typeUpload, formData);
      dispatch(
        getNotify({
          status: "success",
          message: res.data.success,
        })
      );
      dispatch(refreshImage());
    } catch (error) {
      dispatch(
        getNotify({
          status: "error",
          message: error.response.data.error,
        })
      );
    }
  };
  return (
    <div className="uploadImg">
      <BiUpload className="iconUpload" />
      <input
        type="file"
        onChange={handleChange}
        className="imgUpload"
        multiple={multiple}
      />
    </div>
  );
}

export default UploadImages;
