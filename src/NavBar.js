import React, { useState, useEffect } from "react";
import links from "./data/NavLinks.json";
import { NavLink } from "react-router-dom";
import "./SideBar.css";
import { Navbar, Nav, NavItem, Button, Glyphicon } from "react-bootstrap";
import { Icon } from "@iconify/react";

const NavBar = ({ userData }) => {
  function generateRandomString(length) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  }
  const clientId = process.env.REACT_APP_STREAMER_CLIENT_ID;
  const redirectUri = encodeURIComponent(process.env.REACT_APP_REDIRECT_URI);
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

  console.log(userData);

  return (
    <nav className="d-flex flex-column col-auto p-3 bg-dark align-items-center">
      <div className="flex-grow-1 overflow-auto">
        <div>
          <img src={userData?.profile_image_url} className="profileImg" />
          <span className="ms-1 d-none d-sm-inline">
            {userData?.display_name}
          </span>
        </div>
        <div>
          <ul className="list-unstyled flex-sm-column navbar-nav w-100 pb-3 pt-3 gap-3 justify-content-between">
            {links.Links.map((link, id) => (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active pl-0 px-3" : "main-nav pl-0 px-3"
                  }
                  to={link.link}
                >
                  <Icon icon={link.icon} width="30" height="30" />
                  <span className="ms-1 d-none d-sm-inline">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="d-flex justify-content-center">
          <Button onClick={handleClick}>
            <Icon icon="material-symbols:login" width="30" height="30" />
            <span className="ms-1 d-none d-sm-inline">Login</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
