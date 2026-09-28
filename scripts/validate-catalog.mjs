#!/usr/bin/env node
// Validates app/data/*.json: ids, slugs, references between files,
// attribute values against their definitions, variants, media and pricing.
// Usage: npm run validate:catalog
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DATA = join(dirname(fileURLToPath(import.meta.url)), "../app/data");
const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

function load(name) {
  const file = JSON.parse(readFileSync(join(DATA, `${name}.json`), "utf8"));
  if (!Array.isArray(file.items) || typeof file.version !== "number") {
    err(`${name}.json`, 'must be { "version": number, "items": [...] }');
    return [];
  }
  return file.items;
}

function checkUnique(name, items, field) {
  const seen = new Set();
  for (const item of items) {
    if (!item[field]) err(`${name} ${item.id ?? "?"}`, `missing ${field}`);
    else if (seen.has(item[field])) err(name, `duplicate ${field} "${item[field]}"`);
    seen.add(item[field]);
  }
}

const attributes = load("attributes");
const categories = load("categories");
const stones = load("stones");
const metals = load("metals");
const collections = load("collections");
const products = load("products");

for (const [name, items] of Object.entries({ attributes, categories, stones, metals, collections, products })) {
  checkUnique(name, items, "id");
  if (name !== "attributes") checkUnique(name, items, "slug");
}
checkUnique("attributes", attributes, "key");
checkUnique("products", products, "sku");

const attrById = new Map(attributes.map((a) => [a.id, a]));
const categoryById = new Map(categories.map((c) => [c.id, c]));
const stoneIds = new Set(stones.map((s) => s.id));
const metalIds = new Set(metals.map((m) => m.id));
const productIds = new Set(products.map((p) => p.id));

// ---------- attributes ----------
for (const a of attributes) {
  if (["select", "multiselect"].includes(a.type) && !a.options?.length) {
    err(`attribute ${a.key}`, `${a.type} needs options`);
  }
}

// ---------- categories ----------
for (const c of categories) {
  if (c.parentId && !categoryById.has(c.parentId)) err(`category ${c.id}`, `unknown parentId ${c.parentId}`);
  if (c.parentId && categoryById.get(c.parentId)?.parentId) err(`category ${c.id}`, "only two levels are supported");
  for (const id of c.attributeIds ?? []) {
    if (!attrById.has(id)) err(`category ${c.id}`, `unknown attribute ${id}`);
  }
}

/** Attribute definitions allowed for a product: its category's plus the subcategory's */
function allowedAttributes(p) {
  const ids = [
    ...(categoryById.get(p.categoryId)?.attributeIds ?? []),
    ...(categoryById.get(p.subcategoryId)?.attributeIds ?? []),
  ];
  return new Map(ids.map((id) => attrById.get(id)).filter(Boolean).map((a) => [a.key, a]));
}

function checkValue(where, def, value) {
  switch (def.type) {
    case "number":
      if (typeof value !== "number") err(where, `${def.key} must be a number`);
      break;
    case "boolean":
      if (typeof value !== "boolean") err(where, `${def.key} must be true/false`);
      break;
    case "text":
      if (typeof value !== "string") err(where, `${def.key} must be text`);
      break;
    case "select":
      if (!def.options.some((o) => o.value === String(value))) err(where, `${def.key}="${value}" is not a listed option`);
      break;
    case "multiselect":
      if (!Array.isArray(value)) err(where, `${def.key} must be an array`);
      else for (const v of value) {
        if (!def.options.some((o) => o.value === v)) err(where, `${def.key} contains unknown option "${v}"`);
      }
      break;
  }
}

