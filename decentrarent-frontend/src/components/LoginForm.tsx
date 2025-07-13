// src/components/LoginForm.tsx
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, Role } from "../context/AuthContext";

export function LoginForm() {
  const [params] = useSearchParams();
  const wallet = params.get("wallet") ?? "";
  const role = (params.get("role") as Role) ?? "tenant";

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useAuth();
  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[email] && users[email].password === password) {
      auth.login(role, email, wallet, users[email].username);
      nav(role === "tenant" ? "/tenant" : "/landlord");
    } else {
      setError("Invalid credentials.");
    }
  };

  useEffect(() => {
    if (!wallet) {
      nav("/login");
    }
  }, [wallet]);

  return (
    <div
      className="login-bg"
      style={{
        background: "linear-gradient(145deg, #d2f4e0, #e8f5f8)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        className="login-card"
        style={{
          background: "#fff",
          borderRadius: "1rem",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <img
          src="/Rent.logo.jpg"
          alt="DecentraRent Logo"
          style={{ width: "60px", marginBottom: "1rem" }}
        />
        <h2>Complete Your Login</h2>
        <p>
          Role: <strong>{role}</strong> <br />
          Wallet: <small>{wallet}</small>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ display: "block", margin: "1rem auto", width: "90%", padding: "0.5rem" }}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", margin: "1rem auto", width: "90%", padding: "0.5rem" }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: "block", margin: "1rem auto", width: "90%", padding: "0.5rem" }}
          />

          <button
            type="submit"
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1.5rem",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Continue to Dashboard
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

        <p style={{ marginTop: "1.5rem" }}>
          Don't have an account?{" "}
          <a href="/create-account" style={{ color: "#007BFF" }}>
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
