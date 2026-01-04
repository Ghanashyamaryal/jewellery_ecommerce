import React from "react";
import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Assuming you are using Shadcn UI or similar
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "FAQ - Aryal Sirin Gems",
  description:
    "Frequently asked questions about our gemstones, custom jewelry, and shipping.",
};

const FAQPage = () => {
  const faqs = [
    {
      category: "Gemstones & Quality",
      questions: [
        {
          q: "Are your gemstones natural?",
          a: "Yes, 100%. At Aryal Sirin Gems, we specialize exclusively in natural gemstones. Every stone is hand-selected and checked for authenticity. We do not deal in synthetic or lab-created stones unless explicitly stated.",
        },
        {
          q: "Do you provide lab certificates?",
          a: "Most of our premium stones come with certificates from reputable labs (such as GIA, Lotus, or local government-approved labs). Please check the product description or contact us to request a specific certification.",
        },
        {
          q: "What does 'Eye-Clean' mean?",
          a: "In the gemstone world, 'eye-clean' means that no inclusions or flaws are visible to the naked eye when the stone is viewed from a normal distance.",
        },
      ],
    },
    {
      category: "Custom Design & Sizing",
      questions: [
        {
          q: "Can I create a custom ring design?",
          a: "Absolutely! We love bringing your visions to life. You can send us a photo or a sketch via WhatsApp, and our master craftsmen will create a bespoke piece for you.",
        },
        {
          q: "How long does a custom order take?",
          a: "Typically, custom orders take 10 to 15 business days to complete, depending on the complexity of the design and the availability of the stones.",
        },
        {
          q: "Can you resize a ring after purchase?",
          a: "Yes, we offer one-time free resizing for most of our standard gold and silver rings. Please note that some full-eternity bands cannot be resized.",
        },
      ],
    },
    {
      category: "Payments & Security",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "Inside Nepal, we accept eSewa, Khalti, and Bank Transfers. For international clients, we accept wire transfers and major credit cards via secure payment links.",
        },
        {
          q: "Is it safe to buy high-value gems online?",
          a: "Yes. We provide full insurance on all shipments, secure payment gateways, and a 100% authenticity guarantee. Your peace of mind is our priority.",
        },
      ],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Everything you need to know about Aryal Sirin Gems. Can't find the
            answer?{" "}
            <span className="text-blue-600 font-medium">
              WhatsApp us at +977 9860120739
            </span>
          </p>
        </div>

        <div className="space-y-10">
          {faqs.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-xl font-bold mb-4 text-gray-800 uppercase tracking-wide border-l-4 border-yellow-500 pl-4">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((item, qIdx) => (
                  <div key={qIdx} className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.q}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Help CTA */}
        <div className="mt-16 p-8 bg-gray-50 rounded-2xl text-center border border-gray-100">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            Our gemstone experts are ready to help you find the perfect stone.
          </p>
          <a
            href="https://wa.me/9779860120739"
            className="inline-block bg-[#25D366] text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-colors"
          >
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
