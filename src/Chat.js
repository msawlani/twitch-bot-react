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
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-9">
          <iframe
            src="https://player.twitch.tv/?channel=sinsofaninja&parent=ninjashideout-twitch-bot.onrender.com&autoplay=true&muted=true"
            height="1000"
            width="850"
            frameborder="0"
            scrolling="no"
            allowfullscreen="true"
          ></iframe>
        </div>

        <div className="chatWindow col-12 col-md-3">
          {chat.map((msg, index) => (
            <div key={index}>
              <strong style={{ color: msg.color }}>{msg.user}: </strong>
              <span>{msg.text}</span>
            </div>
          ))}
          <form onSubmit={sendMessage} hidden={client.readyState() !== "OPEN"}>
            <div className="form-group">
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Type a message"
                value={messages}
                onChange={(e) => setMessages(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-center">
              <button className="btn btn-primary" type="submit">
                Send
              </button>
              <button
                className="btn btn-danger"
                onClick={clearChat}
                type="button"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
