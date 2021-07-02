import React, { useRef } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Textfit } from "react-textfit";
const Product = ({ product, addItemToCart }) => {
  const { _id, DISH_NAME, STATUS, PRICE, VIEW, IMAGES } = product;

  // useEffect(() => {
  //   var element = productName.current;
  //   if (element.scrollHeight > element.clientHeight) {
  //     let newFontSize =
  //       ((element.clientHeight / element.scrollHeight) * 100).toString() + "%";
  //     element.style.fontSize = newFontSize;
  //   }
  // }, []);
  return (
    <Card className="shadow border-0 px-5 pt-5 pb-4 product">
      <Card.Img variant="top" src={IMAGES[0]} className="product-image" />
      <Textfit
        max={15}
        mode="multi"
        className="product-name d-flex align-items-center justify-content-center py-1 mb-0"
      >
        {DISH_NAME}
      </Textfit>
      <Card.Text className="my-1 product-price">${PRICE}</Card.Text>
      <Card.Text className="product-view my-2">
        <FaEye className="mr-1" /> {VIEW} views
      </Card.Text>
      <div className="product-buttons-wrapper d-lg-flex d-none flex-column justify-content-center py-5 px-4">
        <Button
          onClick={() => addItemToCart(product)}
          className="mb-3 py-3 custom-button"
          disabled={!STATUS}
          aria-disabled={!STATUS}
        >
          ADD TO CART
        </Button>
        <Link
          to={`/menu/` + _id}
          className="btn py-3 custom-button"
          disabled={false}
        >
          VIEW PRODUCT
        </Link>
      </div>
      <div className="d-lg-none d-flex flex-column justify-content-center my-3">
        <Button
          onClick={() => addItemToCart(product)}
          className="mb-3 py-3 custom-button"
          disabled={!STATUS}
          aria-disabled={!STATUS}
        >
          ADD TO CART
        </Button>
        <Link
          to={`/menu/` + _id}
          className="btn py-3 custom-button"
          disabled={false}
        >
          VIEW PRODUCT
        </Link>
      </div>
      {STATUS ? "" : <div className="product-badge">UNAVAILABLE</div>}
    </Card>
  );
};

export default Product;
