import React, { useState, useEffect } from "react";
import { client } from "./bot";
import BadWords from "./data/badwords.json";
import Commands from "./data/commands.json";
import TimedMessages from "./data/TimedMessages.json";

const App = () => {
  const [messages, setMessages] = useState([]);

  client.on("chat", (channel, userState, message, self) => {
    let username = userState.username;
    let newMessage = { username, message };
    setMessages([...messages, newMessage]);
  });

  return (
    <div className="App">
      {messages.map((message) => (
        <li>{`${message.username} : ${message.message}`}</li>
      ))}
    </div>
  );
};

export default App;
