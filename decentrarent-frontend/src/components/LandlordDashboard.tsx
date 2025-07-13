// src/components/LandlordDashboard.tsx

import React, { useState } from "react";
import { ethers } from "ethers";
// ABI & bytecode from your compiled contract
import LeaseContractABI from "../abis/LeaseContract.json";
import { useAuth } from "../context/AuthContext";

/**
 * LandlordDashboard
 *
 * This component lets a landlord:
 * 1) Input a tenant address & desired rent.
 * 2) Deploy a new LeaseContract on-chain.
 * 3) (Future) View and manage existing leases.
 */
export function LandlordDashboard() {
  // Pull the connected wallet from our global auth context
  const { wallet } = useAuth();

  // Form state for new lease parameters
  const [tenantAddress, setTenantAddress] = useState<string>("");
  const [rentAmount, setRentAmount] = useState<string>("");

  /**
   * deployLease()
   *  - Validates inputs
   *  - Connects to MetaMask via ethers.js
   *  - Deploys a new LeaseContract with (rentWei, tenantAddress)
   */
  const deployLease = async () => {
    // 1️⃣ Validate tenant address
    if (!ethers.isAddress(tenantAddress)) {
      alert("❌ Invalid tenant address");
      return;
    }
    // 2️⃣ Validate rent amount
    if (isNaN(Number(rentAmount)) || Number(rentAmount) <= 0) {
      alert("❌ Rent amount must be a positive number");
      return;
    }
    // 3️⃣ Ensure MetaMask is available
    if (!(window as any).ethereum) {
      alert("❌ MetaMask not detected");
      return;
    }

    try {
      // Wrap MetaMask provider
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      // Create a factory for our LeaseContract
      const factory = new ethers.ContractFactory(
        LeaseContractABI.abi,
        LeaseContractABI.bytecode,
        signer
      );

      // Convert ETH to wei
      const rentWei = ethers.parseEther(rentAmount);

      // Deploy on-chain — constructor takes (rent, tenant)
      const lease = await factory.deploy(rentWei, tenantAddress);
      await lease.waitForDeployment();

      alert(`✅ Lease deployed at: ${await lease.getAddress()}`);
    } catch (err: any) {
      console.error("Deployment failed:", err);
      alert("❌ Deployment error; see console for details");
    }
  };

  return (
    // Outer wrapper centers this page vertically & horizontally
    <div className="dashboard-center">
      <div className="dashboard-container">
        <h1>Landlord Dashboard</h1>

        <p>
          <strong>Wallet:</strong> {wallet}
        </p>

        {/*
          Input fields for tenant address and rent amount.
          Uses full-width styles from .dashboard-container.
        */}
        <input
          type="text"
          placeholder="Tenant Address"
          value={tenantAddress}
          onChange={(e) => setTenantAddress(e.target.value.trim())}
        />
        <input
          type="text"
          placeholder="Rent Amount (ETH)"
          value={rentAmount}
          onChange={(e) => setRentAmount(e.target.value)}
          style={{ marginTop: "0.5rem" }}
        />

        {/* Deploy button */}
        <button onClick={deployLease} style={{ marginTop: "1rem" }}>
          Create Lease
        </button>
      </div>
    </div>
  );
}
