import React from "react";
import { Metadata } from "next";
import { Truck, ShieldCheck, RotateCcw, Award } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Shipping & Returns - Aryal Sirin Gems",
  description:
    "Information about secure shipping and our return policy for gemstones and fine jewelry.",
};

const ShippingReturnsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 border-b pb-4">
          Shipping & Returns
        </h1>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <Truck className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-bold">Secure Shipping</h3>
              <p className="text-sm text-gray-600">
                Insured delivery for all precious stones.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <RotateCcw className="h-6 w-6 text-green-600 mt-1" />
            <div>
              <h3 className="font-bold">7-Day Return</h3>
              <p className="text-sm text-gray-600">
                Easy returns for eligible stock items.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Shipping Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck className="text-blue-500" /> Shipping Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Because we handle high-value gemstones and precious metals, our
              shipping process is designed to ensure your purchase arrives
              safely and securely.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Processing Time:</strong> Ready-to-ship items are
                dispatched within 2–3 business days. Custom jewelry or resizing
                requests may take 10–15 business days.
              </li>
              <li>
                <strong>Insurance:</strong> All shipments are fully insured by
                Aryal Sirin Gems until they reach your doorstep.
              </li>
              <li>
                <strong>Delivery in Nepal:</strong> We offer secure courier
                delivery across major cities including Kathmandu, Pokhara, and
                Butwal.
              </li>
              <li>
                <strong>International Shipping:</strong> We ship worldwide via
                DHL/FedEx. Please note that customs duties and taxes are the
                responsibility of the buyer.
              </li>
              <li>
                <strong>Tracking:</strong> A tracking number will be sent via
                WhatsApp and Email as soon as your order is dispatched.
              </li>
            </ul>
          </section>

          <hr className="my-10" />

          {/* Returns Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <RotateCcw className="text-green-500" /> Returns & Exchanges
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We want you to be completely satisfied with your gemstone. If you
              are not happy with your purchase, we offer a return window under
              the following conditions:
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm text-yellow-800 font-medium">
                <strong>Non-Returnable Items:</strong> Custom-made jewelry,
                engraved pieces, and items sold during "Clearance Sales" are
                final sale and cannot be returned or exchanged.
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Return Window:</strong> You must initiate a return
                within 7 days of receiving your item.
              </li>
              <li>
                <strong>Condition:</strong> Items must be in their original,
                unworn condition with all security tags and original
                certificates (GIA, Lotus, etc.) included.
              </li>
              <li>
                <strong>Packaging:</strong> Please return the item in its
                original luxury box to prevent damage during transit.
              </li>
              <li>
                <strong>Refund Process:</strong> Once our gemologists inspect
                the stone to verify its condition, your refund will be processed
                within 7–10 business days.
              </li>
            </ul>
          </section>

          {/* Authenticity Section */}
          <section className="mb-8 p-6 bg-gray-900 text-white rounded-xl">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-white">
              <Award className="text-yellow-400" /> Authenticity Guarantee
            </h2>
            <p className="text-gray-300 text-sm">
              If a gemstone is found to be non-natural or significantly
              different from its accompanying lab certificate, we offer a 100%
              money-back guarantee regardless of the return window.
            </p>
          </section>

          <section className="mt-12">
            <h3 className="text-lg font-bold mb-2">Need to start a return?</h3>
            <p className="text-gray-600">
              Please contact us via WhatsApp at <strong>+977 9860120739</strong>{" "}
              or email
              <strong> support@aryalsiringems.com</strong> with your order
              number.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingReturnsPage;
