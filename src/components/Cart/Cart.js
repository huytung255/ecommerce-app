import React, { useState } from "react";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Cart = ({ cart, setCart }) => {
  const [showModal, setShowModal] = useState(false);
  const increment = (id) => {
    let cartCopy = cart;
    cartCopy.totalQty++;
    cartCopy.totalPrice += cartCopy.items[id].item.PRICE;
    cartCopy.items[id].qty++;
    cartCopy.items[id].price += cartCopy.items[id].item.PRICE;
    setCart({ ...cartCopy });
  };
  const decrement = (id) => {
    let cartCopy = cart;
    cartCopy.totalQty--;
    cartCopy.totalPrice -= cartCopy.items[id].item.PRICE;
    cartCopy.items[id].qty--;
    cartCopy.items[id].price -= cartCopy.items[id].item.PRICE;
    setCart({ ...cartCopy });
  };
  const handleChange = (event, id) => {
    let newQuantity = event.target.value;
    if (!Number(newQuantity) || newQuantity < 1) {
      return;
    }
    let cartCopy = cart;
    let diff = newQuantity - cartCopy.items[id].qty;
    cartCopy.items[id].qty = newQuantity;
    cartCopy.totalQty += diff;
    cartCopy.totalPrice += diff * cartCopy.items[id].item.PRICE;
    cartCopy.items[id].price += diff * cartCopy.items[id].item.PRICE;
    setCart({ ...cartCopy });
  };
  const removeOneCartItem = (id) => {
    let cartCopy = cart;
    cartCopy.totalQty -= cartCopy.items[id].qty;
    cartCopy.totalPrice -= cartCopy.items[id].price;

    const itemsArray = Object.entries(cartCopy.items);
    const newItemsArray = itemsArray.filter(([key, value]) => key !== id);
    cartCopy.items = Object.fromEntries(newItemsArray);
    setCart({ ...cartCopy });
  };
  const clearCart = () => {
    const newCart = {
      items: {},
      totalQty: 0,
      totalPrice: 0,
    };
    setCart({ ...newCart });
  };
  if (cart.totalQty === 0) {
    return (
      <div className="container text-center my-5 px-5 py-5">
        <h1>NO ITEMS IN CART YET</h1>
        <Link to="/menu" className="btn py-3 px-4 mt-5 custom-button">
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }
  return (
    <div className="container mt-5 mb-5">
      {Object.values(cart.items).map((item) => {
        const { _id } = item.item;
        return (
          <div key={_id}>
            <CartItem
              item={item.item}
              qty={item.qty}
              price={item.price}
              increment={increment}
              decrement={decrement}
              handleChange={handleChange}
              removeOneCartItem={removeOneCartItem}
            />
            <hr className="my-4" />
          </div>
        );
      })}
      <div className="d-flex flex-column flex-md-row justify-content-between ">
        <Button
          className="py-3 px-5 custom-button mb-3"
          onClick={() => setShowModal(true)}
        >
          CLEAR CART
        </Button>
        <Modal
          show={showModal}
          animation={false}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>CLEAR CART</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you really want to clear cart?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              No
            </Button>
            <Button variant="danger" onClick={() => clearCart()}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        <Link
          to="/checkout"
          className="py-3 px-5 custom-button mb-3 text-center"
        >
          CHECK OUT
        </Link>
        <h4 className="cart-total-price mb-3 text-center">
          TOTAL: ${cart.totalPrice}
        </h4>
      </div>
    </div>
  );
};

export default Cart;
