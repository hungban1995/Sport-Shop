/* eslint-disable jsx-a11y/img-redundant-alt */
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BLANK_IMG, IMG_URL } from "../../constants";
import { getData } from "../../libs/fetchData";
import { getAlert } from "../../stores/notifyReducer";
import Alert from "../../components/notifications/alert";
import "./categories.scss";
import EditCategory from "../../components/EditData/EditCategory";
import { setBackground } from "../../stores/themeWebReducer";
import { setDataEdit } from "../../stores/categoriesReducer";
function Categories() {
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state.notify);
  const { dataEdit } = useSelector((state) => state.categories);

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
  }, [alert, dataEdit]);
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
                dispatch(setDataEdit({ edit: true, category: params.row }));
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
        <span>Danh sách Categories:</span>
        <span>new</span>
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
      <EditCategory />
    </div>
  );
}

export default Categories;
