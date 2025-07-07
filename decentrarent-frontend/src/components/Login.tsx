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
    <div className="container">
      <h2>DecentraRent Login</h2>

      {/* Role toggle */}
      <div className="role-select">
        <button
          className={role === "tenant" ? "active" : ""}
          onClick={() => {
            setRole("tenant");
            setError("");
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
        >
          Landlord
        </button>
      </div>

      {/* Single button for wallet‐based login */}
      <button className="form-button" onClick={handleLogin}>
        Connect Wallet &amp; Login as{" "}
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </button>

      {/* Error display */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
