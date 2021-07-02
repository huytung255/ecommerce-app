import React from "react";
import Slider from "./Slider";
import MenuShortcut from "./MenuShortcut";
import TopPicks from "./TopPicks";
const Home = ({ addItemToCart }) => {
  return (
    <>
      <Slider />
      <MenuShortcut />
      <TopPicks addItemToCart={addItemToCart} />
    </>
  );
};

export default Home;
