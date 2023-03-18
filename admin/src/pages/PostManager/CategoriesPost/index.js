import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BLANK_IMG, IMG_URL } from "../../../constants";
import { getData } from "../../../libs/fetchData";
import { getAlert } from "../../../stores/notifyReducer";
import Alert from "../../../components/notifications/alert";
import "./categoriesPost.scss";
import UpdateCategoriesPost from "../../../components/EditData/EditCategoriesPost/update";
import { setBackground } from "../../../stores/themeWebReducer";
import NewCategoryPost from "../../../components/EditData/EditCategoriesPost/newCategoryPost";
import {
  setCatPostEdit,
  setCreateCatPost,
} from "../../../stores/categoriesPostReducer";
function CategoriesPost() {
  const dispatch = useDispatch();
  const { refreshCatPost } = useSelector((state) => state.categoriesPost);
  const [categoriesPost, setCategoriesPost] = useState([]);
  useEffect(() => {
    const getCategoriesPost = async () => {
      try {
        const res = await getData("categories-posts/get-all");
        setCategoriesPost(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoriesPost();
  }, [refreshCatPost]);
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
              alt="img"
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
                dispatch(setCatPostEdit({ edit: true, category: params.row }));
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
                    delete: { id: params.row._id, type: "category-post" },
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
        <p>Danh sách Categories Post:</p>
        <span
          onClick={() => {
            dispatch(setBackground(true));
            dispatch(setCreateCatPost(true));
          }}
        >
          Thêm Mới!
        </span>
      </div>
      <div className="table">
        <DataGrid
          className="tableCell"
          rows={categoriesPost}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>
      <NewCategoryPost />
      <UpdateCategoriesPost />
    </div>
  );
}

export default CategoriesPost;
