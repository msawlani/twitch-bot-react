import React from "react";

const NavBar = () => {
  return (
    <div className="vh-100 bg-secondary w-25">
      <div className="">
        <h4>user profile</h4>
        <a
          href="https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=rgllofa4q2yeh1z61l1xt76boajucs&redirect_uri=http://localhost:3000/&scope=user_read"
          target="_blank"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default NavBar;
