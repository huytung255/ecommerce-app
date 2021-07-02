import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [alert, setAlert] = useState("");
  let history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      history.push("/");
      return;
    }
  }, [history]);
  const login = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_SERVER_URL + "login", {
        email: email,
        password: password,
      })
      .then((res) => {
        let expiresOn = new Date();
        expiresOn.setDate(expiresOn.getDate() + 1);
        const temp = {
          _id: res.data._id,
          token: res.data.token,
          expiresOn: expiresOn,
        };
        const stringUser = JSON.stringify(temp);
        localStorage.setItem("user", stringUser);
        history.push("/");
        history.go(0);
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
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
  useEffect(() => {
    if (email === "") setIsEmailInvalid(true);
    else setIsEmailInvalid(false);
  }, [email]);
  useEffect(() => {
    if (password === "") setIsPasswordInvalid(true);
    else setIsPasswordInvalid(false);
  }, [password]);
  const handleEmailBlur = () => {
    if (email === "" || email === null) setIsEmailInvalid(true);
    else setIsEmailInvalid(false);
  };
  const handlePasswordBlur = () => {
    if (password === "" || password === null) setIsPasswordInvalid(true);
    else setIsPasswordInvalid(false);
  };
  return (
    <div className="background">
      <div className="d-flex my-5 justify-content-center">
        <Form
          noValidate
          className="custom-form custom-form-login"
          onSubmit={login}
        >
          <h1 className=" text-center mb-4">LOG IN</h1>
          {alert === "" ? (
            ""
          ) : (
            <Alert variant="danger" className="text-center font-weight-bold">
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
          <div className="d-flex flex-column mt-5 text-center align-items-center">
            <Button
              variant="primary"
              type="submit"
              className="py-4 px-5 mb-3 custom-button"
            >
              NEXT
            </Button>

            <p className="mb-2">
              Don't have an account?{" "}
              <Link to="/signup" className="auth-links">
                Sign up.
              </Link>
            </p>
            <p className="mb-0">
              <Link to="/forgot-password" className="auth-links">
                Forgot password?
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
