// src/components/Support.tsx

import React from "react";

const Support: React.FC = () => {
  return (
    <div className="main-content">
      <div className="page-container">
        <div className="dashboard-container">
          <h1>Support</h1>
          <p>Have a question or ran into an issue? We’re here to help.</p>
          <ul style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <li>
              Email us at{" "}
              <a
                href="mailto:support@decentrarent.com"
                style={{ color: "#007bff", textDecoration: "underline" }}
              >
                support@decentrarent.com
              </a>
            </li>
            <li>Join our Discord for real-time help</li>
            <li>View FAQs and walkthroughs in the Help Center</li>
          </ul>

          <h2>Common Topics</h2>
          <ul style={{ marginTop: "0.5rem", lineHeight: 1.6 }}>
            <li>🔐 How to connect your wallet</li>
            <li>💸 Paying rent in ETH</li>
            <li>📄 Viewing your lease agreements</li>
            <li>❌ How to cancel a lease</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Support;
