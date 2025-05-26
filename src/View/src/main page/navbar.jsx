import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../main page/styles/navbar.css";
import { handleLogout } from "../authHandlers"; // adjust path if needed
import { useNavigate } from "react-router-dom";

const Port = import.meta.env.VITE_API_PORT || 4000; // Ensure this matches your API port

const Navbar = () => {
  const { role, fetchProfile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="logo">
          <svg className="logo-icon" viewBox="0 0 24 24">
            <path d="M4 4h16v7H4zm0 9h16v7H4zm3-5h10M7 15h10"></path>
          </svg>
          <a href="/">
            <span className="logo-text">EGO</span>
          </a>
        </div>

        <nav className={`nav-menu${menuOpen ? " flex" : ""}`}>
          {/* Show "Get Started" only if not logged in, otherwise show Dashboard */}
          {!role ? (
            <Link to="/api/v1/register" className="nav-link nav-button" onClick={() => setMenuOpen(false)}>
              Get Started
            </Link>
          ) : (
            <Link to="/profile" className="nav-link nav-button" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )}
          {/* Always show Events, but show "My Events" if Organizer */}
          {role === "Organizer" ? (
            <Link to="/events" className="nav-link" onClick={() => setMenuOpen(false)}>
              My Events
            </Link>
          ) : (
            <Link to="/events" className="nav-link" onClick={() => setMenuOpen(false)}>
              Events
            </Link>
          )}
          {/* Role-based links */}
          {role === "Standard User" && (
            <Link to="/bookings" className="nav-link" onClick={() => setMenuOpen(false)}>
              My Bookings
            </Link>
          )}
          {role === "System Admin" && (
            <>
              <Link to="/api/v1/users" className="nav-link" onClick={() => setMenuOpen(false)}>
                Manage Users
              </Link>
              <Link to="/api/v1/events/all" className="nav-link" onClick={() => setMenuOpen(false)}>
                Manage Events
              </Link>
            </>
          )}
          {/* Login/Logout link */}
          {!role ? (
            <Link to="/api/v1/login" className="nav-link" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          ) : (
            <Link
              to="#"
              className="nav-link nav-logout"
              style={{ cursor: "pointer" }}
              onClick={async (e) => {
                e.preventDefault();
                setMenuOpen(false);
                await handleLogout({ fetchProfile, navigate, Port });
              }}
            >
              Logout
            </Link>
          )}
          {/* Additional static links */}
          <a href="/aboutus" className="nav-link" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>

        <button className="mobile-menu-button" onClick={handleMenuToggle}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;