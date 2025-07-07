import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <h2>DecentraRent</h2>
        <Link style={styles.link} to={role === "tenant" ? "/tenant" : "/landlord"}>
          {role === "tenant" ? "Tenant Dashboard" : "Landlord Dashboard"}
        </Link>
        <Link style={styles.link} to="/payments">Payment Dashboard</Link>
        <Link style={styles.link} to="/myleases">My Leases</Link> {/* ✅ Updated */}
        <Link style={styles.link} to="/properties">Properties</Link>
        <Link style={styles.link} to="/account">Account</Link>
        <Link style={styles.link} to="/support">Support</Link>
        <Link style={styles.link} to="/about">About</Link>
      </div>
      <div style={styles.right}>
        <span>{user?.email}</span>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    position: "fixed" as const,
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
  },
  left: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logout: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  },
};
