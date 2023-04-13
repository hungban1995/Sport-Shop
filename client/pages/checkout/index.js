import { IMG_URL } from "@/constant";
import { getData, postData } from "@/libs/fetchData";
import {
  PriceVnd,
  RenderAttribute,
  generateRandomString,
  renderTotal,
  toSlug,
} from "@/libs/helperData";
import { socket } from "@/libs/socket";
import { getCartOrder, getResetCart } from "@/stores/cartReducer";
import { getNotify } from "@/stores/notifyReducer";
import { getOrder } from "@/stores/orderReducer";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup
    .string()
    .required()
    .matches(
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
      "Invalid phone number"
    ),
  address: yup.string().required(),
});
function Checkout() {
  const dispatch = useDispatch();
  const [checkRegister, setCheckRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userById, setUserById] = useState(null);

  const [orderItems, setOrderItems] = useState([]);
  useEffect(() => {
    if (window && window.localStorage.getItem("userId")) {
      setCurrentUser(JSON.parse(localStorage.getItem("userId")));
    }
    if (window && window.localStorage.getItem("cart")) {
      setOrderItems(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      getData("users/get-id/" + currentUser)
        .then((res) => setUserById(res.data.user))
        .catch((err) => console.log(err));
    }
  }, [currentUser]);
  useEffect(() => {
    setValue("firstName", userById?.firstName);
    setValue("lastName", userById?.lastName);
    setValue("email", userById?.email);
    setValue("phoneNumber", userById?.phoneNumber);
    setValue("address", userById?.address);
  }, [userById]);
  const router = useRouter();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  //
  const handleChange = (e) => {
    setCheckRegister(e.target.checked);
  };
  //submit create
  const onSubmit = async (data) => {
    const orderDetail = orderItems.map((item) => ({
      nameProduct: item.nameProduct,
      productVariant: item.productVariant._id,
      quantity: item.quantity,
    }));
    data = { ...data, orderDetail };

    try {
      let user = null;
      if (checkRegister) {
        const firstName = toSlug(data.firstName);
        const randomString = generateRandomString(10);
        const username = `${firstName}-${randomString}`;
        const defaultPassword = "123456";
        const dataUser = {
          ...data,
          username,
          password: defaultPassword,
          confirmPassword: defaultPassword,
        };
        const resUser = await postData("users/register", dataUser);
        console.log("resUse", resUser);
        user = resUser.data.userId;
      } else {
        user = currentUser;
      }
      if (user) {
        data = { ...data, orderDetail, user };
      }
      const orderRes = await postData("orders/create", data);
      console.log("res order", orderRes);
      dispatch(
        getNotify({
          status: "success",
          message: orderRes.data.success,
        })
      );
      dispatch(getOrder(orderRes.data.order));
      socket.emit("client-message", {
        message: "create orders",
        sender: user,
        details: orderRes.data.order,
        ofId: orderRes.data.order._id,
      });
      localStorage.removeItem("cart");
      dispatch(getResetCart());
      router.push("/thankyou");
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
    <div className="checkout">
      <div className="checkout-header">
        <h2>Create you order:</h2>
      </div>
      <div className="checkout-content">
        <div className="checkout-content-form">
          <form className="form-user-order" onSubmit={handleSubmit(onSubmit)}>
            <div className="title-form">
              <span>Delivery Info</span>
            </div>
            <div className="form-group">
              <div className="form-input">
                <label htmlFor="">First Name</label>
                <input {...register("firstName")} />
                {errors.firstName && <span>{errors.firstName.message}</span>}
              </div>
              <div className="form-input">
                <label htmlFor="">Last Name</label>
                <input {...register("lastName")} />
                {errors.lastName && <span>{errors.lastName.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <div className="form-input">
                <label htmlFor="">Email</label>
                <input {...register("email")} type="email" />
                {errors.email && <span>{errors.email.message}</span>}
              </div>

              <div className="form-input">
                <label htmlFor="">Phone Number</label>
                <input {...register("phoneNumber")} type="text" />
                {errors.phoneNumber && (
                  <span>{errors.phoneNumber.message}</span>
                )}
              </div>
            </div>
            <div className="form-input">
              <label htmlFor="">Address</label>
              <input {...register("address")} />
              {errors.address && <span>{errors.address.message}</span>}
            </div>
            <div className="form-input">
              <label htmlFor="">Payment Method</label>
              <select {...register("paymentMethod")}>
                <option value="CASH">Trả tiền khi nhập hàng</option>
                <option value="CREDIT CARD">Chuyển khoản</option>
              </select>
            </div>
            {currentUser === null && (
              <div className="form-input">
                <div className="check-register" htmlFor="">
                  <label htmlFor="">
                    Register account? easily manage your orders!
                  </label>
                  <input
                    className="check-box"
                    type="checkbox"
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            <div className="form-submit">
              <div
                className="back"
                onClick={() => {
                  router.back();
                }}
              >
                <BiArrowBack className="icon" />
                <span>Back to shop</span>
              </div>
              <button type="submit">Create order</button>
            </div>
          </form>
        </div>
        <div className="checkout-content-order">
          <div className="order-items">
            {orderItems.length > 0 ? (
              orderItems.map((item, idx) => {
                return (
                  <div key={idx} className="item-order-product">
                    <div className="item-product-content">
                      <img
                        className="item-img"
                        src={`${IMG_URL}/${item.productVariant.image}`}
                        alt="product"
                      />
                      <ul className="item-content">
                        <span className="item-name">{item.nameProduct}</span>
                        {RenderAttribute(item.productVariant.attributes)}
                      </ul>
                      <div className="item-quantity">
                        <span>{item.quantity}</span>
                      </div>
                    </div>
                    <div className="item-product-price">
                      <span className="item-price">
                        {PriceVnd(item.productVariant.onSale) ||
                          PriceVnd(item.productVariant.onSale)}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                No item! go to <Link href={"/shop"}>Shop</Link>
              </div>
            )}
          </div>
          {orderItems.length > 0 ? (
            <div className="order-total">
              <span className="order-total__content-title">Total: </span>
              <span className="order-total__content-price">
                {renderTotal(orderItems)}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
