import React from "react";
import links from "./data/NavLinks.json";
import { NavLink } from "react-router-dom";
import "./SideBar.css";
import { Button } from "react-bootstrap";

const NavBar = () => {
  function redirectToTwitchAuth() {
    const clientId = process.env.REACT_APP_STREAMER_CLIENT_ID;
    const redirectUri = encodeURIComponent("http://localhost/3");
    const responseType = "token";
    const scope = encodeURIComponent("user:read:email");
    const state = encodeURIComponent("SOME_RANDOM_STRING");

    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;
    window.location.href = authUrl;
  }
  function getAccessTokenFromHash() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get("access_token");
  }
  async function fetchUserInfo(accessToken) {
    const response = await fetch("https://api.twitch.tv/helix/users", {
      headers: {
        "Client-ID": process.env.REACT_APP_STREAMER_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.data[0];
    } else {
      throw new Error("Failed to fetch user information");
    }
  }
  const handleClick = () => {
    redirectToTwitchAuth();
    let accessToken = getAccessTokenFromHash();

    if (accessToken) {
      fetchUserInfo(accessToken).then((userInfo) => {
        console.log("user Information:", userInfo);
      });
    }
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
