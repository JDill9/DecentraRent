// src/components/Properties.tsx

import React, { useEffect } from "react";
// Import the Property type that your CartContext expects
import type { Property as CartProperty } from "../context/CartContext";
import { useCart } from "../context/CartContext";

// Extend the cart’s Property with UI‐only fields
type UIProperty = CartProperty & {
  title: string;
  description: string;
  address: string;
  type: string;
  priceUSD: number;
  priceETH: number;
};

// Generate mock data with id as a number
const mockProperties: UIProperty[] = Array.from({ length: 20 }, (_, i) => {
  const idx = i + 1;
  const baseName = `Property ${idx}`;
  const priceUSD = 35 + i * 5;
  const priceETH = priceUSD / 3000;
  const ptype = ["House", "Apartment", "Airbnb"][i % 3];

  return {
    id: idx,                  // now a number, matching CartProperty.id
    name: baseName,
    rentUSD: priceUSD,
    rentETH: priceETH,
    status: "Available",

    // UI-specific fields
    title: baseName,
    description: `This is a sample description for ${baseName}. It is a ${ptype} located at ${100 + i} Example Street.`,
    address: `${100 + i} Example Street`,
    type: ptype,
    priceUSD,
    priceETH,
  };
});

const Properties: React.FC = () => {
  const { addToCart } = useCart();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (property: CartProperty) => {
    addToCart(property);
    alert(`${property.name} added to cart.`);
  };

  return (
    <div>
      <h2 style={{ padding: "1rem 2rem 0 2rem" }}>Explore Properties</h2>
      <div className="properties-container">
        {mockProperties.map((property) => (
          <div key={property.id} className="property-card">
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>
              <strong>Address:</strong> {property.address}
            </p>
            <p>
              <strong>Type:</strong> {property.type}
            </p>
            <p>
              <strong>Price (USD):</strong> ${property.priceUSD.toFixed(2)}
            </p>
            <p>
              <strong>Price (ETH):</strong> Ξ{property.priceETH.toFixed(6)}
            </p>
            <button onClick={() => handleAddToCart(property)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
