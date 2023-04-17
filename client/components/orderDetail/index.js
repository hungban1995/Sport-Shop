import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  firstName: yup.string().required(),
});
function OrderDetail({ updateOrder }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(updateOrder.update);
  }, [updateOrder]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  useEffect(() => {
    setValue("firstName", updateOrder?.order?.firstName);
    setValue("lastName", updateOrder?.order?.lastName);
    setValue("address", updateOrder?.order?.address);
    setValue("phoneNumber", updateOrder?.order?.phoneNumber);
    setValue("status", updateOrder?.order?.status);
    setValue("paymentMethod", updateOrder?.order?.paymentMethod);
  }, [updateOrder, setValue]);
  //update
  const onSubmit = async (data) => {
    // try {
    //   const res = await patchData(
    //     "orders/update/" + updateOrder?.order?._id,
    //     data
    //   );
    //   dispatch(
    //     getNotify({
    //       status: "success",
    //       message: res.data.success,
    //     })
    //   );
    // } catch (error) {
    //   dispatch(
    //     getNotify({
    //       status: "error",
    //       message: error.response.data.error,
    //     })
    //   );
    // }
  };
  return (
    <div className={"editOrder " + (active ? "" : "hide")}>
      <div className="body-order">
        <div className="header-order">
          <span>Order Edit</span>
          <AiOutlineClose className="icon" onClick={() => setActive(false)} />
        </div>
        <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            className="field-form"
            disabled={updateOrder?.order?.status === "WAITING" ? "" : "disable"}
          >
            <label>First Name</label>
            <input {...register("firstName")} />
            {errors.firstName && <span>Field {errors.firstName.message}</span>}
            <label>Last Name</label>
            <input {...register("lastName")} />
            {errors.lastName && <span>Field {errors.lastName.message}</span>}
            <label>Address</label>
            <input {...register("address")} />
            <label>Phone Number</label>
            <input {...register("phoneNumber")} />
            <label>Phương thức thanh toán</label>
            <select {...register("paymentMethod")}>
              <option value="CASH">Tiền mặt</option>
              <option value="CREDIT CARD">Thanh toán bằng thẻ</option>
            </select>
          </fieldset>
          {updateOrder?.order?.status === "WAITING" ? (
            <div className="action">
              <button className="accept" type="submit">
                Cập Nhật
              </button>
              <div className="cancel" onClick={() => setActive(false)}>
                Hủy
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default OrderDetail;
