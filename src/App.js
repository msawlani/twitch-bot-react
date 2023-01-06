import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Chat from "./Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="chat" element={<Chat />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
