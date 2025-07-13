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
    <div className="dashboard-center">
      <div className="dashboard-container styled-card">
        <h2 className="dashboard-heading">Account Settings</h2>

        {walletAddress ? (
          <div className="account-box">
            <p><strong>Connected Wallet:</strong></p>
            <p className="wallet-address">{walletAddress}</p>

            <p><strong>Balance:</strong> Ξ{balance}</p>
            <p><strong>Network:</strong> {network}</p>

            <button
              className="form-button"
              onClick={() => {
                setWalletAddress(null);
                setBalance(null);
                setNetwork("");
              }}
              style={{ backgroundColor: "#d32f2f" }}
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <p>Loading wallet info or not connected...</p>
        )}
      </div>
    </div>
  );
}
