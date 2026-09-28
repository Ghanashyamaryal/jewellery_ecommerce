// Catalog types.
//
// *Record types mirror the JSON files in app/data/ one-to-one — each file is a
// future database table / API resource, and records reference each other by id.
// The resolved `Product` type is the view model the UI consumes.

// ============================================================
// Shared
// ============================================================

export type Gender = "men" | "women" | "unisex" | "kids";
export type AgeGroup = "adult" | "kids" | "all";
export type ISODate = string;

/** Every JSON data file is wrapped in this envelope */
export interface DataFile<T> {
  $schema?: string;
  version: number;
  items: T[];
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

// ============================================================
// Attributes — the extension point for any product type
// ============================================================

export type AttributeType =
  | "text"
  | "number"
  | "boolean"
  | "select"
  | "multiselect";

export interface AttributeOption {
  value: string;
  label: string;
  /** Optional swatch colour for UI */
  hex?: string;
}

/**
 * Defines one attribute (ring size, chain length, deity, bead size…).
 * Categories list which attributes apply to them; products store values
 * in `attributes` keyed by `key`. New product types need new attributes,
 * not new code or columns.
 */
export interface AttributeDefinition {
  id: string;
  key: string;
  label: string;
  type: AttributeType;
  unit?: string;
  options?: AttributeOption[];
  /** Show as a filter on shop pages */
  filterable: boolean;
  /** Include values in the search index */
  searchable: boolean;
  /** Can be used as a variant option (e.g. ring size) */
  isVariantAxis: boolean;
  /** Show in the product "Specifications" table */
  showOnProductPage: boolean;
  sortOrder: number;
}

export type AttributeValue = string | number | boolean | string[];
export type AttributeValues = Record<string, AttributeValue>;

// ============================================================
// Taxonomy
// ============================================================

export interface Category {
  id: string;
  slug: string;
  name: string;
  parentId: string | null;
  description: string;
  image?: string;
  /** Attribute ids that apply here; subcategories also inherit the parent's */
  attributeIds: string[];
  isActive: boolean;
  sortOrder: number;
  seo?: Seo;
}

export interface CategoryNode extends Category {
  children: Category[];
}

export interface Stone {
  id: string;
  slug: string;
  name: string;
  /** Misspellings, local names and synonyms used by search */
  aliases: string[];
  family?: string;
  color: string;
  colorHex: string;
  hardnessMohs?: number;
  birthMonth?: number;
  zodiac: string[];
  planet?: string;
  chakra?: string;
  origin: string[];
  properties: string;
  care: string;
  description: string;
  image?: string;
}

export interface Metal {
  id: string;
  slug: string;
  name: string;
  purity?: string;
  aliases: string[];
  care?: string;
}

export type CollectionType = "manual" | "rule";

export interface CollectionRules {
  categoryIds?: string[];
  stoneIds?: string[];
  metalIds?: string[];
  genders?: Gender[];
  tags?: string[];
  occasions?: string[];
  minPrice?: number;
  maxPrice?: number;
  isNew?: boolean;
}

/** Curated groupings that cut across categories (Tihar gifts, Bridal, Men's edit…) */
export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  type: CollectionType;
  /** For manual collections */
  productIds?: string[];
  /** For rule collections: a product must match every rule given */
  rules?: CollectionRules;
  isActive: boolean;
  startsAt?: ISODate;
  endsAt?: ISODate;
  sortOrder: number;
  seo?: Seo;
}

// ============================================================
// Product
// ============================================================

export type ProductStatus = "draft" | "active" | "archived";
/** simple = one SKU · variable = has variants · made_to_order = crafted after order */
export type ProductType = "simple" | "variable" | "made_to_order";
export type StoneRole = "primary" | "secondary" | "accent";
export type MetalRole = "primary" | "plating" | "accent";
export type ShippingClass = "standard" | "fragile" | "heavy" | "oversized";

export interface Discount {
  type: "percentage" | "fixed";
  value: number;
  startsAt?: ISODate;
  endsAt?: ISODate;
  label?: string;
}

export interface Pricing {
  /** Regular selling price */
  price: number;
  /** "Was" price shown struck through */
  compareAtPrice?: number;
  /** Internal, never shown to customers */
  costPrice?: number;
  currency: string;
  discount?: Discount;
  taxIncluded: boolean;
}

export interface Inventory {
  trackInventory: boolean;
  /** Total when the product has no variants; ignored when variants exist */
  stockCount: number;
  lowStockThreshold: number;
  allowBackorder: boolean;
  barcode?: string;
}

export interface ProductMetal {
  metalId: string;
  role: MetalRole;
  finish?: string;
  weightGrams?: number;
}

