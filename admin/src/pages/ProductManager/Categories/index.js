/* eslint-disable jsx-a11y/img-redundant-alt */
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BLANK_IMG, IMG_URL } from "../../../constants";
import { getData } from "../../../libs/fetchData";
import { getAlert } from "../../../stores/notifyReducer";
import Alert from "../../../components/notifications/alert";
import "./categories.scss";
import EditCategory from "../../../components/EditData/EditCategory/update";
import { setBackground } from "../../../stores/themeWebReducer";
import { setCreateCat, setCatEdit } from "../../../stores/categoriesReducer";
import NewCategory from "../../../components/EditData/EditCategory/newCategory";
function Categories() {
  const dispatch = useDispatch();
  const { refreshCat } = useSelector((state) => state.categories);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await getData("categories/get-all");
        setCategories(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, [refreshCat]);
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "title",
      headerName: "Name Category",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img
              alt="image"
              src={
                params.row.image ? `${IMG_URL}/${params.row.image}` : BLANK_IMG
              }
              className="cellImg"
            />
            {params.row.title}
          </div>
        );
      },
    },

    {
      field: "description",
      headerName: "Description",
      sortable: false,
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Alert id={params.row._id} />
            <div
              className="editButton"
              onClick={() => {
                dispatch(setBackground(true));
                dispatch(setCatEdit({ edit: true, category: params.row }));
              }}
            >
              Edit
            </div>
            <div
              className="deleteButton"
              onClick={() => {
                dispatch(
                  getAlert({
                    open: true,
                    delete: { id: params.row._id, type: "category" },
                  })
                );
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="categories">
      <div className="listTitle">
        <p>Danh sách Categories:</p>
        <span
          onClick={() => {
            dispatch(setBackground(true));
            dispatch(setCreateCat(true));
          }}
        >
          Thêm Mới!
        </span>
      </div>
      <div className="table">
        <DataGrid
          className="tableCell"
          rows={categories}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>
      <NewCategory />
      <EditCategory />
    </div>
  );
}

export default Categories;