// ---------- products ----------
const variantSkus = new Set();
for (const p of products) {
  const at = `product ${p.id} (${p.slug})`;
  const cat = categoryById.get(p.categoryId);
  if (!cat) err(at, `unknown categoryId ${p.categoryId}`);
  else if (cat.parentId) err(at, "categoryId must be a top-level category");
  if (p.subcategoryId) {
    const sub = categoryById.get(p.subcategoryId);
    if (!sub) err(at, `unknown subcategoryId ${p.subcategoryId}`);
    else if (sub.parentId !== p.categoryId) err(at, `subcategory ${p.subcategoryId} is not under ${p.categoryId}`);
  }

  // materials
  for (const m of p.materials?.metals ?? []) {
    if (!metalIds.has(m.metalId)) err(at, `unknown metalId ${m.metalId}`);
  }
  for (const s of p.materials?.stones ?? []) {
    if (!stoneIds.has(s.stoneId)) err(at, `unknown stoneId ${s.stoneId}`);
  }
  if ((p.materials?.metals ?? []).filter((m) => m.role === "primary").length > 1) {
    err(at, "at most one primary metal");
  }

  // attributes
  const allowed = allowedAttributes(p);
  for (const [key, value] of Object.entries(p.attributes ?? {})) {
    const def = allowed.get(key);
    if (!def) err(at, `attribute "${key}" is not enabled for this category (add it to the category's attributeIds)`);
    else checkValue(at, def, value);
  }

  // variants
  const variants = p.variants ?? [];
  if (p.productType === "variable" && !variants.length) err(at, 'productType "variable" needs variants');
  if (p.productType !== "variable" && variants.length) err(at, 'has variants, so productType must be "variable"');
  if (variants.length && variants.filter((v) => v.isDefault).length !== 1) err(at, "exactly one variant must be isDefault");
  for (const v of variants) {
    if (variantSkus.has(v.sku)) err(at, `duplicate variant sku ${v.sku}`);
    variantSkus.add(v.sku);
    for (const [key, value] of Object.entries(v.options ?? {})) {
      const def = allowed.get(key);
      if (!def) err(at, `variant ${v.id}: "${key}" is not enabled for this category`);
      else if (!def.isVariantAxis) err(at, `variant ${v.id}: "${key}" is not a variant attribute`);
      else checkValue(`${at} variant ${v.id}`, def, def.type === "number" ? Number(value) : value);
    }
    for (const mid of v.mediaIds ?? []) {
      if (!p.media.some((m) => m.id === mid)) err(at, `variant ${v.id}: unknown mediaId ${mid}`);
    }
  }
  if (variants.length && p.inventory) {
    const sum = variants.reduce((n, v) => n + v.stockCount, 0);
    if (sum !== p.inventory.stockCount) warn(at, `inventory.stockCount ${p.inventory.stockCount} ≠ sum of variants ${sum}`);
  }

  // media
  if (!p.media?.length) err(at, "needs at least one media item");
  else if (p.media.filter((m) => m.isPrimary).length !== 1) err(at, "exactly one media item must be isPrimary");
  for (const m of p.media ?? []) if (!m.alt) warn(at, `media ${m.id} has no alt text`);

  // pricing
  const pr = p.pricing ?? {};
  if (!(pr.price > 0)) err(at, "pricing.price must be > 0");
  if (pr.compareAtPrice !== undefined && pr.compareAtPrice <= pr.price) warn(at, "compareAtPrice should be higher than price");
  if (pr.discount?.type === "percentage" && !(pr.discount.value > 0 && pr.discount.value < 100)) err(at, "percentage discount must be 1–99");
  if (pr.discount?.type === "fixed" && !(pr.discount.value > 0 && pr.discount.value < pr.price)) err(at, "fixed discount must be less than price");

  for (const id of p.relatedProductIds ?? []) {
    if (!productIds.has(id)) err(at, `unknown relatedProductId ${id}`);
  }
}

// ---------- collections ----------
for (const c of collections) {
  const at = `collection ${c.id}`;
  if (c.type === "manual") {
    if (!c.productIds?.length) err(at, "manual collections need productIds");
    for (const id of c.productIds ?? []) if (!productIds.has(id)) err(at, `unknown productId ${id}`);
  } else if (c.type === "rule") {
    const r = c.rules ?? {};
    if (!Object.keys(r).length) err(at, "rule collections need rules");
    for (const id of r.categoryIds ?? []) if (!categoryById.has(id)) err(at, `unknown categoryId ${id}`);
    for (const id of r.stoneIds ?? []) if (!stoneIds.has(id)) err(at, `unknown stoneId ${id}`);
    for (const id of r.metalIds ?? []) if (!metalIds.has(id)) err(at, `unknown metalId ${id}`);
  } else {
    err(at, `unknown type "${c.type}"`);
  }
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(
  `\n${products.length} products, ${categories.length} categories, ${stones.length} stones, ` +
    `${metals.length} metals, ${attributes.length} attributes, ${collections.length} collections — ` +
    `${errors.length} errors, ${warnings.length} warnings`
);
process.exit(errors.length ? 1 : 0);
