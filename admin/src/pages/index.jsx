import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listStyle, PriceVnd, renderNumber } from "../libs/dataRender";
import { getData } from "../libs/fetchData";
import './home.scss'
import { BLANK_IMG, IMG_URL } from "../constants";
import DoughnutChart from "../components/ChartData/doughnut";
import LineChart from "../components/ChartData/lineChart";
import { useDispatch } from "react-redux";
import { getLoading } from "../stores/notifyReducer";
function Home() {
  const dispatch = useDispatch()
  const [data, setData] = useState({ ordersSuccess: null, ordersLatest: null, products: null, countOrder: null })
  useEffect(() => {
    //create a controller
    let controller = new AbortController()
    const fetchData = async () => {
      try {
        dispatch(getLoading(true))
        const res = await Promise.all([
          getData('products/get-all?sort_by={%22sold%22:-1}&page=1&page_size=5', controller.signal),
          getData(
            `orders/get-all?filter_by={%22status%22:%22SUCCESS%22}`, controller.signal
          ), getData(
            `orders/count`, controller.signal
          ),
          getData(
            `orders/get-all?sort_by=%22-createdAt%22&page=1&page_size=5`, controller.signal
          )
        ])
        setData({ ordersSuccess: res[1].data.orders, ordersLatest: res[3].data.orders, products: res[0].data.products, countOrder: res[2].data.count })
        dispatch(getLoading(false))
        // remove the controller
        controller = null
      } catch (error) {
        console.log(error);
        dispatch(getLoading(false))
      }
    }
    fetchData()
    //aborts the request when the component umounts
    return () => controller?.abort()
  }, [])
  //render Revenue
  const renderRevenue = (value) => {
    let total = 0
    value.forEach(item => total += item.totalPrice)
    return total
  }
  return <div className="home">
    <div className="top">
      <div className="title">
        <h3>Tổng quan về bán hàng:</h3>
      </div>
    </div>
    <div className="bodyHome">
      <div className="itemHome"><h5>Doanh thu</h5>
        <span className="number">{data.ordersSuccess && PriceVnd(renderRevenue(data.ordersSuccess))}</span>
      </div>
      <div className="itemHome"><h5>Đơn hàng thành công</h5>
        <span className="number"> {data.ordersSuccess ? data.ordersSuccess.length : 0}</span>
      </div>
      <div className="itemHome"><h5>Tổng đơn mua</h5>

        <span className="number"> {data.countOrder}</span>
      </div>
      <div className="itemHome"><h5>Báo cáo</h5>
        <LineChart />
      </div>
      <div className="itemHome"><h5>Danh mục hàng</h5>
        <DoughnutChart />
      </div>
      <div className="itemHome">
        <div className="headerItem">
          <span>Đơn đặt hàng mới nhất</span>
          <Link to='/orders' className="actionView">Xem đơn đặt hàng</Link>
        </div>
        <div className="tableOrder">
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
              {data.ordersLatest ? (
                data.ordersLatest.map((order, idx) => {
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
      </div>
      <div className="itemHome">
        <div className="headerItem">
          <span>Top bán chạy:</span>
          <Link to='/products' className="actionView">Xem các sản phẩm</Link>
        </div>
        <table cellSpacing={10} cellPadding={10}>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Đã bán</th>
            </tr>
          </thead>
          <tbody>
            {data.products ? (
              data.products.map((product, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <span className="cell-with-image">
                        <img
                          alt="img"
                          src={
                            product.images.length > 0
                              ? `${IMG_URL}/${product.images[0]}`
                              : BLANK_IMG
                          }
                          className="cell-img"
                        />
                        {product.title}
                      </span>
                    </td>
                    <td>{renderNumber(product.variants, "sold")}</td>

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
    </div>
  </div>
}

export default Home;
