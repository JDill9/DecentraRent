// src/components/Properties.tsx

import React from "react";
import { useCart } from "../context/CartContext";

const FIXED_ETH_PRICE = 3000; // 1 ETH = $3000

const mockProperties = Array.from({ length: 20 }, (_, i) => {
  const rentUSD = Math.floor(Math.random() * 200) + 1; // $1 - $200
  const rentETH = rentUSD / FIXED_ETH_PRICE;

  return {
    id: i + 1,
    name: `Property ${i + 1}`,
    type: ["House", "Apartment", "Airbnb"][i % 3],
    address: `${100 + i} Example Street`,
    rentUSD,
    rentETH,
    status: "Available",
  };
});

const Properties: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (property: typeof mockProperties[0]) => {
    addToCart(property);
    alert(`${property.name} added to cart.`);
  };

  return (
    <div style={{ padding: "2rem", paddingTop: "6rem" }}>
      <h2>Explore Properties</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {mockProperties.map((property) => (
          <div
            key={property.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "1rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            <h3>{property.name}</h3>
            <p><strong>Type:</strong> {property.type}</p>
            <p><strong>Address:</strong> {property.address}</p>
            <p><strong>Rent:</strong> {property.rentETH.toFixed(4)} ETH / ${property.rentUSD.toFixed(2)} USD</p>
            <p><strong>Status:</strong> {property.status}</p>
            <button
              onClick={() => handleAddToCart(property)}
              style={{
                marginTop: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
