"use client";

import { Suspense } from "react";
import { Layout } from "@/components/layout/Layout";
import { ShopContent } from "./ShopContent";

function ShopSkeleton() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="h-96 bg-muted animate-pulse rounded-lg" />
      </div>
    </section>
  );
}

export default function ShopPage() {
  return (
    <Layout>
      <Suspense fallback={<ShopSkeleton />}>
        <ShopContent />
      </Suspense>
    </Layout>
  );
}
