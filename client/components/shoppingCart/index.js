import { IMG_URL } from "@/constant";
import { PriceVnd } from "@/libs/helperData";
import {
  getDecrease,
  getIncrease,
  getRemoveItemCart,
  getShowCart,
} from "@/stores/cartReducer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
function ShoppingCart() {
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
  //render attribute
  const renderAttribute = (attributes) => {
    return attributes.map((atb, idx) => {
      if (atb.k) {
        return (
          <li key={idx}>
            {atb.k} : {atb.v}
          </li>
        );
      } else return null;
    });
  };
  //render total
  const renderTotal = (value) => {
    let total = 0;
    value.forEach((item) => {
      let priceItem = item.productVariant.onSale || item.productVariant.price;
      total += priceItem * item.quantity;
    });
    let totalPrice = PriceVnd(total);
    return totalPrice;
  };
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
      className={"cart " + (showCart ? "active" : "")}
      onClick={() => {
        if (showCart) {
          dispatch(getShowCart(false));
        }
      }}
    >
      <div className={"cart-content"} onClick={(e) => e.stopPropagation()}>
        <div className="cart-content__top">
          <AiOutlineClose
            className="cart-content__top-close"
            onClick={() => {
              dispatch(getShowCart(false));
            }}
          />
          <span>Shopping Cart</span>
          <span style={{ fontSize: "16px" }}>{numItem} item</span>
        </div>
        <div className="cart-content__body">
          <div className="cart-content__body-item">
            <div className="cart-items">
              {cartOrder.length > 0 ? (
                cartOrder.map((item, idx) => {
                  return (
                    <div key={idx} className="cart-item__product">
                      <div className="cart-item__product-content">
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
                          {renderAttribute(item.productVariant.attributes)}
                        </ul>
                      </div>
                      <div className="cart-item__action">
                        <div className="action-quantity">
                          <AiOutlineMinus
                            className={
                              "cart-item_button " +
                              (item.quantity === 1 ? "disable" : "")
                            }
                            onClick={
                              item.quantity > 1 ? () => handleDesc(idx) : null
                            }
                          />
                          <span>{item.quantity}</span>
                          <AiOutlinePlus
                            className={
                              "cart-item_button " +
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
                <div className="cart-item__empty">
                  <span>
                    Your cart is empty. Go to{" "}
                    <Link href={"/shop"}>Shop now</Link>
                  </span>
                </div>
              )}
            </div>
            {cartOrder.length > 0 ? (
              <div className="cart-total">
                <div className="cart-total__content">
                  <span className="cart-total__content-title">Total: </span>
                  <span className="cart-total__content-price">
                    {renderTotal(cartOrder)}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="cart-content__bottom">
          <Link href={"#"} className="button-view-cart">
            <span className="text-view-cart">View Cart</span>
          </Link>
          <Link href={"#"} className="button-checkout">
            <span className="text-checkout">Check out</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
