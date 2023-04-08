import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BLANK_IMG, IMG_URL, valueSortCat } from "../../../constants";
import { getData } from "../../../libs/fetchData";
import { getAlert } from "../../../stores/notifyReducer";
import "./categories.scss";
import EditCategory from "../../../components/EditData/EditCategory/update";
import { setBackground } from "../../../stores/themeWebReducer";
import { setCreateCat, setCatEdit } from "../../../stores/categoriesReducer";
import NewCategory from "../../../components/EditData/EditCategory/newCategory";
import { AiOutlineDelete } from "react-icons/ai";
import { getManyDelete } from "../../../stores/deleteDataReducer";
import moment from "moment";
import AlertDel from "../../../components/notifications/alert";
import Pagination from "../../../components/QueryData/Pagination";
import SortData from "../../../components/QueryData/Sort";
function Categories() {
  const dispatch = useDispatch();
  const { refreshCat } = useSelector((state) => state.categories);
  const [categories, setCategories] = useState(null);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [sort_by, set_sort_by] = useState("");
  const [filter_by, set_filter_by] = useState("");
  const [page_num, set_page_num] = useState(1);
  const [page_size, set_page_size] = useState(5);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await getData(
          `categories/get-all?page=${page_num}&page_size=${page_size}&sort_by=${sort_by}&filter_by=${filter_by}`
        );
        setCategories(res.data.categories);
        setCount(res.data.count);
      } catch (error) {
        console.log(error);
        setCategories(null);
      }
    };
    getCategories();
  }, [refreshCat, sort_by, filter_by, page_num, page_size]);

  //select all
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(categories.map((list) => list._id));
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
    <div className="categories">
      <div className="top">
        <div className="title">
          <p>Danh sách Categories:</p>
          <span
            onClick={() => {
              dispatch(setBackground({ active: true, type: "createCat" }));
              dispatch(setCreateCat(true));
            }}
          >
            Thêm Mới!
          </span>
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
                    header: "Xóa nhiều danh mục.",
                    body: "Bạn đang xóa nhiều dữ liệu trong một lần! Bạn chắc chắn muốn xóa không?",
                  },
                })
              );
            }}
          >
            <AiOutlineDelete /> Delete Data
          </span>
          <SortData valueSort={valueSortCat} set_sort_by={set_sort_by} />
          {/* <FilterData
            valueFilter={valueFil}
            typeFilter={{ name: "Danh mục", value: "category" }}
            set_filter_by={set_filter_by}
          /> */}
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
                <th>Category Id</th>
                <th>Tên</th>
                <th>Ngày tạo</th>
                <th>Mô tả</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories ? (
                categories.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
                        <input
                          type="checkbox"
                          id={item._id}
                          onChange={handleChange}
                          checked={isCheck.includes(item._id)}
                        />
                      </td>
                      <td>{item._id}</td>
                      <td>
                        <span className="cellWithImg">
                          <img
                            alt="img"
                            src={
                              item.image
                                ? `${IMG_URL}/${item.image}`
                                : BLANK_IMG
                            }
                            className="cellImg"
                          />
                          {item.title}
                        </span>
                      </td>
                      <td>{moment(item.createdAt).format("L")}</td>
                      <td
                        style={{
                          width: "300px",
                        }}
                      >
                        {item.description}
                      </td>

                      <td className="action">
                        <AlertDel idItem={item._id} />
                        <span
                          className="editBtn"
                          onClick={() => {
                            dispatch(
                              setBackground({ active: true, type: "editCat" })
                            );
                            dispatch(
                              setCatEdit({ edit: true, category: item })
                            );
                          }}
                        >
                          Edit
                        </span>
                        {"  "}
                        <span
                          className="deleteBtn"
                          onClick={() => {
                            dispatch(
                              getAlert({
                                open: true,
                                delete: {
                                  id: item._id,
                                  type: "categories",
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
                })
              ) : (
                <tr>
                  <td>Category not found!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          count={count}
          pageSize={set_page_size}
          pageNum={set_page_num}
          lengthItem={categories?.length}
        />
      </div>
      <NewCategory />
      <EditCategory />
    </div>
  );
}

export default Categories;
