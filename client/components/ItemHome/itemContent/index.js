import Link from "next/link";
import React from "react";
function ItemContent() {
  return (
    <div className="itemContent">
      <Link href={"#"} style={{ textDecoration: "none" }}>
        <img
          src="https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683__340.png"
          alt="img"
        />
        <div className="content">
          <h4>Title</h4>
          <span>description</span>
        </div>
      </Link>
    </div>
  );
}

export default ItemContent;
