import React, { use, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { getData, patchData, postData } from "../../libs/fetchData";
import { getNotify } from "@/stores/notifyReducer";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { IMG_URL } from "@/constant";
import { PriceVnd, RenderAttribute, listStyle } from "@/libs/helperData";
import { AiOutlineEye } from "react-icons/ai";
import moment from "moment";
import OrderDetail from "@/components/orderDetail";
import { FiEdit } from "react-icons/fi";
import OrderActivity from "@/components/ativityOrder";
const schema = yup.object({
  firstName: yup.string(),
  lastName: yup.string(),
  phoneNumber: yup.string(),
  birthday: yup
    .date()
    .max(new Date(), "Birthday can't be in the future")
    .min(new Date("1900-01-01"), "Birthday must be after 1900-01-01"),
  phoneNumber: yup.string().matches(/^\+84\d{9}$/, "Invalid phone number"),
  password: yup.string(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords does not match"),
});
function Profile() {
  const dispatch = useDispatch();
  const [imagePath, setImagePath] = useState("");
  const [orderByUser, setOrderByUser] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [updateOrder, setUpdateOrder] = useState({ update: false, order: {} });
  const [user, setUser] = useState({});
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (window && window.localStorage.getItem("userId")) {
      setCurrentUser(JSON.parse(localStorage.getItem("userId")));
    }
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

  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          const res1 = await getData("users/get-id/" + currentUser);
          setUser(res1.data.user);
          const res2 = await getData("orders/by-user/" + currentUser);
          setOrderByUser(res2.data.orders);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    const birthday = moment(user?.birthday).format("YYYY-MM-DD");
    setValue("firstName", user?.firstName);
    setValue("lastName", user?.lastName);
    setValue("email", user?.email);
    setValue("phoneNumber", user?.phoneNumber);
    setValue("address", user?.address);
    setValue("username", user?.username);
    setValue("birthday", birthday);
  }, [user, setValue]);
  const onSubmit = async (data) => {
    try {
      const res = await patchData("users/update/" + currentUser, data);
      dispatch(
        getNotify({
          success: true,
          message: res.data.success,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        getNotify({
          error: true,
          message: error.response.data.error,
        })
      );
    }
  };

  return (
    <div className="profile">
      <div className="title">
        <span>My Account</span>
      </div>
      <div className="body">
        <div className="left">
          <h2>Personal Profile</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="upload">
              {/* <input
                type="file"
                name="avatar"
                placeholder="file"
                className="imageUpload"
                onChange={handleChangeAvatar}
              /> */}
              <img
                src={
                  imagePath
                    ? imagePath
                    : "https://t3.ftcdn.net/jpg/02/18/21/86/360_F_218218632_jF6XAkcrlBjv1mAg9Ow0UBMLBaJrhygH.jpg"
                }
                alt="upload"
              />
            </div>
            <div className="formGroup">
              <div className="form-input">
                <label htmlFor="">First Name</label>
                <input {...register("firstName")} />
                {errors.firstName && (
                  <span>Field {errors.firstName.message}</span>
                )}
              </div>
              <div className="form-input">
                <label htmlFor="">Last Name</label>
                <input {...register("lastName")} />
                {errors.lastName && (
                  <span>Field {errors.lastName.message}</span>
                )}
              </div>
            </div>
            <div className="formGroup">
              <div className="form-input">
                <label htmlFor="">Phone</label>
                <input type="string" {...register("phoneNumber")} />
              </div>
              <div className="form-input">
                <label htmlFor="">Birth Day</label>
                <input type="date" {...register("birthday")} />
              </div>
            </div>
            <div className="formGroup">
              <div className="form-input">
                <label htmlFor="">Address</label>
                <input {...register("address")} />
              </div>
            </div>

            <div className="titleForm">
              <span>Sign-In Information</span>
            </div>
            <div className="formGroup">
              <div className="form-input">
                <label htmlFor="">UserName</label>
                <input {...register("username")} type="text" />
              </div>
              <div className="form-input">
                <label htmlFor="">Email</label>
                <input
                  readOnly
                  style={{ backgroundColor: "#888" }}
                  {...register("email")}
                  type="email"
                />
              </div>
            </div>
            <div className="formGroup">
              <div className="form-input">
                <label htmlFor="">Password</label>
                <input {...register("password")} type="password" />
              </div>
              <div className="form-input">
                <label htmlFor="">Confirm Password</label>
                <input {...register("confirmPassword")} type="password" />
                {errors.confirmPassword && (
                  <span>Field {errors.confirmPassword.message}</span>
                )}
              </div>
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
        <div className="right">
          <h2>Danh sánh đơn hàng</h2>
          <div className="cart-table">
            <table
              className="cart-table-show"
              cellPadding={10}
              cellSpacing={10}
            >
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Ngày đặt hàng</th>
                  <th>Trạng Thái</th>
                  <th>Phương thức thanh toán</th>
                  <th>Tổng tiền</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {orderByUser.length > 0 ? (
                  orderByUser.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{item._id}</td>
                        <td>{moment(item.createdAt).format("L")}</td>
                        <td style={listStyle(item.status)}>{item.status}</td>
                        <td>{item.paymentMethod}</td>
                        <td>{PriceVnd(item.totalPrice)}</td>
                        <td>
                          <AiOutlineEye
                            className="view-order"
                            onClick={() => setOrderId(item._id)}
                          />
                          <FiEdit
                            className="update-order"
                            onClick={() => {
                              setUpdateOrder({ update: true, order: item });
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      Your cart is empty. Go to{" "}
                      <Link href={"/shop"}>Shop now</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {orderId ? <OrderActivity orderId={orderId} /> : null}
        </div>
      </div>
      <OrderDetail updateOrder={updateOrder} />
    </div>
  );
}

export default Profile;
