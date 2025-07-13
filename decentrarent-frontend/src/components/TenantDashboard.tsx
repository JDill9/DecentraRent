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
    // 1️⃣ Validate address format
    if (!ethers.isAddress(contractAddress)) {
      alert("❌ Invalid Ethereum address format");
      return;
    }
    // 2️⃣ Ensure MetaMask is available
    if (!(window as any).ethereum) {
      alert("❌ MetaMask not detected");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      // 3️⃣ Make sure there’s code at that address
      const code = await provider.getCode(contractAddress);
      if (code === "0x") {
        alert(
          "❌ No contract found at that address. Make sure you entered your *contract* address, not your wallet address!"
        );
        return;
      }

      // 4️⃣ Instantiate and fetch rent
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
    // Outer wrapper centers this page both vertically & horizontally
    <div className="dashboard-center">
      <div className="dashboard-container">
        <h1>Tenant Dashboard</h1>
        <p>
          <strong>Wallet:</strong> {wallet}
        </p>

        {!contract ? (
          <>
            <label htmlFor="addr">Enter Lease Contract Address:</label>
            <input
              id="addr"
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value.trim())}
              placeholder="0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
            />
            <button onClick={loadContract}>Load Lease</button>
          </>
        ) : (
          <>
            <p>
              <strong>Contract Address:</strong> {contractAddress}
            </p>
            <p>
              <strong>Rent Due:</strong> {rentDue || "..."} ETH
            </p>
            <button onClick={payRent}>Pay Rent</button>
          </>
        )}
      </div>
    </div>
  );
}
