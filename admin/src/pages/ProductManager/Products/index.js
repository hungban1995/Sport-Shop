import "./products.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BLANK_AVT, IMG_URL } from "../../../constants";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getData } from "../../../libs/fetchData";
import { getAlert } from "../../../stores/notifyReducer";
import AlertMessage from "../../../components/notifications/alert";
const Products = () => {
  const { alert } = useSelector((state) => state.notify);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getData("products/get-all");
        console.log(res.data.products);
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [alert]);
  const columns = [
    {
      field: "title",
      headerName: "Name",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img
              alt="img"
              src={
                params.row?.images?.length > 0
                  ? `${IMG_URL}/${params.row.images[0]}`
                  : BLANK_AVT
              }
              className="cellImg"
            />
            {params.row.title}
          </div>
        );
      },
    },

    {
      field: "category",
      headerName: "Category",
      width: 130,
      renderCell: (params) => {
        const cat = params.row.category;
        return (
          <div>
            {cat?.map((item) => {
              return <span>{item.title}</span>;
            })}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      renderCell: (params) => {
        const variants = params.row.variants;
        let minInNumbers = 0;
        let maxInNumbers = 0;
        let priceArr = [];
        variants?.forEach((item) => priceArr.push(item.price));
        maxInNumbers = Math.max.apply(Math, priceArr);
        minInNumbers = Math.min.apply(Math, priceArr);
        return (
          <div>
            {minInNumbers < maxInNumbers ? (
              `${minInNumbers} - ${maxInNumbers}`
            ) : (
              <span>{maxInNumbers !== -Infinity ? maxInNumbers : 0}</span>
            )}
          </div>
        );
      },
    },
    {
      field: "inStock",
      headerName: "InStock",
      width: 130,
      renderCell: (params) => {
        const variants = params.row.variants;
        let inStock = 0;
        variants.forEach((item) => (inStock += item.inStock));
        return <div>{inStock}</div>;
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
            <AlertMessage idItem={params.row._id} />
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
                    delete: { id: params.row._id, type: "product" },
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
    <div className="products">
      <div className="title">
        <span>Danh sách sản phẩm</span>
        <Link to="new-post">Thêm mới</Link>
      </div>
      <div className="table">
        <DataGrid
          className="tableCell"
          rows={products}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};
export default Products;
