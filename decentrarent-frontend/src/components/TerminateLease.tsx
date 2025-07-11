import { useState } from "react";
import { ethers } from "ethers";
import LeaseContractABI from "../abis/LeaseContract.json";

const TerminateLease = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [status, setStatus] = useState("");

  const handleTerminate = async () => {
    if (!(window as any).ethereum) return alert("MetaMask not found");
    if (!ethers.isAddress(contractAddress)) return alert("Invalid contract address");

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, LeaseContractABI.abi, signer);

      const tx = await contract.terminate(); // assumes your contract has a public `terminate()` function
      setStatus("Terminating lease...");
      await tx.wait();
      setStatus("✅ Lease terminated successfully!");
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Termination failed. See console.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Terminate Lease</h2>
      <input
        type="text"
        placeholder="Enter lease contract address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value.trim())}
        style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
      />
      <button
        onClick={handleTerminate}
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#d32f2f",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Terminate Lease
      </button>
      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </div>
  );
};

export default TerminateLease;
