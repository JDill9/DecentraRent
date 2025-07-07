// src/components/Login.tsx

import { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

export function Login() {
  // —————————————————————————————————————————————————————————————————————————————————
  // Component state
  // —————————————————————————————————————————————————————————————————————————————————

  const [role, setRole] = useState<"tenant" | "landlord">("tenant");
  const [error, setError] = useState<string>("");

  const nav = useNavigate(); // for redirecting after wallet connect

  // —————————————————————————————————————————————————————————————————————————————————
  // Main login function
  // —————————————————————————————————————————————————————————————————————————————————

  const handleLogin = async () => {
    setError("");

    // 1) Check MetaMask availability
    if (!(window as any).ethereum) {
      setError("MetaMask is not installed");
      return;
    }

    try {
      // 2) Prompt MetaMask to connect
      await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      // 3) Wrap provider & signer via ethers.js
      const provider = new ethers.BrowserProvider(
        (window as any).ethereum
      );
      const signer = await provider.getSigner();

      // 4) Grab the connected wallet address
      const wallet = await signer.getAddress();

      // NEW: Redirect to the form login page with role & wallet
      nav(`/login-form?role=${role}&wallet=${wallet}`);
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Could not connect wallet. Please try again.");
    }
  };

  // —————————————————————————————————————————————————————————————————————————————————
  // Render
  // —————————————————————————————————————————————————————————————————————————————————

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "10vh" }}>
      {/* Logo */}
      <img
        src="/logo192.png" // React default logo
        alt="DecentraRent"
        style={{ width: "120px", marginBottom: "2rem" }}
      />

      <h2>DecentraRent Login</h2>

      {/* Role toggle */}
      <div className="role-select" style={{ margin: "1rem 0" }}>
        <button
          className={role === "tenant" ? "active" : ""}
          onClick={() => {
            setRole("tenant");
            setError("");
          }}
          style={{
            marginRight: "1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Tenant
        </button>
        <button
          className={role === "landlord" ? "active" : ""}
          onClick={() => {
            setRole("landlord");
            setError("");
          }}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Landlord
        </button>
      </div>

      {/* Connect wallet button */}
      <button
        className="form-button"
        onClick={handleLogin}
        style={{
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "12px 30px",
          fontSize: "18px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Connect Wallet &amp; Continue
      </button>

      {/* Error display */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
