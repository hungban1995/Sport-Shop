import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import "./editOrder.scss";
import { setBackground } from "../../../stores/themeWebReducer";

import { getUpdateOrder, refreshOrders } from "../../../stores/ordersReducer";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { patchData } from "../../../libs/fetchData";
import { getNotify } from "../../../stores/notifyReducer";
import { status } from "../../../constants";
import { socket } from "../../../libs/socket";
const schema = yup.object().shape({
  firstName: yup.string().required(),
});
function EditOrder() {
  const dispatch = useDispatch();
  const { updateOrder } = useSelector((state) => state.orders);
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
  }, [updateOrder, setValue]);
  //update
  const onSubmit = async (data) => {
    try {
      const res = await patchData(
        "orders/update/" + updateOrder?.order?._id,
        data
      );
      dispatch(
        getNotify({
          status: "success",
          message: res.data.success,
        })
      );
      reset();
      socket.emit("client-message", {
        message: "update order",
        sender: res.data.updateBy,
        recipient: updateOrder?.order?.user,
        details: res.data.order,
        ofId: updateOrder?.order?._id,
      });

      dispatch(setBackground(null));
      dispatch(getUpdateOrder(false));
      dispatch(refreshOrders());
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
    <div
      className={"editOrder " + (updateOrder?.edit === true ? "active" : "")}
    >
      <div className="header">
        <span>Order Edit</span>
        <AiOutlineClose
          className="icon"
          onClick={() => {
            dispatch(setBackground(null));
            dispatch(getUpdateOrder(false));
            reset();
          }}
        />
      </div>
      <form className="formCreate" onSubmit={handleSubmit(onSubmit)}>
        {updateOrder?.order?.status === "WAITING" ? (
          <>
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
          </>
        ) : null}
        <label>Status</label>
        <select {...register("status")}>
          {status.map((stt, idx) => {
            return <option key={idx} value={stt} label={stt} />;
          })}
        </select>
        <div className="action">
          <button className="accept" type="submit">
            Cập Nhật
          </button>
          <div
            className="cancel"
            onClick={() => {
              dispatch(setBackground(null));
              dispatch(getUpdateOrder(false));

              reset();
            }}
          >
            Hủy
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditOrder;
