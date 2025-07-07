// src/components/LoginForm.tsx

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, Role } from "../context/AuthContext";

export function LoginForm() {
  // —————————————————————————————————————————————————————————————————————————————————
  // Read query parameters: wallet and role
  // —————————————————————————————————————————————————————————————————————————————————

  const [params] = useSearchParams();
  const wallet = params.get("wallet") ?? "";
  const role = (params.get("role") as Role) ?? "tenant";

  // —————————————————————————————————————————————————————————————————————————————————
  // Component state for form inputs
  // —————————————————————————————————————————————————————————————————————————————————

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useAuth();
  const nav = useNavigate();

  // —————————————————————————————————————————————————————————————————————————————————
  // Form submission handler
  // —————————————————————————————————————————————————————————————————————————————————

  const handleSubmit = () => {
    setError("");

    // Validate all fields
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Dummy login logic (you can replace with real API later)
    if (email === "sam@example.com" && password === "password123") {
      auth.login(role, email, wallet); // Set context
      nav(role === "tenant" ? "/tenant" : "/landlord");
    } else {
      setError("Invalid email or password.");
    }
  };

  // —————————————————————————————————————————————————————————————————————————————————
  // Redirect if wallet param is missing (no MetaMask connect happened)
  // —————————————————————————————————————————————————————————————————————————————————

  useEffect(() => {
    if (!wallet) {
      nav("/login"); // Go back if they skipped MetaMask
    }
  }, [wallet]);

  // —————————————————————————————————————————————————————————————————————————————————
  // Render
  // —————————————————————————————————————————————————————————————————————————————————

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

      {/* Show any login errors */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
