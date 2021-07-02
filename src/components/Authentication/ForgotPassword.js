import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState(null);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("danger");
  let history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      history.push("/");
      return;
    }
  }, [history]);
  useEffect(() => {
    if (email === "") setIsEmailInvalid(true);
    else setIsEmailInvalid(false);
  }, [email]);
  const handleEmailBlur = () => {
    if (email === "" || email === null) setIsEmailInvalid(true);
    else setIsEmailInvalid(false);
  };
  const sendEmail = (e) => {
    e.preventDefault();
    if (isEmailInvalid || email === null || email === "") {
      setAlert("Please fill in all required fields.");
      return;
    }
    axios
      .post(process.env.REACT_APP_SERVER_URL + "forgot-password", {
        email: email,
      })
      .then((res) => {
        setAlertType("success");
        setAlert(res.data.msg);
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          setAlertType("danger");
          setAlert(error.response.data.msg);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };
  return (
    <div className="background">
      <div className="d-flex my-5 justify-content-center">
        <Form
          noValidate
          className="custom-form custom-form-forgot"
          onSubmit={sendEmail}
        >
          <h1 className=" text-center mb-5">FORGOT PASSWORD</h1>
          {alert === "" ? (
            ""
          ) : (
            <Alert variant={alertType} className="text-center font-weight-bold">
              {alert}
            </Alert>
          )}
          <Form.Group controlId="email">
            <Form.Control
              isInvalid={isEmailInvalid}
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
            />
            {isEmailInvalid ? (
              <Form.Text className="text-danger">
                This field is required
              </Form.Text>
            ) : (
              ""
            )}
          </Form.Group>

          <div className="d-flex flex-column mt-5 text-center align-items-center">
            <Button
              variant="primary"
              type="submit"
              className="py-4 px-5 mb-3 custom-button"
            >
              SEND PASSWORD RESET EMAIL
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
