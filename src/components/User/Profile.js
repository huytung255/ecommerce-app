import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
const Profile = () => {
  const history = useHistory();
  const [profile, setProfile] = useState({
    email: "",
    password: `*****`,
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
        setProfile({ ...profile, ...res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const modifyDateValue = (date) => {
    return (
      ("0" + new Date(date).getDate()).slice(-2) +
      "-" +
      ("0" + (new Date(date).getMonth() + 1)).slice(-2) +
      "-" +
      new Date(date).getFullYear()
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
        <div className="row">
          {Object.keys(profile).map((item) => (
            <div key={item} className="col-lg-6 col-md-6 col-sm-12 p-2">
              <div className="profile-info">
                <div className="profile-info-title d-flex justify-content-between text-capitalize">
                  {item}
                  {item === "password" ? (
                    <Link
                      to="/profile/change-password"
                      className="custom-button py-1 px-1 change-password"
                    >
                      Change
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                <div className="text-right">
                  {profile[item] === ""
                    ? "N/A"
                    : item === "birthday"
                    ? modifyDateValue(profile[item])
                    : profile[item]}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center mt-4 mb-3">
            <Link to="/profile/orders" className="py-2 px-3 custom-button">
              ORDER HISTORY
            </Link>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center mt-4 mb-3 ">
            <Link to="/profile/edit" className="py-2 px-3 custom-button">
              EDIT PROFILE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
