import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const nav = useNavigate();

  const handleCreate = () => {
    setError("");
    setSuccess("");

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Save to localStorage (replace with backend later)
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email]) {
      setError("Account with this email already exists.");
      return;
    }

    users[email] = { username, password };
    localStorage.setItem("users", JSON.stringify(users));
    setSuccess("Account created! Redirecting to login...");

    setTimeout(() => nav("/login"), 1500);
  };

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "10vh" }}>
      <h2>Create Account</h2>

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

      <button onClick={handleCreate}>Create Account</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
