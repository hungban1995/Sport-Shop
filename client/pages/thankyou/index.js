import Head from "next/head";
import Link from "next/link";
import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { useSelector } from "react-redux";

function Thankyou() {
  const { order } = useSelector((state) => state.order);
  if (!order._id) {
    return (
      <>
        <Head>
          <title>Oops...</title>
          <meta name="description" content="Oops..." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="error-content">
          Bạn quên đặt hàng rồi. Đến{" "}
          <Link href="/shop" className="link-to">
            Shop
          </Link>{" "}
          để đặt hàng nhé!
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Thank you</title>
        <meta name="description" content="Thank you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="thankyou">
        <div className="content">
          <BsCheck2Circle className="icon-success" />
          {order && order.user ? (
            <p>
              <span>
                Successful order you can follow your order well at{" "}
                <Link href={"/profile"}>Profile!</Link>
              </span>
              <span>
                If you have just registered, please login email with password:
                123456
              </span>
            </p>
          ) : (
            <p>
              Thank you for your order. We will contact you soon to confirm!
            </p>
          )}

          <p>
            <Link href="/" className="link-to">
              Go back home
            </Link>
            <Link href="/blog" className="link-to">
              Visit our blog
            </Link>
            <Link href="/shop" className="link-to">
              Continue shopping
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Thankyou;
