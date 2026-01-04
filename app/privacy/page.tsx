import React from "react";
import { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Privacy Policy - Aryal Siring Gems",
  description:
    "Learn how Aryal Sirin Gems protects your personal data and ensures secure gemstone transactions.",
};

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 border-b pb-4">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">
            At <strong>Aryal Sirin Gems</strong>, we value the trust you place
            in us when purchasing fine jewelry and precious gemstones. This
            Privacy Policy describes how we collect, use, and protect your
            personal information when you visit our website or make a purchase.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To provide you with a luxury shopping experience, we collect the
              following:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Identity Data:</strong> Name, title, and date of birth
                (for special anniversary offers).
              </li>
              <li>
                <strong>Contact Data:</strong> Shipping address, billing
                address, email address, and phone number.
              </li>
              <li>
                <strong>Transaction Data:</strong> Details about the gemstones
                or jewelry you have purchased and payment confirmation (we do
                not store full credit card numbers on our local servers).
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type, and
                location data to help prevent fraudulent transactions.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use your data to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Process and deliver your jewelry orders securely.</li>
              <li>Send you authenticity certificates for your gemstones.</li>
              <li>
                Communicate via WhatsApp or Email regarding custom design
                progress.
              </li>
              <li>
                Improve our website design and collection based on customer
                preferences.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              3. Data Security for High-Value Items
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to ensure your
              personal details are safe. Access to your order history and
              personal information is restricted to authorized employees who
              require the data to fulfill your luxury service. We use SSL
              encryption for all data transmitted through our checkout process.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              4. Sharing with Third Parties
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell or rent your personal information. We only share
              data with trusted partners necessary for business operations, such
              as:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Logistics Partners:</strong> Secure couriers used to
                deliver your jewelry.
              </li>
              <li>
                <strong>Payment Gateways:</strong> To process secure payments.
              </li>
              <li>
                <strong>Gemological Labs:</strong> If you request third-party
                certification for a stone.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              5. Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, correct, or request the deletion of
              your personal data at any time. If you wish to opt-out of our
              gemstone newsletter or anniversary reminders, you can do so by
              clicking the "unsubscribe" link or contacting us directly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              6. Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our website uses cookies to remember your "Wishlist" items and to
              analyze site traffic. You can choose to disable cookies in your
              browser settings, though some features of the store may not
              function correctly.
            </p>
          </section>

          <section className="mb-8 border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Contact Our Privacy Team
            </h2>
            <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-gray-800 font-bold">
                Aryal Sirin Gems - Privacy Officer
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@aryalsiringems.com
              </p>
              <p className="text-gray-700">
                <strong>WhatsApp:</strong> +977 9860120739
              </p>
              <p className="text-gray-700 text-sm mt-2 italic">
                Please contact us if you have questions regarding the security
                of your data or transaction history.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
