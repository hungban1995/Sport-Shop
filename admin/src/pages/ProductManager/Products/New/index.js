import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CreateVariants from "../../../../components/variants";
import "./newProduct.scss";
import { getData, postData } from "../../../../libs/fetchData";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getNotify } from "../../../../stores/notifyReducer";

const schema = yup.object({
  title: yup.string().required(),
});
const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [variantId, setVariantId] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      try {
        const res = await getData("categories/get-all");
        setCategories(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getCat();
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data) => {
    const newData = {
      ...data,
      variants: variantId,
      category: data.category || [],
    };
    console.log(newData);
    const formData = new FormData();
    formData.append("title", newData.title);
    formData.append("description", newData.description);
    formData.append("content", newData.content);
    if (newData.images) {
      const fileList = [...newData.images];
      fileList.forEach((item) => {
        formData.append("images", item);
      });
    }
    formData.append("category", JSON.stringify(newData.category));
    formData.append("variants", JSON.stringify(newData.variants));
    try {
      const res = await postData("products/create", formData);
      dispatch(
        getNotify({
          status: "success",
          message: res.data.success,
        })
      );
      reset();
      setVariantId([]);
    } catch (error) {
      console.log(error);
      dispatch(
        getNotify({
          status: "success",
          message: error.data.success,
        })
      );
    }
  };
  useEffect(() => {
    if (variantId.length > 0) {
      window.onbeforeunload = function () {
        return true;
      };
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, [variantId]);
  return (
    <div className="newProduct">
      <div className="top">
        <div className="back" onClick={() => navigate(-1)}>
          <BiArrowBack className="icon" />
          <span>Back</span>
        </div>
        <h1>Add new Product:</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="formInput">
              <label htmlFor="title">Tên sản phẩm</label>
              <input type="text" id="title" {...register("title")} />
              {errors.title && <span>Field {errors.title.message}</span>}
            </div>

            <div className="formInput">
              <label htmlFor="description">Description</label>
              <textarea id="description" {...register("description")} />
            </div>
            <div className="formInput">
              <label htmlFor="">Category</label>
              <div className="selectCat">
                {categories &&
                  categories.map((cat, idx) => {
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
              <label htmlFor="images">Images</label>
              <input type="file" id="images" multiple {...register("images")} />
            </div>
            <div className="formInput">
              <label htmlFor="content">Content</label>
              <CKEditor
                editor={ClassicEditor}
                name="content"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setValue("content", data);
                }}
              />
            </div>
            <div className="btnSubmit">
              <button
                className={
                  "submitBtn " + (variantId?.length === 0 ? "disable" : "")
                }
                disabled={variantId?.length === 0}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="right">
          <h3>Cấu hình sản phẩm</h3>
          <CreateVariants setVariantId={setVariantId} variantId={variantId} />
        </div>
      </div>
    </div>
  );
};
export default CreateProduct;
