// import React, { Component } from "react";
import React from "react";
const Nav = (props) => {
  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="https://learnwith.community/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LWC
        </a>

        <p style={{ color: "grey" }}>{props.account}</p>
      </nav>
    </div>
  );
};
export default Nav;
