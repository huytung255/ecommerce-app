import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { FaEye, FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
import { Textfit } from "react-textfit";
import ProductCarousel from "../ProductCarousel/ProductCarousel";
const ProductDetails = ({ addItemToCart }) => {
  const { id } = useParams();
  const [details, setDetails] = useState({
    IMAGES: [],
  });
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity === 1) return;
    else setQuantity(quantity - 1);
  };
  const handleChange = (event) => {
    let newQuantity = event.target.value;
    if (!Number(newQuantity) || newQuantity < 1) {
      return;
    }
    setQuantity(Number(newQuantity));
  };

  useEffect(() => {
    const fetchProductDetail = () => {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "products/" + id)
        .then((res) => {
          setDetails({ ...res.data });
        })
        .catch((error) => console.log(error));
      axios
        .get(process.env.REACT_APP_SERVER_URL + "products/" + id + "/related")
        .then((res) => {
          setRelated([...res.data]);
        })
        .catch((error) => console.log(error));
    };
    fetchProductDetail();
  }, [id]);

  return (
    <>
      <div className="container mb-5">
        <div className="row mb-5">
          <div className="col-lg-5 col-md-12 col-md-12 d-flex justify-content-center mt-5 ">
            <Carousel className="shadow detail-slider">
              {details.IMAGES.map((image, index) => {
                return (
                  <Carousel.Item key={index}>
                    <img className="d-block w-100" src={image} alt="" />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
          <div className="d-flex flex-column col-lg-7 col-md-12 col-md-12 mt-5">
            <Textfit mode="multi" className="product-details-name">
              {details.DISH_NAME}
            </Textfit>
            <span className="product-details-price">
              Price: ${details.PRICE}
            </span>
            <hr className="w-100" />
            <p className="product-details-description mb-0">
              {details.DESCRIPTION}
            </p>
            <hr className="w-100" />
            <span className="product-details-view">
              <FaEye className="mr-2" />
              {details.VIEW} views
            </span>
            <div className="mt-auto d-flex justify-content-between align-items-center">
              <div className="d-flex h-75">
                <Button className="stepper-button" onClick={decrement}>
                  <FaMinus />
                </Button>
                <input
                  type="number"
                  value={quantity}
                  className="border text-center w-25"
                  onChange={handleChange}
                />

                <Button className="stepper-button" onClick={increment}>
                  <FaPlus />
                </Button>
              </div>

              <Button
                onClick={() => {
                  addItemToCart(details, quantity);
                }}
                className="py-3 px-4 custom-button"
                aria-disabled={!details.STATUS}
                disabled={!details.STATUS}
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-5 px-5 pb-5 mb-4">
        <h2 className="text-center font-weight-bold ">RELATED PRODUCTS</h2>
        <ProductCarousel products={related} addItemToCart={addItemToCart} />
      </section>
    </>
  );
};

export default ProductDetails;
