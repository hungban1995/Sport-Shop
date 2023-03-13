import React from "react";
import Notify from "../notifications/notify";
import Footer from "./footer";
import Header from "./header";

function Layout({ children }) {
  return (
    <div className="layout">
      <Notify />
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
