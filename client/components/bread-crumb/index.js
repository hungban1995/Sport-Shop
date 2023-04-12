import Link from "next/link";
import React from "react";

function BreadCrumb({ value }) {
  return (
    <div className="bread-crumb">
      <div className="bread-crumb-content">
        <span className="page">{value.target}</span>
        <div className="bread-item">
          {value.items.map((item, idx) => {
            return (
              <span key={idx}>
                {" "}
                <Link href={item.url}>{item.name}</Link> &raquo;
              </span>
            );
          })}
          <span>{value.target}</span>
        </div>
      </div>
    </div>
  );
}

export default BreadCrumb;
