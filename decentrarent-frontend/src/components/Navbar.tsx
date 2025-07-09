import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <h2 style={{ marginRight: "1rem" }}>DecentraRent</h2>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={styles.hamburger}
          className="hamburger"
        >
          ☰
        </button>
        <div
          style={{
            ...styles.links,
            display: menuOpen ? "flex" : window.innerWidth > 768 ? "flex" : "none",
          }}
        >
          <Link style={styles.link} to={role === "tenant" ? "/tenant" : "/landlord"}>
            {role === "tenant" ? "Tenant Dashboard" : "Landlord Dashboard"}
          </Link>
          <Link style={styles.link} to="/payments">Payment Dashboard</Link>
          <Link style={styles.link} to="/myleases">My Leases</Link>
          <Link style={styles.link} to="/properties">Properties</Link>
          <Link style={styles.link} to="/account">Account</Link>
          <Link style={styles.link} to="/support">Support</Link>
          <Link style={styles.link} to="/about">About</Link>
        </div>
      </div>

      <div style={styles.right}>
        <Link to="/checkout" style={{ ...styles.link, position: "relative" }}>
          🛒
          <span style={styles.cartBadge}>{cart.length}</span>
        </Link>
        <span style={{ fontSize: "0.9rem" }}>{user?.email}</span>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </nav>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2b2b2b",
    padding: "1rem 2rem",
    color: "white",
    flexWrap: "wrap",
  },
  left: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  hamburger: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    color: "white",
    display: "none",
    cursor: "pointer",
  },
  links: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    flexWrap: "wrap",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginTop: "0.5rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    position: "relative",
  },
  logout: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    borderRadius: "4px",
  },
  cartBadge: {
    position: "absolute",
    top: "-0.6rem",
    right: "-0.7rem",
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    fontSize: "0.7rem",
    padding: "0.15rem 0.4rem",
  },
};

// Responsive hamburger visibility
if (typeof window !== "undefined") {
  const mq = window.matchMedia("(max-width: 768px)");
  if (mq.matches) {
    styles.hamburger.display = "inline";
    styles.links.flexDirection = "column";
  }
}
