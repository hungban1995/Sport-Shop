import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useDispatch } from "react-redux";
import { patchData, postData } from "../../libs/fetchData";
import { getAlert, getNotify } from "../../stores/notifyReducer";
import AlertDel from "../notifications/alert";
import "./variants.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const variantsSchema = yup.object().shape({
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),
  onSale: yup
    .number()
    .test(
      "lessThanPrice",
      "On sale price must be less than regular price",
      function (value) {
        const price = this.parent.price;
        return value < price;
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
    console.log(data);
    const formData = new FormData();
    if (data.image) {
      const fileList = [...data.image];
      fileList.forEach((item) => {
        formData.append("image", item);
      });
    }
    formData.append("sku", data.sku);
    formData.append("inStock", data.inStock);
    formData.append("price", data.price);
    formData.append("onSale", data.onSale);
    formData.append("attributes", JSON.stringify(data.attributes));
    try {
      let res;
      if (varUpdate?.edit) {
        res = await patchData(
          `products-variants/update/${varUpdate.variant._id}`,
          formData
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
      } else {
        res = await postData("products-variants/create", formData);
        dispatch(
          getNotify({
            status: "success",
            message: res.data.success,
          })
        );
        setVariants([...variants, res.data.variants]);
        setVariantId([...variantId, res.data.variants._id]);
        reset();
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
    }
  }, [varUpdate, setValue]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="formVariants">
        <div className="formGroup">
          <div className="formInput">
            <label htmlFor="sku">Mã Sản Phẩm</label>
            <input type="text" id="sku" {...register("sku")} />
          </div>
          <div className="formInput">
            <label>In Stock</label>
            <input {...register("inStock")} type="number" />
            {errors.inStock && <span>Field {errors.inStock.message}</span>}
          </div>
        </div>
        <div className="formGroup">
          <div className="formInput">
            <label>Price</label>
            <input {...register("price")} type="number" step="1000" />
            {errors.price && <span>Field {errors.price.message}</span>}
          </div>
          <div className="formInput">
            <label>On Sale</label>
            <input {...register("onSale")} type="number" step="1000" />
            {errors.onSale && <span>Field {errors.onSale.message}</span>}
          </div>
        </div>
        <div className="formInput">
          <label>Image</label>
          <input {...register("image")} type="file" />
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className="formSelect">
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
              className="actionRemove"
              onClick={() => remove(index)}
            >
              <IoIosRemove /> Xóa
            </span>
          </div>
        ))}
        <span
          type="button"
          className="actionAdd"
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
      <table className="tbVariant">
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
                      className="editBtn"
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
                      className="deleteBtn"
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
