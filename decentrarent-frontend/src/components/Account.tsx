// src/components/Account.tsx
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Account() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [network, setNetwork] = useState<string>("");

  useEffect(() => {
    const loadWallet = async () => {
      if (!(window as any).ethereum) return;

      const provider = new ethers.BrowserProvider((window as any).ethereum);

try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);

      const bal = await provider.getBalance(accounts[0]);
      setBalance(ethers.formatEther(bal));

      const net = await provider.getNetwork();
      setNetwork(net.name);
      } catch (err) {
  console.error("Wallet connection failed:", err);
}
    };

    loadWallet();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", paddingTop: "6rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Account Settings</h1>

      {walletAddress ? (
        <div style={{ border: "1px solid #ccc", borderRadius: "12px", padding: "1.5rem", background: "#f9f9f9" }}>
          <p><strong>Connected Wallet:</strong> {walletAddress}</p>
          <p><strong>Balance:</strong> Ξ{balance}</p>
          <p><strong>Network:</strong> {network}</p>
          <button
            onClick={() => {
              setWalletAddress(null);
              setBalance(null);
              setNetwork("");
            }}
            style={{
              marginTop: "1rem",
              backgroundColor: "#d32f2f",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <p>Loading wallet info or not connected...</p>
      )}
    </div>
  );
}
