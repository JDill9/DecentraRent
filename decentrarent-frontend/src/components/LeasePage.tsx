import { useState } from "react";
import { ethers } from "ethers";
import LeaseContractABI from "../abis/LeaseContract.json";

export function LeasePage() {
  const [contracts, setContracts] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [details, setDetails] = useState<any[]>([]);

  const addContract = () => {
    if (ethers.isAddress(input)) {
      setContracts([...contracts, input]);
      setInput("");
    } else {
      alert("Invalid address");
    }
  };

  const loadDetails = async () => {
    if (!(window as any).ethereum) return alert("MetaMask not found");

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();

    const newDetails = await Promise.all(contracts.map(async (addr) => {
      const contract = new ethers.Contract(addr, LeaseContractABI.abi, signer);
      return {
        address: addr,
        tenant: await contract.tenant(),
        rent: ethers.formatEther(await contract.rent()),
        active: await contract.isActive(),
      };
    }));
    setDetails(newDetails);
  };

  return (
    <div>
      <h2>Lease Page</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value.trim())}
        placeholder="Enter contract address"
      />
      <button onClick={addContract}>Add</button>
      <button onClick={loadDetails}>Load Lease Info</button>

      <ul>
        {details.map((d, i) => (
          <li key={i}>
            <strong>Contract:</strong> {d.address}<br />
            <strong>Tenant:</strong> {d.tenant}<br />
            <strong>Rent:</strong> {d.rent} ETH<br />
            <strong>Active:</strong> {d.active ? "Yes" : "No"}
          </li>
        ))}
      </ul>
    </div>
  );
}
