import React from "react";
import Button from "react-bootstrap/Button";
import { FaMinus, FaPlus } from "react-icons/fa";
import RemoveButton from "./RemoveButton";
const CartItem = ({
  item,
  qty,
  price,
  increment,
  decrement,
  handleChange,
  removeOneCartItem,
}) => {
  const { _id, IMAGES, DISH_NAME, PRICE } = item;
  return (
    <div className="row mx-0 justify-content-between">
      <div className="col-10 d-flex">
        <img src={IMAGES[0]} alt="DISH_NAME" className="cart-img shadow-sm" />
        <div className="d-flex flex-column ml-3">
          <h5 className="cart-product-name">{DISH_NAME}</h5>
          <h6 className="mb-auto cart-product-price text-indigo">
            PRICE: ${PRICE}
          </h6>
          <p className="mb-0 text-secondary">
            <small>Quantity:</small>
          </p>
          <div className="d-flex">
            <Button
              className="stepper-button"
              onClick={() => {
                if (qty > 1) decrement(_id);
                else return;
              }}
            >
              <FaMinus />
            </Button>
            <input
              onChange={(e) => handleChange(e, _id)}
              type="number"
              value={qty}
              className="border text-center cart-product-quantity"
            />

            <Button
              className="stepper-button"
              onClick={() => {
                increment(_id);
              }}
            >
              <FaPlus />
            </Button>
          </div>
        </div>
      </div>
      <div className="col-2 d-flex flex-column">
        <RemoveButton id={_id} removeOneCartItem={removeOneCartItem} />
        <h6 className="mb-0 cart-product-price text-right text-indigo">
          ${price}
        </h6>
      </div>
    </div>
  );
};

export default CartItem;
