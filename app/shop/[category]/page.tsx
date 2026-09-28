import { notFound, permanentRedirect } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import {
  getCategoryBySlug,
  getInitialShopState,
  getProductsByCategory,
  getShopFilterOptions,
  getTopCategories,
} from "@/lib/catalog";
import { ShopContent } from "../ShopContent";

type Params = Promise<{ category: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// Old category URLs that moved
const LEGACY_SLUGS: Record<string, string> = { lifestyle: "home-decor" };

export function generateStaticParams() {
  return getTopCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const category = getCategoryBySlug((await params).category);
  return category
    ? { title: `${category.name} | Shop`, description: category.description }
    : {};
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { category: slug } = await params;
  if (LEGACY_SLUGS[slug]) permanentRedirect(`/shop/${LEGACY_SLUGS[slug]}`);
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const query = await searchParams;
  const { filters, sort } = getInitialShopState(query);
  const products = getProductsByCategory(category.slug);

  return (
    <Layout>
      <h1 className="sr-only">{category.name}</h1>
      <ShopContent
        key={JSON.stringify(query)}
        products={products}
        options={getShopFilterOptions(products, category.slug)}
        initialFilters={filters}
        initialSort={sort}
      />
    </Layout>
  );
}
