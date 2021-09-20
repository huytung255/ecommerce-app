import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaGithub,
  FaGooglePlusG,
  FaInstagram,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col-lg-3 col-md-6  text-center">
            <img
              src={process.env.PUBLIC_URL + "/logo-inverse-198x66.png"}
              alt="logo"
              className="mb-4"
            />
          </div>

          {/* Column3 */}
          <div className="col-lg-3 col-md-6 mb-2">
            <h4 className="footer-title">Information</h4>
            <ul className="col-6 footer-menu-list mt-4 p-0 w-100">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Linkbout">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          {/* Column2 */}
          <div className="col-lg-3 col-md-6 mb-2">
            <h4 className="footer-title">Our Menu</h4>
            <div className="row mt-4 mx-0">
              <ul className="col-6 footer-menu-list p-0">
                <li>
                  <Link to="/menu?category=pizza">Pizza</Link>
                </li>
                <li>
                  <Link to="/menu?category=spaghetti">Spaghetti</Link>
                </li>
                <li>
                  <Link to="/menu?category=burger">Burger</Link>
                </li>
              </ul>
              <ul className="col-6 footer-menu-list p-0">
                <li>
                  <Link to="/menu?category=rice">Rice</Link>
                </li>
                <li>
                  <Link to="/menu?category=dessert">Dessert</Link>
                </li>
                <li>
                  <Link to="/menu?category=drink">Drink</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-2">
            <h4 className="footer-title">Find Us On</h4>
            <div className="d-flex mt-4">
              <a href="/#" className="footer-button mr-1">
                <FaFacebookF />
              </a>
              <a href="/#" className="footer-button mr-1">
                <FaGithub />
              </a>
              <a href="/#" className="footer-button mr-1">
                <FaGooglePlusG />
              </a>
              <a href="/#" className="footer-button mr-1">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm text-center footer-subtext">
            &copy;{new Date().getFullYear()} Ecommerce project | All rights
            reserved | Terms Of Service | Privacy |{" "}
            <a href="https://www.templatemonster.com/">
              Design by TemplateMonster
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
