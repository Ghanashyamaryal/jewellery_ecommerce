import { notFound } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import {
  getCategoryBySlug,
  getCategoryTree,
  getInitialShopState,
  getProductsByCategory,
  getShopFilterOptions,
} from "@/lib/catalog";
import { ShopContent } from "../../ShopContent";

type Params = Promise<{ category: string; subcategory: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export function generateStaticParams() {
  return getCategoryTree().flatMap((c) =>
    c.children.map((sub) => ({ category: c.slug, subcategory: sub.slug }))
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { category, subcategory } = await params;
  const sub = getCategoryBySlug(subcategory, category);
  return sub ? { title: `${sub.name} | Shop`, description: sub.description } : {};
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { category: categorySlug, subcategory: subSlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const subcategory = getCategoryBySlug(subSlug, categorySlug);
  if (!category || !subcategory) notFound();

  const query = await searchParams;
  const { filters, sort } = getInitialShopState(query);
  const products = getProductsByCategory(category.slug, subcategory.slug);

  return (
    <Layout>
      <h1 className="sr-only">{subcategory.name}</h1>
      <ShopContent
        key={JSON.stringify(query)}
        products={products}
        // Category is fixed by the route, so the sidebar hides that section
        options={{ ...getShopFilterOptions(products), categories: [] }}
        initialFilters={{ ...filters, category: "all" }}
        initialSort={sort}
      />
    </Layout>
  );
}
