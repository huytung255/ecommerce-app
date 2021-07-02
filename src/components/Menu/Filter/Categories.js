import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";
const Categories = ({ preSelected, selectFilter, deselectFilter }) => {
  const [categories, setCategories] = useState({});
  const [showMenu, setShowMenu] = useState(true);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "products/categories")
      .then((res) => {
        let temp = {};
        for (let i in res.data) {
          temp = { ...temp, [res.data[i]]: false };
        }
        for (let i in preSelected) {
          temp[preSelected[i]] = true;
        }
        setCategories({ ...temp });
      })
      .catch((error) => console.log(error));
  }, [preSelected]);
  const handleOptionClick = (option) => {
    if (categories[option]) {
      setCategories({ ...categories, [option]: false });
      deselectFilter("category", option);
    } else {
      setCategories({ ...categories, [option]: true });
      selectFilter("category", option);
    }
  };
  return (
    <div className="filter-type-wrap">
      <button
        className={
          "w-100 filter-type-button " +
          (showMenu ? "filter-type-button-show" : "")
        }
        onClick={() => setShowMenu(!showMenu)}
      >
        Categories {showMenu ? <FaMinus /> : <FaPlus />}
      </button>
      <div
        className={
          `d-flex flex-column filter-type-menu ` +
          (showMenu ? "filter-type-menu-show" : "")
        }
      >
        {Object.keys(categories).map((option, index) => {
          return (
            <span
              key={index}
              className={
                `filter-option text-capitalize px-3 my-1 py-2 ` +
                (categories[option] ? "filter-option-selected" : "")
              }
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
