import { Layout } from "@/components/layout/Layout";
import {
  getInitialShopState,
  getProducts,
  getShopFilterOptions,
} from "@/lib/catalog";
import { ShopContent } from "./ShopContent";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata = {
  title: "Shop All | Silver Jewellery, Gemstones & Decor",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const { filters, sort } = getInitialShopState(params);

  return (
    <Layout>
      <h1 className="sr-only">All Products</h1>
      {/* key remounts the client state when the URL filters change */}
      <ShopContent
        key={JSON.stringify(params)}
        products={getProducts()}
        options={getShopFilterOptions(getProducts())}
        initialFilters={filters}
        initialSort={sort}
      />
    </Layout>
  );
}
