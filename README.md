# DecentraRent

> A decentralized rental platform with Ethereum smart contracts, a React+TypeScript frontend, and MetaMask login.

---

## Table of Contents

1. [Tech Stack](#tech-stack)  
2. [Prerequisites](#prerequisites)  
3. [Repository Structure](#repository-structure)  
4. [Getting Started](#getting-started)  
   1. [Install Dependencies](#install-dependencies)  
   2. [Run Hardhat Local Network](#run-hardhat-local-network)  
   3. [Deploy Smart Contract](#deploy-smart-contract)  
   4. [Run Frontend](#run-frontend)  
5. [Project Scripts](#project-scripts)  
6. [Code Comments](#code-comments)  
7. [Next Steps](#next-steps)  
8. [Troubleshooting](#troubleshooting)  

---

## Tech Stack

- **Blockchain & Smart Contracts**:  
  - [Hardhat](https://hardhat.org/)  
  - Solidity (`contracts/LeaseContract.sol`)  
- **Frontend**:  
  - [Vite](https://vitejs.dev/) + React + TypeScript  
  - [ethers.js](https://docs.ethers.io/) for Web3 integration  
- **Wallet**:  
  - MetaMask browser extension  
- **Authentication**:  
  - Wallet‐only login (no email/password)  

---

## Prerequisites

- [Node.js](https://nodejs.org/) v14+ and npm  
- MetaMask installed in your browser  

---

## Repository Structure

```
DecentraRent/
├── contracts/               # Solidity contracts
│   └── LeaseContract.sol
├── scripts/                 # Deployment & interaction scripts
│   ├── deploy.js
│   └── payRent.js
├── hardhat.config.js        # Hardhat configuration
├── package.json             # Root dependencies & scripts
├── decentrarent-frontend/   # Vite + React + TS frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Logo, images
│   │   ├── abis/            # Compiled contract ABIs
│   │   ├── components/      # Login, dashboards
│   │   ├── context/         # AuthContext
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   └── vite-env.d.ts
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
└── README.md                # ← you are here
```

---

## Getting Started

### Install Dependencies

At the **repo root**, install the blockchain‐side dependencies:

```bash
cd decentrarent-main
npm install
```

Then install the frontend dependencies:

```bash
cd decentrarent-frontend
npm install
```

```bash
cd decentrarent-auth-servers
npm install
```

---

### Run Hardhat Local Network

In one terminal, start a local Ethereum node:

```bash
npx hardhat node
```

This will spin up a JSON‐RPC at `http://127.0.0.1:8545/` with pre-funded test accounts.

---

### Deploy Smart Contract

In a second terminal, deploy your `LeaseContract` to the local network:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

You should see an output similar to:

```
LeaseContract deployed to: 0x…  
```

---

### Run Frontend

In another terminal, launch the React app:

```bash
cd decentrarent-frontend
npm run dev
```

Open your browser at the URL printed (e.g. `http://localhost:5173`).

- You’ll see the DecentraRent login page with your logo.  
- Click **Tenant** or **Landlord**, then **Connect Wallet & Login**.  
- You’ll be redirected to the respective dashboard.

---
### Backend + Frontend Setup for Lease Email System
🟡 1. Install packages (only once)
In your backend folder (e.g., cd backend): run (npm install)
This installs:
	•	express
	•	nodemailer
	•	cors
	•	dotenv
 🟢 2. Start the backend server
 Still inside the backend folder: run (node server.js)
 You should see:
 🚀 Server running on port 4000

(If you see a warning about “ES modules”, no worries. Optional fix:
	•	Add "type": "module" to your package.json (under the "name") )
## Project Scripts

| Command                                         | Description                                             |
| ------------------------------------------------| ------------------------------------------------------- |
| `npx hardhat node`                              | Start local Hardhat node                                |
| `npx hardhat compile`                           | Compile Solidity contracts                              |
| `npx hardhat test`                              | Run Solidity contract tests (if any)                    |
| `npx hardhat run scripts/deploy.js --network localhost` | Deploy contracts                                        |
| `npx hardhat run scripts/payRent.js --network localhost`| Simulate tenant paying rent                             |
| `npm run dev` (in `decentrarent-frontend/`)      | Run React/Vite development server                       |
| `npm run build` (in `decentrarent-frontend/`)    | Build production frontend bundle                        |

---

## Code Comments

To help onboard new contributors, we've added detailed inline comments in the following key files:

- **Frontend**  
  - `src/components/Login.tsx`  
  - `src/components/TenantDashboard.tsx`  
  - `src/components/LandlordDashboard.tsx`

- **Context & Routing**  
  - `src/context/AuthContext.tsx`  
  - `src/App.tsx`  
  - `src/main.tsx`

- **Contracts & Scripts**  
  - `contracts/LeaseContract.sol`  
  - `scripts/deploy.js`  
  - `scripts/payRent.js`

- **Config**  
  - `hardhat.config.js`  
  - `vite.config.ts`

You can review these files directly for explanations of why each part was implemented, along with guidance on how to extend or debug functionality.

---

## Next Steps

- 🔐 Add real authentication (e.g., signature-based login)  
- 🏗️ Build out Tenant/Landlord dashboards  
- 🎨 Polish UI/UX and add more branding  
- 🔬 Write unit and integration tests for contracts and React  

---

## Troubleshooting

- **MetaMask pop-ups not appearing**  
  - Make sure your browser is on `http://localhost:5173` (check Vite’s dev URL).  
  - Ensure the network is set to **Localhost 8545** in MetaMask (for local testing).

- **TypeScript/JSX errors in VS Code**  
  - Verify `tsconfig.json` has `"jsx": "react-jsx"` and `include: ["src"]`.  
  - Restart the TS server: **Ctrl+Shift+P** → “TypeScript: Restart TS Server”.

- **Hardhat errors**  
  - Rerun `npx hardhat compile` after any contract edits.  
  - If accounts aren’t found, ensure you’re on the correct network (`--network localhost`).

---

That’s it! Your teammates can now clone this repository, follow these steps, and be running locally in minutes. Enjoy building DecentraRent!
