import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ProductCarousel from "../ProductCarousel/ProductCarousel";

const TopPicks = ({ addItemToCart }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "products/top-picks")
      .then((res) => {
        setProducts([...res.data]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="px-5 pb-5 mb-4">
      <h1 className="text-center font-weight-bold mb-1">TOP PICKS</h1>
      <ProductCarousel products={products} addItemToCart={addItemToCart} />
    </section>
  );
};

export default TopPicks;
