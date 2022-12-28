import React from "react";

const NavBar = () => {
  return (
    <div className="bg-secondary">
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <h1>Twitch Chat Bot</h1>
          </div>
          <div className="col">
            <a href="https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=rgllofa4q2yeh1z61l1xt76boajucs&redirect_uri=http://localhost:3000/&scope=user_read" target="_blank">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
