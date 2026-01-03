"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RelatedProducts } from "./_components/RelatedProducts";
import ProductDetails from "./_components/ProductDetails";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);

  if (!product) {
    return (
      <Layout>
        <section className="py-24 text-center">
          <h1 className="text-3xl font-serif mb-4">Product not found</h1>
          <Button asChild>
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </section>
      </Layout>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      <section className="w-full ">
        <ProductDetails product={product} />
        <RelatedProducts products={relatedProducts} />
      </section>
    </Layout>
  );
}
