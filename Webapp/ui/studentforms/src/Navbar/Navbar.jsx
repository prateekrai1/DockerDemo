import React from "react";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1><span className="span">UofM</span> Student Form</h1>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Student Enroll</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#">Who Are We?</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
