import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const OrderDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [order, setOrder] = useState({});
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      history.push("/login");
      return;
    }
    axios
      .get(process.env.REACT_APP_SERVER_URL + "users/order-history/" + id, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        const { details, order } = res.data;
        setDetails([...details]);
        setOrder({ ...order });
      })
      .catch((error) => console.log(error));
  }, [id]);
  const cancelOrder = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      history.push("/login");
      return;
    }
    axios
      .get(
        process.env.REACT_APP_SERVER_URL +
          "users/order-history/" +
          id +
          "/cancel",
        {
          headers: {
            Authorization: user.token,
          },
        }
      )
      .then((res) => {
        if (res.data === "Canceled successfully") {
          history.go(0);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="profile-background">
      <img
        src="https://placeimg.com/200/200/animals"
        alt="user"
        className="profile-img mt-3"
      />
      <div className="d-flex flex-column align-items-center container profile-info-wrap mb-5">
        <div className="d-md-flex justify-content-between text-center w-100">
          <div className="d-flex align-items-center justify-content-center">
            <Link to="/profile/orders/" className="p-2 custom-button">
              <FaAngleLeft /> Back
            </Link>
          </div>

          <h3 className={"my-2 order-history-status-" + order.STATUS}>
            {order.STATUS === 0
              ? "Pending"
              : order.STATUS === 1
              ? "Confirmed"
              : "Canceled"}
          </h3>

          {order.STATUS === 0 ? (
            <div className="d-flex align-items-center justify-content-center">
              <Button
                onClick={() => setShowModal(true)}
                className="p-2 custom-button"
              >
                Cancel
              </Button>
              <Modal
                show={showModal}
                animation={false}
                onHide={() => setShowModal(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>CANCEL ORDER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Do you really want to cancel this order?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </Button>
                  <Button variant="danger" onClick={() => cancelOrder()}>
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="row w-100 m-0">
          <div className="mt-3 col-md-6 col-12 px-1">
            <div className="order-details-items ">
              {details.map((detail, i) => {
                return (
                  <React.Fragment key={i}>
                    <div className="d-flex">
                      <img
                        src={detail.IMAGES[0]}
                        alt="dish"
                        className="order-details-image mr-2"
                      />
                      <div className="d-flex flex-column w-100">
                        <div className="order-details-dish-name">
                          {detail.DISH_NAME}
                        </div>
                        <div className="order-details-price">
                          Price: ${detail.PRICE}
                        </div>
                        <div className="d-md-flex justify-content-between">
                          <div className="order-details-quantity">
                            Quantity: {detail.QUANTITY}
                          </div>
                          <div className="order-details-subtotal">
                            Subtotal: ${detail.SUBTOTAL}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </React.Fragment>
                );
              })}
              <div className="text-center order-details-total">
                Total: ${order.TOTAL}
              </div>
            </div>
          </div>

          <div className="mt-3 col-md-6 col-12 px-1">
            <Form noValidate className="order-details-info">
              <p>Date created: {order.DATECREATED}</p>
              <Form.Group className="" controlId={"receiver's name"}>
                <Form.Label className="text-capitalize">
                  Receiver's Name:
                </Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="receiver's name"
                  value={order.NAME || ""}
                />
              </Form.Group>
              <Form.Group className="" controlId={"receiver's phone number"}>
                <Form.Label className="text-capitalize">
                  Receiver's Phone Number:
                </Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="receiver's phone number"
                  value={order.PHONE || ""}
                />
              </Form.Group>
              <Form.Group className="" controlId={"receiver's address"}>
                <Form.Label className="text-capitalize">
                  Receiver's Address:
                </Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="receiver's address"
                  value={order.ADDRESS || ""}
                />
              </Form.Group>
              <Form.Group className="" controlId={"prefered delivery time"}>
                <Form.Label className="text-capitalize">
                  Prefered Delivery Time:
                </Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="prefered delivery time"
                  value={order.TIME || ""}
                />
              </Form.Group>
              <Form.Group className="" controlId={"note"}>
                <Form.Label className="text-capitalize">Note:</Form.Label>
                <Form.Control
                  disabled
                  as="textarea"
                  type="text"
                  name="note"
                  value={order.NOTE}
                />
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
