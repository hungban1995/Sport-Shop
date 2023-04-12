import { IMG_URL } from "@/constant";
import { PriceVnd, RenderAttribute, renderTotal } from "@/libs/helperData";
import {
  getDecrease,
  getIncrease,
  getRemoveItemCart,
  getShowCart,
} from "@/stores/cartReducer";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
function ShoppingCart() {
  const router = useRouter();
  const { showCart, cartOrder } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [numItem, setNumItem] = useState(0);
  useEffect(() => {
    if (cartOrder.length > 0) {
      let a = 0;
      cartOrder.forEach((item) => {
        a += item.quantity;
      });
      setNumItem(a);
    } else setNumItem(0);
  }, [cartOrder]);

  //hand add and remove
  const handleRemove = (idx) => {
    dispatch(getRemoveItemCart(idx));
  };

  const handleDesc = (idx) => {
    dispatch(getDecrease(idx));
  };
  const handleInc = (idx) => {
    dispatch(getIncrease(idx));
  };

  return (
    <div
      className={"shopping-cart " + (showCart ? "active" : "")}
      onClick={() => {
        if (showCart) {
          dispatch(getShowCart(false));
        }
      }}
    >
      <div
        className={"shopping-cart-content"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shopping-cart-content__top">
          <AiOutlineClose
            className="shopping-cart-content__top-close"
            onClick={() => {
              dispatch(getShowCart(false));
            }}
          />
          <span>Shopping Cart</span>
          <span style={{ fontSize: "16px" }}>{numItem} item</span>
        </div>
        <div className="shopping-cart-content__body">
          <div className="shopping-cart-content__body-item">
            <div className="shopping-cart-items">
              {cartOrder.length > 0 ? (
                cartOrder.map((item, idx) => {
                  return (
                    <div key={idx} className="shopping-cart-item__product">
                      <div className="shopping-cart-item__product-content">
                        <img
                          className="item-img"
                          src={`${IMG_URL}/${item.productVariant.image}`}
                          alt="product"
                        />
                        <ul className="item-content">
                          <span className="item-name">{item.nameProduct}</span>
                          <span className="item-price">
                            {PriceVnd(item.productVariant.onSale) ||
                              PriceVnd(item.productVariant.onSale)}
                          </span>
                          {RenderAttribute(item.productVariant.attributes)}
                        </ul>
                      </div>
                      <div className="shopping-cart-item__action">
                        <div className="action-quantity">
                          <AiOutlineMinus
                            className={
                              "shopping-cart-item_button " +
                              (item.quantity === 1 ? "disable" : "")
                            }
                            onClick={
                              item.quantity > 1 ? () => handleDesc(idx) : null
                            }
                          />
                          <span>{item.quantity}</span>
                          <AiOutlinePlus
                            className={
                              "shopping-cart-item_button " +
                              (item.quantity === item.productVariant.inStock
                                ? "disable"
                                : "")
                            }
                            onClick={
                              item.productVariant.inStock > item.quantity
                                ? () => handleInc(idx)
                                : null
                            }
                          />
                        </div>
                        <div className="action-item">
                          <AiOutlineClose
                            className="action-item_remove"
                            onClick={() => handleRemove(idx)}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="shopping-cart-item__empty">
                  <span>
                    Your cart is empty. Go to{" "}
                    <Link href={"/shop"}>Shop now</Link>
                  </span>
                </div>
              )}
            </div>
            {cartOrder.length > 0 ? (
              <div className="shopping-cart-total">
                <div className="shopping-cart-total__content">
                  <span className="shopping-cart-total__content-title">
                    Total:{" "}
                  </span>
                  <span className="shopping-cart-total__content-price">
                    {renderTotal(cartOrder)}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="shopping-cart-content__bottom">
          <div
            className={
              "button-view-cart " + (cartOrder?.length > 0 ? "" : "disable")
            }
            onClick={
              cartOrder?.length > 0
                ? () => {
                    dispatch(getShowCart(false));
                    router.push("/cart");
                  }
                : null
            }
          >
            <span className="text-view-cart">View Cart</span>
          </div>
          <div
            className={
              "button-checkout " + (cartOrder?.length > 0 ? "" : "disable")
            }
            onClick={
              cartOrder?.length > 0
                ? () => {
                    dispatch(getShowCart(false));
                    router.push("/checkout");
                  }
                : null
            }
          >
            <span className={"text-checkout"}>Check out</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
