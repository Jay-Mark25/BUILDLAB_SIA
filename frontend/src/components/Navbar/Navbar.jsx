import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">BUILDLAB</Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/build" className="navbar-link">Build</Link>
          <Link to="/compatibility" className="navbar-link">Compatibility</Link>
          <button className="navbar-reset">Reset Build</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;