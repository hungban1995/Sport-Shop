import { Router, useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";

function SidebarCat(props) {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);
  const handleQuery = (id) => {
    const searchQuery = { category: id };
    router.push(`/shop?filter=${JSON.stringify(searchQuery)}`);
  };

  return (
    <div className="sidebarCat">
      <div className="itemCat">
        <div className="itemTitle">
          <h2 className="item-header" onClick={() => router.push("/shop")}>
            Categories
          </h2>
        </div>
        <ul className="item-content">
          {categories &&
            categories.map((cat, idx) => {
              return (
                <li key={idx} onClick={() => handleQuery(cat._id)}>
                  {cat.title}
                </li>
              );
            })}
        </ul>
      </div>
      <div className="itemCat">
        <div className="itemTitle">
          <h2 className="item-header" onClick={() => router.push("/shop")}>
            Price
          </h2>
        </div>
        <ul className="item-content">
          <li>cat1</li>
          <li>cat2</li>
          <li>cat3</li>
        </ul>
      </div>
    </div>
  );
}

export default SidebarCat;
