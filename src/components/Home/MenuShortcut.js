import React from "react";
import Card from "react-bootstrap/Card";
import { MenuShortcutData } from "./MenuShortcutData";
import { Link } from "react-router-dom";
const MenuShortcut = () => {
  return (
    <section className="p-5">
      <h1 className="text-center font-weight-bold">OUR MENU</h1>
      <div className="row px-md-5 px-1">
        {MenuShortcutData.map((item, index) => {
          const { img, title, icon, url } = item;
          return (
            <Link key={index} to={url} className="col-12 col-md-6 col-lg-4 p-3">
              <Card className=" justify-content-center">
                <Card.Img
                  variant="top"
                  className="menu-shortcut-img"
                  src={process.env.PUBLIC_URL + img}
                />
                <Card.ImgOverlay className="tint-overlay d-flex flex-column align-items-center justify-content-center">
                  <span className="menu-shortcut-icon d-flex align-items-center justify-content-center">
                    {icon}
                  </span>
                  <span className="mt-2 menu-shortcut-title">{title}</span>
                </Card.ImgOverlay>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default MenuShortcut;
