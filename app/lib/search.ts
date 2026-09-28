// Catalog search: weighted fields + stone aliases + typo tolerance.
// "amethese necklace" → amethyst necklaces; "mens silver ring" → men's and unisex rings.
import {
  formatAttributeValue,
  getAttributes,
  getCategories,
  getProducts,
  getStones,
} from "@/lib/catalog";
import type { Category, Gender, Product, Stone } from "@/types/catalog";

export interface SearchResult {
  query: string;
  products: Product[];
  stones: Stone[];
  categories: Category[];
  total: number;
}

interface IndexedTerm {
  term: string;
  weight: number;
}

const WEIGHT = {
  name: 5,
  stone: 4,
  category: 3,
  metal: 2,
  gender: 2,
  tag: 2,
  description: 1,
};

const STOP_WORDS = new Set([
  "a", "an", "and", "the", "for", "with", "of", "in", "on", "to", "by", "my", "set",
]);

const GENERIC_CHIP_TERMS = new Set(["silver", "sterling", "925", "metal"]);

const GENDER_TERMS: Record<Gender, string[]> = {
  men: ["men", "man", "male", "gents", "gent", "boy", "him", "husband"],
  women: ["women", "woman", "female", "ladies", "lady", "girl", "her", "wife"],
  kids: ["kids", "kid", "child", "children", "baby", "boy", "girl"],
  unisex: ["unisex"],
};

// ---------- Text helpers ----------

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Very small English stemmer: rings→ring, necklaces→necklace, accessories→accessory */
function stem(token: string): string {
  if (token.length <= 3) return token;
  if (token.endsWith("ies")) return token.slice(0, -3) + "y";
  if (/(ss|sh|ch|x)es$/.test(token)) return token.slice(0, -2);
  if (token.endsWith("s") && !token.endsWith("ss")) return token.slice(0, -1);
  return token;
}

export function tokenize(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((t) => t && !STOP_WORDS.has(t))
    .map(stem);
}

function levenshtein(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      rowMin = Math.min(rowMin, curr[j]);
    }
    if (rowMin > max) return max + 1;
    prev = curr;
  }
  return prev[b.length];
}

function allowedTypos(token: string): number {
  if (token.length >= 8) return 2;
  if (token.length >= 5) return 1;
  return 0;
}

/** 1 = exact, 0.8 = prefix (type-ahead), 0.6 = typo match, 0 = no match */
function matchQuality(queryToken: string, term: string): number {
  if (term === queryToken) return 1;
  if (queryToken.length >= 2 && term.startsWith(queryToken)) return 0.8;
  const typos = allowedTypos(queryToken);
  if (typos && levenshtein(queryToken, term, typos) <= typos) return 0.6;
  return 0;
}

// ---------- Index ----------

function addTerms(target: Map<string, number>, text: string | undefined, weight: number) {
  if (!text) return;
  for (const term of tokenize(text)) {
    target.set(term, Math.max(target.get(term) ?? 0, weight));
  }
}

