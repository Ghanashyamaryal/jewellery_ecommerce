"use client";

import Link from "next/link";
import { Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative">
      {/* Image Container */}
      <Link
        href={`/product/${product.slug}`}
        className="block aspect-[3/4] overflow-hidden bg-muted"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2 py-1 text-[10px] tracking-widest uppercase bg-foreground text-background">
              New
            </span>
          )}
          {product.comparePrice && (
            <span className="px-2 py-1 text-[10px] tracking-widest uppercase bg-destructive text-destructive-foreground">
              Sale
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-background/90 hover:bg-background"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-background/90 hover:bg-background"
            asChild
          >
            <Link href={`/product/${product.slug}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="pt-4 space-y-2">
        {/* Features */}
        <div className="flex gap-2 flex-wrap">
          {product.features.slice(0, 2).map((feature) => (
            <span
              key={feature}
              className="text-[10px] tracking-wider uppercase text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-lg hover:text-muted-foreground transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Weight */}
        <p className="text-xs text-muted-foreground">
          Approx. {product.weight}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-medium">
            NPR {product.price.toLocaleString()}
          </span>
          {product.comparePrice && (
            <span className="text-sm text-muted-foreground line-through">
              NPR {product.comparePrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
