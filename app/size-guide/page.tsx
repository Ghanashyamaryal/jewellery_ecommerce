"use client";
import React from "react";
import { Metadata } from "next";
import { Ruler, Info, Download, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const SizeGuidePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 italic font-serif">
            Finding Your Perfect Fit
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At Aryal Siring Gems, we want your jewelry to feel as natural as it
            looks. Use our comprehensive guide to determine your exact
            measurements.
          </p>
        </div>

        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b pb-4">
            <Ruler className="text-yellow-600 h-8 w-8" />
            <h2 className="text-3xl font-semibold">Ring Sizing</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We use <strong>US Standard Sizing</strong>. To find your size at
                home, measure the inside diameter of a ring that fits you well,
                or wrap a piece of string around your finger and measure the
                length.
              </p>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 uppercase">
                    <tr>
                      <th className="px-4 py-3 border-b">US Size</th>
                      <th className="px-4 py-3 border-b">
                        Inside Diameter (mm)
                      </th>
                      <th className="px-4 py-3 border-b">Circumference (mm)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b">
                      <td className="px-4 py-2 font-bold text-gray-900">5</td>
                      <td className="px-4 py-2">15.7 mm</td>
                      <td className="px-4 py-2">49.3 mm</td>
                    </tr>
                    <tr className="border-b bg-gray-50/30">
                      <td className="px-4 py-2 font-bold text-gray-900">6</td>
                      <td className="px-4 py-2">16.5 mm</td>
                      <td className="px-4 py-2">51.9 mm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-bold text-gray-900">7</td>
                      <td className="px-4 py-2">17.3 mm</td>
                      <td className="px-4 py-2">54.4 mm</td>
                    </tr>
                    <tr className="border-b bg-gray-50/30">
                      <td className="px-4 py-2 font-bold text-gray-900">8</td>
                      <td className="px-4 py-2">18.1 mm</td>
                      <td className="px-4 py-2">57.0 mm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-bold text-gray-900">9</td>
                      <td className="px-4 py-2">19.0 mm</td>
                      <td className="px-4 py-2">59.5 mm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-100 rounded-2xl blur opacity-25"></div>
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800"
                alt="How to measure ring size"
                className="relative rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-xs text-gray-500 font-medium text-center italic">
                  Tip: Measure your fingers at the end of the day when they are
                  at their largest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- NECKLACE LENGTH SECTION --- */}
        <section className="mb-20 bg-gray-50 rounded-3xl p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-8">
            <Info className="text-yellow-600 h-8 w-8" />
            <h2 className="text-3xl font-semibold">Necklace Length Guide</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://www.jewelry-secrets.com/Blog/wp-content/uploads/2016/06/Chain-Length-Chart.jpg"
                alt="Necklace length visual chart"
                className="rounded-2xl shadow-md bg-white p-2"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    16" (40cm) - Choker Style
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Sits right at the base of the neck. Perfect for dainty
                    gemstone pendants.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    18" (45cm) - Princess Length
                  </h3>
                  <p className="text-gray-600 text-sm">
                    The most common length. Rests gracefully on the collarbone.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    20" (50cm) - Matinee Length
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Sits below the collarbone. Ideal for larger statement pieces
                    from our collection.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-200 mt-6">
                  <p className="text-sm italic text-gray-500">
                    Note: Different chain thicknesses can slightly change how
                    the length feels on your neck.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- HELP SECTION --- */}
        <div className="bg-gray-900 rounded-3xl p-10 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Still Unsure of Your Size?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Our experts are available to guide you through a virtual fitting
              via WhatsApp or provide a printable sizer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/9779860120739"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
              >
                <Phone className="h-5 w-5" /> Chat with an Expert
              </a>
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                <Download className="h-5 w-5" /> Download Printable Sizer
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SizeGuidePage;
