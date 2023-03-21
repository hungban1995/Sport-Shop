import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import "./updateCategoriesPost.scss";
import { setBackground } from "../../../../stores/themeWebReducer";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { patchData } from "../../../../libs/fetchData";
import { getNotify } from "../../../../stores/notifyReducer";
import {
  refreshCatPost,
  setCatPostEdit,
} from "../../../../stores/categoriesPostReducer";
const schema = yup.object().shape({
  title: yup.string().required(),
});
function UpdateCategoryPost() {
  const { catPostEdit } = useSelector((state) => state.categoriesPost);
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  useEffect(() => {
    setCategory(catPostEdit.category);
  }, [catPostEdit.category]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  useEffect(() => {
    setValue("title", category?.title);
    setValue("description", category?.description);
  }, [category, setValue]);
  //update
  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.image) {
      const fileList = [...data.image];
      fileList.forEach((item) => {
        formData.append("image", item);
      });
    } else formData.append("image", category.image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    const id = category?._id;
    try {
      const res = await patchData("categories-posts/update/" + id, formData);
      dispatch(
        getNotify({
          status: "success",
          message: res.data.success,
        })
      );
      dispatch(setBackground(false));
      dispatch(setCatPostEdit(false));
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
    <div className={"updateCat " + (catPostEdit?.edit ? "active" : "")}>
      <div className="header">
        <span>Edit Category</span>
        <AiOutlineClose
          className="icon"
          onClick={() => {
            dispatch(setBackground(false));
            dispatch(setCatPostEdit(false));
          }}
        />
      </div>
      <form className="formUpdate" onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register("title")} />
        {errors.title && <span>Field {errors.title.message}</span>}
        <label>Image</label>
        <input type="file" {...register("image")} />
        <label>Description</label>
        <input {...register("description")} />
        <div className="action">
          <button className="accept" type="submit">
            Cập nhật
          </button>
          <div
            className="cancel"
            onClick={() => {
              dispatch(setBackground(false));
              dispatch(setCatPostEdit(false));
            }}
          >
            Hủy
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateCategoryPost;