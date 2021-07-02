import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
const Availability = ({ preSelected, selectFilter, deselectFilter }) => {
  const [options, setOptions] = useState({ 1: false, 0: false });
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    let temp = options;
    for (let i in temp) {
      temp[i] = false;
    }
    if (preSelected.length !== 0) setShowMenu(true);
    for (let i in preSelected) {
      setShowMenu(true);
      temp[preSelected[i]] = true;
    }
    setOptions(temp);
  }, [preSelected]);
  const handleOptionClick = (option) => {
    if (options[option]) {
      deselectFilter("availability", option);
    } else {
      selectFilter("availability", option);
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
        Availability {showMenu ? <FaMinus /> : <FaPlus />}
      </button>
      <div
        className={
          `d-flex flex-column filter-type-menu ` +
          (showMenu ? "filter-type-menu-show" : "")
        }
      >
        <span
          className={
            `filter-option text-capitalize px-3 my-1 py-2 ` +
            (options[1] ? "filter-option-selected" : "")
          }
          onClick={() => handleOptionClick(1)}
        >
          Available
        </span>
        <span
          className={
            `filter-option text-capitalize px-3 my-1 py-2 ` +
            (options[0] ? "filter-option-selected" : "")
          }
          onClick={() => handleOptionClick(0)}
        >
          Unavailable
        </span>
      </div>
    </div>
  );
};

export default Availability;
