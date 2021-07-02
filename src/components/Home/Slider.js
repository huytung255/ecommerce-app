import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { SliderData } from "./SliderData";
const Slider = () => {
  return (
    <Carousel>
      {SliderData.map((item, index) => {
        const { img, caption, subtext } = item;
        return (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 custom-slider-img"
              src={process.env.PUBLIC_URL + img}
              alt={img}
            />
            <Carousel.Caption className="text-left custom-slider-caption py-5">
              <h1 className="text-uppercase font-weight-bold display-2">
                {caption}
              </h1>
              <p>{subtext}</p>
              <Button className="px-5 py-4 mt-3 text-uppercase custom-button">
                view our menu
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Slider;
