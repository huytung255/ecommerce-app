import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
const Sort = ({ preSelected, selectSort, deselectSort }) => {
  const [showMenu, setShowMenu] = useState({
    name: false,
    price: false,
    view: false,
  });
  const [isSelected, setIsSelected] = useState({
    "From A to Z": false,
    "From Z to A": false,
    "Highest to Lowest": false,
    "Lowest to Highest": false,
    "Most viewed first": false,
    "Least viewed first": false,
  });
  const [options] = useState({
    name: {
      "From A to Z": 1,
      "From Z to A": -1,
    },
    price: {
      "Lowest to Highest": 1,
      "Highest to Lowest": -1,
    },
    view: {
      "Most viewed first": -1,
      "Least viewed first": 1,
    },
  });
  useEffect(() => {
    let newShowMenu = showMenu;
    let newIsSelected = isSelected;
    for (let i in newIsSelected) newIsSelected[i] = false;
    for (let i in preSelected) {
      if (preSelected[i] !== null) {
        newShowMenu[i] = true;
        for (let j in options[i]) {
          if (options[i][j] === preSelected[i]) newIsSelected[j] = true;
        }
      }
    }
  }, [preSelected]);
  const handleOptionClick = (by, option) => {
    let newIsSelected = { ...isSelected };
    for (let i in newIsSelected) {
      newIsSelected[i] = false;
    }
    if (!isSelected[option]) {
      newIsSelected[option] = true;
      setIsSelected({ ...newIsSelected });
      selectSort(by, options[by][option]);
    }
    if (isSelected[option]) {
      setIsSelected({ ...newIsSelected });
      deselectSort();
    }
  };
  return (
    <>
      {Object.keys(options).map((by) => {
        return (
          <div key={by} className="filter-type-wrap">
            <button
              className={
                "w-100 filter-type-button " +
                (showMenu[by] ? "filter-type-button-show" : "")
              }
              onClick={() => setShowMenu({ ...showMenu, [by]: !showMenu[by] })}
            >
              By {by} {showMenu[by] ? <FaMinus /> : <FaPlus />}
            </button>
            <div
              className={
                `d-flex flex-column filter-type-menu ` +
                (showMenu[by] ? "filter-type-menu-show" : "")
              }
            >
              {Object.keys(options[by]).map((option) => {
                return (
                  <span
                    key={option}
                    className={
                      `filter-option text-capitalize px-3 my-1 py-2 ` +
                      (isSelected[option] ? "filter-option-selected" : "")
                    }
                    onClick={() => handleOptionClick(by, option)}
                  >
                    {option}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Sort;
