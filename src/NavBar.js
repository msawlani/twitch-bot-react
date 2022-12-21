import React from "react";

const NavBar = () => {
  return (
    <div className="bg-secondary">
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <h1>nav</h1>
          </div>
          <div className="col">
            <a href="/">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
