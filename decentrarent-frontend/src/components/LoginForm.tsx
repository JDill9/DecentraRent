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

    // Dummy validation (replace with real backend in production)
    if (email === "sam@example.com" && password === "password123") {
      auth.login(role, email, wallet); // Sets auth context
      nav(role === "tenant" ? "/tenant" : "/landlord");
    } else {
      setError("Invalid email or password.");
    }
  };

  useEffect(() => {
    if (!wallet) {
      nav("/login"); // Redirect back if no wallet param
    }
  }, [wallet]);

  return (
    <div className="container">
      <h2>Complete Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="form-button" onClick={handleSubmit}>
        Continue to Dashboard
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
