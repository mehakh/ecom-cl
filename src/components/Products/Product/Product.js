import React from "react";
import classes from "./Product.module.css";

function Product({ product }) {
  return (
    <div className={classes.Product}>
      <img src={product.photo} alt="" />
      <br />

      <div className={classes.ProductBox}>
        <h3 title={product.name}>{product.name}</h3>
        <h5>{product.category}</h5>

        <div style={{ textAlign: "center" }}>
          <span>${product.price}</span>
        </div>
      </div>

      <button>Buy</button>
    </div>
  );
}

export default Product;
