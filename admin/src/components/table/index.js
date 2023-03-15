import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getData } from "../../libs/fetchData";
import "./table.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../notifications/alert";
import { getAlert } from "../../stores/notifyReducer";
import { BLANK_AVT, IMG_URL } from "../../constants";
function Table() {
  const { alert } = useSelector((state) => state.notify);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getData("users/get-all");
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [alert]);
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
                params.row.avatar
                  ? `${IMG_URL}/${params.row.avatar}`
                  : BLANK_AVT
              }
              className="cellImg"
            />
            {params.row.username}
          </div>
        );
      },
    },

    {
      field: "birthday",
      headerName: "Birth Day",
      width: 130,
      renderCell: (params) => {
        const birthday = params?.row?.birthday;
        if (!birthday) {
          return <div>N/A</div>;
        }
        const date = new Date(birthday);
        const formattedBirthday = date?.toISOString().slice(0, 10);
        return <div>{formattedBirthday}</div>;
      },
    },
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
            <Alert id={params.row._id} />
            <div
              className="editButton"
              onClick={() => {
                navigate(`${params.row._id}`);
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
                    delete: { id: params.row._id, type: "user" },
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
