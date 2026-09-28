import {
  formatAttributeValue,
  getAttribute,
  getBirthstones,
  getCategoryBySlug,
  getCategoryHref,
  getCollectionProducts,
  getCollections,
  getMetals,
  getProductsByCategory,
  getStones,
  getSubcategories,
} from "@/lib/catalog";
import { getFinalPrice } from "@/lib/pricing";
import type { Category, Product } from "@/types/catalog";
import type { NavFeature, NavLink, NavMenu, NavigationData } from "@/types/navigation";

const BESPOKE_IMAGE = "/images/home/bespoke.jpg";

const subcategoryLinks = (parent: Category): NavLink[] =>
  getSubcategories(parent.id)
    .filter((c) => c.isActive)
    .map((c) => ({ name: c.name, href: getCategoryHref(c), image: c.image }));

function stoneLinks(products: Product[], baseHref: string, limit = 7): NavLink[] {
  const counts = new Map<string, number>();
  products.forEach((p) =>
    p.stones.forEach((s) => counts.set(s.stoneId, (counts.get(s.stoneId) ?? 0) + 1))
  );
  return getStones()
    .filter((s) => counts.has(s.id) && s.slug !== "cubic-zirconia")
    .sort((a, b) => counts.get(b.id)! - counts.get(a.id)!)
    .slice(0, limit)
    .map((s) => ({
      name: s.name,
      href: `${baseHref}?stone=${s.slug}`,
      swatch: s.colorHex,
      image: s.image,
    }));
}

function metalLinks(products: Product[], baseHref: string): NavLink[] {
  const used = new Set(products.flatMap((p) => p.metals.map((m) => m.metalId)));
  return getMetals()
    .filter((m) => used.has(m.id) && m.slug !== "none")
    .map((m) => ({ name: m.name, href: `${baseHref}?metal=${m.slug}` }));
}

