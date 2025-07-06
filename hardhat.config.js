// hardhat.config.js

// Load environment variables from .env (when deploying to testnets)
require("dotenv").config();

module.exports = {
  // Specify the Solidity compiler version to use
  solidity: "0.8.20",

  // Network configurations
  networks: {
    // Local Hardhat network
    localhost: {
      url: "http://127.0.0.1:8545",  // JSON-RPC endpoint from `npx hardhat node`
      chainId: 31337,                // Default Hardhat chain ID
    },

    // Sepolia testnet (optional)
    // To use this, set RPC_URL and PRIVATE_KEY in a .env at your project root:
    //   RPC_URL=https://eth-sepolia.alchemyapi.io/v2/<your-key>
    //   PRIVATE_KEY=0x<your-wallet-private-key>
    sepolia: {
      url: process.env.RPC_URL || "",    // Alchemy/Infura endpoint
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [],                             // Array of deployer private keys
    },
  },
};
