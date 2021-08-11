import React, { Component } from "react";

const PriceBar = ({ price }) => {
  return (
    <div id="price">
      <a className="navbar-brand" >
        {/**Navbar infors user how many items there are that have a value of at least 1 */}
        Price Estimate{" "}
        <span className="bage badge-pill badge-secondary">{price}</span>
      </a>
    </div>
  );
};

export default PriceBar;
