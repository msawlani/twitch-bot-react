import React, { useState, useEffect, useRef } from "react";
import { client } from "./bot";

const Chat = ({ chat, setChat, userData }) => {
  const [messages, setMessages] = useState("");

  console.log(chat);
  console.log(userData?.display_name);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messages === "") {
      return;
    }
    client.say("sinsofaninja", messages);
    setMessages("");
  };

  const clearChat = () => {
    setChat([]);
    localStorage.setItem("chat", JSON.stringify([]));
  };

  return (
    <div>
      <div className="chatWindow">
        {chat.map((msg, index) => (
          <div key={index}>
            <strong style={{ color: msg.color }}>{msg.user}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message"
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
        />
        <button type="submit">Send</button>
        <button onClick={clearChat} type="button">
          Clear
        </button>
      </form>
    </div>
  );
};

export default Chat;
