import React, { useState, useEffect, useRef } from "react";
import { client } from "./bot";

const Chat = () => {
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState("");

  console.log(chat);

  useEffect(() => {
    const savedChat = localStorage.getItem("chat");

    if (savedChat) {
      setChat(JSON.parse(savedChat));
      console.log(savedChat);
    }
    client.on("message", (channel, context, msg) => {
      const color = context.color;
      const newChat = {
        user: context.username,
        text: msg,
        color,
      };
      setChat((prevChat) => {
        const updatedChat = [...prevChat, newChat];
        localStorage.setItem("chat", JSON.stringify(updatedChat));
        return updatedChat;
      });

      console.log(savedChat);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messages === "") {
      return;
    }
    client.say("sinsofaninja", messages);
    setMessages("");
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
      </form>
    </div>
  );
};

export default Chat;
