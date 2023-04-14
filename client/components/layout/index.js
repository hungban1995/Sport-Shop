import { getData } from "@/libs/fetchData";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notify from "../notifications/notify";
import ShoppingCart from "../shoppingCart";
import Footer from "./footer";
import Header from "./header";
import { getCartOrder } from "@/stores/cartReducer";
import BackToTop from "../backToTop";
import LoadingData from "../Loading";
function Layout({ children }) {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const { count } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

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
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage &&
      localStorage.getItem("cart")
    ) {
      dispatch(getCartOrder(JSON.parse(localStorage.getItem("cart"))));
    } else dispatch(getCartOrder([]));
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="layout">
      <Notify />
      <LoadingData />
      <ShoppingCart />
      <Header user={user} />
      {children}
      <Footer />
      <BackToTop showButton={showButton} scrollToTop={scrollToTop} />
    </div>
  );
}

export default Layout;
