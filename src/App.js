// // App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Createstack from "./pages/createstack";
import Updated from "./pages/updated";
import Home from "./pages/home";
import Dropdown from "./components/dropdown/dropdown";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Dropdown />{" "}
        {/* Assurez-vous que Dropdown est inclus dans la hiérarchie de Router */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Createstack />} />
          <Route path="/update" element={<Updated />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
