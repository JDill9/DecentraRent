// src/components/About.tsx

import React from "react";

const About: React.FC = () => {
  return (
    <div style={{ padding: "2rem", paddingTop: "6rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>About DecentraRent</h1>
      <p>
        <strong>DecentraRent</strong> is a decentralized smart contract-based rental platform built to bring transparency,
        efficiency, and trust to the rental market. Powered by blockchain technology, DecentraRent allows landlords and
        tenants to connect directly, automate lease agreements, and handle rent payments through secure crypto transactions.
      </p>

      <h2>Our Mission</h2>
      <p>
        We aim to revolutionize the rental process by eliminating the middlemen and centralized systems that often cause delays,
        disputes, and lack of transparency. By leveraging Ethereum-compatible smart contracts, DecentraRent ensures all terms
        are enforceable and all transactions are traceable.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>Smart contract-based lease creation and signing</li>
        <li>Secure crypto rent payments with on-chain transparency</li>
        <li>Escrow-handled security deposits with automatic release</li>
        <li>Dispute reduction via immutable contract terms</li>
        <li>Role-based dashboards for tenants and landlords</li>
      </ul>

      <h2>Who We Are</h2>
      <p>
        DecentraRent was developed by a team of passionate computer science students from Towson University:
      </p>
      <ul>
        <li>Samuel Kleanthous</li>
        <li>Mohamed Bundu</li>
        <li>Justin Dill</li>
        <li>Christopher Ohiosikha</li>
      </ul>

      <p><strong>Project Course:</strong> COSC 431 • <strong>Due Date:</strong> July 15, 2025</p>

      <p>
        You can explore our open-source codebase on GitHub:
        <br />
        <a href="https://github.com/JDill9/DecentraRent" target="_blank" rel="noopener noreferrer">
          github.com/JDill9/DecentraRent
        </a>
      </p>
    </div>
  );
};

export default About;
