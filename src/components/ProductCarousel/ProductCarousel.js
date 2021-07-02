import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "../Menu/Product";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
const CustomRightArrow = ({ onClick, ...rest }) => {
  // onMove means if dragging or swiping in progress.
  return (
    <button
      className="custom-arrow custom-arrow-right"
      onClick={() => onClick()}
    >
      <FaAngleRight />
    </button>
  );
};
const CustomLeftArrow = ({ onClick, ...rest }) => {
  // onMove means if dragging or swiping in progress.
  return (
    <button
      className="custom-arrow custom-arrow-left"
      onClick={() => onClick()}
    >
      <FaAngleLeft />
    </button>
  );
};
const CustomDot = ({ onClick, ...rest }) => {
  const { active } = rest;
  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <button
      className={
        "custom-dot " + (active ? "custom-dot-active" : "custom-dot-inactive")
      }
      onClick={() => onClick()}
    ></button>
  );
};
const ProductCarousel = ({ products, addItemToCart }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="position-relative">
      <Carousel
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
        customDot={<CustomDot />}
        renderDotsOutside={true}
        showDots={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        containerClass="carousel-container products-carousel"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {products.map((product) => {
          const { _id } = product;
          return (
            <div key={_id} className=" text-center py-4 px-2 px-md-4 px-lg-4">
              <Product product={product} addItemToCart={addItemToCart} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
