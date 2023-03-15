import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages";
import Users from "../pages/users";
import Single from "../pages/users/single";
import New from "../pages/users/new";
import Categories from "../pages/categories";

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
          <Route path="categories/">
            <Route index element={<Categories />} />
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
