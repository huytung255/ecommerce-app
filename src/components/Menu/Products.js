import React from "react";
import Product from "./Product";

import Spinner from "react-bootstrap/Spinner";

const Products = ({ addItemToCart, products, loading }) => {
  if (loading === true) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="warning" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <div>
      <div className="row" id="products">
        {products.map((product) => {
          const { _id } = product;
          return (
            <div
              key={_id}
              className="col-12 col-lg-4 col-md-6 text-center pb-3 px-5 px-lg-3"
            >
              <Product product={product} addItemToCart={addItemToCart} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
