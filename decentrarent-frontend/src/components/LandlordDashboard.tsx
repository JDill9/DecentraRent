// src/components/LandlordDashboard.tsx

import { useState } from "react";
import { ethers } from "ethers";
// ABI & bytecode from your compiled contract
import LeaseContractABI from "../abis/LeaseContract.json";
import { useAuth } from "../context/AuthContext";

/**
 * LandlordDashboard
 *
 * This component will let a landlord:
 * 1) Input a tenant address & desired rent.
 * 2) Deploy a new LeaseContract on-chain.
 * 3) (Future) View and manage existing leases.
 */
export function LandlordDashboard() {
  // Pull the connected wallet from our global auth context
  const { wallet } = useAuth();

  // Form state for new lease parameters
  const [tenantAddress, setTenantAddress] = useState("");
  const [rentAmount, setRentAmount] = useState("");

  /**
   * deployLease()
   *  - Validates inputs
   *  - Connects to MetaMask via ethers.js
   *  - Deploys a new LeaseContract with (rentWei, tenantAddress)
   */
  const deployLease = async () => {
    if (!ethers.isAddress(tenantAddress)) {
      alert("❌ Invalid tenant address");
      return;
    }
    if (isNaN(Number(rentAmount)) || Number(rentAmount) <= 0) {
      alert("❌ Rent amount must be a positive number");
      return;
    }
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
    <div style={{ padding: 20, maxWidth: 400, margin: "0 auto" }}>
      <h1>Landlord Dashboard</h1>

      <p>
        <strong>Wallet:</strong> {wallet}
      </p>

      {/* Inputs for tenant & rent */}
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
      />

      {/* Deploy button */}
      <button onClick={deployLease}>Create Lease</button>
    </div>
  );
}
