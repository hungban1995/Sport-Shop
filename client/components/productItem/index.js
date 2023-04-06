import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsBagPlus, BsThreeDots } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";

function ProductItem(props) {
  const [product, setProduct] = useState({});
  useEffect(() => {
    setProduct(props.product);
  }, [props.product]);
  const renderPrice = (value) => {
    let maxPrice = 0;
    let minPrice = 0;
    let arrPrice;
    value.variant.map((item) => {});
  };
  return (
    <div className="productItem">
      <div className="image">
        <img
          src="https://cdn.shopify.com/s/files/1/0570/0947/1558/products/5.1.jpg?v=1656899332"
          alt={product.title}
        />
      </div>
      <div className="action">
        <div className="wishList">
          <span className="des">Add to WithList</span>
          <CiHeart />
        </div>
        <div className="addToCart">
          <span className="des">Add to Cart</span>
          <BsBagPlus />
        </div>
        <div className="selectOption">
          <span className="des">Select Option</span>
          <BsThreeDots />
        </div>
      </div>
      <div className="productItemContent">
        <div className="itemRating">rating</div>
        <div className="itemTitle">{product.title}</div>
        <div className="itemPrice">price</div>
      </div>
    </div>
  );
}

export default ProductItem;
