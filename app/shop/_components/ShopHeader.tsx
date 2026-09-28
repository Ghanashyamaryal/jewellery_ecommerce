import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  name: string;
  href?: string;
}

interface Chip {
  name: string;
  href: string;
  active?: boolean;
}

interface ShopHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  chips?: Chip[];
}

export function ShopHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  chips,
}: ShopHeaderProps) {
  return (
    <section className="bg-muted/50 py-10 md:py-14">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center justify-center flex-wrap gap-1 text-xs text-muted-foreground mb-4">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.name} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-foreground transition-colors">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-foreground">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl md:text-5xl font-serif mb-4">{title}</h1>
        {description && (
          <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
        )}
        {chips && chips.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {chips.map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                className={`px-4 py-1.5 text-xs tracking-wider uppercase border transition-colors ${
                  chip.active
                    ? "bg-foreground text-background border-foreground"
                    : "border-border hover:border-foreground"
                }`}
              >
                {chip.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
