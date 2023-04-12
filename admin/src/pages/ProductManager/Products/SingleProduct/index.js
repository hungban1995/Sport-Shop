import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CreateVariants from "../../../../components/variants";
import "./singleProduct.scss";
import { getData, patchData } from "../../../../libs/fetchData";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getNotify } from "../../../../stores/notifyReducer";
import LibImages from "../../../../components/LibImages";
import { styleUpload } from "../../../../libs/dataRender";
import { IMG_URL } from "../../../../constants";
const SingleProduct = () => {
  const { register, handleSubmit, setValue } = useForm({});
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [variantId, setVariantId] = useState([]);
  const [currentVariants, setCurrentVariants] = useState([]);
  const [active, setActive] = useState(false);
  const [chooseMany, setChooseMany] = useState([]);
  //fill data in form
  useEffect(() => {
    const getProduct = async () => {
      try {
        if (id) {
          const res = await getData("products/get-id/" + id);
          setCurrentVariants(res.data.product.variants);
          const { title, description, content, category, variants, images } =
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
          let imgArr = [];
          images?.map((item) => imgArr.push({ url: item }));
          setChooseMany(imgArr);
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
    const images = chooseMany.map((item) => item.url);
    const newData = {
      ...data,
      variants: variantId,
      images,
    };

    try {
      const res = await patchData("products/update/" + id, newData);
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
          status: "error",
          message: error.response.data.error,
        })
      );
    }
  };

  return (
    <div className="singleProduct">
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
        <h1>Update Product:</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <form className="formUpdateProduct" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-input">
              <label htmlFor="title">Tên sản phẩm</label>
              <input type="text" id="title" {...register("title")} />
            </div>

            <div className="form-input">
              <label htmlFor="description">Description</label>
              <textarea id="description" {...register("description")} />
            </div>
            <div className="form-input">
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
            <div className="form-input">
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
