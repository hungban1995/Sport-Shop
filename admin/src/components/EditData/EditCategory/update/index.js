import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import "./updateCategory.scss";
import { setBackground } from "../../../../stores/themeWebReducer";
import { refreshCat, setCatEdit } from "../../../../stores/categoriesReducer";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { patchData } from "../../../../libs/fetchData";
import { getNotify } from "../../../../stores/notifyReducer";
const schema = yup.object().shape({
  title: yup.string().required(),
});
function UpdateCategory() {
  const { catEdit } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  useEffect(() => {
    setCategory(catEdit.category);
  }, [catEdit.category]);
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
      const res = await patchData("categories/update/" + id, formData);
      dispatch(
        getNotify({
          status: "success",
          message: res.data.success,
        })
      );
      dispatch(setBackground(false));
      dispatch(setCatEdit(false));
      dispatch(refreshCat());
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
    <div className={"updateCat " + (catEdit?.edit ? "active" : "")}>
      <div className="header">
        <span>Edit Category</span>
        <AiOutlineClose
          className="icon"
          onClick={() => {
            dispatch(setBackground(false));
            dispatch(setCatEdit(false));
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
              dispatch(setCatEdit(false));
            }}
          >
            Hủy
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateCategory;
