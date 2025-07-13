import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect whether we're on mobile to show the hamburger
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left side */}
      <div className="nav-left">
        <NavLink to="/" className="nav-logo">
          DecentraRent
        </NavLink>

        {isMobile && (
          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
          >
            ☰
          </button>
        )}

        {(menuOpen || !isMobile) && (
          <div className="nav-links">
            <NavLink
              to={role === "tenant" ? "/tenant" : "/landlord"}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              {role === "tenant" ? "Tenant Dashboard" : "Landlord Dashboard"}
            </NavLink>
            <NavLink
              to="/payments"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              Payment Dashboard
            </NavLink>
            <NavLink
              to="/myleases"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              My Leases
            </NavLink>
            <NavLink
              to="/properties"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              Properties
            </NavLink>
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              Account
            </NavLink>
            <NavLink
              to="/support"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              Support
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              About
            </NavLink>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="nav-right">
        <NavLink to="/checkout" className="cart-link">
          🛒
          <span className="cart-badge">{cart.length}</span>
        </NavLink>
        <span className="nav-user">{user?.email}</span>
        <button className="nav-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
