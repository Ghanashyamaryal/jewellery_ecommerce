# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**Aryal Siring Gems** — e-commerce storefront for a Nepali silversmith. Sells 925 sterling / oxidised / fine silver and white-metal jewellery (rings, pendants, necklaces, earrings, bracelets, bangles, chains, anklets), stone & bead jewellery (turquoise, amber, coral, lapis, garnet… necklaces, bracelets, malas), loose gemstones, deity idols & Buddha statues, and home decor (pooja items, silver utensils, singing bowls). For men, women and unisex.

- Free-shipping threshold is `FREE_SHIPPING_THRESHOLD` in `@/lib/site` — never hardcode the amount.
- Currency is **NPR**; prices are shown as `NPR 12,500` (cards/cart) or `Rs. 12,500` (product page).
- Brand name is spelled **"Aryal Siring Gems"** (not "Sirin"). Emails use the domain `aryalsiringems.com`; shared contact details live in `@/lib/site` (`SITE_CONTACT`).
- The shop does **not** sell diamonds — never use diamond imagery or copy. The only colourless stone is cubic zirconia (CZ).
- WhatsApp contact number: `9779860120739` (used in `wa.me` links across pages).
- **No backend yet.** The catalog is JSON in `app/data/`; the plan is to replace it with a real backend later without touching UI code (see "Data layer").

## Commands

```bash
npm run dev               # dev server (Turbopack) on :3000
npm run build             # production build — also type-checks
npm run lint              # eslint (next core-web-vitals + typescript)
npm run validate:catalog  # integrity checks for app/data/*.json — run after ANY data edit
npx tsc --noEmit -p .     # fast type-check
```

There is no test suite. Verify changes with `validate:catalog` + `tsc` + `build`, then exercise pages/`/api/search` on a running server.

## Stack

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript strict**.
- **Tailwind CSS v4** (config lives in `app/globals.css` via `@theme`; there is no `tailwind.config`). shadcn/ui components (Radix) in `app/components/ui/`.
- **Redux Toolkit** for cart + wishlist (`app/store/`), persisted to `localStorage`.
- Forms: `react-hook-form` + **yup** (`app/components/common/ValidationSchema.tsx`). `zod`, `@tanstack/react-query` and `react-router-dom` are installed but **unused** — don't introduce them without reason.
- Icons: `lucide-react` (primary), `react-icons` (stars in ProductCard).

## Layout & conventions

- **Path alias `@/*` → `./app/*`** (not the repo root). Everything lives inside `app/`: `@/components/...`, `@/lib/...`, `@/data/...`, `@/types/...`, `@/store/...`, `@/hooks/...`.
- The root `app/layout.tsx` does **not** render the header/footer. **Every page wraps its content in `<Layout>`** from `@/components/layout/Layout` (Header, Footer, WhatsAppButton, CartDrawer).
- Route-private components go in `_components/` next to the route (e.g. `app/product/[slug]/_components/`, `app/shop/_components/`).
- Dynamic route `params` / `searchParams` are **Promises** in Next 16 — `await` them in server components.
- Prefer **server components** for pages that read catalog data; pass data as props to `"use client"` components. Client components must **not** import `@/lib/catalog` or `@/lib/search` (that would bundle all JSON into the client). Client-safe helpers go in separate files (e.g. `@/lib/pricing`).
- Images are local files under `public/` referenced by path (`/images/products/<slug>-N.jpg`, `/images/categories/<slug>.jpg`, `/images/collections/<slug>.jpg`, `/images/home/<name>.jpg`, `/stones/<slug>.jpg`), rendered with plain `<img>` tags (the lint warning is expected). They are freely licensed stock/Wikimedia photos (800×1000, 4:5; collection banners 1600×1000) — every folder has a `credits.json` (`{ key: { source, author, license } }`); add an entry whenever you add an image. Never use diamond imagery or photos taken from other shops.
- Styling: Tailwind utility classes with the design tokens from `globals.css` (`bg-muted`, `text-muted-foreground`, `border-border`, `bg-foreground text-background`, plus custom `silver` / `gold` colors). Fonts: `font-serif` = Playfair Display (headings, product names), `font-sans` = Lato. Common patterns: small uppercase labels `text-sm tracking-widest uppercase`, page wrappers `container mx-auto px-4 lg:px-8` or `w-full max-w-390 mx-auto px-4 lg:px-8`.
- Match surrounding code style: 2-space indent, double quotes, named exports for components (page files use default exports).
- **Hooks and helpers always live in their own files — never define them inside a component or page file.** Import and call them instead.
  - Custom hooks → `app/hooks/use-<name>.ts` (kebab-case file, `useName` export), e.g. `@/hooks/use-typewriter`, `@/hooks/use-toast`.
  - Helper / utility functions → `app/lib/<topic>.ts`, e.g. `@/lib/pricing` (`getFinalPrice`), `@/lib/utils` (`cn`). Server-only data helpers stay in `@/lib/catalog` / `@/lib/search`; client-safe helpers go in separate files so client components don't import the catalog.
  - Before writing a new helper, check `app/lib/` and `app/hooks/` for an existing one to reuse or extend.
