import React, { useState, useEffect } from "react";
import { client } from "./bot";
import BadWords from "./data/badwords.json";
import Commands from "./data/commands.json";
import TimedMessages from "./data/TimedMessages.json";
import "./App.css";
import NavBar from "./NavBar";

const App = () => {
  const [messages, setMessages] = useState([]);

  client.on("chat", (channel, userState, message, self) => {
    let username = userState.username;
    let newMessage = { username, message };
    setMessages([...messages, newMessage]);
    console.log(userState);
  });

  return (
    <div className="bg-black text-white">
      <NavBar />
      <div className="fluid-container">
        <div className="m-5">
          <ul className="list-unstyled">
            {messages.map((message, id) => (
              <li key={id}>{`${message.username} : ${message.message}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
