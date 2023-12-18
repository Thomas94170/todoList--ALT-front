import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Createstack from "./pages/createstack";
import Updated from "./pages/updated";
import Home from "./pages/home";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={<Home />} />
        <Route path="/create" component={<Createstack />} />
        <Route path="/update" component={<Updated />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
