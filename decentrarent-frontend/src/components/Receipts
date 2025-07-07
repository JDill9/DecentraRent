import { useState } from "react";
import { ethers, EventLog } from "ethers"; // import EventLog
import LeaseContractABI from "../abis/LeaseContract.json";

export function ReceiptsViewer() {
  const [contractAddress, setContractAddress] = useState("");
  const [receipts, setReceipts] = useState<any[]>([]);

  const fetchReceipts = async () => {
    if (!(window as any).ethereum) return alert("MetaMask not found");

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const contract = new ethers.Contract(contractAddress, LeaseContractABI.abi, provider);

    const logs = await contract.queryFilter("RentPaid");

    // Type guard: filter logs to EventLog only
    const parsed = logs
      .filter((log): log is EventLog => "args" in log)
      .map((log) => ({
        tenant: log.args.tenant,
        amount: ethers.formatEther(log.args.amount),
        timestamp: new Date(Number(log.args.timestamp) * 1000).toLocaleString(),
      }));

    setReceipts(parsed);
  };

  return (
    <div>
      <h2>Rent Payment Receipts</h2>
      <input
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value.trim())}
        placeholder="Enter lease contract address"
      />
      <button onClick={fetchReceipts}>View Receipts</button>

      <ul>
        {receipts.map((r, i) => (
          <li key={i}>
            {r.timestamp}: {r.tenant} paid {r.amount} ETH
          </li>
        ))}
      </ul>
    </div>
  );
}
