import React from "react";
import SideBar from "./sidebar";
import Navbar from "./navbar";
import "./layout.scss";
function Layout({ children }) {
  return (
    <div className="layout">
      <SideBar />
      <div className="children">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default Layout;
