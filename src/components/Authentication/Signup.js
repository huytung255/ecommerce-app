import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [retypePassword, setRetypePassword] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isRetypePasswordInvalid, setIsRetypePasswordInvalid] = useState(false);
  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [alert, setAlert] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  let history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      history.push("/");
      return;
    }
  }, [history]);
  const signup = (e) => {
    e.preventDefault();
    if (
      isEmailInvalid ||
      isPasswordInvalid ||
      isRetypePasswordInvalid ||
      isNameInvalid
    ) {
      setAlert("Please fill in all required fields.");
      return;
    }
    if (password !== retypePassword) {
      setAlert("Please retype your password again.");
      return;
    }
    axios
      .post(process.env.REACT_APP_SERVER_URL + "signup", {
        email: email,
        password: password,
        name: name,
        phone: phone,
        address: address,
      })
      .then((res) => {
        setIsSuccess(true);
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data.msg);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };
  useEffect(() => {
    if (email === "") setIsEmailInvalid(true);
    else setIsEmailInvalid(false);
  }, [email]);
  useEffect(() => {
    if (password === "") setIsPasswordInvalid(true);
    else setIsPasswordInvalid(false);
  }, [password]);
  useEffect(() => {
    if (retypePassword === "") setIsRetypePasswordInvalid(true);
    else setIsRetypePasswordInvalid(false);
  }, [retypePassword]);
  useEffect(() => {
    if (name === "") setIsNameInvalid(true);
    else setIsNameInvalid(false);
  }, [retypePassword]);
  const handleEmailBlur = () => {
    if (email === "" || email === null) setIsEmailInvalid(true);
    else setIsEmailInvalid(false);
  };
  const handlePasswordBlur = () => {
    if (password === "" || password === null) setIsPasswordInvalid(true);
    else setIsPasswordInvalid(false);
  };
  const handleRetypePasswordBlur = () => {
    if (retypePassword === "" || retypePassword === null)
      setIsRetypePasswordInvalid(true);
    else setIsRetypePasswordInvalid(false);
  };
  const handleNameBlur = () => {
    if (name === "" || name === null) setIsNameInvalid(true);
    else setIsNameInvalid(false);
  };
  return (
    <div className="background">
      <div className="d-flex my-5 justify-content-center">
        <Form className="custom-form custom-form-signup">
          <h1 className=" text-center mb-4">SIGN UP</h1>
          {isSuccess ? (
            <Alert variant="success" className="text-center font-weight-bold">
              Please verify your email before logging in.
            </Alert>
          ) : (
            <>
              {alert === "" ? (
                ""
              ) : (
                <Alert
                  variant="danger"
                  className="text-center font-weight-bold"
                >
                  {alert}
                </Alert>
              )}
              <div className="row">
                <div className="col-lg-6">
                  <p>Enter account</p>
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

                  <Form.Group controlId="password">
                    <Form.Control
                      isInvalid={isPasswordInvalid}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={handlePasswordBlur}
                    />
                    {isPasswordInvalid ? (
                      <Form.Text className="text-danger">
                        This field is required
                      </Form.Text>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <Form.Group controlId="retypePassword">
                    <Form.Control
                      isInvalid={isRetypePasswordInvalid}
                      type="password"
                      placeholder="Retype password"
                      name="retypePassword"
                      onChange={(e) => setRetypePassword(e.target.value)}
                      onBlur={handleRetypePasswordBlur}
                    />
                    {isRetypePasswordInvalid ? (
                      <Form.Text className="text-danger">
                        This field is required
                      </Form.Text>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                </div>
                <div className="col-lg-6">
                  <p>Enter information</p>
                  <Form.Group controlId="name">
                    <Form.Control
                      isInvalid={isNameInvalid}
                      type="text"
                      placeholder="Name"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      onBlur={handleNameBlur}
                    />
                    {isNameInvalid ? (
                      <Form.Text className="text-danger">
                        This field is required
                      </Form.Text>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <Form.Group controlId="phone">
                    <Form.Control
                      type="number"
                      placeholder="Phone number"
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="address">
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex flex-column mt-5 text-center align-items-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="py-4 px-5 mb-3 custom-button"
                  onClick={signup}
                >
                  NEXT
                </Button>
                <p className="mb-2">
                  Already have an account?{" "}
                  <Link to="/login" className="auth-links">
                    Log in.
                  </Link>
                </p>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Signup;
