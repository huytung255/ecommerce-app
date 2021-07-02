import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TimeKeeper from "react-timekeeper";
import { FaClock } from "react-icons/fa";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
const Checkout = ({ cart, setCart }) => {
  const history = useHistory();
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    phone: "",
    address: "",
    time: "8:00am",
    note: "",
  });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [alert, setAlert] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      history.push("/login");
      return;
    }
    axios
      .get(process.env.REACT_APP_SERVER_URL + "users/profile/", {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        const { name, phone, address } = res.data;
        setDeliveryInfo({
          ...deliveryInfo,
          name: name,
          phone: phone,
          address: address,
        });
      })
      .catch((error) => console.log(error));
  }, []);
  const handleInfoChange = (type, value) => {
    setDeliveryInfo({ ...deliveryInfo, [type]: value });
  };
  const placeOrder = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      history.push("/login");
      return;
    }
    for (let i in deliveryInfo) {
      if (i !== "note" && deliveryInfo[i] === "") {
        setAlert("Please fill all required fields!");
        return;
      }
    }
    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "users/place-order",
        {
          ...deliveryInfo,
          total: cart.totalPrice,
          items: cart.items,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      )
      .then((res) => {
        const orderId = res.data;
        const newCart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
        setCart({ ...newCart });
        history.push("/profile/orders/" + orderId);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="d-flex flex-column align-items-center container checkout-wrap mb-5">
      <h3>CHECKOUT</h3>
      <div className="row w-100 m-0">
        <div className="mt-3 col-md-6 col-12 px-1">
          <div className="checkout-items ">
            {Object.keys(cart.items).map((cartItem) => {
              const { IMAGES, DISH_NAME, PRICE } = cart.items[cartItem].item;
              const { qty, price } = cart.items[cartItem];
              return (
                <React.Fragment key={cartItem}>
                  <div className="d-flex">
                    <img
                      src={IMAGES[0]}
                      alt="dish"
                      className="order-details-image mr-2"
                    />
                    <div className="d-flex flex-column w-100">
                      <div className="order-details-dish-name">{DISH_NAME}</div>
                      <div className="order-details-price">Price: ${PRICE}</div>
                      <div className="d-md-flex justify-content-between">
                        <div className="order-details-quantity">
                          Quantity: {qty}
                        </div>
                        <div className="order-details-subtotal">
                          Subtotal: ${price}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              );
            })}
            <div className="text-center order-details-total">
              Total: ${cart.totalPrice}
            </div>
          </div>
        </div>

        <div className="mt-3 col-md-6 col-12 px-1">
          <Form noValidate className="checkout-info">
            {alert === "" ? (
              ""
            ) : (
              <Alert variant="danger" className="text-center font-weight-bold">
                {alert}
              </Alert>
            )}
            <Form.Group className="" controlId={"receiver's name"}>
              <Form.Label className="text-capitalize">
                Receiver's Name *:
              </Form.Label>
              <Form.Control
                type="text"
                name="receiver's name"
                value={deliveryInfo.name}
                onChange={(e) => handleInfoChange("name", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="" controlId={"receiver's phone number"}>
              <Form.Label className="text-capitalize">
                Receiver's Phone Number *:
              </Form.Label>
              <Form.Control
                type="text"
                name="receiver's phone number"
                value={deliveryInfo.phone}
                onChange={(e) => handleInfoChange("phone", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="" controlId={"receiver's address"}>
              <Form.Label className="text-capitalize">
                Receiver's Address *:
              </Form.Label>
              <Form.Control
                type="text"
                name="receiver's address"
                value={deliveryInfo.address}
                onChange={(e) => handleInfoChange("address", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="" controlId={"prefered delivery time"}>
              <Form.Label className="text-capitalize">
                Prefered Delivery Time *:
              </Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  disabled
                  type="text"
                  name="prefered delivery time"
                  value={deliveryInfo.time}
                />
                <InputGroup.Append>
                  <Button
                    className="py-2 px-3 custom-button"
                    onClick={() => setShowTimePicker(!showTimePicker)}
                  >
                    <FaClock />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              {showTimePicker ? (
                <div className="d-flex justify-content-center">
                  <TimeKeeper
                    time={deliveryInfo.time}
                    onChange={(newTime) =>
                      handleInfoChange("time", newTime.formatted12)
                    }
                  />
                </div>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="" controlId={"note"}>
              <Form.Label className="text-capitalize">
                Note (Optional):
              </Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="note"
                value={deliveryInfo.note}
                onChange={(e) => handleInfoChange("note", e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button className="py-3 px-4 custom-button" onClick={placeOrder}>
                PLACE ORDER
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
