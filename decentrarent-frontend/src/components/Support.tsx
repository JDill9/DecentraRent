// src/components/Support.tsx

import React from "react";

const Support: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 lg:px-16 bg-[#f4f4f5] dark:bg-[#121212] text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Support</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Have a question or ran into an issue? We're here to help.
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
          <li>Email us at <a href="mailto:support@decentrarent.com" className="text-blue-600 dark:text-blue-400 underline">support@decentrarent.com</a></li>
          <li>Join our Discord for real-time help</li>
          <li>View FAQs and walkthroughs in the Help Center</li>
        </ul>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Common Topics</h2>
          <div className="space-y-2">
            <p>🔐 How to connect your wallet</p>
            <p>💸 Paying rent in ETH</p>
            <p>📄 Viewing your lease agreements</p>
            <p>❌ How to cancel a lease</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
