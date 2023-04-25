import BreadCrumb from "@/components/bread-crumb";
import { IMG_URL } from "@/constant";
import { PriceVnd, RenderAttribute, renderTotal } from "@/libs/helperData";
import {
  getDecrease,
  getIncrease,
  getRemoveItemCart,
} from "@/stores/cartReducer";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const { cartOrder } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [numItem, setNumItem] = useState(0);
  const router = useRouter();
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
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="cart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="cart-page">
        <BreadCrumb
          value={{
            target: "You cart",
            items: [{ url: "/", name: "Trang chủ" }],
          }}
        />
        <div className="cart-content">
          <div className="cart-table">
            <table
              className="cart-table-show"
              cellPadding={10}
              cellSpacing={10}
            >
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartOrder.length > 0 ? (
                  cartOrder.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td style={{ textAlign: "left" }}>
                          <span className="cell-image">
                            <img
                              src={`${IMG_URL}/${item.productVariant.image}`}
                              alt="image-item"
                              className="cell-image-item"
                            />
                            <ul className="cell-item-content">
                              <span className="cell-name">
                                {item.product.title}
                              </span>
                              {RenderAttribute(item.productVariant.attributes)}
                            </ul>
                          </span>
                        </td>
                        <td>
                          <span>{PriceVnd(item.productVariant.onSale)}</span>
                        </td>
                        <td>
                          <span className="action-quantity">
                            <AiOutlineMinus
                              className={
                                "action-item_button " +
                                (item.quantity === 1 ? "disable" : "")
                              }
                              onClick={
                                item.quantity > 1 ? () => handleDesc(idx) : null
                              }
                            />
                            <span className="item-quantity">
                              {item.quantity}
                            </span>
                            <AiOutlinePlus
                              className={
                                "action-item_button " +
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
                          </span>
                        </td>
                        <td>
                          {PriceVnd(item.quantity * item.productVariant.onSale)}
                        </td>

                        <td>
                          <span className="action-item">
                            <AiOutlineClose
                              className="action-item_remove"
                              onClick={() => handleRemove(idx)}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      Your cart is empty. Go to{" "}
                      <Link href={"/shop"}>Shop now</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="cart-total">
            <div className="cart-total-header">
              <span>Cart totals</span>
              <span>{numItem} Items</span>
            </div>
            <div className="cart-total-body">
              <ul>
                <li>Subtotal:</li>
                <li>Shipping:</li>
                <li>Total:</li>
              </ul>
              <ul>
                <li>{renderTotal(cartOrder)}</li>
                <li>Free shipping</li>
                <li>{renderTotal(cartOrder)}</li>
              </ul>
            </div>
            <div className="cart-total-bottom">
              <div
                className={
                  "button-to-shopping " +
                  (cartOrder?.length > 0 ? "" : "disable")
                }
                onClick={
                  cartOrder?.length > 0
                    ? () => {
                        router.push("/shop");
                      }
                    : null
                }
              >
                <span className="text-to-shop">Continue shopping</span>
              </div>
              <div
                className={
                  "button-to-checkout " +
                  (cartOrder?.length > 0 ? "" : "disable")
                }
                onClick={
                  cartOrder?.length > 0
                    ? () => {
                        router.push("/checkout");
                      }
                    : null
                }
              >
                <span className="text-to-checkout">Process to checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
