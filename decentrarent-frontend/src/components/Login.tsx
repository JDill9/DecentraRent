import { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [role, setRole] = useState<"tenant" | "landlord">("tenant");
  const [error, setError] = useState("");
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
      const wallet = await signer.getAddress();

      nav(`/login-form?role=${role}&wallet=${wallet}`);
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Could not connect wallet.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10vh" }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        alt="React Logo"
        style={{ width: "100px", marginBottom: "1rem" }}
      />
      <h2>DecentraRent Login</h2>

      <button
        onClick={() => setRole("tenant")}
        style={{ backgroundColor: role === "tenant" ? "#007BFF" : "#ccc", margin: "0.5rem" }}
      >
        Tenant
      </button>
      <button
        onClick={() => setRole("landlord")}
        style={{ backgroundColor: role === "landlord" ? "#007BFF" : "#ccc", margin: "0.5rem" }}
      >
        Landlord
      </button>

      <br />
      <button onClick={handleLogin} style={{ marginTop: "1rem", backgroundColor: "#28a745" }}>
        Connect Wallet & Login as {role}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
