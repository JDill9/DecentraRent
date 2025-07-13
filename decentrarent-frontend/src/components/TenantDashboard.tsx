// src/components/TenantDashboard.tsx

import React, { useState } from "react";
import { ethers } from "ethers";
import LeaseContractABI from "../abis/LeaseContract.json";
import { useAuth } from "../context/AuthContext";

export function TenantDashboard() {
  const { wallet } = useAuth();

  const [contractAddress, setContractAddress] = useState<string>("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [rentDue, setRentDue] = useState<string>("");

  const loadContract = async () => {
    if (!ethers.isAddress(contractAddress)) {
      alert("❌ Invalid Ethereum address format");
      return;
    }

    if (!(window as any).ethereum) {
      alert("❌ MetaMask not detected");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      const code = await provider.getCode(contractAddress);
      if (code === "0x") {
        alert("❌ No contract found at that address.");
        return;
      }

      const lease = new ethers.Contract(
        contractAddress,
        LeaseContractABI.abi,
        signer
      );
      setContract(lease);

      const r: bigint = await lease.rent();
      setRentDue(ethers.formatEther(r));
    } catch (err: any) {
      console.error("Failed to load contract:", err);
      alert("❌ Could not load contract. See console for details.");
    }
  };

  const payRent = async () => {
    if (!contract || !rentDue) return;
    try {
      const tx = await contract.payRent({ value: ethers.parseEther(rentDue) });
      await tx.wait();
      alert("✅ Rent paid successfully!");
    } catch (err: any) {
      console.error("Payment failed:", err);
      alert("❌ Payment failed: " + (err.message || err));
    }
  };

  return (
    <div className="dashboard-center">
      <div className="dashboard-container styled-card">
        <h2 className="dashboard-heading">Tenant Dashboard</h2>
        <p><strong>Wallet:</strong> <span className="wallet-address">{wallet}</span></p>

        {!contract ? (
          <>
            <label htmlFor="addr" className="form-label">Enter Lease Contract Address:</label>
            <input
              id="addr"
              type="text"
              className="styled-input"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value.trim())}
              placeholder="0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
            />
            <button className="form-button" onClick={loadContract}>Load Lease</button>
          </>
        ) : (
          <>
            <p><strong>Contract Address:</strong> <span className="wallet-address">{contractAddress}</span></p>
            <p><strong>Rent Due:</strong> {rentDue || "..."} ETH</p>
            <button className="form-button" onClick={payRent}>Pay Rent</button>
          </>
        )}
      </div>
    </div>
  );
}
