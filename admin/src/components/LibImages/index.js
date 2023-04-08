import React, { useEffect, useState } from "react";
import "./libImages.scss";
import { getData } from "../../libs/fetchData";
import { IMG_URL } from "../../constants";
import { useSelector } from "react-redux";
import UploadImages from "./uploadImages";
import Pagination from "../QueryData/Pagination";
function LibImages({
  setChooseMany,
  active,
  style,
  setActive,
  setChooseSingle,
}) {
  const [images, setImages] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const { refreshImage } = useSelector((state) => state.images);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [count, setCount] = useState(null);
  useEffect(() => {
    const getImages = async () => {
      try {
        const res = await getData(
          `images/?page=${pageNum}&page_size=${pageSize}`
        );
        setImages(res.data.images);
        setCount(res.data.count);
      } catch (error) {
        console.log(error);
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
    if (setChooseMany) {
      setChooseMany(selectedImages);
    }
  }, [selectedImages, setChooseMany]);
  return (
    <div className={"containerImg " + (active ? "active" : "")} style={style}>
      {style ? (
        <div className="actionUpload">
          <span
            className="actionUpload__accept"
            onClick={() => setActive(false)}
          >
            Chọn ảnh
          </span>
          <span
            className="actionUpload__cancel"
            onClick={() => {
              setActive(false);
              setSelectedImages([]);
              if (setChooseSingle) {
                setChooseSingle(null);
              }
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
        {images ? (
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
      />
    </div>
  );
}

export default LibImages;
