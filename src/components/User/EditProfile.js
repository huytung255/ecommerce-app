import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
const EditProfile = () => {
  const history = useHistory();
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    address: "",
    birthday: "",
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      history.push("/login");
      return;
    }
    axios
      .get(process.env.REACT_APP_SERVER_URL + "users/profile", {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        const data = { ...res.data };
        delete data["email"];
        setProfile({ ...profile, ...data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleChange = (item, e) => {
    if (item === "phone") {
      if (isNaN(e.target.value) && e.target.value !== "") {
        return;
      }
    }
    setProfile({ ...profile, [item]: e.target.value });
  };
  const saveEdit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      history.push("/login");
      return;
    }
    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "users/profile/edit",
        {
          ...profile,
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
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };
  const modifyDateValue = (date) => {
    return (
      new Date(date).getFullYear() +
      "-" +
      ("0" + (new Date(date).getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + new Date(date).getDate()).slice(-2)
    );
  };
  useEffect(() => {
    console.log(profile);
  }, [profile]);
  return (
    <div className="profile-background">
      <img
        src="https://placeimg.com/200/200/animals"
        alt="user"
        className="profile-img mt-3"
      />
      <div className="d-flex container flex-column profile-info-wrap mb-5">
        <Form noValidate className="row profile-edit" onSubmit={saveEdit}>
          {Object.keys(profile).map((item) => {
            return (
              <Form.Group
                key={item}
                className="col-lg-6 col-md-6 col-sm-12 p-2 m-0"
                controlId={item}
              >
                <Form.Label className="text-capitalize">{item}</Form.Label>
                <Form.Control
                  type={item === "birthday" ? "date" : "text"}
                  placeholder={`Enter your ` + item + ` here`}
                  name={item}
                  value={
                    item === "birthday"
                      ? modifyDateValue(profile[item])
                      : profile[item]
                  }
                  onChange={(e) => handleChange(item, e)}
                />
              </Form.Group>
            );
          })}
          <div className="col-12 d-flex justify-content-center mt-4">
            <Button type="submit" className="py-2 px-3 custom-button">
              SAVE
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
