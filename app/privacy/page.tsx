import { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import {
  LegalContact,
  LegalNotice,
  LegalSection,
} from "@/components/legal/LegalSection";

export const metadata: Metadata = {
  title: "Privacy Policy - Aryal Siring Gems",
  description:
    "How Aryal Siring Gems collects, uses, shares and protects your personal information when you browse, order or contact us.",
};

const SECTIONS = [
  { id: "scope", title: "Who we are" },
  { id: "collect", title: "Information we collect" },
  { id: "use", title: "How we use it" },
  { id: "sharing", title: "Who we share it with" },
  { id: "device-storage", title: "Cookies & browser storage" },
  { id: "whatsapp", title: "WhatsApp & social media" },
  { id: "transfers", title: "International transfers" },
  { id: "retention", title: "How long we keep it" },
  { id: "security", title: "Security" },
  { id: "rights", title: "Your rights" },
  { id: "marketing", title: "Marketing" },
  { id: "children", title: "Children" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact us" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="27 September 2026"
      sections={SECTIONS}
      intro={
        <p>
          Your privacy matters to us as much as the pieces we make. This policy
          explains, in plain language, what personal information we collect,
          why we collect it, and the choices you have. We never sell your
          personal information.
        </p>
      }
    >
      <LegalSection id="scope" number={1} title="Who we are">
        <p>
          <strong>Aryal Siring Gems</strong> is a silversmith and gemstone
          business based in Kathmandu, Nepal. We are responsible for the
          personal information described in this policy. It applies to this
          website and to orders and enquiries made through WhatsApp, email,
          phone or in person.
        </p>
        <p>
          We handle personal information in line with the Individual Privacy
          Act, 2075 (2018) and the Electronic Transactions Act, 2063 (2008) of
          Nepal. Where visitors from other countries have additional rights
          under their local laws, we will respect those rights too.
        </p>
      </LegalSection>

      <LegalSection id="collect" number={2} title="Information we collect">
        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Orders:</strong> your name, email address, phone number,
            delivery address, city, province and postal code.
          </li>
          <li>
            <strong>Bespoke requests and enquiries:</strong> your name, contact
            details, message, budget, sizes, and any reference images or design
            ideas you share.
          </li>
          <li>
            <strong>Conversations:</strong> messages you send us by WhatsApp,
            email or phone, including photos (for example, of an item you want
            repaired or returned).
          </li>
          <li>
            <strong>Payment confirmation:</strong> the transaction reference,
            amount and status from eSewa, Khalti, your bank or our card payment
            provider. We never receive or store your full card number, CVV or
            wallet PIN.
          </li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li>
            <strong>Technical data:</strong> like almost every website, our
            hosting provider records basic server logs, such as IP address,
            browser type, device, pages requested and date and time. We use
            these to keep the site secure and working.
          </li>
          <li>
            <strong>Search terms:</strong> words you type into our search box
            are processed to show you results. They are not linked to your
            identity.
          </li>
        </ul>
        <p>
          We do not ask for sensitive information such as religious beliefs,
          health details or government ID. Please don&apos;t send it to us
          unless we specifically need it (for example, when customs requires it
          for an international shipment).
        </p>
      </LegalSection>

      <LegalSection id="use" number={3} title="How we use it">
        <p>We use your information only for clear, limited purposes:</p>
        <ul>
          <li>to process, pack, ship and track your order;</li>
          <li>
            to design and make bespoke pieces, and to send you progress updates
            and photos for approval;
          </li>
          <li>
            to answer your questions and handle returns, repairs and warranty
            claims;
          </li>
          <li>to verify payments and prevent fraud;</li>
          <li>
            to keep invoices and accounting records as required by Nepali tax
            law;
          </li>
          <li>to keep our website secure and improve how it works;</li>
          <li>
            to send you news about new collections or offers, but only if you
            have agreed to receive them (see section 11).
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="sharing" number={4} title="Who we share it with">
        <p>
          We share only what is needed, and only with people who help us serve
          you:
        </p>
        <ul>
          <li>
            <strong>Couriers and logistics partners</strong>, in Nepal and
            internationally (for example DHL or FedEx), who need your name,
            address and phone number to deliver your parcel. For international
            orders, customs authorities may also receive shipment details.
          </li>
          <li>
            <strong>Payment providers</strong> such as eSewa, Khalti, banks and
            our card payment provider, to process payments and refunds.
          </li>
          <li>
            <strong>Gemological laboratories</strong>, only if you ask for a
            stone to be independently certified.
          </li>
          <li>
            <strong>Service providers</strong> who host our website or provide
            email and messaging, under obligations to keep your data
            confidential.
          </li>
          <li>
            <strong>Authorities</strong>, where we are legally required to, or
            to protect our rights, our customers or the public against fraud.
          </li>
        </ul>
        <LegalNotice>
          We never sell, rent or trade your personal information, and we do not
          share it with advertisers.
        </LegalNotice>
      </LegalSection>

      <LegalSection
        id="device-storage"
        number={5}
        title="Cookies & browser storage"
      >
        <p>
          Your shopping cart and wishlist are saved in your browser&apos;s local
          storage, on your own device, so they are still there when you come
          back. This information stays on your device until you check out or
          contact us.
        </p>
        <p>
          We currently do not use advertising cookies or third-party tracking
          for marketing. If we introduce analytics or advertising tools in the
          future, we will update this policy and ask for your consent where the
          law requires it.
        </p>
        <p>
          You can clear your cart, wishlist and any cookies at any time through
          your browser settings. Some features, like saving your cart, will not
          work if browser storage is disabled.
        </p>
      </LegalSection>

      <LegalSection id="whatsapp" number={6} title="WhatsApp & social media">
        <p>
          Many customers prefer to talk to us on WhatsApp. When you message us
          there, WhatsApp (owned by Meta) processes your messages under its own
          privacy policy. The same applies when you interact with us on
          Instagram, Facebook or YouTube, or share a product using those
          platforms. We only use the information you send us in those chats to
          help you with your enquiry or order.
        </p>
      </LegalSection>

      <LegalSection id="transfers" number={7} title="International transfers">
        <p>
          Some of our service providers, such as website hosting and email,
          may store data on servers outside Nepal. When we ship internationally,
          your details travel with the parcel to the destination country. In
          each case we share only what is necessary and use reputable
          providers that protect personal information.
        </p>
      </LegalSection>

      <LegalSection id="retention" number={8} title="How long we keep it">
        <ul>
          <li>
            <strong>Orders and invoices:</strong> for as long as Nepali tax and
            accounting laws require, and to handle warranty claims.
          </li>
          <li>
            <strong>Enquiries and bespoke requests</strong> that don&apos;t
            lead to an order: up to 24 months, so we can pick up where we left
            off if you come back.
          </li>
          <li>
            <strong>Marketing preferences:</strong> until you unsubscribe.
          </li>
          <li>
            <strong>Server logs:</strong> for a short period, usually no more
            than 90 days, unless needed to investigate a security issue.
          </li>
        </ul>
        <p>
          When we no longer need information, we delete it or make it
          anonymous.
        </p>
      </LegalSection>

      <LegalSection id="security" number={9} title="Security">
        <p>
          Our website uses HTTPS encryption. Payments are handled by the
          payment providers&apos; own secure systems, and access to customer
          information is limited to the people who need it to fulfil your order.
          No system is completely secure, so please never send us full card
          numbers, passwords or PINs by message or email. We will never ask for
          them.
        </p>
        <p>
          If a data breach is likely to affect you, we will tell you and the
          relevant authorities as required by law.
        </p>
      </LegalSection>

      <LegalSection id="rights" number={10} title="Your rights">
        <p>You can ask us to:</p>
        <ul>
          <li>tell you what personal information we hold about you;</li>
          <li>correct information that is wrong or incomplete;</li>
          <li>
            delete your information, where we don&apos;t need to keep it for
            legal reasons;
          </li>
          <li>stop using your information for marketing;</li>
          <li>withdraw any consent you have given.</li>
        </ul>
        <p>
          To make a request, contact us using the details below. We may ask you
          to confirm your identity first, and we will respond within 30 days.
          There is no charge.
        </p>
      </LegalSection>

      <LegalSection id="marketing" number={11} title="Marketing">
        <p>
          We will only send you marketing messages about new collections,
          festival offers or events if you have agreed to receive them. You can
          opt out at any time by replying &quot;STOP&quot; on WhatsApp, using
          the unsubscribe link in an email, or simply telling us. Messages about
          your orders are not marketing and will still be sent.
        </p>
      </LegalSection>

      <LegalSection id="children" number={12} title="Children">
        <p>
          Our website is intended for adults. We do not knowingly collect
          personal information from children under 16. If you believe a child
          has given us their information, please contact us and we will delete
          it. Orders from anyone under 18 require a parent or guardian&apos;s
          consent, as explained in our{" "}
          <Link href="/terms-and-condition">Terms and Conditions</Link>.
        </p>
      </LegalSection>

      <LegalSection id="changes" number={13} title="Changes to this policy">
        <p>
          We may update this policy when our services or the law change. We
          will change the &quot;last updated&quot; date at the top of this page,
          and if the changes are significant, we will let you know by email or
          WhatsApp where we can.
        </p>
      </LegalSection>

      <LegalSection id="contact" number={14} title="Contact us">
        <p>
          For any privacy question or request, get in touch. We read every
          message.
        </p>
        <LegalContact />
      </LegalSection>
    </LegalPage>
  );
}
