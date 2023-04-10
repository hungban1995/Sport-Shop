import ProductItem from "@/components/productItem";
import { getData } from "@/libs/fetchData";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
function NewProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getData(
          "products/get-all?sort_by={%22createdAt%22:-1}&page=1&page_size=4"
        );
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  return (
    <>
      {products &&
        products.map((product, idx) => {
          return <ProductItem key={idx} product={product} />;
        })}
    </>
  );
}

export default NewProducts;
