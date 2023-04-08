import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./newPost.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IMG_URL } from "../../../../constants";
import { getData, postData } from "../../../../libs/fetchData";
import { useDispatch } from "react-redux";
import { getNotify } from "../../../../stores/notifyReducer";
import LibImages from "../../../../components/LibImages";
import { styleUpload } from "../../../../libs/dataRender";
const schema = yup.object({
  title: yup.string().required(),
});
function NewPost() {
  const [active, setActive] = useState(false);
  const [chooseMany, setChooseMany] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [textValue, setTextValue] = useState("");
  const [postsCat, setPostsCat] = useState([]);
  useEffect(() => {
    const getPostsCat = async () => {
      try {
        const res = await getData("categories-posts/get-all");
        setPostsCat(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getPostsCat();
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data) => {
    const images = chooseMany?.map((item) => item.url);
    const newData = { ...data, content: textValue, images };

    try {
      const res = await postData("posts/create", newData);
      dispatch(
        getNotify({
          status: "success",
          message: res.data.success,
        })
      );
      reset();
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
        <div className="imageUpload">
          <label>Image</label>
          <div className="actionUpload" onClick={() => setActive(true)}>
            {chooseMany.length > 0 ? (
              chooseMany.map((item, idx) => {
                return (
                  <div key={idx} style={{ display: "inline-flex" }}>
                    <img
                      className="viewImg"
                      src={`${IMG_URL}/${item.url}`}
                      alt=""
                    />
                  </div>
                );
              })
            ) : (
              <img
                className="viewImg"
                src="https://t3.ftcdn.net/jpg/02/18/21/86/360_F_218218632_jF6XAkcrlBjv1mAg9Ow0UBMLBaJrhygH.jpg"
                alt=""
              />
            )}
          </div>
          <LibImages
            setChooseMany={setChooseMany}
            active={active}
            style={styleUpload}
            setActive={setActive}
          />
        </div>
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
            <label htmlFor="">Category</label>
            <div className="selectCat">
              {postsCat &&
                postsCat.map((cat, idx) => {
                  return (
                    <label key={idx}>
                      <input
                        value={cat._id}
                        type="checkbox"
                        {...register("category")}
                      />
                      {cat.title}
                    </label>
                  );
                })}
            </div>
          </div>
          <div className="formInput">
            <label htmlFor="">Content</label>
            <CKEditor
              editor={ClassicEditor}
              data={textValue}
              onChange={(event, editor) => {
                const data = editor.getData();
                setTextValue(data);
              }}
            />
          </div>
          <button className="btnCreate" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
