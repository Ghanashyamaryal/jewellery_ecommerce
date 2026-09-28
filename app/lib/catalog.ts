// Single data-access layer for the catalog. This is the only module that
// imports the JSON files — when a backend exists, replace the bodies here
// with API/database calls and the rest of the app stays unchanged.
import attributesData from "@/data/attributes.json";
import categoriesData from "@/data/categories.json";
import collectionsData from "@/data/collections.json";
import stonesData from "@/data/stones.json";
import metalsData from "@/data/metals.json";
import productsData from "@/data/products.json";
import type {
  AttributeDefinition,
  AttributeFilter,
  AttributeValue,
  Category,
  CategoryNode,
  Collection,
  DataFile,
  FilterOption,
  Gender,
  Metal,
  Product,
  ProductRecord,
  ProductSpec,
  ShopFilterOptions,
  Stone,
  VariantAxis,
} from "@/types/catalog";

const items = <T,>(file: unknown) => (file as DataFile<T>).items;

const attributes = items<AttributeDefinition>(attributesData).sort(
  (a, b) => a.sortOrder - b.sortOrder
);
const categories = items<Category>(categoriesData).filter((c) => c.isActive);
const collections = items<Collection>(collectionsData);
const stones = items<Stone>(stonesData);
const metals = items<Metal>(metalsData);
const productRecords = items<ProductRecord>(productsData);

const attributeByKey = new Map(attributes.map((a) => [a.key, a]));
const attributeById = new Map(attributes.map((a) => [a.id, a]));
const categoryById = new Map(categories.map((c) => [c.id, c]));
const stoneById = new Map(stones.map((s) => [s.id, s]));
const metalById = new Map(metals.map((m) => [m.id, m]));
const NO_METAL = metalById.get("met_none")!;

export const toKebab = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ---------- Attributes ----------

export function getAttributes(): AttributeDefinition[] {
  return attributes;
}

export function getAttribute(key: string): AttributeDefinition | undefined {
  return attributeByKey.get(key);
}

