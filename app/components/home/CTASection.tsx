import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-8 md:py-12 xl:py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif">
            Ready to Discover Your Perfect Piece?
          </h2>
          <p className="text-primary-foreground/70">
            Explore our complete collection of handcrafted jewelry and rare
            gemstones, or create something uniquely yours with our bespoke
            service.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="min-w-[200px] tracking-widest uppercase text-sm bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link href="/shop">
                Explore All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
