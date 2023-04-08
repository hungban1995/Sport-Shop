import React, { useEffect, useState } from "react";
import FilterData from "../../components/QueryData/Filter";
import AlertDel from "../../components/notifications/alert";
import { getData } from "../../libs/fetchData";
import "./orders.scss";
import { AiOutlineDelete } from "react-icons/ai";
import moment from "moment";
import { listStyle, PriceVnd } from "../../libs/dataRender";
import { useDispatch, useSelector } from "react-redux";
import { getAlert } from "../../stores/notifyReducer";
import { useNavigate } from "react-router-dom";
import SortData from "../../components/QueryData/Sort";
import { setBackground } from "../../stores/themeWebReducer";
import { getManyDelete } from "../../stores/deleteDataReducer";
import { status, valueSortOrder } from "../../constants";
import Pagination from "../../components/QueryData/Pagination";
function OrderS() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refreshOrders } = useSelector((state) => state.orders);
  const [orders, setOrder] = useState(null);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [sort_by, set_sort_by] = useState("");
  const [filter_by, set_filter_by] = useState("");
  const [page_num, set_page_num] = useState(1);
  const [page_size, set_page_size] = useState(5);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await getData(
          `orders/get-all?page=${page_num}&page_size=${page_size}&sort_by=${sort_by}&filter_by=${filter_by}`
        );
        setOrder(res.data.orders);
        setCount(res.data.count);
      } catch (error) {
        console.log(error);
        setOrder(null);
      }
    };
    getOrders();
  }, [refreshOrders, sort_by, filter_by, page_num, page_size]);
  //select all
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(orders.map((list) => list._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  const handleChange = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  return (
    <div className="orders">
      <div className="top">
        <span>Danh sách đơn hàng:</span>
        <div className={"select"}>
          <span
            className={"selectDel " + (isCheck.length > 0 ? "active" : "")}
            onClick={() => {
              dispatch(setBackground({ active: true, type: "manyDel" }));
              dispatch(
                getManyDelete({
                  active: true,
                  accept: "Xóa",
                  cancel: "Hủy",
                  value: {
                    isCheck: isCheck,
                    header: "Xóa nhiều đơn hàng.",
                    body: "Bạn đang xóa nhiều dữ liệu trong một lần! Bạn chắc chắn muốn xóa không?",
                  },
                })
              );
            }}
          >
            <AiOutlineDelete /> Delete Data
          </span>
          <SortData valueSort={valueSortOrder} set_sort_by={set_sort_by} />
          <FilterData
            valueFilter={status}
            typeFilter={{ name: "Trạng thái", value: "status" }}
            set_filter_by={set_filter_by}
          />
        </div>
      </div>
      <div className="body">
        <div className="tableData">
          <table cellSpacing={10} cellPadding={10}>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" onChange={handleSelectAll} />
                </th>
                <th>OrderId</th>
                <th>Ngày Đặt hàng</th>
                <th>Khách hàng</th>
                <th>Trạng thái</th>
                <th>Phương thức thanh toán</th>
                <th>Tổng tiền</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders ? (
                orders.map((order, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
                        <input
                          type="checkbox"
                          id={order._id}
                          onChange={handleChange}
                          checked={isCheck.includes(order._id)}
                        />
                      </td>
                      <td>{order._id}</td>
                      <td>{moment(order.createdAt).format("L")}</td>
                      <td>{order.firstName + " " + order.lastName}</td>
                      <td style={listStyle(order.status)}>{order.status}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{PriceVnd(order.totalPrice)}</td>
                      <td className="action">
                        <AlertDel idItem={order._id} />
                        <span
                          className="editBtn"
                          onClick={() => {
                            navigate(order._id);
                          }}
                        >
                          Chi Tiết
                        </span>
                        {"  "}
                        <span
                          className="deleteBtn"
                          onClick={() => {
                            dispatch(
                              getAlert({
                                open: true,
                                delete: { id: order._id, type: "orders" },
                              })
                            );
                          }}
                        >
                          Xóa
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>Order not found!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          count={count}
          pageSize={set_page_size}
          pageNum={set_page_num}
          lengthItem={orders?.length}
        />
      </div>
    </div>
  );
}

export default OrderS;