export interface ProductStoneRecord {
  stoneId: string;
  role: StoneRole;
  shape?: string;
  cut?: string;
  caratWeight?: number;
  count?: number;
  sizeMm?: string;
  color?: string;
  treatment?: string;
  isNatural: boolean;
  origin?: string;
}

export interface Materials {
  metals: ProductMetal[];
  stones: ProductStoneRecord[];
}

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  alt: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  /** Values for variant-axis attributes, e.g. { ringSize: "7" } */
  options: Record<string, string>;
  /** Replaces pricing.price for this variant */
  price?: number;
  compareAtPrice?: number;
  stockCount: number;
  weightGrams?: number;
  mediaIds?: string[];
  isDefault: boolean;
  isActive: boolean;
}

export interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
  diameter?: number;
  unit: "mm" | "cm" | "in";
}

export interface Shipping {
  weightGrams: number;
  dimensions?: Dimensions;
  shippingClass: ShippingClass;
  isFragile: boolean;
  freeShipping: boolean;
  /** Days before dispatch */
  processingDays: number;
}

export interface Customization {
  engraving?: { available: boolean; maxCharacters: number; price: number };
  sizeCustomizable?: boolean;
  stoneCustomizable?: boolean;
  leadTimeDays?: number;
  notes?: string;
}

export interface Certification {
  type: "hallmark" | "gemstone_lab" | "authenticity" | "other";
  issuer: string;
  certificateNumber?: string;
}

export interface Origin {
  country: string;
  region?: string;
  artisan?: string;
}

export interface ProductFlags {
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  isHandmade: boolean;
  isGiftable: boolean;
}

export interface Ratings {
  average: number;
  count: number;
}

export interface ProductRecord {
  id: string;
  sku: string;
  slug: string;
  name: string;
  status: ProductStatus;
  productType: ProductType;

  categoryId: string;
  subcategoryId?: string;

  shortDescription: string;
  description: string;
  features: string[];
  careInstructions?: string[];

  gender: Gender;
  ageGroup: AgeGroup;

  pricing: Pricing;
  inventory: Inventory;
  materials: Materials;
  /** Values for the category's attributes, keyed by AttributeDefinition.key */
  attributes: AttributeValues;
  variants: ProductVariant[];
  media: MediaItem[];
  shipping: Shipping;
  customization?: Customization;
  certifications: Certification[];
  origin?: Origin;

  occasions: string[];
  tags: string[];
  searchKeywords: string[];
  seo?: Seo;
  flags: ProductFlags;
  ratings: Ratings;
  relatedProductIds: string[];

  createdAt: ISODate;
  updatedAt: ISODate;
  publishedAt?: ISODate;
}

// ============================================================
// Resolved view model used by the UI
// ============================================================

export interface ProductStone extends ProductStoneRecord {
  stone: Stone;
}

export interface ResolvedProductMetal extends ProductMetal {
  metal: Metal;
}

export interface VariantAxis {
  key: string;
  label: string;
  /** Values offered by the product's active variants, in the attribute's option order */
  options: AttributeOption[];
}

export interface ProductSpec {
  key: string;
  label: string;
  value: string;
}

export interface Product extends ProductRecord {
  category: Category;
  subcategory?: Category;
  /** Primary metal */
  metal: Metal;
  metals: ResolvedProductMetal[];
  stones: ProductStone[];
  /** Every value per attribute key, from attributes and active variants — used by filters */
  attributeIndex: Record<string, string[]>;
  /** Human-readable attribute values for the specifications table */
  specs: ProductSpec[];
  variantAxes: VariantAxis[];

  // Flattened conveniences (derived from the nested blocks above)
  price: number;
  comparePrice?: number;
  discountType?: Discount["type"];
  discountValue?: number;
  currency: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  weight: string;
  rating: number;
  isFeatured: boolean;
  isNew: boolean;
  occasion: string[];
}

// ============================================================
// Shop filters
// ============================================================

export interface FilterOption {
  name: string;
  value: string;
}

export interface AttributeFilter {
  key: string;
  label: string;
  options: FilterOption[];
}

export interface ShopFilterOptions {
  categories: FilterOption[];
  metals: FilterOption[];
  stones: FilterOption[];
  occasions: FilterOption[];
  genders: FilterOption[];
  /** Filterable attributes that have values among the products in scope */
  attributes: AttributeFilter[];
  maxPrice: number;
}

export interface ShopFilters {
  category: string;
  metalType: string;
  stoneType: string;
  gender: string;
  occasion: string;
  /** attribute key → selected value ("all" or absent = no filter) */
  attributes: Record<string, string>;
  priceRange: [number, number];
}
