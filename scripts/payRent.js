const hre = require("hardhat");

async function main() {
  const leaseAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const LeaseContract = await hre.ethers.getContractFactory("LeaseContract");

  // Connect as tenant (Account #1)
  const tenantSigner = await hre.ethers.getSigner("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
  const lease = await LeaseContract.attach(leaseAddress).connect(tenantSigner);

  const tx = await lease.payRent({ value: hre.ethers.parseEther("0.01") });
  await tx.wait();

  console.log("Rent paid successfully");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
