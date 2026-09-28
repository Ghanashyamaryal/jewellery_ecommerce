"use client";

import { Fragment, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Heart,
  Package,
  RotateCw,
  Award,
  Gem,
  Hand,
  ScrollText,
  Truck,
  Banknote,
  MessageCircle,
  Check,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, openCart } from "@/store/cartSlice";
import { toggleWishlist, selectIsInWishlist } from "@/store/wishlistSlice";
import { useToast } from "@/hooks/use-toast";
import ShareProduct from "./ShareProduct";
import { getStrikePrice, getUnitPrice } from "@/lib/pricing";
import { useVariantSelection } from "@/hooks/use-variant-selection";
import { VariantPicker } from "./VariantPicker";
import { ProductGallery } from "./ProductGallery";
import { EngravingInput } from "./EngravingInput";
import { StickyPurchaseBar } from "./StickyPurchaseBar";
import { useInView } from "@/hooks/use-in-view";
import {
  getCareInstructions,
  getShippingNote,
  getTrustPoints,
  type TrustPointKind,
} from "@/lib/product-info";
import type { Product } from "@/types/catalog";

const TRUST_ICONS: Record<TrustPointKind, typeof Package> = {
  shipping: Package,
  returns: RotateCw,
  purity: Award,
  certificate: ScrollText,
  natural: Gem,
  handmade: Hand,
};

