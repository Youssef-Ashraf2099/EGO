import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../main page/styles/navbar.css";

const Navbar = () => {
  const { role } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      {/* ...same as before... */}
      <div className={`nav-menu${menuOpen ? " flex" : ""}`}>
        <Link to="/api/v1/events" className="nav-link" onClick={() => setMenuOpen(false)}>
          Events
        </Link>
        <Link to="/api/v1/register" className="nav-link nav-button" onClick={() => setMenuOpen(false)}>
          Get Started
        </Link>
        {role === "Standard User" && (
          <Link to="/book-events" className="nav-link" onClick={() => setMenuOpen(false)}>
            Book Events
          </Link>
        )}
        {role === "Organizer" && (
          <Link to="/manage-events" className="nav-link" onClick={() => setMenuOpen(false)}>
            Manage Events
          </Link>
        )}
        {role === "System Admin" && (
          <>
            <Link to="/manage-users" className="nav-link" onClick={() => setMenuOpen(false)}>
              Manage Users
            </Link>
            <Link to="/manage-events" className="nav-link" onClick={() => setMenuOpen(false)}>
              Manage Events
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;