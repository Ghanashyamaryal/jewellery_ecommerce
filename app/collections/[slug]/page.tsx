import { notFound } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import {
  getCollectionBySlug,
  getCollectionProducts,
  getCollections,
  getInitialShopState,
  getShopFilterOptions,
  isCollectionLive,
} from "@/lib/catalog";
import { ShopContent } from "@/shop/ShopContent";
import { ShopHeader } from "@/shop/_components/ShopHeader";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export function generateStaticParams() {
  return getCollections({ liveOnly: false }).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const collection = getCollectionBySlug((await params).slug);
  return collection
    ? {
        title: collection.seo?.metaTitle ?? collection.name,
        description: collection.seo?.metaDescription ?? collection.description,
      }
    : {};
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection || !isCollectionLive(collection)) notFound();

  const query = await searchParams;
  const { filters, sort } = getInitialShopState(query);
  const products = getCollectionProducts(collection);

  return (
    <Layout>
      <ShopHeader
        eyebrow="Collection"
        breadcrumbs={[{ name: "Shop", href: "/shop" }, { name: collection.name }]}
        title={collection.name}
        description={collection.description}
        chips={getCollections()
          .filter((c) => c.id !== collection.id)
          .map((c) => ({ name: c.name, href: `/collections/${c.slug}` }))}
      />
      <ShopContent
        key={JSON.stringify(query)}
        products={products}
        options={getShopFilterOptions(products)}
        initialFilters={filters}
        initialSort={sort}
      />
    </Layout>
  );
}
