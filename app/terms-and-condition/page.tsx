import React from "react";
import { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Terms and Conditions - Aryal Sirin Gems",
  description:
    "Read Aryal Sirin Gems' terms and conditions for purchasing authentic gemstones and luxury jewelry.",
};

const TermsAndConditionsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 border-b pb-4">
          Terms and Conditions
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using Aryal Sirin Gems, you accept and agree to
              be bound by the terms and provisions of this agreement. We
              specialize in high-quality gemstones and bespoke jewelry; by
              purchasing from us, you acknowledge the unique nature of natural
              stones.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              2. Product Authenticity and Natural Variations
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Aryal Sirin Gems, we pride ourselves on the quality of our
              stones. By purchasing, you acknowledge:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Natural gemstones may have internal inclusions, variations in
                color, and unique textures. These are not defects but a sign of
                authenticity.
              </li>
              <li>
                Product images may vary slightly from the actual item due to
                lighting or screen resolutions.
              </li>
              <li>
                Weight (Carat) of stones may have a minor variance of +/- 0.05
                carats during the setting process.
              </li>
              <li>
                Certificates of authenticity are provided only where explicitly
                stated in the product description.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              3. Pricing and Payments
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Gemstone prices fluctuate based on market demand and rarity.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                All prices listed are final at the time of purchase, including
                applicable VAT/taxes unless stated otherwise.
              </li>
              <li>
                We reserve the right to cancel orders arising from obvious
                pricing errors on the website.
              </li>
              <li>
                For bespoke or custom-made jewelry, a non-refundable deposit may
                be required before work begins.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              4. Shipping and Insurance
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Because of the high value of our products:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>All shipments are handled via secure courier services.</li>
              <li>
                Risk of loss passes to the customer once the package is marked
                as "Delivered" by the carrier.
              </li>
              <li>
                International customers are responsible for any customs duties
                or import taxes levied by their country.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              5. Returns and Exchange Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Due to the luxury nature of jewelry:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Returns are accepted within 7 days of delivery only if the item
                is in its original, unworn condition with all security tags
                intact.
              </li>
              <li>
                <strong>
                  Custom-made or engraved items are strictly non-returnable.
                </strong>
              </li>
              <li>
                Gemstones that have been removed from their original setting or
                tampered with will not be eligible for a refund.
              </li>
              <li>
                Refunds will be processed minus any shipping or insurance costs
                incurred by Aryal Sirin Gems.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              6. Jewelry Care and Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Aryal Sirin Gems is not liable for damage caused by improper care,
              exposure to chemicals, or accidental impact. Jewelry is delicate
              and should be handled with professional care. We recommend
              periodic inspections of stone settings to prevent loss.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              7. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All designs, photography, and branding elements are the exclusive
              property of Aryal Sirin Gems. Unauthorized use of our jewelry
              designs or brand imagery for commercial purposes is strictly
              prohibited.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              8. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These terms are governed by the laws of Nepal. Any disputes shall
              be settled under the jurisdiction of the courts in Kathmandu.
            </p>
          </section>

          <section className="mb-8 border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Contact Information
            </h2>
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-800 font-bold text-lg">
                Aryal Sirin Gems
              </p>
              <p className="text-gray-700">
                <strong>WhatsApp:</strong> +977 9860120739
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> info@aryalsiringems.com
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> Kathmandu, Nepal
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsAndConditionsPage;
