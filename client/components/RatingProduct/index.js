import { IMG_URL } from "@/constant";
import { RenderStar } from "@/libs/helperData";
import moment from "moment";
import React from "react";

function Rating({ rating }) {
  return (
    <div className="product-rating">
      <div className="product-rating-user">
        <div className="product-rating-user__avatar">
          <img src={`${IMG_URL}/${rating?.user?.avatar}`} alt="avatar" />
        </div>
        <div className="product-rating-user__username">
          <span>{rating?.user.username}</span>
        </div>
      </div>
      <div className="product-rating-content">
        <div className="product-rating-content__date">
          <span>{moment(rating?.createDate).format("L")}</span>
        </div>
        <div className="product-rating-content__star">
          {RenderStar(rating?.rating)}
        </div>
        <div className="product-rating-content__comment">
          <span>{rating?.comment}</span>
        </div>
      </div>
    </div>
  );
}

export default Rating;
