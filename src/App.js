import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useOutletContext,
} from "react-router-dom";
import Home from "./Home";
import Chat from "./Chat";
import Commands from "./Commands";
import TimedMessages from "./TimedMessages";
import Settings from "./Settings";
import { client } from "./bot";

const App = () => {
  const userData = useOutletContext();
  const [chat, setChat] = useState([]);
  const savedChat = localStorage.getItem("chat");
  console.log(userData);
  useEffect(() => {
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
      setChat((prevChat) => [...prevChat, newChat]);

      const updatedChat = [...chat, newChat];
      localStorage.setItem("chat", JSON.stringify(updatedChat));

      console.log(savedChat);
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            index
            element={<Chat chat={chat} setChat={setChat} userData={userData} />}
          />
          <Route path="commands" element={<Commands />} />
          <Route path="timed_messages" element={<TimedMessages />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
