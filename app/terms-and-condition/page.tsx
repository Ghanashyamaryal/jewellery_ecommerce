import { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import {
  LegalContact,
  LegalNotice,
  LegalSection,
} from "@/components/legal/LegalSection";

export const metadata: Metadata = {
  title: "Terms and Conditions - Aryal Siring Gems",
  description:
    "The terms that apply when you shop with Aryal Siring Gems: silver purity, gemstones, pricing in NPR, payments, bespoke orders, shipping, returns and warranty.",
};

const SECTIONS = [
  { id: "about", title: "About these terms" },
  { id: "products", title: "Our products" },
  { id: "beliefs", title: "Spiritual & traditional beliefs" },
  { id: "authenticity", title: "Certification & authenticity" },
  { id: "pricing", title: "Prices & taxes" },
  { id: "orders", title: "Placing an order" },
  { id: "payment", title: "Payment" },
  { id: "bespoke", title: "Bespoke & made-to-order" },
  { id: "shipping", title: "Shipping & delivery" },
  { id: "returns", title: "Returns & refunds" },
  { id: "warranty", title: "Warranty & repairs" },
  { id: "website", title: "Using our website" },
  { id: "ip", title: "Intellectual property" },
  { id: "liability", title: "Limitation of liability" },
  { id: "force-majeure", title: "Events outside our control" },
  { id: "law", title: "Governing law & disputes" },
  { id: "changes", title: "Changes to these terms" },
  { id: "contact", title: "Contact us" },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms and Conditions"
      lastUpdated="27 September 2026"
      sections={SECTIONS}
      intro={
        <p>
          These terms explain what you can expect from us and what we expect
          from you when you browse or buy from Aryal Siring Gems. Please read
          them before placing an order. If anything is unclear, message us on
          WhatsApp and we&apos;ll happily explain.
        </p>
      }
    >
      <LegalSection id="about" number={1} title="About these terms">
        <p>
          This website is operated by <strong>Aryal Siring Gems</strong>, a
          silversmith and gemstone business based in Kathmandu, Nepal
          (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By using this
          website or placing an order through it, over WhatsApp, by email or in
          person, you agree to these Terms and Conditions together with our{" "}
          <Link href="/privacy">Privacy Policy</Link> and{" "}
          <Link href="/shipping-and-return">Shipping &amp; Returns</Link>{" "}
          policy.
        </p>
        <p>
          You must be at least 18 years old, or have the consent of a parent or
          guardian, to place an order. Nothing in these terms affects the rights
          you have as a consumer under the Consumer Protection Act, 2075 (2018)
          of Nepal or any other law that applies to you.
        </p>
      </LegalSection>

      <LegalSection id="products" number={2} title="Our products">
        <p>
          Most of our pieces are made by hand in our workshop. Small differences
          between items are part of their character, not a fault.
        </p>
        <h3>Metals</h3>
        <ul>
          <li>
            <strong>925 sterling silver</strong> contains 92.5% pure silver.{" "}
            <strong>999 fine silver</strong> contains 99.9% pure silver. Where
            size allows, sterling pieces are stamped &quot;925&quot;.
          </li>
          <li>
            <strong>Oxidised silver</strong> is deliberately darkened to bring
            out detail. The finish softens with wear and is not a defect.
          </li>
          <li>
            <strong>White metal and German silver</strong> are alloys that look
            like silver but contain little or no silver. They are always
            labelled as such and priced accordingly.
          </li>
          <li>
            Any plating (for example rhodium or gold plating) is identified in
            the product details and will wear over time depending on use.
          </li>
        </ul>
        <h3>Gemstones</h3>
        <ul>
          <li>
            Natural stones have inclusions, colour zoning and texture that make
            each one unique. No two stones are identical to the photographs.
          </li>
          <li>
            Many gemstones in the trade are routinely treated (for example
            heated, oiled, dyed, stabilised or reconstituted). We disclose known
            treatments, and any lab-created stone or simulant such as cubic
            zirconia is described as such. Stones are sold as natural only when
            the listing says so.
          </li>
          <li>
            Stated carat weights, bead sizes and measurements are approximate
            and may vary slightly from piece to piece.
          </li>
        </ul>
        <h3>Weights, sizes &amp; images</h3>
        <ul>
          <li>
            Listed metal weights are approximate. Because pieces are handmade,
            the actual weight may differ by up to 10%. Prices are per piece, not
            per gram, unless we say otherwise.
          </li>
          <li>
            Idols, statues, singing bowls and pooja items are hand-cast and
            hand-finished, so facial details, patina and tone vary.
          </li>
          <li>
            We try hard to show colours accurately, but lighting and screen
            settings affect how items look. Please use our{" "}
            <Link href="/size-guide">Size Guide</Link> or ask us before ordering
            if size or colour is important to you.
          </li>
        </ul>
      </LegalSection>

      <LegalSection
        id="beliefs"
        number={3}
        title="Spiritual & traditional beliefs"
      >
        <p>
          Gemstones, malas, rudraksha, deity idols and singing bowls carry deep
          cultural and religious meaning. Where we mention astrological,
          spiritual or healing associations, we share them as traditional
          beliefs only.
        </p>
        <LegalNotice>
          We make no guarantee of any astrological, spiritual, health or
          financial outcome from wearing or using our products. Nothing on this
          website is medical advice. The perceived effect of a product is not a
          reason for a return or refund.
        </LegalNotice>
      </LegalSection>

      <LegalSection
        id="authenticity"
        number={4}
        title="Certification & authenticity"
      >
        <ul>
          <li>
            A certificate is included only when the product listing says so.
            Certificates describe the stone at the time of testing.
          </li>
          <li>
            You can ask us to have a stone tested by an independent gemological
            laboratory. Lab fees and any related shipping are paid by you unless
            we agree otherwise in writing.
          </li>
          <li>
            If a stone is proven by a recognised laboratory to be materially
            different from how we described it (for example, sold as natural
            but found to be synthetic), we will give you a full refund,
            including shipping, even outside the normal return window.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="pricing" number={5} title="Prices & taxes">
        <ul>
          <li>
            Prices are shown in Nepali Rupees (NPR) and include VAT where
            applicable, unless the product or invoice states otherwise.
            Shipping charges are shown separately at checkout or confirmed
            before dispatch.
          </li>
          <li>
            Silver and gemstone prices move with the market. The price that
            applies is the one shown when your order is confirmed. Quotes for
            bespoke work are valid for 7 days unless stated otherwise.
          </li>
          <li>
            If you pay in another currency, your bank or payment provider sets
            the exchange rate and may charge fees. We are not responsible for
            those charges.
          </li>
          <li>
            Discounts and promotional codes are valid only for the stated
            period, cannot be exchanged for cash, and cannot be combined unless
            we say so.
          </li>
          <li>
            If an item is listed at an obviously incorrect price because of a
            mistake, we may cancel the order and refund anything you have paid.
            We will always contact you first and offer the item at the correct
            price.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="orders" number={6} title="Placing an order">
        <p>
          When you place an order, you are making an offer to buy. A contract
          is formed only when we confirm the order by email, WhatsApp or by
          dispatching the item. We may decline or cancel an order, and will
          refund any payment in full, if:
        </p>
        <ul>
          <li>the item is out of stock or cannot be made as described;</li>
          <li>there is a pricing or description error;</li>
          <li>
            we cannot verify your contact details or payment, or suspect fraud;
          </li>
          <li>
            the quantity ordered suggests resale and we have not agreed to a
            wholesale arrangement.
          </li>
        </ul>
        <p>
          You may cancel a ready-made item free of charge before it is
          dispatched. Once dispatched, the returns process applies. Bespoke
          orders have their own cancellation rules (see section 8).
        </p>
      </LegalSection>

      <LegalSection id="payment" number={7} title="Payment">
        <ul>
          <li>
            <strong>Within Nepal:</strong> eSewa, Khalti, bank transfer, and
            cash on delivery (COD) in areas where our courier offers it.
          </li>
          <li>
            <strong>International:</strong> bank/wire transfer or a secure card
            payment link (Visa, Mastercard).
          </li>
          <li>
            For high-value items, bespoke work or deliveries to areas without
            COD, we may ask for full or partial payment in advance.
          </li>
          <li>
            Card and wallet payments are processed by the payment provider. We
            never see or store your full card number or wallet PIN.
          </li>
          <li>
            If a COD order is refused on delivery without a valid reason, we
            may require advance payment for future orders.
          </li>
          <li>
            Ownership of an item passes to you once we have received full
            payment.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="bespoke" number={8} title="Bespoke & made-to-order">
        <ul>
          <li>
            We will confirm the design, materials, size, price and estimated
            completion date with you before work begins.
          </li>
          <li>
            A deposit of up to 50% is required to start. Once materials are
            purchased or work has begun, the deposit is non-refundable, because
            the piece is made specifically for you.
          </li>
          <li>
            Completion dates are estimates. Hand-crafting, stone sourcing and
            festival periods can cause delays, and we will keep you updated.
          </li>
          <li>
            Bespoke, engraved and resized items cannot be returned or exchanged
            unless they are faulty or differ from the design you approved.
          </li>
          <li>
            If you give us your own design, photo or reference, you confirm you
            have the right to use it. If you give us your own stone or metal,
            we take reasonable care, but we are not responsible for damage
            caused by existing fractures, treatments or natural weaknesses in
            that material.
          </li>
          <li>
            Finished items not collected or paid for within 60 days of the
            completion notice may be sold to recover our costs, after we have
            contacted you.
          </li>
        </ul>
        <p>
          Start a request on our <Link href="/bespoke">Bespoke</Link> page.
        </p>
      </LegalSection>

      <LegalSection id="shipping" number={9} title="Shipping & delivery">
        <p>
          Processing times, carriers and delivery areas are described in our{" "}
          <Link href="/shipping-and-return">Shipping &amp; Returns</Link>{" "}
          policy. In summary:
        </p>
        <ul>
          <li>
            Delivery dates are estimates and are not guaranteed, especially for
            remote areas and international orders.
          </li>
          <li>
            Please make sure your address and phone number are correct. If a
            parcel is returned because of an incorrect address or failed
            delivery, re-delivery charges may apply.
          </li>
          <li>
            Shipments are insured by us until delivery. Please check your parcel
            when it arrives and tell us about any damage or missing items within
            48 hours. An unboxing video helps us resolve claims quickly.
          </li>
          <li>
            International customers are responsible for customs duties, import
            taxes and brokerage fees charged by their country. Parcels refused
            at customs are not eligible for a refund of shipping costs.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="returns" number={10} title="Returns & refunds">
        <ul>
          <li>
            You can request a return within <strong>7 days of delivery</strong>{" "}
            for eligible ready-made items. Items must be unworn and in original
            condition, with tags, certificates and packaging.
          </li>
          <li>
            <strong>Not returnable:</strong> bespoke, engraved or resized items,
            and items bought in clearance sales, unless faulty.
          </li>
          <li>
            Once we have received and inspected the item, refunds are made
            within 7–10 business days to the original payment method. COD
            orders are refunded by bank transfer, eSewa or Khalti.
          </li>
          <li>
            Original shipping costs are non-refundable, and you pay the cost of
            returning the item, unless we sent a faulty, damaged or wrong item.
          </li>
          <li>
            Items that show wear, damage, alteration, or stones that have been
            removed or replaced will not be refunded.
          </li>
        </ul>
        <p>
          Full details are in our{" "}
          <Link href="/shipping-and-return">Shipping &amp; Returns</Link>{" "}
          policy.
        </p>
      </LegalSection>

      <LegalSection id="warranty" number={11} title="Warranty & repairs">
        <p>
          We stand behind our craftsmanship. If an item has a manufacturing
          defect, such as a faulty clasp, a broken solder joint or a stone that
          falls out under normal wear, tell us within{" "}
          <strong>30 days of delivery</strong> and we will repair or replace it
          free of charge, or refund you if repair is not possible.
        </p>
        <p>This warranty does not cover:</p>
        <ul>
          <li>
            natural tarnishing of silver, or the softening of an oxidised
            finish;
          </li>
          <li>wear to plating over time;</li>
          <li>
            damage from impact, pulling, chemicals (perfume, chlorine, cleaning
            agents), heat or improper storage;
          </li>
          <li>
            changes to porous stones such as turquoise, amber, coral and pearl
            caused by water, oils or cosmetics;
          </li>
          <li>repairs or alterations made by anyone other than us.</li>
        </ul>
        <p>
          After the warranty period, we offer paid repairs, polishing, and
          resizing where possible. See our{" "}
          <Link href="/care-instruction">Care Instructions</Link> to keep your
          pieces looking their best.
        </p>
      </LegalSection>

      <LegalSection id="website" number={12} title="Using our website">
        <ul>
          <li>
            We aim to keep the website available and accurate, but we do not
            guarantee it will always be error-free or uninterrupted. We may
            change or remove products at any time.
          </li>
          <li>
            You must not misuse the website, including by trying to gain
            unauthorised access, introducing malicious code, placing fraudulent
            orders, or copying our catalogue with automated tools.
          </li>
          <li>
            If you submit a review, photo or message, you allow us to display it
            on our website and social media. We may remove content that is
            unlawful, offensive or misleading.
          </li>
          <li>
            Links to third-party sites (such as WhatsApp, payment providers or
            social media) are provided for convenience. Those sites have their
            own terms and privacy policies.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="ip" number={13} title="Intellectual property">
        <p>
          Our designs, product photographs, text, logo and the name &quot;Aryal
          Siring Gems&quot; belong to us or our licensors. You may share links
          to our products, but you may not copy, reproduce or sell our designs
          or use our images for commercial purposes without our written
          permission. Design drawings made for bespoke orders remain ours unless
          we agree otherwise in writing.
        </p>
      </LegalSection>

      <LegalSection id="liability" number={14} title="Limitation of liability">
        <p>
          To the extent permitted by law, our total liability for any claim
          relating to an order is limited to the price you paid for that order.
          We are not liable for indirect or consequential losses, such as loss
          of profit or opportunity.
        </p>
        <p>
          Nothing in these terms limits our liability for death or personal
          injury caused by our negligence, for fraud, or for anything else that
          cannot be limited under the laws of Nepal, including your rights
          under the Consumer Protection Act, 2075.
        </p>
      </LegalSection>

      <LegalSection
        id="force-majeure"
        number={15}
        title="Events outside our control"
      >
        <p>
          We are not responsible for delays or failures caused by events beyond
          our reasonable control, including natural disasters, earthquakes,
          floods and landslides, strikes or bandhs, road closures, fuel
          shortages, pandemics, government action, customs delays, or carrier
          disruptions. If this happens, we will let you know and do our best to
          fulfil your order as soon as possible, or offer a refund.
        </p>
      </LegalSection>

      <LegalSection id="law" number={16} title="Governing law & disputes">
        <p>
          These terms are governed by the laws of Nepal. If you have a
          complaint, please contact us first. Most issues can be resolved
          quickly and amicably. If a dispute cannot be resolved, it will be
          subject to the jurisdiction of the courts of Kathmandu, Nepal.
        </p>
      </LegalSection>

      <LegalSection id="changes" number={17} title="Changes to these terms">
        <p>
          We may update these terms from time to time, for example when we add
          new services or when the law changes. The version published on this
          page when you place your order is the one that applies to that order.
        </p>
      </LegalSection>

      <LegalSection id="contact" number={18} title="Contact us">
        <p>Questions about these terms or an order? We&apos;re happy to help.</p>
        <LegalContact />
      </LegalSection>
    </LegalPage>
  );
}
