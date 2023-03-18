import { getData } from "@/libs/fetchData";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Notify from "../notifications/notify";
import ShoppingCart from "../shoppingCart";
import Footer from "./footer";
import Header from "./header";
function Layout({ children }) {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const { count } = useSelector((state) => state.user);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage &&
      localStorage.getItem("userId")
    ) {
      setUserId(JSON.parse(localStorage.getItem("userId")));
    } else setUserId(null);
  }, [count]);
  useEffect(() => {
    const getUserLogin = async () => {
      if (userId) {
        try {
          const res = await getData("users/get-id/" + userId);
          setUser(res.data.user);
        } catch (error) {
          console.log(error);
        }
      } else setUser(null);
    };
    getUserLogin();
  }, [userId]);
  useEffect(() => {}, [user]);
  return (
    <div className="layout">
      <Notify />
      <ShoppingCart />
      <Header user={user} />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