- **Keep comments minimal.** Don't comment what the code already says; no section-divider banners, no JSDoc on obvious functions, no comments narrating changes. Only add a short one-line comment when the *why* is non-obvious (a workaround, a surprising rule, a business constraint).

## Routes

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Hero, TrustStrip, FeaturedCollections, FestivalBanner (live dated collection, else gifts-under-5000), Best sellers/New tabs, ShopByStone, SpiritualSpotlight, BirthstoneWidget, BrandStory, Instagram. Revalidates hourly |
| `/shop` | `app/shop/page.tsx` | All products + sidebar filters |
| `/shop/[category]` | `app/shop/[category]/page.tsx` | Top-level category; `/shop/lifestyle` → 308 to `/shop/home-decor` (`LEGACY_SLUGS`) |
| `/shop/[category]/[subcategory]` | `app/shop/[category]/[subcategory]/page.tsx` | e.g. `/shop/jewelry/rings` |
| `/product/[slug]` | `app/product/[slug]/page.tsx` | SSG via `generateStaticParams` |
| `/search?q=` | `app/search/page.tsx` | Ranked results + filters, empty state with popular stones |
| `/collections/[slug]` | `app/collections/[slug]/page.tsx` | Live collections only (404 outside `startsAt`/`endsAt`); revalidates hourly |
| `/api/search?q=&limit=` | `app/api/search/route.ts` | JSON for the header's live search dropdown |
| `/checkout`, `/wishlist`, `/bespoke`, `/contact`, `/about`, `/faq`, `/size-guide`, `/care-instruction`, `/shipping-and-return`, `/privacy`, `/terms-and-condition` | `app/<route>/page.tsx` | Mostly static/client pages |

Shop URL query params (parsed by `getInitialShopState`): `?category=`, `?stone=` (accepts aliases/misspellings — `?stone=amethese` works), `?gender=`, `?metal=`, `?occasion=`, `?sort=newest|price-asc|price-desc|popular`, and **any filterable attribute key** (`?ringSize=10`, `?deity=ganesh`, `?earringType=jhumka`). Shop pages pass `key={JSON.stringify(params)}` to `ShopContent` so client filter state resets when the URL changes.

## Data layer (the important part)

### Files — `app/data/` (each file = a future DB table)

Every file uses the envelope `{ "$schema": "./schemas/<name>.schema.json", "version": N, "items": [...] }`.

| File | Contents |
|---|---|
| `products.json` | Products (v2 format, ~50 seed items, ids `prd_0001`…) |
| `categories.json` | Two-level tree: top-level (`parentId: null`) → subcategories. Each lists `attributeIds` |
| `attributes.json` | Attribute definitions — the extension point for product types (ring size, chain length, deity, bead size, mukhi, capacity…) |
| `stones.json` | Stones with `aliases` (misspellings + local names: amethese, turqoise, firoza, ambar, lapsese, garnate, moonga…), birthMonth, zodiac, care |
| `metals.json` | 925 silver, oxidised, 999 fine, white metal, German silver, `met_none` |
| `collections.json` | Curated groupings: `type: "manual"` (`productIds`) or `type: "rule"` (`rules` — all given rules must match), optional `startsAt`/`endsAt` |
| `schemas/*.schema.json` | JSON Schemas (draft-07) — VS Code validates/autocompletes the data files through `$schema` |

ID prefixes: `prd_`, `cat_`, `attr_`, `stn_`, `met_`, `col_`. Slugs are kebab-case and unique per file. Records reference each other **by id only**.

### Product record shape (`ProductRecord` in `app/types/catalog.ts`)

Nested blocks: `pricing` (price, compareAtPrice, costPrice, currency, discount{type,value,startsAt,endsAt}, taxIncluded), `inventory`, `materials` (`metals[]` with role primary/plating/accent, `stones[]` with role/shape/carat/count/isNatural), `attributes` (map keyed by attribute `key`), `variants[]` (`options` keyed by variant-axis attributes, optional own `price`, own `stockCount`, exactly one `isDefault`), `media[]` (exactly one `isPrimary`), `shipping`, `customization`, `certifications`, `origin`, `flags`, `ratings`, `seo`, `status` (`draft|active|archived` — only `active` is shown), `productType` (`simple|variable|made_to_order`; `variable` ⇔ has variants).

### Attribute system — how to support a new product type

1. Add definitions to `attributes.json` (`type`: text/number/boolean/select/multiselect; flags `filterable`, `searchable`, `isVariantAxis`, `showOnProductPage`).
2. Add their ids to the relevant category's `attributeIds` (subcategories inherit the parent's).
3. Put values in `product.attributes` / `variant.options`.

