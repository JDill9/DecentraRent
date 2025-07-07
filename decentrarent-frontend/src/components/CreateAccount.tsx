// src/components/CreateAccount.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleCreate = () => {
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Store user info (⚠️ This is only for demo/dev; never do this in production!)
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email]) {
      setError("Account already exists with this email.");
      return;
    }

    users[email] = { username, email, password };
    localStorage.setItem("users", JSON.stringify(users));

    // Redirect to login
    nav("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10vh" }}>
      <h2>Create Your Account</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: "1rem", padding: "0.5rem", width: "200px" }}
      />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "1rem", padding: "0.5rem", width: "200px" }}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "1rem", padding: "0.5rem", width: "200px" }}
      />
      <br />

      <button
        onClick={handleCreate}
        style={{
          padding: "0.7rem 2rem",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Create Account
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
