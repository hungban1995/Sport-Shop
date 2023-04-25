import { IMG_URL } from "@/constant";
import { PriceVnd, RenderStar } from "@/libs/helperData";
import { addProductToCart, getShowCart } from "@/stores/cartReducer";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { BsBagPlus, BsThreeDots } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";

function ProductItem({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isWishList, setIsWishList] = useState(false);

  //render price
  const renderPrice = (value) => {
    let arrPrice = [];
    let arrOnSale = [];
    value?.map((item) => {
      arrPrice.push(item.price);
      arrOnSale.push(item.onSale);
    });
    let maxPrice = Math.max(...arrPrice);
    let minOnSale = Math.min(...arrOnSale);
    return (
      <p>
        <span className="price_on_sale">{PriceVnd(minOnSale)}</span> -{" "}
        <span className="price_max">{PriceVnd(maxPrice)}</span>
      </p>
    );
  };
  //add to cart
  const handleAddToCart = (product) => {
    const itemCart = {
      product: product,
      productVariant: product.variants[0],
      quantity: 1,
    };
    dispatch(addProductToCart(itemCart));
    dispatch(getShowCart(true));
  };

  return (
    <div className="productItem">
      <div
        className="image"
        onClick={() => router.push(`/shop/${product._id}`)}
      >
        <img src={`${IMG_URL}/${product.images[0]}`} alt={product.title} />
      </div>
      <div className="action">
        <div
          className={"wishList " + (isWishList ? "active" : "")}
          onClick={() => setIsWishList(!isWishList)}
        >
          <span className="des">Add to WithList</span>
          <CiHeart />
        </div>
        {product?.variants?.length > 1 ? (
          <div
            className="selectOption"
            onClick={() => router.push(`/shop/${product._id}`)}
          >
            <span className="des">Select Option</span>
            <BsThreeDots />
          </div>
        ) : (
          <div className="addToCart" onClick={() => handleAddToCart(product)}>
            <span className="des">Add to Cart</span>
            <BsBagPlus />
          </div>
        )}
      </div>
      <div className="product_item_content">
        <div className="itemRating">{RenderStar(product.star)}</div>
        <div className="itemTitle">{product?.title}</div>
        <div className="itemPrice">{renderPrice(product?.variants)}</div>
      </div>
    </div>
  );
}

export default ProductItem;
