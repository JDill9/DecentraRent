// hardhat.config.js

/**
 * Hardhat configuration for DecentraRent.
 * No .env dependencies—just local development.
 */
module.exports = {
  // Specify the Solidity compiler version
  solidity: "0.8.20",

  // Network configurations
  networks: {
    // Local Hardhat node for development & testing
    localhost: {
      url: "http://127.0.0.1:8545",  // from `npx hardhat node`
      chainId: 31337,                // default Hardhat chain ID
    },
  },
};
