// src/components/MyLeases.tsx

import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const MyLeases: React.FC = () => {
  const { cart, clearCart } = useCart();
  const [signature, setSignature] = useState("");
  const [leaseConfirmed, setLeaseConfirmed] = useState(false);

  const handleConfirmLease = () => {
    if (!signature.trim()) {
      alert("Please sign your lease before confirming.");
      return;
    }
    setLeaseConfirmed(true);
    clearCart();
    alert("Lease confirmed and saved successfully!");
  };

  return (
    <div className="dashboard-center">
      <div className="dashboard-container">
        <h1>Lease a Property</h1>
        <p>Review and confirm your lease below.</p>

        {cart.length === 0 ? (
          <p>Your cart is empty. Browse properties to add a listing.</p>
        ) : (
          <>
            {cart.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1.5rem",
                  background: "#f9f9f9",
                }}
              >
                <h3>{item.title || item.name}</h3>
                <p>
                  {item.description ||
                    `Type: ${item.type}, Address: ${item.address}`}
                </p>
                <p>
                  <strong>Price (USD):</strong>{" "}
                  ${(item.priceUSD ?? item.rentUSD)?.toFixed(2)}
                </p>
                <p>
                  <strong>Converted ETH:</strong> Ξ
                  {(item.priceETH ?? item.rentETH)?.toFixed(6)}
                </p>
              </div>
            ))}

            <div style={{ marginTop: "2rem" }}>
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  background: "#fff",
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    textDecoration: "underline",
                  }}
                >
                  RESIDENTIAL LEASE AGREEMENT
                </h2>
                <p>
                  This Residential Lease Agreement ("Agreement") is made between
                  the Landlord and the Tenant(s). This lease is for the rental of
                  the Property listed above and will commence upon signing and
                  payment.
                </p>
                <p>
                  <strong>Tenant:</strong> {signature || "[Your Full Name Here]"}
                </p>
                <p>
                  <strong>Property:</strong> See cart listing above.
                </p>
                <p>
                  <strong>Lease Term:</strong> Month-to-month unless otherwise
                  specified.
                </p>
                <p>
                  <strong>Total Rent:</strong>{" "}
                  $
                  {cart
                    .reduce(
                      (sum, i) => sum + (i.priceUSD ?? i.rentUSD ?? 0),
                      0
                    )
                    .toFixed(2)}{" "}
                  USD
                </p>
                <p>
                  <strong>Payment Method:</strong> ETH / USD Accepted
                </p>
                <p>
                  <strong>Terms:</strong> Tenant agrees to maintain the
                  property, pay rent promptly, and follow all local lease laws.
                </p>

                <div style={{ marginTop: "1.5rem" }}>
                  <label htmlFor="signature">
                    <strong>Digital Signature (Full Name):</strong>
                  </label>
                  <input
                    id="signature"
                    type="text"
                    placeholder="e.g. John Doe"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.5rem",
                      marginTop: "0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <button
                    onClick={handleConfirmLease}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.75rem",
                      marginTop: "1rem",
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Sign and Confirm Lease
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {leaseConfirmed && (
          <p
            style={{
              marginTop: "1.5rem",
              color: "green",
              fontWeight: "bold",
            }}
          >
            ✅ Lease confirmed and digitally attached to your account.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyLeases;
