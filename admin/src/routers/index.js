import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages";
import Users from "../pages/users";
import Edit from "../pages/users/edit";
import New from "../pages/users/new";

function Routers() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="users/">
            <Route index element={<Users />} />
            <Route path="new" element={<New />} />
            <Route path="edit" element={<Edit />} />
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
