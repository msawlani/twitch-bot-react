import React from "react";
import links from "./data/NavLinks.json";
import { NavLink } from "react-router-dom";
import { authenticate } from "twitch-auth";
import "./SideBar.css";
import { Button } from "react-bootstrap";

const NavBar = () => {
  const handleClick = () => {
    // authenticate({
    //   client_id: process.env.REACT_APP_CLIENTID,
    //   client_secret: process.env.REACT_APP_CLIENTSECRET,
    //   redirect_uri: process.env.REACT_APP_URI,
    //   scope: process.env.REACT_APP_SCOPES,
    // });
  };
  return (
    <div className="vh-100 bg-secondary w-25">
      <div className="text-center">
        <span>Picture</span>

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
