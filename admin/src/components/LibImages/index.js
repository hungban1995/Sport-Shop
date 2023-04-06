import React, { useEffect, useState } from "react";
import "./libImages.scss";
import { getData } from "../../libs/fetchData";
import { IMG_URL } from "../../constants";
import { useSelector } from "react-redux";
import UploadImages from "./uploadImages";
import Pagination from "../QueryData/Pagination";
function LibImages({ setChooseImg }) {
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
    const isSelected = selectedImages.includes(images[idx]);
    if (isSelected) {
      setSelectedImages(selectedImages.filter((img) => img !== images[idx]));
    } else {
      setSelectedImages([...selectedImages, images[idx]]);
    }
  };

  useEffect(() => {
    setChooseImg(selectedImages);
  }, [selectedImages, setChooseImg]);
  return (
    <>
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
    </>
  );
}

export default LibImages;
