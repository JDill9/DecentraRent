import { Mail, LifeBuoy } from "lucide-react";

export default function Support() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-700">Contact Us</h1>
      <p className="text-center text-gray-600 mb-10">
        Have questions about DecentraRent? Choose the option that best fits your needs below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Get Support */}
        <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-md hover:shadow-lg transition">
          <div className="bg-blue-100 p-3 rounded-full mb-4 inline-block">
            <LifeBuoy className="text-blue-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Get Support</h2>
          <p className="text-gray-700 mb-4">
            Having trouble using the platform? Visit our <a href="#" className="text-blue-600 underline">Help Center</a>, or
            join our <a href="#" className="text-blue-600 underline">community forum</a> to get advice from other users.
          </p>
          <a href="mailto:support@decentrarent.io" className="text-blue-600 font-medium underline">
            support@decentrarent.io
          </a>
        </div>

        {/* Press & Partnerships */}
        <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-md hover:shadow-lg transition">
          <div className="bg-blue-100 p-3 rounded-full mb-4 inline-block">
            <Mail className="text-blue-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Press & Partnerships</h2>
          <p className="text-gray-700 mb-4">
            Want to collaborate or feature DecentraRent? Reach out to our team directly for partnership or press inquiries.
          </p>
          <a href="mailto:press@decentrarent.io" className="text-blue-600 font-medium underline">
            press@decentrarent.io
          </a>
        </div>
      </div>
    </div>
  );
}
