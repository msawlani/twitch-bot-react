import React, { useState, useEffect } from "react";
import { client } from "./bot";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  client.on("chat", (channel, userState, message, self) => {
    let username = userState.username;
    let newMessage = { username, message };
    setMessages([...messages, newMessage]);
    console.log(userState);
  });
  return (
    <div className="container p-5">
      <ul className="list-unstyled">
        {messages.map((message, id) => (
          <li key={id}>{`${message.username} : ${message.message}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
