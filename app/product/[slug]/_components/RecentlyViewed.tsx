"use client";

import Link from "next/link";
import type { Product } from "@/types/catalog";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { toRecentlyViewedItem } from "@/lib/recently-viewed";

export function RecentlyViewed({ product }: { product: Product }) {
  const items = useRecentlyViewed(toRecentlyViewedItem(product));
  if (items.length === 0) return null;

  return (
    <section className="w-full max-w-390 mx-auto px-4 lg:px-8 py-16">
      <h2 className="text-2xl md:text-3xl font-serif text-center mb-10">Recently Viewed</h2>
      <ul className="flex gap-4 md:gap-6 overflow-x-auto snap-x pb-2 [scrollbar-width:none]">
        {items.map((item) => (
          <li key={item.id} className="w-40 md:w-48 shrink-0 snap-start">
            <Link href={`/product/${item.slug}`} className="group block">
              <div className="aspect-3/4 bg-muted overflow-hidden mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="font-serif line-clamp-1 group-hover:text-muted-foreground transition-colors">
                {item.name}
              </p>
              <p className="text-sm">
                NPR {item.price.toLocaleString()}
                {item.strikePrice && (
                  <span className="ml-2 text-muted-foreground line-through">
                    NPR {item.strikePrice.toLocaleString()}
                  </span>
                )}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
