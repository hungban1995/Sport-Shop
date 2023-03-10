import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getData } from "../../libs/fetchData";
import "./table.scss";
import { useDispatch } from "react-redux";
import { getUserEdit } from "../../stores/usersReducer";
import { Link, useNavigate } from "react-router-dom";
function Table() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [selectRow, setSelectRow] = useState({});
  useEffect(() => {
    getData("users/get-all")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "username",
      headerName: "Username",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img
              alt="avatar"
              src={
                params.row.img ||
                "https://roottogether.net/wp-content/uploads/2020/04/img-avatar-blank.jpg"
              }
              className="cellImg"
            />
            {params.row.username}
          </div>
        );
      },
    },

    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "fullName",
      headerName: "Full name",
      sortable: false,
      width: 200,
    },
    {
      field: "role",
      headerName: "role",
      width: 90,
      renderCell: (params) => {
        return (
          <div className={`cellWithRole ${params.row.role}`}>
            {params.row.role}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div>
              <div
                className="editButton"
                onClick={() => {
                  dispatch(getUserEdit(params.row));
                  navigate("edit");
                }}
              >
                Edit
              </div>
            </div>
            <div className="deleteButton">Delete</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="table">
      <DataGrid
        className="tableCell"
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

export default Table;
