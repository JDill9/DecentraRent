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

  const nav = useNavigate(); // For redirecting after wallet connect

  // —————————————————————————————————————————————————————————————————————————————————
  // Main login handler
  // —————————————————————————————————————————————————————————————————————————————————

  const handleWalletConnect = async () => {
    setError("");

    // 1) Ensure MetaMask is available
    if (!(window as any).ethereum) {
      setError("MetaMask is not installed");
      return;
    }

    try {
      // 2) Request wallet access
      await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      // 3) Use ethers.js to get the wallet address
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const wallet = await signer.getAddress();

      // 4) Redirect to login form with wallet + role in query
      nav(`/login-form?wallet=${wallet}&role=${role}`);
    } catch (err: any) {
      console.error("MetaMask login error:", err);
      setError("Could not connect to MetaMask. Please try again.");
    }
  };

  // —————————————————————————————————————————————————————————————————————————————————
  // Render
  // —————————————————————————————————————————————————————————————————————————————————

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "10vh" }}>
      {/* Logo */}
      <img
        src="/logo.png"
        alt="DecentraRent"
        style={{ width: "200px", marginBottom: "2rem" }}
      />

      <h2>DecentraRent Login</h2>

      {/* Role selection buttons */}
      <div className="role-select" style={{ margin: "1rem 0" }}>
        <button
          className={role === "tenant" ? "active" : ""}
          onClick={() => {
            setRole("tenant");
            setError("");
          }}
          style={{ marginRight: "1rem" }}
        >
          Tenant
        </button>
        <button
          className={role === "landlord" ? "active" : ""}
          onClick={() => {
            setRole("landlord");
            setError("");
          }}
        >
          Landlord
        </button>
      </div>

      {/* Wallet connect button */}
      <button className="form-button" onClick={handleWalletConnect}>
        Connect Wallet &amp; Continue
      </button>

      {/* Error message */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
