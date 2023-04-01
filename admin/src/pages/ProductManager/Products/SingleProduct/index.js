import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CreateVariants from "../../../../components/variants";
import "./singleProduct.scss";
import { getData, patchData, postData } from "../../../../libs/fetchData";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getNotify } from "../../../../stores/notifyReducer";
const SingleProduct = () => {
  const { register, handleSubmit, setValue, reset } = useForm({});
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [variantId, setVariantId] = useState([]);
  const [currentVariants, setCurrentVariants] = useState([]);
  //fill data in form
  useEffect(() => {
    const getProduct = async () => {
      try {
        if (id) {
          const res = await getData("products/get-id/" + id);
          setCurrentVariants(res.data.product.variants);
          const { title, description, content, category, variants } =
            res.data.product;
          setValue("title", title);
          setValue("description", description);
          setValue("content", content);
          setValue(
            "category",
            category.map((cat) => cat._id)
          );
          let varIdArr = [];
          variants.forEach((item) => varIdArr.push(item._id));
          setVariantId(varIdArr);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id, setValue]);
  //get categories
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
  //submit update
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
    formData.append("variants", JSON.stringify(newData.variants));
    if (newData.category) {
      formData.append("category", JSON.stringify(newData.category));
    }
    try {
      const res = await patchData("products/update/" + id, formData);
      dispatch(
        getNotify({
          status: "success",
          message: res.data.success,
        })
      );
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

  return (
    <div className="newProduct">
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
        <h1>Add new Product:</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="formInput">
              <label htmlFor="title">Tên sản phẩm</label>
              <input type="text" id="title" {...register("title")} />
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

            <button
              className={
                "submitBtn " + (variantId?.length === 0 ? "disable" : "")
              }
              disabled={variantId?.length === 0}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="right">
          <h3>Cấu hình sản phẩm</h3>
          <CreateVariants
            setVariantId={setVariantId}
            variantId={variantId}
            currentVariants={currentVariants}
          />
        </div>
      </div>
    </div>
  );
};
export default SingleProduct;
