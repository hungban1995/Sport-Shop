import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import "./newCategory.scss";
import { setBackground } from "../../../../stores/themeWebReducer";
import { refreshCat, setCreateCat } from "../../../../stores/categoriesReducer";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postData } from "../../../../libs/fetchData";
import { getNotify } from "../../../../stores/notifyReducer";

import { socket } from "../../../../libs/socket";

const schema = yup.object().shape({
  title: yup.string().required(),
});

function NewCategory() {
  const { createCat } = useSelector((state) => state.categories);
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
      const res = await postData("categories/create/", formData);
      dispatch(
        getNotify({
          status: "success",
          message: res.data.success,
        })
      );
      socket.emit("client-message", res.data.category);
      reset();
      dispatch(setBackground(null));
      dispatch(setCreateCat(false));
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
    <div className={"newCat " + (createCat ? "active" : "")}>
      <div className="header">
        <span>Create Category</span>
        <AiOutlineClose
          className="icon"
          onClick={() => {
            dispatch(setBackground(null));
            dispatch(setCreateCat(false));
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
              dispatch(setBackground(null));
              dispatch(setCreateCat(false));
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

export default NewCategory;
