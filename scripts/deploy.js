// scripts/deploy.js

// Import Hardhat Runtime Environment explicitly
const hre = require("hardhat");

async function main() {
  // 1) Get the contract factory
  const LeaseContract = await hre.ethers.getContractFactory("LeaseContract");

  // 2) Define constructor arguments
  const rentAmount = hre.ethers.parseEther("0.01");  
  const tenantAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

  // 3) Deploy the contract
  const lease = await LeaseContract.deploy(rentAmount, tenantAddress);

  // 4) Wait for deployment to be mined
  await lease.waitForDeployment();

  // 5) Log the deployed address
  console.log("LeaseContract deployed to:", await lease.getAddress());
}

// Run the script, then explicitly exit to avoid Windows libuv assertion
main()
  .then(() => {
    console.log("Deployment script finished; exiting process.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