function indexProduct(p: Product): IndexedTerm[] {
  const terms = new Map<string, number>();

  addTerms(terms, p.name, WEIGHT.name);
  for (const { stone } of p.stones) {
    addTerms(terms, stone.name, WEIGHT.stone);
    addTerms(terms, stone.slug, WEIGHT.stone);
    stone.aliases.forEach((a) => addTerms(terms, a, WEIGHT.stone));
    addTerms(terms, stone.color, WEIGHT.description);
  }
  addTerms(terms, p.category.name, WEIGHT.category);
  addTerms(terms, p.category.slug, WEIGHT.category);
  addTerms(terms, p.subcategory?.name, WEIGHT.category);
  addTerms(terms, p.subcategory?.slug, WEIGHT.category);
  addTerms(terms, p.metal.name, WEIGHT.metal);
  p.metal.aliases.forEach((a) => addTerms(terms, a, WEIGHT.metal));

  const genders: Gender[] = p.gender === "unisex" ? ["unisex", "men", "women"] : [p.gender];
  for (const g of genders) {
    // Unisex items still show up for "mens" / "ladies", just ranked lower
    const w = p.gender === "unisex" && g !== "unisex" ? WEIGHT.description : WEIGHT.gender;
    GENDER_TERMS[g].forEach((t) => addTerms(terms, t, w));
  }

  [...p.tags, ...(p.searchKeywords ?? []), ...(p.occasion ?? [])].forEach((t) =>
    addTerms(terms, t, WEIGHT.tag)
  );
  // Searchable attributes: "jhumka", "ganesh", "tibetan", "oxidised", "5 mukhi"…
  for (const def of getAttributes().filter((d) => d.searchable)) {
    const value = p.attributes[def.key];
    if (value === undefined) continue;
    addTerms(terms, formatAttributeValue(def, value), WEIGHT.tag);
    if (def.key === "mukhi") addTerms(terms, `${value} mukhi`, WEIGHT.tag);
  }
  addTerms(terms, p.sku, WEIGHT.tag);
  addTerms(terms, p.shortDescription, WEIGHT.description);

  return [...terms].map(([term, weight]) => ({ term, weight }));
}

let productIndex: { product: Product; terms: IndexedTerm[] }[] | null = null;

function getIndex() {
  if (!productIndex) {
    productIndex = getProducts().map((product) => ({
      product,
      terms: indexProduct(product),
    }));
  }
  return productIndex;
}

function scoreTerms(queryTokens: string[], terms: IndexedTerm[], requireAll: boolean): number {
  let total = 0;
  for (const q of queryTokens) {
    let best = 0;
    for (const { term, weight } of terms) {
      const quality = matchQuality(q, term);
      if (quality) best = Math.max(best, weight * quality);
    }
    if (!best && requireAll) return 0;
    total += best;
  }
  return total;
}

function namedTerms(names: string[]): IndexedTerm[] {
  const terms = new Map<string, number>();
  names.forEach((n) => addTerms(terms, n, 1));
  return [...terms].map(([term, weight]) => ({ term, weight }));
}

// ---------- Public API ----------

export function searchCatalog(query: string, options: { limit?: number } = {}): SearchResult {
  const tokens = tokenize(query);
  if (!tokens.length) {
    return { query, products: [], stones: [], categories: [], total: 0 };
  }

  const products = getIndex()
    .map(({ product, terms }) => ({ product, score: scoreTerms(tokens, terms, true) }))
    .filter((r) => r.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        Number(!!b.product.isFeatured) - Number(!!a.product.isFeatured) ||
        (b.product.rating ?? 0) - (a.product.rating ?? 0)
    )
    .map((r) => r.product);

  // Quick links: stones / categories matching any query word strongly.
  // "silver" describes nearly everything, so it doesn't pick a category chip.
  const chipTokens = tokens.filter((t) => !GENERIC_CHIP_TERMS.has(t));
  const stoneHits = getStones()
    .map((stone) => ({
      stone,
      score: scoreTerms(chipTokens, namedTerms([stone.name, stone.slug, ...stone.aliases]), false),
    }))
    .filter((r) => r.score >= 0.6);
  const categoryHits = getCategories()
    .map((category) => ({
      category,
      score: scoreTerms(chipTokens, namedTerms([category.name, category.slug]), false),
    }))
    .filter((r) => r.score >= 0.8);

  // Once something matches exactly, drop weaker prefix/typo chips ("mala" → Malas, not Malachite)
  const bestChip = Math.max(0, ...stoneHits.map((r) => r.score), ...categoryHits.map((r) => r.score));
  const minChip = bestChip >= 1 ? 1 : 0;

  const stones = stoneHits
    .filter((r) => r.score >= minChip)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.stone)
    .slice(0, 4);

  const categories = categoryHits
    .filter((r) => r.score >= minChip)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.category)
    .slice(0, 4);

  return {
    query,
    products: options.limit ? products.slice(0, options.limit) : products,
    stones,
    categories,
    total: products.length,
  };
}
