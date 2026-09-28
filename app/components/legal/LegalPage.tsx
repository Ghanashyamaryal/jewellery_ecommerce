import { ReactNode } from "react";
import { Layout } from "@/components/layout/Layout";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: { id: string; title: string }[];
  children: ReactNode;
}

export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
  children,
}: LegalPageProps) {
  return (
    <Layout>
      <section className="bg-muted/40 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-16 md:py-20">
          <p className="text-sm tracking-[0.3em] uppercase text-gold mb-3">
            {eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">{title}</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Last updated: {lastUpdated}
          </p>
          <div className="max-w-3xl text-muted-foreground leading-relaxed">
            {intro}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 self-start">
            <details className="group lg:hidden border border-border">
              <summary className="cursor-pointer px-4 py-3 text-sm tracking-widest uppercase">
                On this page
              </summary>
              <SectionLinks sections={sections} />
            </details>
            <div className="hidden lg:block">
              <p className="text-sm tracking-widest uppercase mb-4">
                On this page
              </p>
              <SectionLinks sections={sections} />
            </div>
          </nav>

          <article className="max-w-3xl space-y-12">{children}</article>
        </div>
      </div>
    </Layout>
  );
}

function SectionLinks({ sections }: { sections: LegalPageProps["sections"] }) {
  return (
    <ol className="space-y-2 px-4 pb-4 lg:p-0 text-sm text-muted-foreground">
      {sections.map((section, i) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="flex gap-2 hover:text-foreground transition-colors"
          >
            <span className="tabular-nums text-gold">{i + 1}.</span>
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
