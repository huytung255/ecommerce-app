import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const Pagination = ({ pageNumber, setPageNumber, totalPages }) => {
  const pages = new Array(totalPages).fill(null).map((v, i) => i);
  return (
    <nav aria-label="Page navigation" className="mt-3">
      <ul className="pagination justify-content-center">
        <li className={"page-item " + (pageNumber === 0 ? "disabled" : "")}>
          <button
            className="page-link"
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            <FaChevronLeft />
          </button>
        </li>
        {pages.map((number) => {
          return (
            <li
              key={number}
              className={"page-item " + (pageNumber === number ? "active" : "")}
            >
              <button
                className="page-link"
                onClick={() => setPageNumber(number)}
              >
                {number + 1}
                {pageNumber === number ? (
                  <span className="sr-only">(current)</span>
                ) : (
                  ""
                )}
              </button>
            </li>
          );
        })}
        <li
          className={
            "page-item " + (pageNumber >= pages.length - 1 ? "disabled" : "")
          }
        >
          <button
            className="page-link"
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            <FaChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
