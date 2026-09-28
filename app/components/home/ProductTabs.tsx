"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/common/ProductCard";
import type { Product } from "@/types/catalog";

interface ProductTab {
  value: string;
  label: string;
  products: Product[];
}

export function ProductTabs({ tabs, defaultValue }: { tabs: ProductTab[]; defaultValue?: string }) {
  const visible = tabs.filter((t) => t.products.length > 0);
  if (visible.length === 0) return null;
  const initial = visible.find((t) => t.value === defaultValue) ?? visible[0];

  return (
    <Tabs defaultValue={initial.value}>
      <TabsList className="mx-auto mb-10 flex w-fit">
        {visible.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="px-5 text-sm tracking-widest uppercase"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {visible.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 gap-y-12">
            {tab.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
