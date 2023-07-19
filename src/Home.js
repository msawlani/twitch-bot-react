import React, { useState, useEffect } from "react";
import { client } from "./bot";
import "./App.css";
import NavBar from "./NavBar";
import Chat from "./Chat";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [userData, setUserData] = useState(() => {
    const storedUsersData = localStorage.getItem("userData");
    return storedUsersData ? JSON.parse(storedUsersData) : [];
  });

  function getAccessTokenFromUrl() {
    const hashParams = window.location.hash.substring(1).split("&");
    const accessToken = (
      hashParams.find((param) => param.startsWith("access_token=")) || ""
    ).split("=")[1];

    return accessToken;
  }

  async function fetchUserInfo(accessToken) {
    const response = await fetch("api/users", {
      headers: {
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
  useEffect(() => {
    let accessToken = getAccessTokenFromUrl();
    localStorage.setItem("accessToken", accessToken);
    console.log(accessToken);
    if (accessToken) {
      fetchUserInfo(accessToken).then((userInfo) => {
        localStorage.setItem("userData", JSON.stringify(userInfo));
        console.log(userData);
      });
    }
  }, [userData]);

  return (
    <div className="bg-black text-white container-fluid">
      <div className="row">
        <NavBar userData={userData} />
        <div className="col">
          <h1 className="text-center">Twitch Chat Bot</h1>
          <Outlet context={userData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
