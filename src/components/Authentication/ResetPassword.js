import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
const ResetPassword = () => {
  const token = useParams();
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("danger");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isRetypePasswordInvalid, setIsRetypePasswordInvalid] = useState(false);
  let history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      history.push("/");
      return;
    }
  }, [history]);
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SERVER_URL + "check-reset-password/" + token.token
      )
      .then((res) => {
        setIsTokenValid(true);
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          setIsTokenValid(false);
          setAlertType("danger");
          setAlert("Invalid password reset link.");
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }, []);
  const handlePasswordBlur = () => {
    if (password === "" || password === null) setIsPasswordInvalid(true);
    else setIsPasswordInvalid(false);
  };
  const handleRetypePasswordBlur = () => {
    if (retypePassword === "" || retypePassword === null)
      setIsRetypePasswordInvalid(true);
    else setIsRetypePasswordInvalid(false);
  };
  const reset = (e) => {
    e.preventDefault();
    if (
      isPasswordInvalid ||
      isRetypePasswordInvalid ||
      password === "" ||
      retypePassword === ""
    ) {
      setAlert("Please fill in all required fields.");
      return;
    }
    if (password !== retypePassword) {
      setAlert("Please retype your password again.");
      return;
    }
    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "reset-password/" + token.token,
        {
          password: password,
        }
      )
      .then((res) => {
        setAlertType("success");
        setAlert(res.data.msg);
        setIsTokenValid(false);
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
  return (
    <div className="background">
      <div className="d-flex my-5 justify-content-center">
        <Form
          noValidate
          className="custom-form custom-form-forgot"
          onSubmit={reset}
        >
          <h1 className=" text-center mb-5">RESET PASSWORD</h1>
          {alert === "" ? (
            ""
          ) : (
            <Alert variant={alertType} className="text-center font-weight-bold">
              {alert}
            </Alert>
          )}
          {isTokenValid ? (
            <>
              <Form.Group controlId="password">
                <Form.Control
                  isInvalid={isPasswordInvalid}
                  type="password"
                  placeholder="New password"
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
                  placeholder="Retype new password"
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
              <div className="d-flex flex-column mt-5 text-center align-items-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="py-4 px-5 mb-3 custom-button"
                >
                  RESET PASSWORD
                </Button>
              </div>
            </>
          ) : (
            ""
          )}
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
