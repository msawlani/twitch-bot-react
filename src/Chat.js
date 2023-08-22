import React, { useState, useEffect, useRef } from "react";
import { client } from "./bot";
import { useOutletContext } from "react-router-dom";

const Chat = ({ chat, setChat }) => {
  // const [messages, setMessages] = useState("");
  const [userData, setUserData] = useOutletContext();
  const messages = useRef();

  console.log(userData?.display_name);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messages === "") {
      return;
    }
    client.say("sinsofaninja", messages.current.value);
    messages.current.value = "";
  };

  const clearChat = () => {
    setChat([]);
    localStorage.setItem("chat", JSON.stringify([]));
  };

  return (
    <div className="">
      <div className="row">
        <div className="col-12 col-lg-9">
          <iframe
            className="w-100"
            src={`https://player.twitch.tv/?channel=sinsofaninja&parent=${process.env.REACT_APP_PLAYERURL}&autoplay=true&muted=true`}
            height="500px"
            frameborder="0"
            scrolling="no"
            allowfullscreen="true"
          ></iframe>
        </div>

        <div className="col-12 col-lg-3">
          <div className="d-flex flex-column-reverse overflow-auto">
            {chat
              .slice()
              .reverse()
              .map((msg, index) => (
                <div key={index}>
                  <strong style={{ color: msg.color }}>{msg.user}: </strong>
                  <span>{msg.text}</span>
                </div>
              ))}
          </div>
          <form onSubmit={sendMessage}>
            <div className="form-group">
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Type a message"
                ref={messages}
                hidden={userData?.login !== process.env.REACT_APP_TWITCH_USER}
              />
            </div>

            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary"
                type="submit"
                hidden={userData?.login !== process.env.REACT_APP_TWITCH_USER}
              >
                Send
              </button>
              <button
                className="btn btn-danger"
                hidden={false}
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
