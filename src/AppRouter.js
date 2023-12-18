import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Createstack from "./pages/createstack";
import Updated from "./pages/updated";
import Home from "./pages/home";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/create" element={<Createstack />} />
        <Route path="updated/:_id" element={<Updated />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
