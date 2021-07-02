import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
const compareArrays = (array1, array2) => {
  var is_same =
    array1.length == array2.length &&
    array1.every(function (element, index) {
      return element === array2[index];
    });
  return is_same;
};
const PriceRange = ({ preSelected, selectFilter, deselectFilter }) => {
  const [options, setOptions] = useState({
    "$3 - $15": {
      data: [3, 15],
      isSelected: false,
    },
    "$16 - $30": {
      data: [16, 30],
      isSelected: false,
    },
    "$31 - $45": {
      data: [31, 45],
      isSelected: false,
    },
    ">= $46": {
      data: [46],
      isSelected: false,
    },
  });
  useEffect(() => {
    let temp = options;
    for (let i in temp) {
      temp[i].isSelected = false;
    }
    if (preSelected.length !== 0) setShowMenu(true);
    for (let i in preSelected) {
      for (let j in temp) {
        if (compareArrays(temp[j].data, preSelected[i])) {
          temp[j].isSelected = true;
        }
      }
    }
    setOptions(temp);
  }, [preSelected]);
  const [showMenu, setShowMenu] = useState(false);
  const handleOptionClick = (option) => {
    if (options[option].isSelected) {
      // setOptions({
      //   ...options,
      //   [option]: { ...options[option], isSelected: false },
      // });
      deselectFilter("range", options[option].data);
    } else {
      // setOptions({
      //   ...options,
      //   [option]: { ...options[option], isSelected: true },
      // });
      selectFilter("range", options[option].data);
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
        Price range {showMenu ? <FaMinus /> : <FaPlus />}
      </button>
      <div
        className={
          `d-flex flex-column filter-type-menu ` +
          (showMenu ? "filter-type-menu-show" : "")
        }
      >
        {Object.keys(options).map((option, index) => {
          return (
            <span
              key={index}
              className={
                `filter-option text-capitalize px-3 my-1 py-2 ` +
                (options[option].isSelected ? "filter-option-selected" : "")
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

export default PriceRange;
