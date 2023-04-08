import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import "./newCategoriesPost.scss";
import { setBackground } from "../../../../stores/themeWebReducer";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postData } from "../../../../libs/fetchData";
import { getNotify } from "../../../../stores/notifyReducer";
import {
  refreshCatPost,
  setCreateCatPost,
} from "../../../../stores/categoriesPostReducer";
import LibImages from "../../../LibImages";
import { styleUpload } from "../../../../libs/dataRender";
import { IMG_URL } from "../../../../constants";
const schema = yup.object().shape({
  title: yup.string().required(),
});
function NewCategoryPost() {
  const [chooseSingle, setChooseSingle] = useState(null);
  const [active, setActive] = useState(false);
  const { createCatPost } = useSelector((state) => state.categoriesPost);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  //create
  const onSubmit = async (data) => {
    const newData = { ...data, image: chooseSingle };

    try {
      const res = await postData("categories-posts/create/", newData);
      setChooseSingle(null);

      dispatch(
        getNotify({
          status: "success",
          message: res.data.success,
        })
      );
      reset();
      dispatch(setBackground(null));
      dispatch(setCreateCatPost(false));
      dispatch(refreshCatPost());
      setChooseSingle(null);
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
    <div className={"newCat " + (createCatPost ? "active" : "")}>
      <div className="header">
        <span>Create Category</span>
        <AiOutlineClose
          className="icon"
          onClick={() => {
            dispatch(setBackground(null));
            dispatch(setCreateCatPost(false));
            setChooseSingle(null);

            reset();
          }}
        />
      </div>
      <div className="imageUpload">
        <label>Image</label>
        <div className="actionUpload" onClick={() => setActive(true)}>
          {chooseSingle ? (
            <img
              className="viewImg"
              src={`${IMG_URL}/${chooseSingle}`}
              alt=""
            />
          ) : (
            <img
              className="viewImg"
              src="https://t3.ftcdn.net/jpg/02/18/21/86/360_F_218218632_jF6XAkcrlBjv1mAg9Ow0UBMLBaJrhygH.jpg"
              alt=""
            />
          )}
        </div>
        <LibImages
          setChooseSingle={setChooseSingle}
          active={active}
          style={styleUpload}
          setActive={setActive}
        />
      </div>
      <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register("title")} />
        {errors.title && <span>Field {errors.title.message}</span>}
        <label>Description</label>
        <input {...register("description")} />
        <div className="action">
          <button className="accept" type="submit">
            Thêm mới
          </button>
          <div
            className="cancel"
            onClick={() => {
              dispatch(setBackground(null));
              dispatch(setCreateCatPost(false));
              reset();
              setChooseSingle(null);
            }}
          >
            Hủy
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewCategoryPost;
