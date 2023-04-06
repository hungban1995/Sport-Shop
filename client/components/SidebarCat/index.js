import React from "react";

function SidebarCat({ categories }) {
  return (
    <div className="sidebarCat">
      <div className="itemCat">
        <div className="itemTitle">
          <h2>Categories</h2>
        </div>
        <ul className="itemContent">
          {categories &&
            categories.map((cat, idx) => {
              return <li key={idx}>{cat.title}</li>;
            })}
        </ul>
      </div>
      <div className="itemCat">
        <div className="itemTitle">
          <h2>Price</h2>
        </div>
        <ul className="itemContent">
          <li>cat1</li>
          <li>cat2</li>
          <li>cat3</li>
        </ul>
      </div>
    </div>
  );
}

export default SidebarCat;
