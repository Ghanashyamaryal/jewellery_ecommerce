import { ReactNode } from "react";
import { SITE_CONTACT } from "@/lib/site";

interface LegalSectionProps {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
}

export function LegalSection({ id, number, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-serif text-2xl md:text-3xl mb-5">
        <span className="text-gold mr-2">{number}.</span>
        {title}
      </h2>
      <div className="text-muted-foreground leading-relaxed space-y-4 [&_h3]:font-serif [&_h3]:text-lg [&_h3]:text-foreground [&_h3]:pt-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-foreground [&_strong]:font-semibold [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-gold">
        {children}
      </div>
    </section>
  );
}

export function LegalNotice({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-gold bg-muted/40 px-5 py-4 text-sm">
      {children}
    </div>
  );
}

export function LegalContact() {
  return (
    <div className="border border-border p-6 not-italic">
      <p className="font-serif text-lg text-foreground mb-3">
        {SITE_CONTACT.name}
      </p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        <dt className="text-foreground">Email</dt>
        <dd>
          <a href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a>
        </dd>
        <dt className="text-foreground">WhatsApp</dt>
        <dd>
          <a
            href={`https://wa.me/${SITE_CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {SITE_CONTACT.whatsappDisplay}
          </a>
        </dd>
        <dt className="text-foreground">Location</dt>
        <dd>{SITE_CONTACT.location}</dd>
      </dl>
    </div>
  );
}
