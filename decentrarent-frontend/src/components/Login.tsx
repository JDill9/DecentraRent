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
      console.log("Requesting MetaMask access...");
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      console.log("Connected wallet:", walletAddress);
      setWallet(walletAddress);

      if (walletAddress && role) {
        const redirectURL = `/login-form?role=${role}&wallet=${walletAddress}`;
        console.log("Redirecting to:", redirectURL);
        nav(redirectURL);
      } else {
        console.log("Missing wallet or role.");
        setError("Missing role or wallet info.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Could not connect wallet. Please try again.");
    }
  };

  return (
    <div
      className="container"
      style={{
        textAlign: "center",
        marginTop: "10vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        alt="DecentraRent Logo"
        style={{ width: "120px", marginBottom: "2rem" }}
      />

      <h2>DecentraRent Login</h2>

      <div className="role-select" style={{ margin: "1.5rem 0" }}>
        <button
          onClick={() => {
            setRole("tenant");
            setError("");
          }}
          style={{
            padding: "0.7rem 1.5rem",
            marginRight: "1rem",
            fontSize: "1rem",
            backgroundColor: "#007BFF",
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
            backgroundColor: "#007BFF",
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
        }}
      >
        Connect Wallet &amp; Login as{" "}
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </button>

      <p style={{ marginTop: "1.5rem" }}>
        Don’t have an account?{" "}
        <a
          href={`/create-account?role=${role}&wallet=${wallet}`}
          style={{ color: "#007BFF", textDecoration: "underline" }}
        >
          Create one
        </a>
      </p>

      {error && (
        <p
          style={{ color: "red", marginTop: "1rem", fontWeight: "bold" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
