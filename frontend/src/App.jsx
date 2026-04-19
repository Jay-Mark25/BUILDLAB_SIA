import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Build from "./components/Build/Build";
import Compatibility from "./components/Compatibility/Compatibility";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-buildlab-dark">
        <Navbar />
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<Home />} />

          {/* Build Page */}
          <Route path="/build" element={<Build />} />

          {/* Compatibility Page */}
          <Route path="/compatibility" element={<Compatibility />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;