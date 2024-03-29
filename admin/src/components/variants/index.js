import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useDispatch } from "react-redux";
import { patchData, postData } from "../../libs/fetchData";
import { getAlert, getNotify } from "../../stores/notifyReducer";
import AlertDel from "../notifications/alert";
import "./variants.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LibImages from "../LibImages";
import { styleUpload } from "../../libs/dataRender";
import { IMG_URL } from "../../constants";
const variantsSchema = yup.object().shape({
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),
  onSale: yup
    .number()
    .test(
      "lessThanPrice",
      "On sale price must be less than equal to price",
      function (value) {
        const price = this.parent.price;
        return value <= price;
      }
    ),
  inStock: yup
    .number()
    .required("InStock is required")
    .min(0, "InStock must be greater than or equal to 0"),
});
function CreateVariants({ setVariantId, variantId, currentVariants }) {
  const [variants, setVariants] = useState([]);
  const [idDel, setIdDel] = useState("");
  const [varUpdate, setVarUpdate] = useState(null);
  const [chooseSingle, setChooseSingle] = useState(null);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(variantsSchema),
    mode: "all",
    defaultValues: {
      attributes: [{ k: "", v: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });
  //set current data
  useEffect(() => {
    if (currentVariants) {
      setVariants(currentVariants);
    }
  }, [currentVariants]);

  //submit data
  const onSubmit = async (data) => {
    const newData = { ...data, image: chooseSingle };
    try {
      let res;
      if (varUpdate?.edit) {
        res = await patchData(
          `products-variants/update/${varUpdate.variant._id}`,
          newData
        );
        variants[varUpdate?.index] = res.data.dataUpdate;
        dispatch(
          getNotify({
            status: "success",
            message: res.data.success,
          })
        );
        reset();
        setVarUpdate(null);
        setChooseSingle(null);
      } else {
        res = await postData("products-variants/create", newData);
        dispatch(
          getNotify({
            status: "success",
            message: res.data.success,
          })
        );
        setVariants([...variants, res.data.variants]);
        setVariantId([...variantId, res.data.variants._id]);
        reset();
        setChooseSingle(null);
      }
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
  useEffect(() => {
    if (!variantId) {
      setVariants([]);
    }
  }, [variantId]);
  useEffect(() => {
    let newVariant = variants.filter((item) => item._id !== idDel);
    setVariants(newVariant);
    let varId = [];
    newVariant.forEach((item) => varId.push(item._id));
    setVariantId(varId);
  }, [idDel]);

  useEffect(() => {
    if (varUpdate?.edit) {
      setValue("sku", varUpdate?.variant?.sku);
      setValue("inStock", varUpdate?.variant?.inStock);
      setValue("price", varUpdate?.variant?.price);
      setValue("onSale", varUpdate?.variant?.onSale);
      setValue("inStock", varUpdate?.variant?.inStock);
      setValue("attributes", varUpdate?.variant?.attributes);
      setChooseSingle(varUpdate?.variant?.image);
    }
  }, [varUpdate, setValue]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-variants">
        <div className="form-group">
          <div className="form-input">
            <label htmlFor="sku">Mã Sản Phẩm</label>
            <input type="text" id="sku" {...register("sku")} />
          </div>
          <div className="form-input">
            <label>In Stock</label>
            <input {...register("inStock")} type="number" />
            {errors.inStock && <span>Field {errors.inStock.message}</span>}
          </div>
        </div>
        <div className="form-group">
          <div className="form-input">
            <label>Price</label>
            <input {...register("price")} type="number" step="1000" />
            {errors.price && <span>Field {errors.price.message}</span>}
          </div>
          <div className="form-input">
            <label>On Sale</label>
            <input {...register("onSale")} type="number" step="1000" />
            {errors.onSale && <span>Field {errors.onSale.message}</span>}
          </div>
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
        {fields.map((field, index) => (
          <div key={field.id} className="form-select">
            <label>{`Thuộc tính ${index + 1}`}</label>
            <input
              placeholder="Tên (Ví dụ:Màu sắc, kích thước...)"
              {...register(`attributes.${index}.k`)}
              type="text"
              defaultValue={field.k}
            />
            <input
              placeholder="Giá trị (Ví dụ: Đen, 120cm...)"
              {...register(`attributes.${index}.v`)}
              type="text"
              defaultValue={field.v}
            />

            <span
              type="button"
              className="action-remove"
              onClick={() => remove(index)}
            >
              <IoIosRemove /> Xóa
            </span>
          </div>
        ))}
        <span
          type="button"
          className="action-add"
          onClick={() => append({ k: "", v: "" })}
        >
          <IoIosAdd /> Thêm
        </span>
        {varUpdate?.edit ? (
          <>
            <button type="submit">Edit</button>
            <button
              className="cancel"
              onClick={() => {
                setVarUpdate(null);
                reset();
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button type="submit">Create</button>
        )}
      </form>
      <table className="table-variants">
        <thead>
          <tr>
            <th>Ma san pham</th>
            <th>Ton Kho</th>
            <th>Gia</th>
            <th>Gia Giam</th>
            <th>Thuoc tinh</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {variants &&
            variants?.map((variant, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <span>{variant.sku}</span> <img src="" alt="" />
                  </td>
                  <td>{variant.inStock}</td>
                  <td>{variant.price}</td>
                  <td>{variant.onSale}</td>
                  <td>
                    {variant.attributes?.map((atb, i) => {
                      return (
                        <li key={i} style={{ listStyle: "none" }}>
                          <span>{atb.k}</span>: <span>{atb.v}</span>
                        </li>
                      );
                    })}
                  </td>
                  <td className="action">
                    <AlertDel idItem={variant._id} idDel={setIdDel} />
                    <span
                      className="edit-button"
                      onClick={() => {
                        setVarUpdate({
                          edit: true,
                          variant: variant,
                          index: idx,
                        });
                      }}
                    >
                      Sửa
                    </span>{" "}
                    <span
                      className="delete-button"
                      onClick={() => {
                        dispatch(
                          getAlert({
                            open: true,
                            delete: {
                              id: variant._id,
                              type: "products-variants",
                            },
                          })
                        );
                      }}
                    >
                      Xóa
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
export default CreateVariants;
