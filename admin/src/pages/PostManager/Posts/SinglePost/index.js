import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import "./singlePost.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IMG_URL } from "../../../../constants";
import { getData, patchData } from "../../../../libs/fetchData";
import { useDispatch } from "react-redux";
import { getNotify } from "../../../../stores/notifyReducer";
import LibImages from "../../../../components/LibImages";
import { styleUpload } from "../../../../libs/dataRender";
const schema = yup.object({
  title: yup.string().required(),
});
function SinglePost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [textValue, setTextValue] = useState("");
  const [postsCat, setPostsCat] = useState([]);
  const [active, setActive] = useState(false);
  const [chooseMany, setChooseMany] = useState([]);
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
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  //setDefault Value
  useEffect(() => {
    let controller = new AbortController();

    const getPostData = async () => {
      try {
        const res = await getData(`posts/get-id/${id}`, controller.signal);
        const { title, description, images, content, category } = res.data.post;
        controller = null;
        setValue("title", title);
        setValue("description", description);
        setTextValue(content);
        setValue(
          "category",
          category.map((cat) => cat._id)
        );
        let imgArr = [];
        images?.map((item) => imgArr.push({ url: item }));
        setChooseMany(imgArr);
      } catch (error) {
        console.log(error);
      }
    };
    getPostData();
    return () => {
      let test = controller?.abort();
      console.log(test);
    };
  }, [id, setValue, setTextValue]);

  //update
  const onSubmit = async (data) => {
    const images = chooseMany?.map((item) => item.url);
    const newData = { ...data, content: textValue, images };
    try {
      const res = await patchData("posts/update/" + id, newData);
      dispatch(
        getNotify({
          status: "success",
          message: res.data.success,
        })
      );
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
        <h1>Edit Post:</h1>
      </div>
      <div className="bottom">
        <div className="image-upload">
          <label>Image</label>
          <div className="action-upload" onClick={() => setActive(true)}>
            {chooseMany.length > 0 ? (
              chooseMany.map((item, idx) => {
                return (
                  <div key={idx} style={{ display: "inline-flex" }}>
                    <img
                      className="view-image"
                      src={`${IMG_URL}/${item?.url}`}
                      alt=""
                    />
                  </div>
                );
              })
            ) : (
              <img
                className="view-image"
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
          <div className="form-input">
            <label htmlFor="">Title</label>
            <input {...register("title")} />
            {errors.title && <span>Field {errors.title.message}</span>}
          </div>
          <div className="form-input">
            <label htmlFor="">Description</label>
            <input {...register("description")} />
          </div>
          <div className="form-input">
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
          <div className="form-input">
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default SinglePost;
