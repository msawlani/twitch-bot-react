import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Chat from "./Chat";
import Commands from "./Commands";
import TimedMessages from "./TimedMessages";
import Settings from "./Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Chat />} />
          <Route path="commands" element={<Commands />} />
          <Route path="timed_messages" element={<TimedMessages />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
