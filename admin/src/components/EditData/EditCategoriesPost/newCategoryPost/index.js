import React from "react";
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
const schema = yup.object().shape({
  title: yup.string().required(),
});
function NewCategoryPost() {
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
    const formData = new FormData();
    if (data.image) {
      const fileList = [...data.image];
      fileList.forEach((item) => {
        formData.append("image", item);
      });
    }
    formData.append("title", data.title);
    formData.append("description", data.description);

    try {
      const res = await postData("categories-posts/create/", formData);
      dispatch(
        getNotify({
          status: "success",
          message: res.data.success,
        })
      );
      reset();
      dispatch(setBackground(false));
      dispatch(setCreateCatPost(false));
      dispatch(refreshCatPost());
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
            dispatch(setBackground(false));
            dispatch(setCreateCatPost(false));
            reset();
          }}
        />
      </div>
      <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register("title")} />
        {errors.title && <span>Field {errors.title.message}</span>}
        <label>Image</label>
        <input type="file" {...register("image")} />
        <label>Description</label>
        <input {...register("description")} />
        <div className="action">
          <button className="accept" type="submit">
            Thêm mới
          </button>
          <div
            className="cancel"
            onClick={() => {
              dispatch(setBackground(false));
              dispatch(setCreateCatPost(false));
              reset();
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
