import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BLANK_IMG, IMG_URL, valueSortProduct } from "../../../constants";
import { getData } from "../../../libs/fetchData";
import { getAlert } from "../../../stores/notifyReducer";
import "./products.scss";
import AlertDel from "../../../components/notifications/alert";
import { AiOutlineDelete } from "react-icons/ai";
import SortData from "../../../components/QueryData/Sort";
import FilterData from "../../../components/QueryData/Filter";
import { getManyDelete } from "../../../stores/deleteDataReducer";
import { setBackground } from "../../../stores/themeWebReducer";
import Pagination from "../../../components/QueryData/Pagination";
import { renderNumber } from "../../../libs/dataRender";
function Products() {
  const { refreshUser } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [sort_by, set_sort_by] = useState("");
  const [filter_by, set_filter_by] = useState("");
  const [page_num, set_page_num] = useState(1);
  const [page_size, set_page_size] = useState(5);
  const [count, setCount] = useState(0);
  const [valueFil, setValueFil] = useState(null);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await getData(
          `products/get-all?page=${page_num}&page_size=${page_size}&sort_by=${sort_by}&filter_by=${filter_by}`
        );
        setProducts(res.data.products);
        setCount(res.data.count);
      } catch (error) {
        console.log(error);
        setProducts(null);
      }
    };
    getProduct();
  }, [refreshUser, sort_by, filter_by, page_num, page_size]);
  useEffect(() => {
    const getCat = async () => {
      try {
        const res = await getData("categories/get-all");
        const catArr = res.data.categories;
        const newCatArr = catArr.map((item) => {
          return {
            name: item.title,
            value: item._id,
          };
        });
        setValueFil(newCatArr);
      } catch (error) {
        console.log(error);
      }
    };
    getCat();
  }, []);

  //select all
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(products.map((list) => list._id));
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
  //render price
  const renderPrice = (value, key) => {
    let minInNumbers = 0;
    let maxInNumbers = 0;
    let priceArr = [];
    value.forEach((item) => priceArr.push(item[key]));
    maxInNumbers = Math.max.apply(Math, priceArr);
    minInNumbers = Math.min.apply(Math, priceArr);
    return (
      <span>
        {minInNumbers < maxInNumbers ? (
          `${minInNumbers} - ${maxInNumbers}`
        ) : (
          <>{maxInNumbers !== -Infinity ? maxInNumbers : 0}</>
        )}
      </span>
    );
  };

  return (
    <div className="products">
      <div className="top">
        <div className="title">
          <span>Danh sách sản phẩm:</span>
          <Link to="new">Thêm mới</Link>
        </div>
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
                    header: "Xóa nhiều product.",
                    body: "Bạn đang xóa nhiều dữ liệu trong một lần! Bạn chắc chắn muốn xóa không?",
                  },
                })
              );
            }}
          >
            <AiOutlineDelete /> Delete Data
          </span>
          <SortData valueSort={valueSortProduct} set_sort_by={set_sort_by} />
          <FilterData
            valueFilter={valueFil}
            typeFilter={{ name: "Danh mục", value: "category" }}
            set_filter_by={set_filter_by}
          />
        </div>
      </div>
      <div className="body">
        <table cellSpacing={10} cellPadding={10}>
          <thead>
            <tr>
              <th>
                <input type="checkbox" onChange={handleSelectAll} />
              </th>
              <th>Product Id</th>
              <th>Tên sản phẩm</th>
              <th>Danh Mục</th>
              <th>Giá bán </th>
              <th>Giảm giá</th>
              <th>Tồn Kho</th>
              <th>Đã bán</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products ? (
              products.map((product, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <input
                        type="checkbox"
                        id={product._id}
                        onChange={handleChange}
                        checked={isCheck.includes(product._id)}
                      />
                    </td>
                    <td>{product._id}</td>
                    <td>
                      <span className="cellWithImg">
                        <img
                          alt="img"
                          src={
                            product.image
                              ? `${IMG_URL}/${product.image}`
                              : BLANK_IMG
                          }
                          className="cellImg"
                        />
                        {product.title}
                      </span>
                    </td>
                    <td>
                      {product?.category?.map((item, idx) => {
                        return (
                          <li key={idx} style={{ listStyle: "none" }}>
                            {item.title}
                          </li>
                        );
                      })}
                    </td>
                    <td>{renderPrice(product.variants, "price")}</td>
                    <td>{renderNumber(product.variants, "onSale")}</td>
                    <td>{renderNumber(product.variants, "inStock")}</td>
                    <td>{renderNumber(product.variants, "sold")}</td>
                    <td className="action">
                      <AlertDel idItem={product._id} />
                      <span
                        className="editBtn"
                        onClick={() => {
                          navigate(product._id);
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
                              delete: { id: product._id, type: "products" },
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
                <td>Products not found!</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          count={count}
          pageSize={set_page_size}
          pageNum={set_page_num}
          lengthItem={products?.length}
        />
      </div>
    </div>
  );
}

export default Products;
