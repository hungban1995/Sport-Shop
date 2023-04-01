import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages";
import Users from "../pages/UserManager";
import Single from "../pages/UserManager/Single";
import New from "../pages/UserManager/New";
import Categories from "../pages/ProductManager/Categories";
import CategoriesPost from "../pages/PostManager/CategoriesPost";
import Posts from "../pages/PostManager/Posts";
import Products from "../pages/ProductManager/Products";
import NewProduct from "../pages/ProductManager/Products/New";

import NewPost from "../pages/PostManager/Posts/New";
import SinglePost from "../pages/PostManager/Posts/SinglePost";
import SingleProduct from "../pages/ProductManager/Products/SingleProduct";
import OrderS from "../pages/OrderManager";
import SingleOrder from "../pages/OrderManager/SingleOrder";

function Routers() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="users/">
            <Route index element={<Users />} />
            <Route path="new" element={<New />} />
            <Route path=":id" element={<Single />} />
          </Route>
          <Route path="categories/" element={<Categories />} />
          <Route path="products/">
            <Route index element={<Products />} />
            <Route path="new" element={<NewProduct />} />
            <Route path=":id" element={<SingleProduct />} />
          </Route>

          <Route path="categories-posts/" element={<CategoriesPost />} />
          <Route path="posts/">
            <Route index element={<Posts />} />
            <Route path="new-post" element={<NewPost />} />
            <Route path=":id" element={<SinglePost />} />
          </Route>
          <Route path="orders/">
            <Route index element={<OrderS />} />
            <Route path=":id" element={<SingleOrder />} />
          </Route>
          <Route
            path="*"
            element={<p style={{ fontSize: "2rem" }}> 404 Page not found </p>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default Routers;
