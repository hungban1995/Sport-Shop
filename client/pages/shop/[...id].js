import { IMG_URL } from "@/constant";
import { getData } from "@/libs/fetchData";
import { PriceVnd } from "@/libs/helperData";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { CiHeart } from "react-icons/ci";

function Product(props) {
  const [product, setProduct] = useState(null);
  const [imageView, setImageView] = useState("");
  const [priceView, setPriceView] = useState({ price: 0, onSale: 0 });
  const [variantChoose, setVariantChoose] = useState(null);
  const [active, setActive] = useState(0);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    let productItem = props.product;
    setProduct(productItem);
    setImageView(productItem.images[0]);
    setPriceView({
      price: productItem.variants[0].price,
      onSale: productItem.variants[0].onSale,
    });
    setVariantChoose(productItem.variants[0]);
  }, [props.product]);
  //render star
  const RenderStart = (rate) => {
    let ratingArr = [];
    rate?.map((item) => ratingArr.push(item.rating));
    let average = 0;
    if (ratingArr.length > 0) {
      average = ratingArr.reduce((a, b) => a + b, 0) / ratingArr.length;
    }
    const star = [1, 2, 3, 4, 5];
    return star.map((idx) => {
      return (
        <div key={idx}>
          {idx <= average ? <AiFillStar /> : <AiOutlineStar />}
        </div>
      );
    });
  };
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
  return (
    <>
      <Head>
        <title>{product?.title}</title>
        <meta name="description" content={product?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="product-id">
        <div className="title-product">
          <div className="title-content">
            <span className="page">Product</span>
            <div className="bread-crumb">
              <Link href="/">Trang chủ</Link> &raquo;
              <Link href="/shop">Shop</Link> &raquo;
              <span>Product</span>
            </div>
          </div>
        </div>
        <div className="product-content">
          <div className="product-images">
            <div className="view-image">
              <img src={`${IMG_URL}/${imageView}`} alt="image-view" />
            </div>
            <div className="list-images">
              {product &&
                product?.images?.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="item-image"
                      onClick={() => setImageView(item)}
                    >
                      <img src={`${IMG_URL}/${item}`} alt="mini-img" />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="product-info">
            <div className="product-info__header">
              <h2 className="product-info-name">{product?.title}</h2>
              <div className="product-info-rating">
                {RenderStart(product?.ratings)}{" "}
                <span className="product-info-rating__text">
                  {product?.ratings > 0 ? product?.ratings.length : "No"} review
                </span>
              </div>
              <div className="product-info-price">
                <span className="price-sale">{PriceVnd(priceView.onSale)}</span>{" "}
                <span className="price-max">{PriceVnd(priceView.price)}</span>
              </div>
              <div className="wish-list">
                <span className="des">Add to WithList</span>
                <CiHeart />
              </div>
            </div>
            <div className="product-variants">
              <div className="product-description">
                <span>{product?.description}</span>
              </div>
              <div className="product-variant-item">
                <div className="variant-attribute">
                  {variantChoose && renderAttribute(variantChoose?.attributes)}
                </div>
                <div className="variant-image">
                  {product?.variants?.map((variant, idx) => {
                    return (
                      <div
                        className={
                          "image-variant-item " +
                          (active === idx ? "active" : "")
                        }
                        key={idx}
                        onClick={() => {
                          setVariantChoose(variant);
                          setActive(idx);
                        }}
                      >
                        <img
                          src={`${IMG_URL}/${variant.image}`}
                          alt="variant-img"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="product-action">
                <div className="product-action-cart">
                  <div className="action-add">
                    <AiOutlineMinus
                      className={
                        "product-item_button " +
                        (quantity === 1 ? "disable" : "")
                      }
                      onClick={
                        quantity > 1 ? () => setQuantity((q) => q - 1) : null
                      }
                    />
                    <span>{quantity}</span>
                    <AiOutlinePlus
                      className={
                        "product-item_button " +
                        (quantity === variantChoose?.inStock ? "disable" : "")
                      }
                      onClick={
                        quantity < variantChoose?.inStock
                          ? () => setQuantity((q) => q + 1)
                          : null
                      }
                    />
                  </div>
                  <div className="button-add">Add to cart</div>
                </div>
                <div
                  className="product-action-buy"
                  //  onClick={() => handleRemove(idx)}
                >
                  Buy Now
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-about">tag</div>
      </div>
    </>
  );
}

export default Product;
export const getServerSideProps = async (req) => {
  let product = {};
  try {
    const { id } = req.query;
    const res = await getData("products/get-id/" + id);
    product = res.data.product;
  } catch (error) {
    console.log(error.response.data.error);
  }
  return {
    props: {
      product,
    },
  };
};
