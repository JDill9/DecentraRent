// src/components/TenantDashboard.tsx

import { useState } from "react";
import { ethers } from "ethers";
import LeaseContractABI from "../abis/LeaseContract.json";
import { useAuth } from "../context/AuthContext";

export function TenantDashboard() {
  const { wallet } = useAuth();

  const [contractAddress, setContractAddress] = useState<string>("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [rentDue, setRentDue] = useState<string>("");

  const loadContract = async () => {
    // 1️⃣ Validate the address is 0x-prefixed and correct length
    if (!ethers.isAddress(contractAddress)) {
      alert("❌ Invalid Ethereum address format");
      return;
    }

    // 2️⃣ Make sure MetaMask is there
    if (!(window as any).ethereum) {
      alert("❌ MetaMask not detected");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      // 3️⃣ DEBUG: log what address we’re attempting to load
      console.log("Loading contract at:", contractAddress);

      // 4️⃣ Check code at the address—if it’s “0x”, nothing is deployed there
      const code = await provider.getCode(contractAddress);
      if (code === "0x") {
        alert(
          "❌ No contract found at that address. Make sure you entered your *contract* address, not your wallet address!"
        );
        return;
      }

      // 5️⃣ Instantiate the contract instance
      const lease = new ethers.Contract(
        contractAddress,
        LeaseContractABI.abi,
        signer
      );
      setContract(lease);

      // 6️⃣ Fetch the rent (returns a bigint)
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
    <div style={{ padding: 20, maxWidth: 400, margin: "0 auto" }}>
      <h1>Tenant Dashboard</h1>

      <p>
        <strong>Wallet:</strong> {wallet}
      </p>

      {/* If we haven’t loaded a contract yet, show the address input */}
      {!contract ? (
        <>
          <label htmlFor="addr">Enter Lease Contract Address:</label>
          <input
            id="addr"
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value.trim())}
            placeholder="0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
            style={{ width: "100%", margin: "0.5rem 0", padding: "0.5rem" }}
          />
          <button onClick={loadContract} style={{ padding: "0.5rem 1rem" }}>
            Load Lease
          </button>
        </>
      ) : (
        <>
          <p>
            <strong>Contract Address:</strong> {contractAddress}
          </p>
          <p>
            <strong>Rent Due:</strong> {rentDue || "..."} ETH
          </p>
          <button onClick={payRent} style={{ padding: "0.5rem 1rem" }}>
            Pay Rent
          </button>
        </>
      )}
    </div>
  );
}
