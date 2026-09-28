import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  getCompleteTheLook,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "@/lib/catalog";
import { getProductJsonLd } from "@/lib/structured-data";
import { RelatedProducts } from "./_components/RelatedProducts";
import ProductDetails from "./_components/ProductDetails";
import { ProductBreadcrumb } from "./_components/ProductBreadcrumb";
import { ProductReviews } from "./_components/ProductReviews";
import { CompleteTheLook } from "./_components/CompleteTheLook";
import { RecentlyViewed } from "./_components/RecentlyViewed";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = getProductBySlug((await params).slug);
  if (!product) return { title: "Product not found" };

  const description = product.seo?.metaDescription ?? product.shortDescription;
  return {
    title: product.name,
    description,
    keywords: product.seo?.keywords,
    openGraph: {
      title: product.name,
      description,
      images: [product.seo?.ogImage ?? product.images[0]].filter(Boolean),
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

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

  const completeTheLook = getCompleteTheLook(product);
  const related = getRelatedProducts(product, 4 + completeTheLook.length)
    .filter((p) => !completeTheLook.includes(p))
    .slice(0, 4);

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProductJsonLd(product)).replace(/</g, "\\u003c"),
        }}
      />
      <section className="w-full ">
        <ProductBreadcrumb product={product} />
        <ProductDetails product={product} />
        <div className="px-4 lg:px-8">
          <ProductReviews productId={product.id} ratings={product.ratings} />
        </div>
        <CompleteTheLook products={completeTheLook} />
        <RelatedProducts products={related} />
        <RecentlyViewed product={product} />
      </section>
    </Layout>
  );
}
