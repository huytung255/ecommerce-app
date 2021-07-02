import React from "react";
const Cover = ({ title }) => {
  return (
    <div className="cover">
      <img src={process.env.PUBLIC_URL + "/bg-1.jpg"} alt="cover" />
      <div className="cover-text">
        <h1>{title}</h1>
        <div className="cover-dash"></div>
      </div>
    </div>
  );
};

export default Cover;
