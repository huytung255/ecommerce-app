import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import axios from "axios";
const ChangePassword = () => {
  const history = useHistory();
  const [alert, setAlert] = useState("");
  const [info, setInfo] = useState({
    currentPassword: "",
    newPassword: "",
    retypeNewPassword: "",
  });
  const changePassword = (e) => {
    e.preventDefault();
    if (info.newPassword !== info.retypeNewPassword) {
      setAlert("Please retype your new password again.");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      history.push("/login");
      return;
    }
    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "users/profile/change-password",
        {
          ...info,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      )
      .then((res) => {
        history.push("/profile");
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
  const handleChange = (item, e) => {
    setInfo({ ...info, [item]: e.target.value });
  };
  const convertCase = (string) => {
    return (
      string
        // insert a space before all caps
        .replace(/([A-Z])/g, " $1")
        // uppercase the first character
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
    );
  };
  return (
    <div className="profile-background">
      <img
        src="https://placeimg.com/200/200/animals"
        alt="user"
        className="profile-img mt-3"
      />
      <div className="d-flex container flex-column profile-info-wrap mb-5">
        <Form noValidate className="row profile-edit" onSubmit={changePassword}>
          {alert === "" ? (
            ""
          ) : (
            <Alert
              variant="danger"
              className="text-center font-weight-bold w-100"
            >
              {alert}
            </Alert>
          )}
          {Object.keys(info).map((item) => {
            return (
              <Form.Group
                key={item}
                className="col-12 p-2 m-0"
                controlId={item}
              >
                <Form.Label className="text-capitalize">
                  {convertCase(item)}
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder={convertCase(item)}
                  name={item}
                  value={info[item]}
                  onChange={(e) => handleChange(item, e)}
                />
              </Form.Group>
            );
          })}
          <div className="col-12 d-flex justify-content-center mt-4">
            <Button type="submit" className="py-2 px-3 custom-button">
              CHANGE
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
