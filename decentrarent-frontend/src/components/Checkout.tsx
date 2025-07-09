// src/components/Checkout.tsx

import React from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalUSD = cart.reduce((sum, item) => sum + (item.rentUSD || 0), 0);
  const totalETH = cart.reduce((sum, item) => sum + (item.rentETH || 0), 0);

  return (
    <div style={{ padding: "2rem", paddingTop: "6rem" }}>
      <h2>🧾 Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <li
                key={item.id}
                style={{
                  marginBottom: "1rem",
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  backgroundColor: "#fafafa",
                }}
              >
                <h3>{item.name}</h3>
                <p><strong>Address:</strong> {item.address}</p>
                <p><strong>Rent:</strong> {item.rentETH.toFixed(4)} ETH / ${item.rentUSD.toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    marginTop: "0.5rem",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h3 style={{ marginTop: "2rem" }}>
            Total Rent: ${totalUSD.toFixed(2)} / {totalETH.toFixed(4)} ETH
          </h3>

          <button
            onClick={() => {
              alert("Purchase confirmed!");
              clearCart();
            }}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.25rem",
              fontSize: "1rem",
              borderRadius: "0.5rem",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Confirm Lease
          </button>
        </>
      )}
    </div>
  );
}
