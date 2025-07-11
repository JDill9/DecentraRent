// src/components/MyLeases.tsx

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Property } from "../types/Property";


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
    <div style={{ padding: "2rem", paddingTop: "6rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Lease a Property</h1>
      <p>Review and confirm your lease below.</p>

      {cart.length === 0 ? (
        <p>Your cart is empty. Browse properties to add a listing.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "1rem",
                marginBottom: "1.5rem",
                background: "#f9f9f9",
              }}
            >
              <h3>{item.title || item.name}</h3>
              <p>{item.description || `Type: ${item.type}, Address: ${item.address}`}</p>
              <p><strong>Price (USD):</strong> ${item.priceUSD?.toFixed(2) || item.rentUSD?.toFixed(2)}</p>
              <p><strong>Converted ETH:</strong> Ξ{item.priceETH?.toFixed(6) || item.rentETH?.toFixed(6)}</p>
            </div>
          ))}

          <div style={{
            border: "1px solid #000",
            padding: "2rem",
            backgroundColor: "#fff",
            fontFamily: "Georgia, serif",
            lineHeight: 1.6,
            marginTop: "2rem"
          }}>
            <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
              RESIDENTIAL LEASE AGREEMENT
            </h2>
            <p>
              This Residential Lease Agreement ("Agreement") is made between the Landlord and the Tenant(s).
              This lease is for the rental of the Property listed above and will commence upon signing and payment.
            </p>
            <p><strong>Tenant:</strong> {signature || "[Your Full Name Here]"}</p>
            <p><strong>Property:</strong> See cart listing above.</p>
            <p><strong>Lease Term:</strong> Month-to-month unless otherwise specified.</p>
            <p><strong>Total Rent:</strong> ${cart.reduce((sum: any, item: { priceUSD: any; rentUSD: any; }) => sum + (item.priceUSD || item.rentUSD || 0), 0).toFixed(2)} USD</p>
            <p><strong>Payment Method:</strong> ETH / USD Accepted</p>
            <p><strong>Terms:</strong> Tenant agrees to maintain the property, pay rent promptly, and follow all local lease laws.</p>

            <div style={{ marginTop: "2rem" }}>
              <label htmlFor="signature"><strong>Digital Signature (Full Name):</strong></label>
              <input
                type="text"
                id="signature"
                placeholder="e.g. John Doe"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.75rem",
                  marginTop: "0.5rem",
                  marginBottom: "1rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                }}
              />

              <button
                onClick={handleConfirmLease}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#1976d2",
                  color: "white",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Sign and Confirm Lease
              </button>
            </div>
          </div>
        </div>
      )}

      {leaseConfirmed && (
        <div style={{ marginTop: "2rem", color: "green", fontWeight: "bold" }}>
          ✅ Lease confirmed and digitally attached to your account.
        </div>
      )}
    </div>
  );
};

export default MyLeases;
