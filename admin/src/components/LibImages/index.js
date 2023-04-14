import React, { useEffect, useState } from "react";
import "./libImages.scss";
import { getData } from "../../libs/fetchData";
import { IMG_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import UploadImages from "./uploadImages";
import Pagination from "../QueryData/Pagination";
import { getLoading } from "../../stores/notifyReducer";
function LibImages({
  setChooseMany,
  active,
  style,
  setActive,
  setChooseSingle,
}) {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const { refreshImage } = useSelector((state) => state.images);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(null);
  useEffect(() => {
    const getImages = async () => {
      try {
        dispatch(getLoading(true));
        const res = await getData(
          `images/?page=${pageNum}&page_size=${pageSize}`
        );
        setImages(res.data.images);
        setCount(res.data.count);
        dispatch(getLoading(false));
      } catch (error) {
        console.log(error);
        dispatch(getLoading(false));
      }
    };
    getImages();
    setSelectedImages([]);
  }, [refreshImage, pageNum, pageSize]);

  //choseImg
  const handleChooseImg = (idx) => {
    const selectedImage = images[idx];
    if (setChooseSingle) {
      setChooseSingle(selectedImage.url);
      setActive(false);
    } else {
      const isSelected = selectedImages.includes(selectedImage);
      if (isSelected) {
        setSelectedImages(
          selectedImages.filter((img) => img !== selectedImage)
        );
      } else {
        setSelectedImages([...selectedImages, selectedImage]);
      }
    }
  };

  
  
    useEffect(() => {

    if (!style && setChooseMany) {
      setChooseMany(selectedImages);
    }
  }, [style, selectedImages]);
  //select accept
  const handleAccept = () => {
    if (setChooseMany) {
      setChooseMany(selectedImages);
    }
    setActive(false);
  };

  return (
    <div className={"containerImg " + (active ? "active" : "")} style={style}>
      {style ? (
        <div className="actionUpload">
          <span className="actionUpload__accept" onClick={() => handleAccept()}>
            Chọn ảnh
          </span>
          <span
            className="actionUpload__cancel"
            onClick={() => {
              setActive(false);
              setSelectedImages([]);
            }}
          >
            Hủy
          </span>
        </div>
      ) : null}
      <div className="libImages">
        <div className={selectedImages.length > 0 ? "hideImg" : ""}>
          <UploadImages multiple={true} />
        </div>
        {images.length > 0 ? (
          images.map((item, idx) => {
            return (
              <div
                key={idx}
                className={
                  selectedImages.includes(item)
                    ? "imageItem active"
                    : "imageItem"
                }
              >
                <img
                  className={
                    selectedImages.length > 0 && !selectedImages.includes(item)
                      ? "hideImg"
                      : ""
                  }
                  src={`${IMG_URL}/${item.url}`}
                  alt={item.alt}
                  onClick={() => handleChooseImg(idx)}
                />
              </div>
            );
          })
        ) : (
          <div> Not found</div>
        )}
      </div>
      <Pagination
        count={count}
        pageSize={setPageSize}
        pageNum={setPageNum}
        lengthItem={images?.length}
        values={[10, 20, 30]}
      />
    </div>
  );
}

export default LibImages;
