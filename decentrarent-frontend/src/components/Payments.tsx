import React from "react";

export default function Payments() {
  const paymentData = [
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
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-[#f0f4f8] to-[#e2e8f0]">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Payment Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {paymentData.map((payment, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{payment.property}</h2>
            <p className="text-gray-700"><strong>Address:</strong> {payment.address}</p>
            <p className="text-gray-700"><strong>Payment ID:</strong> {payment.paymentId}</p>
            <p className="text-gray-700"><strong>Amount:</strong> {payment.amount}</p>
            <p className="text-gray-700"><strong>Date:</strong> {payment.date}</p>
            <p className="mt-2 text-green-600 font-semibold">{payment.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}