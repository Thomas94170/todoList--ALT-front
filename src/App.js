// // App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Createstack from "./pages/createstack";
import Updated from "./pages/updated";
import Home from "./pages/home";
import Dropdown from "./components/dropdown/dropdown";

const App = () => {
  return (
    <div className="App">
      <Dropdown />{" "}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Createstack />} />
        <Route path="/updated/:_id" element={<Updated />} />
      </Routes>
    </div>
  );
};

export default App;
