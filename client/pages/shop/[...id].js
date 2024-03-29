import Rating from "@/components/RatingProduct";
import BreadCrumb from "@/components/bread-crumb";
import { IMG_URL } from "@/constant";
import { getData } from "@/libs/fetchData";
import { PriceVnd, RenderStar } from "@/libs/helperData";
import { addProductToCart, getShowCart } from "@/stores/cartReducer";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { useDispatch } from "react-redux";

function Product(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [imageView, setImageView] = useState("");
  const [priceView, setPriceView] = useState({ price: 0, onSale: 0 });
  const [variantChoose, setVariantChoose] = useState(null);
  const [active, setActive] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishList, setIsWishList] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };
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
  //add to cart
  const handleAddToCart = () => {
    const itemCart = {
      product: product._id,
      productVariant: variantChoose,
      quantity: quantity,
    };
    dispatch(addProductToCart(itemCart));
    dispatch(getShowCart(true));
  };
  //buy now
  const handleBuyNow = () => {
    const itemCart = {
      product: product,
      productVariant: variantChoose,
      quantity: quantity,
    };

    dispatch(addProductToCart(itemCart));

    router.push("/checkout");
  };
  const RenderPostContent = () => {
    return { __html: product && product?.content };
  };
  return (
    <>
      <Head>
        <title>{product?.title}</title>
        <meta name="description" content={product?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="product-id">
        <BreadCrumb
          value={{
            target: "Product",
            items: [
              { url: "/", name: "Trang chủ" },
              { url: "/shop", name: "Shop" },
            ],
          }}
        />
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
                <div className="product-info-rating__number">
                  <span className="view-star">{product?.star}</span>
                  {RenderStar(product?.star)}
                </div>
                <span className="product-info-rating__text">
                  {product?.ratings.length > 0 ? product?.ratings.length : "No"}{" "}
                  review
                </span>
              </div>
              <div className="product-info-price">
                <span className="price-sale">{PriceVnd(priceView.onSale)}</span>{" "}
                <span className="price-max">{PriceVnd(priceView.price)}</span>
              </div>
              <div
                className={"wish-list " + (isWishList ? "active" : "")}
                onClick={() => setIsWishList(!isWishList)}
              >
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
                  <div className="action-add-product">
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
                  <div
                    className="button-add-product"
                    onClick={() => handleAddToCart()}
                  >
                    Add to cart
                  </div>
                </div>
                <div
                  className="product-action-buy"
                  onClick={() => handleBuyNow()}
                >
                  Buy Now
                </div>
              </div>
              <div className="product-more-info">
                <p>SKU: {variantChoose?.sku}</p>
                <p>
                  Categories:{" "}
                  {product?.category?.map((cat, idx) => {
                    return <span key={idx}>{cat.title}</span>;
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="product-about">
          <div className="tabs">
            <button
              id="1"
              disabled={currentTab === "1"}
              onClick={handleTabClick}
            >
              Description
            </button>
            <button
              id="2"
              disabled={currentTab === "2"}
              onClick={handleTabClick}
            >
              Review
            </button>
          </div>
          <div className="content">
            {currentTab === "1" ? (
              <div>
                <p className="title-content">{product?.description}</p>
                <div dangerouslySetInnerHTML={RenderPostContent()}></div>
              </div>
            ) : (
              <div>
                <p className="title-content">Customer review</p>
                <div className="list-rating">
                  {product?.ratings.length > 0 ? (
                    product?.ratings.map((rating, idx) => {
                      return <Rating key={idx} rating={rating} />;
                    })
                  ) : (
                    <div>No reviews yet</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
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