/** Attributes enabled for a category, including those inherited from its parent */
export function getCategoryAttributes(categoryId: string): AttributeDefinition[] {
  const category = categoryById.get(categoryId);
  if (!category) return [];
  const parent = category.parentId ? categoryById.get(category.parentId) : undefined;
  const ids = new Set([...(parent?.attributeIds ?? []), ...category.attributeIds]);
  return [...ids]
    .map((id) => attributeById.get(id))
    .filter((a): a is AttributeDefinition => !!a)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Display text for one attribute value: "gold-plated" → "Gold Plated", 8 → "8 mm" */
export function formatAttributeValue(def: AttributeDefinition, value: AttributeValue): string {
  const label = (v: string) => def.options?.find((o) => o.value === v)?.label ?? v;
  if (Array.isArray(value)) return value.map(label).join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (def.type === "number") return def.unit ? `${value} ${def.unit}` : String(value);
  return label(String(value));
}

// ---------- Product resolution ----------

/** All values a product has for each attribute, from its attributes and its variants */
function buildAttributeIndex(record: ProductRecord): Record<string, string[]> {
  const index: Record<string, Set<string>> = {};
  const add = (key: string, value: AttributeValue) => {
    index[key] ??= new Set();
    (Array.isArray(value) ? value : [value]).forEach((v) => index[key].add(String(v)));
  };
  Object.entries(record.attributes).forEach(([k, v]) => add(k, v));
  record.variants
    .filter((v) => v.isActive)
    .forEach((v) => Object.entries(v.options).forEach(([k, val]) => add(k, val)));
  return Object.fromEntries(Object.entries(index).map(([k, set]) => [k, [...set]]));
}

function buildSpecs(record: ProductRecord, index: Record<string, string[]>): ProductSpec[] {
  return attributes
    .filter((def) => def.showOnProductPage && index[def.key]?.length)
    .map((def) => {
      const own = record.attributes[def.key];
      // Variant-only values (e.g. chain lengths) are listed as the available choices
      const value =
        own !== undefined
          ? formatAttributeValue(def, own)
          : index[def.key]
              .map((v) => formatAttributeValue(def, def.type === "number" ? Number(v) : v))
              .join(" / ");
      return { key: def.key, label: def.label, value };
    });
}

function buildVariantAxes(record: ProductRecord): VariantAxis[] {
  const active = record.variants.filter((v) => v.isActive);
  const keys = [...new Set(active.flatMap((v) => Object.keys(v.options)))];
  return keys.flatMap((key) => {
    const def = attributeByKey.get(key);
    if (!def) return [];
    const used = new Set(active.map((v) => v.options[key]).filter(Boolean));
    const fromDef = (def.options ?? []).filter((o) => used.has(o.value));
    const extra = [...used]
      .filter((v) => !fromDef.some((o) => o.value === v))
      .map((v) => ({ value: v, label: formatAttributeValue(def, v) }));
    return [{ key, label: def.label, options: [...fromDef, ...extra] }];
  });
}

function resolveProduct(record: ProductRecord): Product {
  const category = categoryById.get(record.categoryId);
  if (!category) {
    throw new Error(`Product ${record.id} references a missing category ${record.categoryId}`);
  }

  const resolvedMetals = record.materials.metals.flatMap((m) => {
    const metal = metalById.get(m.metalId);
    return metal ? [{ ...m, metal }] : [];
  });
  const primaryMetal =
    resolvedMetals.find((m) => m.role === "primary") ?? resolvedMetals[0];

  const media = [...record.media].sort(
    (a, b) => Number(b.isPrimary) - Number(a.isPrimary) || a.sortOrder - b.sortOrder
  );
  const attributeIndex = buildAttributeIndex(record);
  const { pricing, inventory, flags } = record;

  return {
    ...record,
    category,
    subcategory: record.subcategoryId ? categoryById.get(record.subcategoryId) : undefined,
    metal: primaryMetal?.metal ?? NO_METAL,
    metals: resolvedMetals,
    stones: record.materials.stones.flatMap((s) => {
      const stone = stoneById.get(s.stoneId);
      return stone ? [{ ...s, stone }] : [];
    }),
    attributeIndex,
    specs: buildSpecs(record, attributeIndex),
    variantAxes: buildVariantAxes(record),

    price: pricing.price,
    comparePrice: pricing.compareAtPrice,
    discountType: pricing.discount?.type,
    discountValue: pricing.discount?.value,
    currency: pricing.currency,
    images: media.filter((m) => m.type === "image").map((m) => m.url),
    stockCount: inventory.stockCount,
    inStock: !inventory.trackInventory || inventory.stockCount > 0 || inventory.allowBackorder,
    weight: `${record.shipping.weightGrams}g`,
    rating: record.ratings.average,
    isFeatured: flags.isFeatured,
    isNew: flags.isNew,
    occasion: record.occasions,
  };
}

// Only active products are visible on the site
const products: Product[] = productRecords
  .filter((p) => p.status === "active")
  .map(resolveProduct);

// ---------- Products ----------

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(limit?: number): Product[] {
  const featured = products.filter((p) => p.isFeatured);
  return limit ? featured.slice(0, limit) : featured;
}

/** Bestsellers first, topped up with featured pieces */
export function getBestsellers(limit = 10): Product[] {
  const best = products.filter((p) => p.flags.isBestseller);
  const featured = products.filter((p) => !p.flags.isBestseller && p.isFeatured);
  return [...best, ...featured].slice(0, limit);
}

export function getNewArrivals(limit = 10): Product[] {
  return products
    .filter((p) => p.isNew)
    .sort((a, b) => (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt))
    .slice(0, limit);
}

/** Products in a top-level category, optionally narrowed to one subcategory */
export function getProductsByCategory(
  categorySlug: string,
  subcategorySlug?: string
): Product[] {
  return products.filter(
    (p) =>
      p.category.slug === categorySlug &&
      (!subcategorySlug || p.subcategory?.slug === subcategorySlug)
  );
}

export function getProductsByStone(stoneSlug: string): Product[] {
  return products.filter((p) => productHasStone(p, stoneSlug));
}

export function productHasStone(product: Product, stoneSlug: string): boolean {
  if (stoneSlug === "no-stone") return product.stones.length === 0;
  return product.stones.some((s) => s.stone.slug === stoneSlug);
}

/** Hand-picked relatedProductIds first, then same subcategory, shared stones, same category */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const picked = product.relatedProductIds
    .map(getProductById)
    .filter((p): p is Product => !!p);

  const stoneIds = new Set(product.stones.map((s) => s.stoneId));
  const score = (p: Product) =>
    (p.subcategoryId && p.subcategoryId === product.subcategoryId ? 3 : 0) +
    (p.stones.some((s) => stoneIds.has(s.stoneId)) ? 2 : 0) +
    (p.categoryId === product.categoryId ? 1 : 0);

  const scored = products
    .filter((p) => p.id !== product.id && !picked.includes(p))
    .map((p) => ({ p, s: score(p) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .map(({ p }) => p);

  return [...picked, ...scored].slice(0, limit);
}

const WEARABLE_CATEGORY_SLUGS = new Set(["jewelry", "stone-jewelry"]);

/** Pieces from other jewellery types that share the stone or metal — to wear together */
export function getCompleteTheLook(product: Product, limit = 4): Product[] {
  if (!WEARABLE_CATEGORY_SLUGS.has(product.category.slug)) return [];

  const stoneIds = new Set(
    product.stones.filter((s) => s.role === "primary").map((s) => s.stoneId)
  );
  const genderFits = (p: Product) =>
    p.gender === product.gender || p.gender === "unisex" || product.gender === "unisex";
  const score = (p: Product) =>
    (p.stones.some((s) => s.role === "primary" && stoneIds.has(s.stoneId)) ? 3 : 0) +
    (p.metal.id === product.metal.id && p.metal.slug !== "none" ? 2 : 0) +
    (p.tags.some((t) => product.tags.includes(t)) ? 1 : 0);

  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        WEARABLE_CATEGORY_SLUGS.has(p.category.slug) &&
        p.subcategoryId !== product.subcategoryId &&
        genderFits(p)
    )
    .map((p) => ({ p, s: score(p) }))
    .filter(({ s }) => s >= 3)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => p);
}

// ---------- Categories ----------

export function getCategories(): Category[] {
  return categories;
}

export function getTopCategories(): Category[] {
  return categories
    .filter((c) => c.parentId === null)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getSubcategories(parentId: string): Category[] {
  return categories
    .filter((c) => c.parentId === parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getCategoryTree(): CategoryNode[] {
  return getTopCategories().map((c) => ({
    ...c,
    children: getSubcategories(c.id),
  }));
}

export function getCategoryHref(category: Category): string {
  const parent = category.parentId ? categoryById.get(category.parentId) : undefined;
  return parent ? `/shop/${parent.slug}/${category.slug}` : `/shop/${category.slug}`;
}

export function getCategoryBySlug(
  slug: string,
  parentSlug?: string
): Category | undefined {
  const parent = parentSlug
    ? categories.find((c) => c.slug === parentSlug && c.parentId === null)
    : undefined;
  if (parentSlug && !parent) return undefined;
  return categories.find(
    (c) =>
      c.slug === slug && (parent ? c.parentId === parent.id : c.parentId === null)
  );
}

// ---------- Collections ----------

export function isCollectionLive(collection: Collection, now = new Date()): boolean {
  if (!collection.isActive) return false;
  if (collection.startsAt && new Date(collection.startsAt) > now) return false;
  if (collection.endsAt && new Date(collection.endsAt) < now) return false;
  return true;
}

export function getCollections({ liveOnly = true } = {}): Collection[] {
  return collections
    .filter((c) => !liveOnly || isCollectionLive(c))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/** A live dated collection (festival, sale), or the given fallback */
export function getSeasonalCollection(fallbackSlug: string): Collection | undefined {
  const live = getCollections();
  return (
    live.find((c) => c.startsAt || c.endsAt) ?? live.find((c) => c.slug === fallbackSlug)
  );
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionProducts(collection: Collection): Product[] {
  if (collection.type === "manual") {
    return (collection.productIds ?? [])
      .map(getProductById)
      .filter((p): p is Product => !!p);
  }
  const r = collection.rules ?? {};
  const overlaps = (a: string[] | undefined, b: string[]) =>
    !a?.length || a.some((x) => b.includes(x));
  return products.filter(
    (p) =>
      overlaps(r.categoryIds, [p.categoryId, p.subcategoryId ?? ""]) &&
      overlaps(r.stoneIds, p.stones.map((s) => s.stoneId)) &&
      overlaps(r.metalIds, p.metals.map((m) => m.metalId)) &&
      overlaps(r.genders, [p.gender]) &&
      overlaps(r.tags, p.tags) &&
      overlaps(r.occasions, p.occasions) &&
      (r.minPrice === undefined || p.price >= r.minPrice) &&
      (r.maxPrice === undefined || p.price <= r.maxPrice) &&
      (r.isNew === undefined || p.isNew === r.isNew)
  );
}

// ---------- Stones & metals ----------

export function getStones(): Stone[] {
  return stones;
}

export function getStoneBySlug(slug: string): Stone | undefined {
  return stones.find((s) => s.slug === slug);
}

/** Resolve a stone from a slug, name or alias ("amethese" → Amethyst) */
export function findStone(term: string): Stone | undefined {
  const t = term.toLowerCase().trim();
  const kebab = toKebab(t);
  return stones.find(
    (s) =>
      s.slug === kebab ||
      s.name.toLowerCase() === t ||
      s.aliases.some((a) => a.toLowerCase() === t)
  );
}

/** Stones used as a primary stone, most-stocked first */
export function getPopularStones(limit = 10): (Stone & { productCount: number })[] {
  const counts = new Map<string, number>();
  products.forEach((p) =>
    p.stones
      .filter((s) => s.role === "primary")
      .forEach((s) => counts.set(s.stoneId, (counts.get(s.stoneId) ?? 0) + 1))
  );
  return stones
    .filter((s) => counts.has(s.id))
    .map((s) => ({ ...s, productCount: counts.get(s.id)! }))
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, limit);
}

export function getBirthstones(): Stone[] {
  return stones
    .filter((s) => s.birthMonth)
    .sort((a, b) => (a.birthMonth ?? 0) - (b.birthMonth ?? 0));
}

export function getMetals(): Metal[] {
  return metals;
}

// ---------- Filter options (derived, so they never drift from the data) ----------

const ALL: FilterOption = { name: "All", value: "all" };

export function getCategoryOptions(parentSlug?: string): FilterOption[] {
  const parent = parentSlug ? getCategoryBySlug(parentSlug) : undefined;
  const list = parent ? getSubcategories(parent.id) : getTopCategories();
  return [ALL, ...list.map((c) => ({ name: c.name, value: c.slug }))];
}

export function getMetalOptions(scope: Product[] = products): FilterOption[] {
  const used = new Set(scope.flatMap((p) => p.metals.map((m) => m.metalId)));
  return [
    ALL,
    ...metals
      .filter((m) => used.has(m.id))
      .map((m) => ({ name: m.name, value: m.slug })),
  ];
}

export function getStoneOptions(scope: Product[] = products): FilterOption[] {
  const used = new Set(scope.flatMap((p) => p.stones.map((s) => s.stoneId)));
  return [
    ALL,
    ...stones
      .filter((s) => used.has(s.id))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((s) => ({ name: s.name, value: s.slug })),
    { name: "No Stone", value: "no-stone" },
  ];
}

export function getOccasionOptions(scope: Product[] = products): FilterOption[] {
  const used = [...new Set(scope.flatMap((p) => p.occasions))].sort();
  return [ALL, ...used.map((o) => ({ name: o, value: toKebab(o) }))];
}

export const genderLabels: Record<Gender, string> = {
  men: "Men",
  women: "Women",
  unisex: "Unisex",
  kids: "Kids",
};

export function getGenderOptions(scope: Product[] = products): FilterOption[] {
  const used = new Set(scope.map((p) => p.gender));
  return [
    ALL,
    ...(Object.keys(genderLabels) as Gender[])
      .filter((g) => used.has(g))
      .map((g) => ({ name: genderLabels[g], value: g })),
  ];
}

/** Filterable attributes with at least two distinct values among the products in scope */
export function getAttributeFilterOptions(scope: Product[] = products): AttributeFilter[] {
  return attributes
    .filter((def) => def.filterable)
    .flatMap((def) => {
      const values = new Set(scope.flatMap((p) => p.attributeIndex[def.key] ?? []));
      if (def.type === "boolean") values.delete("false");
      if (values.size < (def.type === "boolean" ? 1 : 2)) return [];

      const ordered = def.options?.length
        ? def.options.map((o) => o.value).filter((v) => values.has(v))
        : [...values].sort((a, b) => Number(a) - Number(b) || a.localeCompare(b));

      return [
        {
          key: def.key,
          label: def.label,
          options: [
            ALL,
            ...ordered.map((v) => ({
              name: def.type === "boolean" ? "Yes" : formatAttributeValue(def, def.type === "number" ? Number(v) : v),
              value: v,
            })),
          ],
        },
      ];
    });
}

export function getMaxPrice(scope: Product[] = products): number {
  const max = Math.max(0, ...scope.map((p) => p.price));
  return Math.max(5000, Math.ceil(max / 5000) * 5000);
}

/**
 * Everything the shop sidebar needs for a set of products.
 * Pass a top-level slug to list its subcategories as the category filter.
 */
export function getShopFilterOptions(
  scope: Product[] = products,
  parentSlug?: string
): ShopFilterOptions {
  return {
    categories: getCategoryOptions(parentSlug),
    metals: getMetalOptions(scope),
    stones: getStoneOptions(scope),
    occasions: getOccasionOptions(scope),
    genders: getGenderOptions(scope),
    attributes: getAttributeFilterOptions(scope),
    maxPrice: getMaxPrice(scope),
  };
}

type SearchParamValue = string | string[] | undefined;

/**
 * Initial shop filters from URL params:
 * ?category= ?stone= ?gender= ?metal= ?occasion= ?sort= plus any attribute key (?ringSize=7&deity=ganesh)
 */
export function getInitialShopState(params: Record<string, SearchParamValue>) {
  const first = (v: SearchParamValue) => (Array.isArray(v) ? v[0] : v);
  const stoneParam = first(params.stone);
  // Accept aliases and misspellings too: ?stone=amethese → amethyst
  const stone =
    stoneParam === "no-stone" ? "no-stone" : stoneParam ? findStone(stoneParam)?.slug : undefined;
  const gender = first(params.gender);

  const attributeFilters: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    const v = first(value);
    if (v && attributeByKey.get(key)?.filterable) attributeFilters[key] = v;
  }

  return {
    filters: {
      category: first(params.category) ?? "all",
      metalType: first(params.metal) ?? "all",
      stoneType: stone ?? "all",
      gender: gender && gender in genderLabels ? gender : "all",
      occasion: first(params.occasion) ?? "all",
      attributes: attributeFilters,
    },
    sort: first(params.sort),
  };
}