export default function ProductDetails({ product }: { product: Product }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [engravingEnabled, setEngravingEnabled] = useState(false);
  const [engravingText, setEngravingText] = useState("");
  const engraving = product.customization?.engraving?.available
    ? product.customization.engraving
    : undefined;
  const { ref: actionsRef, inView: actionsInView } = useInView<HTMLDivElement>();
  const pickerRef = useRef<HTMLDivElement>(null);

  const isWishlisted = useAppSelector(selectIsInWishlist(product.id));

  const { hasVariants, selected, selectOption, variant, missingAxes, isOptionAvailable } =
    useVariantSelection(product);
  const [showVariantErrors, setShowVariantErrors] = useState(false);

  const stockCount = variant ? variant.stockCount : product.stockCount;
  const inStock = variant ? variant.stockCount > 0 : product.inStock;
  const maxQuantity = stockCount || 1;
  const cartQuantity = Math.min(quantity, maxQuantity);

  const finalPrice = getUnitPrice(product, variant);
  const strikePrice = getStrikePrice(product, variant);
  const hasDiscount = product.discountType && product.discountValue;

  const toggleWishlistHandler = () => {
    dispatch(toggleWishlist(product));

    if (isWishlisted) {
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const handleQuantityIncrease = () => {
    if (cartQuantity < maxQuantity) {
      setQuantity(cartQuantity + 1);
    }
  };

  const handleQuantityDecrease = () => {
    setQuantity(Math.max(1, cartQuantity - 1));
  };

  const addSelectionToCart = () => {
    if (hasVariants && !variant) {
      setShowVariantErrors(true);
      pickerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    dispatch(
      addToCart({
        product,
        variant,
        quantity: cartQuantity,
        engraving: engravingEnabled ? engravingText : undefined,
      })
    );
    return true;
  };

  const handleAddToCart = () => {
    if (addSelectionToCart()) dispatch(openCart());
  };

  const handleBuyNow = () => {
    if (addSelectionToCart()) router.push("/checkout");
  };

  const primaryStones = product.stones.filter((s) => s.role === "primary");

  return (
    <section className="w-full max-w-390 mx-auto px-4 lg:px-8 py-6 md:py-6">
      <div className=" mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-12 mb-8">
          <ProductGallery images={product.images} name={product.name} />

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-[28px] md:text-4xl font-serif mb-4">
                {product.name}
              </h1>
              {product.ratings.count > 0 && (
                <a href="#reviews" className="flex items-center gap-4 w-fit hover:underline underline-offset-4">
                  <div
                    className="flex items-center gap-1"
                    aria-label={`Rated ${product.ratings.average} out of 5`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(product.ratings.average)
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-muted-foreground/40"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.ratings.average.toFixed(1)} ({product.ratings.count}{" "}
                    {product.ratings.count === 1 ? "review" : "reviews"})
                  </span>
                </a>
              )}
            </div>

            <Separator />

            {/* Price */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <p className="text-3xl font-serif">
                  Rs. {finalPrice.toLocaleString()}
                </p>
                {strikePrice && (
                  <p className="text-xl text-muted-foreground line-through">
                    Rs. {strikePrice.toLocaleString()}
                  </p>
                )}
                {hasDiscount && (
                  <>
                    <Badge variant="destructive">
                      {product.discountType === "percentage"
                        ? `${product.discountValue}% OFF`
                        : `Rs. ${product.discountValue} OFF`}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <div>
                <p className="text-muted-foreground leading-relaxed ">
                  {product.shortDescription}
                </p>
              </div>
            )}
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
              {product.metal.slug !== "none" && (
                <>
                  <dt className="text-muted-foreground">Metal</dt>
                  <dd>{product.metal.name}</dd>
                </>
              )}
              {product.stones.length > 0 && (
                <>
                  <dt className="text-muted-foreground">Stones</dt>
                  <dd className="flex flex-wrap gap-x-2">
                    {product.stones.map(({ stone, role }, i) => (
                      <Link
                        key={stone.id}
                        href={`/shop?stone=${stone.slug}`}
                        className="hover:underline underline-offset-4"
                      >
                        {stone.name}
                        {role === "accent" && " (accent)"}
                        {i < product.stones.length - 1 && ","}
                      </Link>
                    ))}
                  </dd>
                </>
              )}
              {product.specs.map((spec) => (
                <Fragment key={spec.key}>
                  <dt className="text-muted-foreground">{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </Fragment>
              ))}
              <dt className="text-muted-foreground">Weight</dt>
              <dd>{product.weight}</dd>
              <dt className="text-muted-foreground">For</dt>
              <dd className="capitalize">{product.gender}</dd>
              {product.origin && (
                <>
                  <dt className="text-muted-foreground">Origin</dt>
                  <dd>
                    {[product.origin.region, product.origin.country]
                      .filter(Boolean)
                      .join(", ")}
                  </dd>
                </>
              )}
              {product.customization?.engraving?.available && (
                <>
                  <dt className="text-muted-foreground">Engraving</dt>
                  <dd>
                    Up to {product.customization.engraving.maxCharacters} characters
                    (+Rs. {product.customization.engraving.price.toLocaleString()})
                  </dd>
                </>
              )}
              {product.customization?.sizeCustomizable && (
                <>
                  <dt className="text-muted-foreground">Custom size</dt>
                  <dd>
                    Available
                    {product.customization.leadTimeDays &&
                      ` (${product.customization.leadTimeDays} days)`}
                  </dd>
                </>
              )}
            </dl>

            <div>
              <p className="text-sm font-semibold mb-3 uppercase tracking-wide">
                Key Features
              </p>
              <ul className="space-y-2">
                {product.features
                  .slice(0, 4)
                  .map((feature: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-5 text-gray-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <Separator />
            {hasVariants && (
              <div ref={pickerRef} className="scroll-mt-28">
                <VariantPicker
                  axes={product.variantAxes}
                  selected={selected}
                  onSelect={selectOption}
                  isOptionAvailable={isOptionAvailable}
                  showErrors={showVariantErrors && missingAxes.length > 0}
                />
              </div>
            )}
            {engraving && (
              <EngravingInput
                maxCharacters={engraving.maxCharacters}
                price={engraving.price}
                enabled={engravingEnabled}
                value={engravingText}
                onEnabledChange={setEngravingEnabled}
                onChange={setEngravingText}
              />
            )}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-input rounded-lg">
                  <button
                    onClick={handleQuantityDecrease}
                    className="px-3 py-2 text-muted-foreground cursor-pointer hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={cartQuantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 border-l border-r min-w-15 text-center">
                    {cartQuantity}
                  </span>
                  <button
                    onClick={handleQuantityIncrease}
                    className="px-3 py-2 text-muted-foreground cursor-pointer hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={cartQuantity >= maxQuantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                {!inStock ? (
                  <p className="text-sm text-red-600 font-medium">Out of stock</p>
                ) : product.inventory.trackInventory &&
                  stockCount <= product.inventory.lowStockThreshold ? (
                  <p className="text-sm text-amber-600 font-medium">
                    Only {stockCount} left
                  </p>
                ) : (
                  <p className="text-sm text-green-600 font-medium">In stock</p>
                )}
              </div>

              <div ref={actionsRef} className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleBuyNow}
                  size="lg"
                  className="tracking-widest uppercase"
                  disabled={!inStock}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Buy Now
                </Button>
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="lg"
                  className="tracking-widest uppercase"
                  disabled={!inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/9779860120739?text=${encodeURIComponent(
                    `Hi, I'm interested in ${product.name}${variant ? ` (${variant.name})` : ""}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-0 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-md bg-green-600 text-white text-sm font-medium whitespace-nowrap hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" />
                  Ask on WhatsApp
                </a>
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-11 w-11 shrink-0 transition-colors duration-300 ${
                    isWishlisted ? "border-red-500 bg-red-50" : ""
                  }`}
                  onClick={toggleWishlistHandler}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  aria-pressed={isWishlisted}
                >
                  <Heart
                    className={`h-4 w-4 transition-all ${
                      isWishlisted
                        ? "fill-red-500 text-red-500 scale-110"
                        : "text-foreground"
                    }`}
                  />
                </Button>
                <ShareProduct
                  productName={product.name || "Product"}
                  productPrice={finalPrice}
                  productImage={product.images[0]}
                  slug={product.slug}
                />
              </div>
              <ul className="pt-2 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Truck className="h-4 w-4 shrink-0 text-foreground" />
                  Dispatched within {product.shipping.processingDays} business days ·
                  Delivery across Nepal
                </li>
                <li className="flex items-center gap-2">
                  <Banknote className="h-4 w-4 shrink-0 text-foreground" />
                  Cash on Delivery available
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul className="bg-muted/30 rounded-lg p-4 lg:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {getTrustPoints(product).map((point) => {
            const Icon = TRUST_ICONS[point.kind];
            return (
              <li key={point.kind} className="flex items-start gap-3">
                <Icon className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">{point.label}</p>
                  <p className="text-xs text-muted-foreground">{point.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="max-w-3xl mx-auto my-16">
          <Accordion type="single" collapsible defaultValue="description">
            <AccordionItem value="description">
              <AccordionTrigger className="text-lg font-serif">
                About This Piece
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4">
                {product.description}
              </AccordionContent>
            </AccordionItem>

            {primaryStones.map(({ stone }) => (
              <AccordionItem key={stone.id} value={`stone-${stone.slug}`}>
                <AccordionTrigger className="text-lg font-serif">
                  {stone.name} Guide
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4 space-y-3">
                  <p>{stone.description}</p>
                  <div>
                    <p className="font-medium mb-1">Meaning & Properties</p>
                    <p>{stone.properties}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Care Instructions</p>
                    <p>{stone.care}</p>
                  </div>
                  <Link
                    href={`/shop?stone=${stone.slug}`}
                    className="inline-block text-sm underline underline-offset-4 hover:text-foreground"
                  >
                    Shop all {stone.name}
                  </Link>
                </AccordionContent>
              </AccordionItem>
            ))}

            <AccordionItem value="care">
              <AccordionTrigger className="text-lg font-serif">
                Care & Shipping
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4 space-y-4">
                <div>
                  <p className="font-medium mb-2">Care Instructions</p>
                  <ul className="space-y-1 text-sm">
                    {getCareInstructions(product).map((line) => (
                      <li key={line}>• {line}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Shipping Information</p>
                  <p className="text-sm">{getShippingNote(product)}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {!actionsInView && (
        <StickyPurchaseBar
          name={product.name}
          price={finalPrice}
          actionLabel={hasVariants && !variant ? "Select Size" : "Add to Cart"}
          disabled={!inStock}
          onAction={handleAddToCart}
        />
      )}
    </section>
  );
}
