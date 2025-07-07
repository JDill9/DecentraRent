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

    // Dummy auth check
    if (email === "sam@example.com" && password === "password123") {
      auth.login(role, email, wallet, username);
      nav(role === "tenant" ? "/tenant" : "/landlord");
    } else {
      setError("Invalid credentials.");
    }
  };

  useEffect(() => {
    if (!wallet) {
      nav("/login"); // Go back if no wallet
    }
  }, [wallet]);

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "10vh" }}>
      <h2>Complete Your Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: "0.5rem", padding: "0.5rem" }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "0.5rem", padding: "0.5rem" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "0.5rem", padding: "0.5rem" }}
      />

      <button onClick={handleSubmit}>Continue to Dashboard</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
