import React, { useState, useEffect } from "react";
import Cover from "../Cover/Cover";
import Products from "./Products";
import Categories from "./Filter/Categories";
import Pagination from "./Pagination";
import axios from "axios";
import Availability from "./Filter/Availability";
import PriceRange from "./Filter/PriceRange";
import Sort from "./Sort/Sort";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useHistory, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Form } from "react-bootstrap";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }
  return maxIndex;
}
function handleRangeQuery(query) {
  for (let j in query) {
    query[j] = parseInt(query[j]);
  }
  let temp = [];
  if (query.length % 2 !== 0) {
    const index = indexOfMax(query);
    temp.push([query[index]]);
    query.splice(index, 1);
  }
  for (let j in query) {
    if (j % 2 === 0) {
      let subarray = query.slice(j, parseInt(j) + 2);
      temp.push(subarray);
    }
  }
  return temp;
}
const Menu = ({ addItemToCart }) => {
  let query = useQuery();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState({
    category: [],
    availability: [],
    range: [],
  });
  const [sort, setSort] = useState({
    name: null,
    price: null,
    view: null,
  });
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (query.get("search")) {
      let valueFromQuery = query.get("search");
      setSearchInput(valueFromQuery);
      setSearchQuery(valueFromQuery);
    }
    let newFilter = filter;
    let newSort = sort;
    for (let i in filter) {
      if (query.get(i)) {
        let valuesFromQuery = query.get(i).split(",");

        if (i === "range") {
          valuesFromQuery = handleRangeQuery(valuesFromQuery);
        }
        console.log(valuesFromQuery);
        newFilter = {
          ...newFilter,
          [i]: [...newFilter[i], ...valuesFromQuery],
        };
      }
    }
    for (let i in sort) {
      if (query.get(i)) {
        let valuesFromQuery = parseInt(query.get(i));
        newSort = {
          ...newSort,
          [i]: valuesFromQuery,
        };
      }
    }
    setFilter(newFilter);
    setSort(newSort);
    if (query.get("page")) {
      setPageNumber(parseInt(query.get("page")));
    } else {
      setPageNumber(0);
    }
  }, []);
  // useEffect(() => {
  //   console.log(filter);
  // }, [filter]);
  useEffect(() => {
    if (pageNumber !== undefined) {
      setLoading(true);
      if (searchQuery !== "") {
        axios
          .get(process.env.REACT_APP_SERVER_URL + "products/search", {
            params: {
              page: pageNumber,
              search: searchQuery,
            },
          })
          .then((res) => {
            const { totalPages, products } = res.data;
            setProducts([...products]);
            setTotalPages(totalPages);
            if (window.history.pushState) {
              const newQuery = new URLSearchParams({
                page: pageNumber,
                search: searchQuery,
              });
              var newurl =
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?" +
                newQuery.toString();
              window.history.pushState({ path: newurl }, "", newurl);
            }
            setLoading(false);
          })
          .catch((error) => console.log(error));
      } else {
        axios
          .get(process.env.REACT_APP_SERVER_URL + "products", {
            params: {
              page: pageNumber,
              ...filter,
              ...sort,
            },
          })
          .then((res) => {
            const { totalPages, products } = res.data;
            setProducts([...products]);
            setTotalPages(totalPages);
            if (window.history.pushState) {
              let newFilter = {};
              for (let i in filter) {
                if (filter[i].length !== 0) newFilter[i] = filter[i];
              }
              let newSort = {};
              for (let i in sort) {
                if (sort[i] !== null) newSort[i] = sort[i];
              }
              const newQuery = new URLSearchParams({
                page: pageNumber,
                ...newFilter,
                ...newSort,
              });
              var newurl =
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?" +
                newQuery.toString();
              window.history.pushState({ path: newurl }, "", newurl);
            }
            setLoading(false);
          })
          .catch((error) => console.log(error));
      }
    }
  }, [pageNumber, filter, sort, searchQuery]);

  const selectFilter = (type, option) => {
    setFilter({
      ...filter,
      [type]: [...filter[type], option],
    });
    setSearchQuery("");
    setSearchInput("");
    setPageNumber(0);
  };
  const deselectFilter = (type, option) => {
    const array = filter[type];
    const index = array.indexOf(option);
    array.splice(index, 1);
    setFilter({ ...filter, [type]: [...array] });
    setSearchQuery("");
    setSearchInput("");
    setPageNumber(0);
  };
  const selectSort = (by, option) => {
    let newSort = { ...sort };
    for (let i in newSort) {
      if (i === by) {
        newSort[by] = option;
      } else {
        newSort[i] = null;
      }
    }
    setSort({ ...newSort });
    setSearchQuery("");
    setSearchInput("");
    setPageNumber(0);
  };
  const deselectSort = () => {
    let newSort = { ...sort };
    for (let i in newSort) {
      newSort[i] = null;
    }
    setSort({ ...newSort });
    setSearchQuery("");
    setSearchInput("");
    setPageNumber(0);
  };
  const search = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    const resetFilter = {
      category: [],
      availability: [],
      range: [],
    };
    const resetSort = {
      name: null,
      price: null,
      view: null,
    };
    setFilter({ ...resetFilter });
    setSort({ ...resetSort });
    setPageNumber(0);
  };
  return (
    <>
      <Cover title="menu" />
      <div className="container mt-5 mb-4">
        <Form onSubmit={search}>
          <InputGroup className="mb-5 search-bar">
            <FormControl
              aria-label="search product"
              aria-describedby="search-product"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <InputGroup.Append>
              <Button type="submit" id="search-product">
                <FaSearch />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>

        <div className="row">
          <div className="col-lg-3 col-md-12">
            <label className="filter-label">FILTER</label>
            <Categories
              preSelected={filter.category}
              selectFilter={selectFilter}
              deselectFilter={deselectFilter}
            />
            <Availability
              preSelected={filter.availability}
              selectFilter={selectFilter}
              deselectFilter={deselectFilter}
            />
            <PriceRange
              preSelected={filter.range}
              selectFilter={selectFilter}
              deselectFilter={deselectFilter}
            />
            <div className="mb-3"></div>
            <label className="filter-label">SORT</label>
            <Sort
              preSelected={sort}
              selectSort={selectSort}
              deselectSort={deselectSort}
            />
            <div className="mb-3"></div>
          </div>
          <div className="col-lg-9 col-md-12">
            <Products
              addItemToCart={addItemToCart}
              products={products}
              loading={loading}
            />
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
