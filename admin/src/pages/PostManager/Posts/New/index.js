import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./newPost.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
const schema = yup.object({
  title: yup.string().required(),
});
function NewPost() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => formData.append(key, data[key]));
  };
  return (
    <div className="newPost">
      <div className="top">
        <div
          className="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <BiArrowBack className="icon" />
          <span>Back</span>
        </div>
        <h1>Add new Post</h1>
      </div>
      <div className="bottom">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formInput">
            <label htmlFor="">Title</label>
            <input {...register("title")} />
            {errors.title && <span>Field {errors.title.message}</span>}
          </div>
          <div className="formInput">
            <label htmlFor="">Description</label>
            <input {...register("description")} />
          </div>
          <div className="formInput">
            <label htmlFor="">Images</label>
            <input type="file" {...register("images")} />
          </div>
          <div className="formInput">
            <label htmlFor="">Content</label>
            <input {...register("content")} />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
