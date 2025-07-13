// src/components/Login.tsx

import { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [role, setRole] = useState<"tenant" | "landlord">("tenant");
  const [wallet, setWallet] = useState<string>("");
  const [error, setError] = useState<string>("");

  const nav = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!(window as any).ethereum) {
      setError("MetaMask is not installed");
      return;
    }

    try {
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      setWallet(walletAddress);

      if (walletAddress && role) {
        nav(`/login-form?role=${role}&wallet=${walletAddress}`);
      } else {
        setError("Missing role or wallet info.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Could not connect wallet. Please try again.");
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #e4f8f6, #e8f5f8)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <img
          src="/Rent.logo.jpg"
          alt="DecentraRent Logo"
          style={{ width: "80px", marginBottom: "1rem" }}
        />

        <h2 style={{ marginBottom: "1.5rem" }}>DecentraRent Login</h2>

        <div style={{ marginBottom: "1.5rem" }}>
          <button
            onClick={() => {
              setRole("tenant");
              setError("");
            }}
            style={{
              padding: "0.7rem 1.5rem",
              marginRight: "1rem",
              fontSize: "1rem",
              backgroundColor: role === "tenant" ? "#007BFF" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Tenant
          </button>
          <button
            onClick={() => {
              setRole("landlord");
              setError("");
            }}
            style={{
              padding: "0.7rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: role === "landlord" ? "#007BFF" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Landlord
          </button>
        </div>

        <button
          onClick={handleLogin}
          style={{
            padding: "0.8rem 2rem",
            fontSize: "1.1rem",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
        >
          Connect Wallet & Login as{" "}
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>

        <p>
          Don’t have an account?{" "}
          <a
            href={`/create-account?role=${role}&wallet=${wallet}`}
            style={{ color: "#007BFF", textDecoration: "underline" }}
          >
            Create one
          </a>
        </p>

        {error && (
          <p style={{ color: "red", marginTop: "1rem", fontWeight: "bold" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
