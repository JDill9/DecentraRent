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

  // Add e: React.FormEvent and prevent default
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[email] && users[email].password === password) {
      auth.login(role, email, wallet, users[email].username); // Login state set
      nav(role === "tenant" ? "/tenant" : "/landlord");       // Redirect to dashboard
    } else {
      setError("Invalid credentials.");
    }
  };

  useEffect(() => {
    if (!wallet) {
      nav("/login"); // No wallet? Redirect back
    }
  }, [wallet]);

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "10vh" }}>
      <h2>Complete Your Login</h2>

      <p>
        Role: <strong>{role}</strong> <br />
        Wallet: <small>{wallet}</small>
      </p>

      {/* Wrap all in a form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: "block", margin: "1rem auto", width: "200px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", margin: "1rem auto", width: "200px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", margin: "1rem auto", width: "200px" }}
        />

        <button type="submit">Continue to Dashboard</button>
      </form>

      {error && <p className="error">{error}</p>}

      <p style={{ marginTop: "1.5rem" }}>
        Don't have an account?{" "}
        <a href="/create-account" style={{ color: "#007BFF" }}>
          Create one
        </a>
      </p>
    </div>
  );
}
