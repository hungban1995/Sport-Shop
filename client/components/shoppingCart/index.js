import { getShowCart } from "@/stores/cartReducer";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
function ShoppingCart() {
  const { showCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className={"cart " + (showCart && "active")}>
      <div className="cartContent">
        <div className="top">
          <AiOutlineCloseCircle
            className="closeIcon"
            onClick={() => {
              dispatch(getShowCart(false));
            }}
          />
          <h3>Your cart</h3>
        </div>
        <div className="body">body</div>
        <div className="bottom">bottom</div>
      </div>
    </div>
  );
}

export default ShoppingCart;
