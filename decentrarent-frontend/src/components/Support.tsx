export default function Support() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Support</h1>
      <p className="mb-2">Need help with DecentraRent? Check below:</p>

      <ul className="list-disc list-inside space-y-2">
        <li><strong>MetaMask not connecting?</strong> – Make sure it's set to the "Localhost 8545" network.</li>
        <li><strong>Contract not found?</strong> – Re-run the deployment script using <code>npx hardhat run scripts/deploy.js --network localhost</code>.</li>
        <li><strong>UI not loading?</strong> – Ensure you're running the frontend at <code>http://localhost:5173</code>.</li>
      </ul>

      <p className="mt-4">Still stuck? Contact the team at <a href="mailto:support@decentrarent.io" className="text-blue-500 underline">support@decentrarent.io</a>.</p>
    </div>
  );
}
