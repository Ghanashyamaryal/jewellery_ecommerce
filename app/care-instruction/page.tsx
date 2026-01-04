import React from "react";
import { Metadata } from "next";
import { Sparkles, Droplets, ShieldAlert, Waves } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Jewelry Care Guide - Aryal Sirin Gems",
  description:
    "Learn how to clean and maintain your precious gemstones and fine jewelry from Aryal Sirin Gems.",
};

const CareInstructionsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Jewelry Care Guide
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every piece from Aryal Sirin Gems is a work of art. With the right
            care, your jewelry will maintain its brilliance and become a
            cherished family heirloom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Daily Wear Section */}
          <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <ShieldAlert className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold mb-3">
              The "Last On, First Off" Rule
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Jewelry should be the <strong>last thing</strong> you put on in
              the morning and the
              <strong> first thing</strong> you take off at night. Avoid contact
              with perfumes, hairsprays, and lotions as the chemicals can dull
              the surface of gemstones and metals.
            </p>
          </div>

          {/* Cleaning Section */}
          <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
            <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Droplets className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-3">Safe Home Cleaning</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              For most gemstones, use a bowl of lukewarm water with a few drops
              of mild dish soap. Gently scrub with a{" "}
              <strong>soft-bristled toothbrush</strong>. Rinse thoroughly and
              pat dry with a lint-free cloth.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Waves className="text-cyan-500" /> Specific Stone Care
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-3 text-left">Gemstone</th>
                    <th className="border p-3 text-left">Care Level</th>
                    <th className="border p-3 text-left">
                      Special Instructions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3 font-medium">
                      Sapphires & Rubies
                    </td>
                    <td className="border p-3 text-green-600">Durable</td>
                    <td className="border p-3 text-sm">
                      Very hardy; can be cleaned with soap and water. Safe for
                      ultrasonic cleaners if not heavily included.
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-medium">Emeralds</td>
                    <td className="border p-3 text-red-600">Fragile</td>
                    <td className="border p-3 text-sm">
                      <strong>Never</strong> use ultrasonic cleaners or steam.
                      Keep away from high heat, as it can dry out the natural
                      oils.
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-medium">Diamonds</td>
                    <td className="border p-3 text-green-600">
                      Extremely Durable
                    </td>
                    <td className="border p-3 text-sm">
                      Diamonds attract grease. Clean frequently to maintain
                      fire. Avoid touching stones with bare fingers.
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-medium">Pearls & Opals</td>
                    <td className="border p-3 text-orange-600">Organic/Soft</td>
                    <td className="border p-3 text-sm">
                      Wipe with a soft damp cloth only. Do not submerge in water
                      for long periods. Store separately to avoid scratches.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12 p-8 bg-amber-50 rounded-2xl border border-amber-100">
            <h2 className="text-2xl font-bold mb-4 text-amber-900 flex items-center gap-2">
              <Sparkles className="text-amber-600" /> Professional Maintenance
            </h2>
            <p className="text-amber-900 leading-relaxed mb-4">
              We recommend bringing your Aryal Sirin Gems jewelry to a
              professional jeweler
              <strong> every 6 to 12 months</strong> for a safety check. They
              will:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-amber-800">
              <li>Check for loose prongs or settings.</li>
              <li>Inspect for any chips or fractures in the stone.</li>
              <li>
                Provide a professional-grade ultrasonic cleaning (where safe).
              </li>
              <li>
                Re-polish the metal to restore its original mirror finish.
              </li>
            </ul>
          </section>

          <section className="text-center py-10">
            <h3 className="text-xl font-bold mb-4">Still Unsure?</h3>
            <p className="text-gray-600 mb-6">
              If you have a specific question about a rare stone, please contact
              our experts.
            </p>
            <a
              href="https://wa.me/9779860120739"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-all"
            >
              Ask a Gemologist via WhatsApp
            </a>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CareInstructionsPage;
