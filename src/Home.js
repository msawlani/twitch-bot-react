import React, { useState, useEffect } from "react";
import { client } from "./bot";
import "./App.css";
import NavBar from "./NavBar";
import Chat from "./Chat";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="vh-100 vw-100 d-flex justify-content-around bg-black text-white p-0 m-0">
      <NavBar />
      <div className="w-75 h-100 d-flex flex-column justify-content-start">
        <h1 className="text-center">Twitch Chat Bot</h1>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