function attributeLinks(products: Product[], key: string, baseHref: string): NavLink[] {
  const def = getAttribute(key);
  if (!def) return [];
  const used = new Set(products.flatMap((p) => p.attributeIndex[key] ?? []));
  return (def.options ?? [])
    .filter((o) => used.has(o.value))
    .map((o) => ({
      name: formatAttributeValue(def, o.value),
      href: `${baseHref}?${key}=${o.value}`,
    }));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const birthstoneLinks = (): NavLink[] =>
  getBirthstones().map((s) => ({
    name: `${MONTHS[s.birthMonth! - 1]} · ${s.name}`,
    href: `/shop?stone=${s.slug}`,
    swatch: s.colorHex,
  }));

const toFeature = (eyebrow: string, p: Product): NavFeature => ({
  eyebrow,
  title: p.name,
  href: `/product/${p.slug}`,
  image: p.images[0],
  price: getFinalPrice(p),
});

/** A new arrival and a bestseller (falling back to featured items) from the given products */
function pickFeatures(products: Product[]): NavFeature[] {
  const picks: NavFeature[] = [];
  const used = new Set<string>();
  const take = (eyebrow: string, match: (p: Product) => boolean) => {
    const p = products.find((x) => match(x) && !used.has(x.id) && x.images.length);
    if (p) {
      used.add(p.id);
      picks.push(toFeature(eyebrow, p));
    }
  };
  take("New Arrival", (p) => p.isNew);
  take("Bestseller", (p) => p.flags.isBestseller);
  take("Featured", (p) => p.isFeatured);
  take("Popular", (p) => p.ratings.count > 0);
  take("Shop Now", () => true);
  return picks.slice(0, 2);
}

function categoryMenu(
  slug: string,
  label: string,
  build: (category: Category, products: Product[], href: string) => NavMenu["columns"]
): NavMenu | undefined {
  const category = getCategoryBySlug(slug);
  if (!category) return undefined;
  const products = getProductsByCategory(slug);
  const href = getCategoryHref(category);
  return {
    name: label,
    href,
    image: category.image,
    columns: build(category, products, href).filter((c) => c.links.length),
    features: pickFeatures(products),
    viewAll: { name: `View all ${category.name}`, href },
  };
}

function idolsAndDecorMenu(): NavMenu | undefined {
  const idols = getCategoryBySlug("idols-statues");
  const decor = getCategoryBySlug("home-decor");
  if (!idols || !decor) return undefined;
  const products = [
    ...getProductsByCategory(idols.slug),
    ...getProductsByCategory(decor.slug),
  ];
  const idolsHref = getCategoryHref(idols);
  return {
    name: "Idols & Decor",
    href: idolsHref,
    image: idols.image,
    columns: [
      { title: idols.name, links: [...subcategoryLinks(idols), { name: `All ${idols.name}`, href: idolsHref }] },
      { title: decor.name, links: [...subcategoryLinks(decor), { name: `All ${decor.name}`, href: getCategoryHref(decor) }] },
      { title: "Shop by Deity", links: attributeLinks(products, "deity", idolsHref) },
    ].filter((c) => c.links.length),
    features: pickFeatures(products),
    viewAll: { name: "View all idols & decor", href: idolsHref },
  };
}

function giftsMenu(): NavMenu {
  const collections = getCollections();
  const withProducts = collections
    .map((c) => ({ collection: c, products: getCollectionProducts(c) }))
    .filter(({ products }) => products.length);
  const seasonal = withProducts.filter(({ collection }) => collection.endsAt);

  const links = withProducts.map(({ collection, products }) => ({
    name: collection.name,
    href: `/collections/${collection.slug}`,
    image: collection.image ?? products.find((p) => p.images.length)?.images[0],
    badge: collection.endsAt ? "Limited" : undefined,
  }));

  const giftProducts = withProducts.flatMap(({ products }) => products);
  const features: NavFeature[] = [
    ...pickFeatures(giftProducts).slice(0, 1),
    {
      eyebrow: "Made for you",
      title: "Bespoke silver, designed with our silversmiths",
      href: "/bespoke",
      image: BESPOKE_IMAGE,
    },
  ];

  return {
    name: "Gifts",
    href: links[0]?.href ?? "/shop",
    columns: [
      { title: "Collections", links },
      {
        title: "Gifts by Recipient",
        links: [
          { name: "For Her", href: "/shop?gender=women" },
          { name: "For Him", href: "/shop?gender=men" },
          { name: "Custom Bespoke Pieces", href: "/bespoke" },
        ],
      },
    ],
    features,
    viewAll: { name: "Shop all products", href: "/shop" },
    badge: seasonal.length ? "New" : undefined,
  };
}

export function getNavigation(): NavigationData {
  const menus = [
    categoryMenu("jewelry", "Jewelry", (category, products, href) => [
      { title: "Shop by Type", links: subcategoryLinks(category) },
      { title: "Shop by Stone", links: stoneLinks(products, href) },
      {
        title: "Shop by",
        links: [
          { name: "Men's Jewelry", href: `${href}?gender=men` },
          { name: "Women's Jewelry", href: `${href}?gender=women` },
          ...metalLinks(products, href),
        ],
      },
    ]),
    categoryMenu("stone-jewelry", "Stone Jewelry", (category, products, href) => [
      { title: "Shop by Type", links: subcategoryLinks(category) },
      { title: "Shop by Stone", links: stoneLinks(products, href) },
      { title: "Shop by Style", links: attributeLinks(products, "style", href) },
    ]),
    categoryMenu("gemstones", "Gemstones", (category, products, href) => [
      { title: "Shop by Form", links: subcategoryLinks(category) },
      { title: "Shop by Stone", links: stoneLinks(products, href, 8) },
      { title: "Birthstones", links: birthstoneLinks() },
    ]),
    idolsAndDecorMenu(),
    giftsMenu(),
  ].filter((m): m is NavMenu => !!m);

  return { menus, links: [{ name: "Bespoke", href: "/bespoke" }] };
}
