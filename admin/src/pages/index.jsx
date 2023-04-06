import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/loading";
import { listStyle, PriceVnd } from "../libs/dataRender";
import { getData } from "../libs/fetchData";
import './home.scss'
function Home() {
  const [ordersSuccess, setOrdersSuccess] = useState(null)
  const [ordersLatest, setOrderLatest] = useState(null);
  const [products, setProducts] = useState(null)
  useEffect(() => {
    const getProducts = async () => {
      try {

        const res = await getData('products/get-all')
        setProducts(res.data.products)
      } catch (error) {
        console.log(error);
        setProducts(null)
      }
    }
    getProducts()
  }, [])
  useEffect(() => {
    const getOrders = async () => {
      try {


        const res = await getData(
          `orders/get-all?filter_by={%22status%22:%22SUCCESS%22}`
        );
        setOrdersSuccess(res.data.orders);

      } catch (error) {
        console.log(error);
        setOrdersSuccess(null);

      }
    };
    getOrders();
  }, []);
  useEffect(() => {
    const getOrdersLatest = async () => {

      try {
        const res = await getData(
          `orders/get-all?sort_by=-createdAt&page=1&page_size=5`
        );
        setOrderLatest(res.data.orders);

      } catch (error) {
        console.log(error);
        setOrderLatest(null);

      }
    };
    getOrdersLatest();
  }, []);
  //render Revenue
  const renderRevenue = (value) => {
    let total = 0
    value.forEach(item => total += item.totalPrice)
    return total
  }
  // render Top sell
  const renderTopSell = (value) => {
    let topSell = 0
  }
  return <div className="home">
    <div className="top">
      <div className="title">
        <span>Tổng quan về bán hàng:</span>
      </div>
    </div>
    <div className="body">
      <div className="item"><h5>Doanh thu</h5>
        <span className="number">{ordersSuccess && PriceVnd(renderRevenue(ordersSuccess))}</span>
      </div>
      <div className="item"><h5>Tổng đơn</h5></div>
      <div className="item"><h5>Mua hàng</h5></div>
      <div className="item">Đồ thị
      </div>
      <div className="item">Danh mục</div>
      <div className="item">
        <div className="headerTable">
          <span>Đơn đặt hàng mới nhất</span>
          <Link to='/orders' className="orderView">Xem đơn đặt hàng</Link>
        </div>
        <table cellSpacing={10} cellPadding={10}>
          <thead>
            <tr>
              <th>OrderId</th>
              <th>Ngày Đặt hàng</th>
              <th>Khách hàng</th>
              <th>Trạng thái</th>
              <th>Phương thức thanh toán</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {ordersLatest ? (
              ordersLatest.map((order, idx) => {
                return (
                  <tr key={idx}>
                    <td>{order._id}</td>
                    <td>{moment(order.createdAt).format("L")}</td>
                    <td>{order.firstName + " " + order.lastName}</td>
                    <td style={listStyle(order.status)}>{order.status}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{PriceVnd(order.totalPrice)}</td>
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
      <div className="item">Top bán chạy
      </div>
    </div>
  </div>
}

export default Home;
