import React from "react";
import { useCart } from "../context/CartContext";
import { Property } from "../types/Property";

const mockProperties: Property[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Property ${i + 1}`,
  type: ["House", "Apartment", "Airbnb"][i % 3],
  address: `${100 + i} Example Street`,
  rentUSD: 35 + i * 5,
  rentETH: ((35 + i * 5) / 3000),
  status: "Available",
  title: `Property ${i + 1}`,
  description: `This is a sample description for Property ${i + 1}. It is a ${
    ["House", "Apartment", "Airbnb"][i % 3]
  } located at ${100 + i} Example Street.`,
  priceUSD: 35 + i * 5,
  priceETH: ((35 + i * 5) / 3000),
}));

const Properties: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (property: Property) => {
    addToCart(property);
    alert(`${property.title} added to cart.`);
  };

  return (
    <div style={{ padding: "2rem", paddingTop: "6rem" }}>
      <h2>Explore Properties</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {mockProperties.map((property) => (
          <div
            key={property.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "1rem",
              background: "#f9f9f9",
            }}
          >
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p><strong>Address:</strong> {property.address}</p>
            <p><strong>Type:</strong> {property.type}</p>
            <p><strong>Price (USD):</strong> ${property.priceUSD.toFixed(2)}</p>
            <p><strong>Price (ETH):</strong> Ξ{property.priceETH.toFixed(6)}</p>
            <button
              onClick={() => handleAddToCart(property)}
              style={{
                marginTop: "0.75rem",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                backgroundColor: "#1976d2",
                color: "#fff",
                border: "none",
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
