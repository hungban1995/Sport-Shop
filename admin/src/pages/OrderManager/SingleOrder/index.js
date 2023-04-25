import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiArrowBack, BiMailSend, BiPhoneCall } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditOrder from "../../../components/EditData/EditOrder";
import { BLANK_AVT, IMG_URL } from "../../../constants";
import { listStyle, PriceVnd } from "../../../libs/dataRender";
import { getData } from "../../../libs/fetchData";
import { getUpdateOrder } from "../../../stores/ordersReducer";
import { setBackground } from "../../../stores/themeWebReducer";
import "./orderSingle.scss";
function SingleOrder() {
  const { refreshOrders } = useSelector((state) => state.orders);
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await getData("orders/get-order/" + id);
        setOrder(res.data.order);
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, [id, refreshOrders]);
  if (!order) return <div>Order not found</div>;
  return (
    <div className="orderSingle">
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
        <div className="title">
          <div className="titleName">
            <h1>Order #{order._id}</h1>
            <span style={listStyle(order.status, true)}>{order.status}</span>
          </div>
          <div className="date">{moment(order.createdAt).format("LLL")}</div>
        </div>
        <div
          className={
            "edit " +
            (order?.status === "SUCCESS" || order?.status === "CANCEL"
              ? "disable"
              : "")
          }
          onClick={
            order?.status === "SHIPPING" || order?.status === "WAITING"
              ? () => {
                  dispatch(getUpdateOrder({ edit: true, order: order }));
                  dispatch(setBackground({ active: true, type: "edit-order" }));
                }
              : undefined
          }
        >
          <AiOutlineEdit /> Edit
        </div>
      </div>
      <div className="center">
        <div className="orderProduct">
          <table cellPadding={10} cellSpacing={10}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetail.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <ul>
                        <li>
                          <img
                            className="cellProductImg"
                            src={`${IMG_URL}/${item.productVariant?.image}`}
                            alt="variant"
                          />
                        </li>
                        <li>
                          <span>
                            {item.product.title}{" "}
                            <ul>
                              {item.productVariant.attributes.map((atb, i) => {
                                return (
                                  <li key={i}>
                                    {atb.k && atb.v ? (
                                      <>
                                        {atb.k}: {atb.v}
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </span>
                        </li>
                      </ul>
                    </td>
                    <td>
                      {PriceVnd(
                        item.productVariant.onSale || item.productVariant.price
                      )}
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                      {PriceVnd(
                        (item.productVariant.onSale ||
                          item.productVariant.price) * item.quantity
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="total">
            <h3>Payment Summary</h3>
            <span>{PriceVnd(order.totalPrice)}</span>
          </div>
        </div>
        <div className="orderUser">
          <div className="info">
            <h3>Customer</h3>
            <span>
              <img src={BLANK_AVT} alt="" />
              {order.firstName} {order.lastName}
            </span>
          </div>
          <div className="contact">
            <span className="contactName">
              <BiMailSend /> <span>{order.email}</span>
            </span>
            <span>
              <BiPhoneCall /> <span>{order.phoneNumber}</span>
            </span>
          </div>
          <div className="address">
            <h3>Shipping Address</h3>
            <span>{order.address}</span>
          </div>
        </div>
      </div>
      <EditOrder />
    </div>
  );
}

export default SingleOrder;
