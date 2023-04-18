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
import LibImages from "../../../LibImages";
import { IMG_URL } from "../../../../constants";
import { styleUpload } from "../../../../libs/dataRender";
const schema = yup.object().shape({
  title: yup.string().required(),
});
function UpdateCategoryPost() {
  const [chooseSingle, setChooseSingle] = useState(null);
  const [active, setActive] = useState(false);
  const { catPostEdit } = useSelector((state) => state.categoriesPost);
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  useEffect(() => {
    setCategory(catPostEdit?.category);
  }, [catPostEdit?.category]);
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
    setChooseSingle(category?.image);
  }, [category, setValue]);
  //update
  const onSubmit = async (data) => {
    const image = chooseSingle;
    const newData = { ...data, image };
    const id = category?._id;
    try {
      const res = await patchData("categories-posts/update/" + id, newData);
      dispatch(
        getNotify({
          status: "success",
          message: res.data.success,
        })
      );
      dispatch(setBackground(null));
      dispatch(setCatPostEdit(false));
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
    <div className={"update-cat " + (catPostEdit?.edit ? "active" : "")}>
      <div className="header">
        <span>Edit Category</span>
        <AiOutlineClose
          className="icon"
          onClick={() => {
            dispatch(setBackground(null));
            dispatch(setCatPostEdit(false));
            setChooseSingle(null);
          }}
        />
      </div>
      <div className="image-upload">
        <label>Image</label>
        <div className="action-upload" onClick={() => setActive(true)}>
          {chooseSingle ? (
            <img
              className="view-image"
              src={`${IMG_URL}/${chooseSingle}`}
              alt=""
            />
          ) : (
            <img
              className="view-image"
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
      <form className="form-update" onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register("title")} />
        {errors.title && <span>Field {errors.title.message}</span>}

        <label>Description</label>
        <input {...register("description")} />
        <div className="action">
          <button className="accept" type="submit">
            Cập nhật
          </button>
          <div
            className="cancel"
            onClick={() => {
              dispatch(setBackground(null));
              dispatch(setCatPostEdit(false));
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

export default UpdateCategoryPost;
