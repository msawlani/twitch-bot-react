import React, { useState, useEffect } from "react";
import links from "./data/NavLinks.json";
import { NavLink } from "react-router-dom";
import "./SideBar.css";
import { Button } from "react-bootstrap";

const NavBar = ({ userData }) => {
  function generateRandomString(length) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  }
  const clientId = process.env.REACT_APP_STREAMER_CLIENT_ID;
  const redirectUri = encodeURIComponent("http://localhost:3000");
  const responseType = "token";
  const scope = "user%3Aread%3Aemail+chat%3Aedit+chat%3Aread";
  const state = encodeURIComponent(generateRandomString(10));
  function redirectToTwitchAuth() {
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;
    window.location.href = authUrl;
  }

  const handleClick = () => {
    redirectToTwitchAuth();
  };

  return (
    <div className="bg-secondary sideNav">
      <div className="text-center">
        <div>
          <img src={userData?.profile_image_url} className="profileImg" />
          <h4>{userData?.display_name}</h4>
        </div>

        <ul className=" list-unstyled">
          {links.Links.map((link, id) => (
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "main-nav")}
                to={link.link}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="text-center">
          <Button onClick={handleClick}>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
