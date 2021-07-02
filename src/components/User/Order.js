import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
const Orders = () => {
  const history = useHistory();
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      history.push("/login");
      return;
    }
    setLoading(true);
    axios
      .get(process.env.REACT_APP_SERVER_URL + "users/order-history", {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        setOrderHistory(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="profile-background">
      <img
        src="https://placeimg.com/200/200/animals"
        alt="user"
        className="profile-img mt-3"
      />
      <div className="d-flex flex-column align-items-center container profile-info-wrap mb-5">
        <h2 className="text-center mb-3">ORDER HISTORY</h2>
        {loading ? (
          <Spinner animation="border" variant="warning" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          ""
        )}
        <div className="order-history-list w-100">
          {orderHistory.map((order) => {
            const { historyItem, imgQty } = order;
            return (
              <div key={historyItem._id} className="order-history mb-2">
                <div className="row flex-row-reverse">
                  <div
                    className={
                      "col-md-6 col-sm-12 text-md-right text-center order-history-status-" +
                      historyItem.STATUS
                    }
                  >
                    {historyItem.STATUS === 0
                      ? "Pending"
                      : historyItem.STATUS === 1
                      ? "Confirmed"
                      : "Canceled"}
                  </div>
                  <div className="d-flex col-md-6 col-sm-12 align-items-center justify-content-md-start justify-content-center order-history-subtext">
                    ID: {historyItem._id}
                  </div>
                </div>
                <hr className="my-2" />
                <div className="d-flex align-items-baseline order-history-items">
                  {imgQty.map((one, i) => (
                    <React.Fragment key={i}>
                      <img
                        src={one.image}
                        alt="dish"
                        className="order-history-image"
                      />
                      x{one.qty}
                    </React.Fragment>
                  ))}
                </div>
                <hr className="my-2" />
                <div className="row">
                  <div className="d-flex col-md-6 col-sm-12 align-items-center justify-content-md-start justify-content-center order-history-subtext">
                    Date created: {historyItem.DATECREATED}
                  </div>
                  <div className="col-md-6 col-sm-12 text-md-right text-center order-history-total">
                    Total: {historyItem.TOTAL}$
                  </div>
                </div>
                <div className="d-flex  justify-content-md-end justify-content-center mt-2">
                  <Link
                    to={"/profile/orders/" + historyItem._id}
                    className="py-2 px-3 custom-button"
                  >
                    <FaEye /> Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