No code changes needed: shop filters, the product-page specs table and search indexing are all driven by these definitions. `npm run validate:catalog` rejects attributes not enabled for the product's category and values not in the option list.

### Access layer — `app/lib/catalog.ts`

**The only module that imports the JSON.** When a backend exists, only its function bodies change. It resolves `ProductRecord` → `Product` (the UI view model) which adds: resolved `category`/`subcategory`/`metal` (primary)/`metals`/`stones`, `attributeIndex` (all values per attribute from attributes + active variants — used for filtering), `specs` (formatted rows for the product page), and **flattened conveniences** the UI uses: `price`, `comparePrice`, `discountType`, `discountValue`, `currency`, `images`, `inStock`, `stockCount`, `weight` (`"12g"`), `rating`, `isFeatured`, `isNew`, `occasion`.

Key functions: `getProducts`, `getProductBySlug`, `getProductsByCategory(cat, sub?)`, `getRelatedProducts` (hand-picked `relatedProductIds` first, then scored), `getCategoryBySlug(slug, parentSlug?)`, `getCategoryHref`, `getCategoryTree`, `getCategoryAttributes`, `findStone` (slug/name/alias), `getCollections`/`getCollectionProducts`/`isCollectionLive`, `getShopFilterOptions(scopeProducts, parentSlug?)`, `getInitialShopState(searchParams)`, `formatAttributeValue`.

These functions are **synchronous** today; keep call sites in server components so switching them to `async` later is easy.

### Search — `app/lib/search.ts`

`searchCatalog(query, { limit })` → `{ products, stones, categories, total }`. No dependency. Weighted field index (name 5, stone names+aliases 4, category 3, metal/gender/tags/searchable attributes 2, description 1), light stemming (rings→ring), stop words, exact > prefix > fuzzy (Levenshtein ≤1 for 5–7 chars, ≤2 for 8+). **Every query token must match** (AND). Unisex products match "men"/"women" queries at lower weight. Stone/category quick-link chips ignore generic words like "silver" and drop weaker prefix matches when an exact match exists. To make a misspelling searchable, add it to the stone's `aliases` (or the product's `searchKeywords`) — don't special-case code.

### Editing catalog data — checklist

- Keep ids stable (carts/wishlists and collections reference them).
- New product: next free `prd_` id, unique `sku` and `slug`, `categoryId` must be top-level and `subcategoryId` its child, `inventory.stockCount` = sum of variant stock when variants exist.
- Run `npm run validate:catalog` (must print `0 errors`), then `npx tsc --noEmit -p .`.

## State: cart & wishlist

`app/store/cartSlice.ts`, `wishlistSlice.ts` store **full `Product` objects** in localStorage (`"cart"`, `"wishlist"`). On load, items without `pricing` + `metal` (old shapes) are dropped. If you change the `Product` shape in a breaking way, update those guards. Use typed hooks `useAppDispatch` / `useAppSelector` from `@/store/hooks`.

Cart lines are keyed by `lineId` (product id + variant id + engraving) and store `variant`, `engraving` and `unitPrice` (discounted/variant price + engraving charge, computed with `getUnitPrice` from `@/lib/pricing`). Totals use `unitPrice`, never `product.price`. Products with active variants must go through the product page's size picker (`useVariantSelection`) — nothing is preselected on purpose.

## Known issues / gotchas (don't "discover" these again)

- Two toast systems coexist: shadcn `useToast()` (`@/hooks/use-toast`) and `sonner`. Both `<Toaster />`s are mounted in `app/providers.tsx`.
- **`/api/orders` does not exist** — checkout (`app/checkout/page.tsx`) POSTs to it and will fail. Checkout also adds 8% tax and validates **US** ZIP/phone formats (store is in Nepal).
- Contact and bespoke forms only show a toast; nothing is sent anywhere.
- Root `app/layout.tsx` metadata still says "SmokeShop - Premium Smoking Accessories" (template leftover) and loads Geist fonts that `globals.css` overrides with Lato/Playfair.
- `BirthstoneWidget` uses its own hardcoded stone list (not `stones.json`); its links go to `/shop?stone=<name>`, resolved through `findStone` (name, slug or alias).
- `next.config.ts` uses `module.exports` in a `.ts` file.
- Product images are licensed stand-ins that approximate each item (not photos of the shop's actual pieces). Many Wikimedia ones are CC BY / CC BY-SA and legally need visible attribution — there is no credits page yet. Review `ratings.count` in seed data is made up.
- Delivery-zone estimates (Kathmandu Valley vs rest of Nepal) and online payment methods aren't known yet — the product page only states dispatch days and Cash on Delivery.

## Git

Work on a feature branch (`feat-...`), PR into `main` (history uses merge commits from PRs like `feat-checkout-page`). Commit messages are short and lowercase-prefixed: `feat: ...`, `fix: ...`.
