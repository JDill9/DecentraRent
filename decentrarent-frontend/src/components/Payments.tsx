// src/components/Payments.tsx

import React from "react";

// Define the shape of a payment record
interface Payment {
  property: string;
  address: string;
  paymentId: string;
  amount: string;
  date: string;
  status: string;
}

// Static/mock data for demo
const mockPayments: Payment[] = [
  {
    property: "Property 9",
    address: "108 Example Street",
    paymentId: "PAY-001",
    amount: "Ξ0.025",
    date: "July 5, 2025",
    status: "Paid",
  },
  {
    property: "Property 10",
    address: "109 Example Street",
    paymentId: "PAY-002",
    amount: "Ξ0.026",
    date: "June 5, 2025",
    status: "Paid",
  },
  // add more records here…
];

export default function Payments() {
  return (
    <div className="main-content">
      <div className="page-container">
        <h1>Payment Dashboard</h1>

        {mockPayments.map((p) => (
          <div
            key={p.paymentId}
            className="dashboard-container"
            style={{ marginBottom: "1.5rem" }}
          >
            <h2>{p.property}</h2>
            <p>
              <strong>Address:</strong> {p.address}
            </p>
            <p>
              <strong>Payment ID:</strong> {p.paymentId}
            </p>
            <p>
              <strong>Amount:</strong> {p.amount}
            </p>
            <p>
              <strong>Date:</strong> {p.date}
            </p>
            <p>{p.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
