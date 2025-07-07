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

  const handleSubmit = () => {
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // ✅ Dummy validation (replace with real backend)
    if (email === "sam@example.com" && password === "password123") {
      auth.login(role, email, wallet); // Save to auth context
      nav(role === "tenant" ? "/tenant" : "/landlord");
    } else {
      setError("Invalid email or password.");
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

      <button onClick={handleSubmit}>Continue to Dashboard</button>

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
