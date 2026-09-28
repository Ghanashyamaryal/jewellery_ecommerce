import { ProductCard } from "@/components/common/ProductCard";
import type { Product } from "@/types/catalog";

export function CompleteTheLook({ products }: { products: Product[] }) {
  if (products.length < 2) return null;

  return (
    <section className="w-full max-w-390 mx-auto px-4 lg:px-8 pb-16">
      <div className="text-center mb-12">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Wear It Together
        </p>
        <h2 className="text-3xl font-serif">Complete the Look</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 gap-y-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
