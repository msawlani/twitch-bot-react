import React from "react";
import links from "./data/NavLinks.json";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

const NavBar = () => {
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
          <a
            href="https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=rgllofa4q2yeh1z61l1xt76boajucs&redirect_uri=http://localhost:3000/&scope=user_read"
            target="_blank"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
