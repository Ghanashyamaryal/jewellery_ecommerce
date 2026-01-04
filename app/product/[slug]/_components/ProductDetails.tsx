"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Heart,
  Share2,
  Package,
  RotateCw,
  Award,
  MessageCircle,
  Check,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist, selectIsInWishlist } from "@/store/wishlistSlice";
import { useToast } from "@/hooks/use-toast";
import ShareProduct from "./ShareProduct";

const stoneGuides = {
  amethyst: {
    name: "Amethyst",
    meaning: "Peace, spiritual awareness, intuition",
    care: "Avoid prolonged exposure to sunlight as it may fade the color. Clean with lukewarm water and mild soap.",
  },
  turquoise: {
    name: "Turquoise",
    meaning: "Protection, communication, healing",
    care: "Protect from excessive heat and moisture. Avoid harsh chemicals and cleaning products.",
  },
  moonstone: {
    name: "Moonstone",
    meaning: "New beginnings, intuition, inner growth",
    care: "Handle gently as it's relatively soft. Avoid prolonged sun exposure. Clean with soft cloth.",
  },
  garnet: {
    name: "Garnet",
    meaning: "Passion, energy, strength",
    care: "Durable and relatively easy to care for. Can be cleaned with warm soapy water.",
  },
  peridot: {
    name: "Peridot",
    meaning: "Strength, balance, prosperity",
    care: "Avoid extreme temperature changes. Clean with mild soap and water.",
  },
};

export default function ProductDetails({ product }: { product: any }) {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const isWishlisted = useAppSelector(selectIsInWishlist(product.id));

  const maxQuantity = product.stockCount || 1;

  // Calculate final price based on discount
  const calculatePrice = () => {
    if (!product.discountType || !product.discountValue) {
      return product.price;
    }

    if (product.discountType === "percentage") {
      return product.price - (product.price * product.discountValue) / 100;
    } else {
      return product.price - product.discountValue;
    }
  };

  const finalPrice = calculatePrice();
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
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleQuantityDecrease = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
      })
    );

    toast({
      title: "Added to Cart",
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        product,
        quantity,
      })
    );

    toast({
      title: "Added to Cart",
      description: `${quantity} × ${product.name} added to your cart.`,
    });

    router.push("/checkout");
  };

  const stoneGuide = product.stoneType
    ? stoneGuides[
        product.stoneType
          .toLowerCase()
          .replace(/\s+/g, "") as keyof typeof stoneGuides
      ]
    : null;

  return (
    <section className="w-full max-w-390 mx-auto px-4 lg:px-8 py-6 md:py-6">
      <div className=" mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-12 mb-8">
          <div className="space-y-4">
            <div className="aspect-3/2 bg-muted overflow-hidden relative">
              {product.inStock && (
                <Badge className="absolute top-3 left-3 z-10 bg-green-600 border-none hover:bg-green-700">
                  In Stock
                </Badge>
              )}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-muted overflow-hidden border transition-all ${
                      selectedImage === index
                        ? "border-foreground"
                        : "border-none"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2 tracking-widest uppercase">
                {product.category}
              </p>
              <h1 className="text-[28px] md:text-4xl font-serif mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  (128 reviews)
                </span>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <p className="text-3xl font-serif">
                  Rs. {finalPrice.toLocaleString()}
                </p>
                {hasDiscount && (
                  <>
                    <p className="text-xl text-muted-foreground line-through">
                      Rs. {product.price.toLocaleString()}
                    </p>
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
                <p className="text-muted-foreground leading-relaxed line-clamp-2">
                  {product.shortDescription}
                </p>
              </div>
            )}
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
            {/* Quantity & Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-input rounded-lg">
                  <button
                    onClick={handleQuantityDecrease}
                    className="px-3 py-2 text-muted-foreground cursor-pointer hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-4 py-2 border-l border-r min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleQuantityIncrease}
                    className="px-3 py-2 text-muted-foreground cursor-pointer hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity >= maxQuantity}
                  >
                    +
                  </button>
                </div>
                {product.inStock ? (
                  <p className="text-sm text-green-600 font-medium flex items-center gap-2">
                    {product.stockCount} items available
                  </p>
                ) : (
                  <p className="text-sm text-red-600 font-medium">
                    Out of stock
                  </p>
                )}
              </div>

              {quantity >= maxQuantity && product.inStock && (
                <p className="text-xs text-amber-600">
                  Maximum available quantity reached
                </p>
              )}
              <div className="flex flex-row gap-3">
                <div className="flex flex-col gap-3 w-full">
                  <Button
                    onClick={handleAddToCart}
                    variant="default"
                    className="flex-1 tracking-widest w-full uppercase"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    className="flex-1 tracking-widest uppercase"
                    disabled={!product.inStock}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
                <div className="flex flex-col gap-3 w-fit">
                  <div className="flex flex-row gap-2 ">
                    <Button
                      variant="outline"
                      className={`w-full transition-colors duration-300 ${
                        isWishlisted ? "border-red-500 bg-red-50" : ""
                      }`}
                      onClick={toggleWishlistHandler}
                    >
                      <Heart
                        className={`h-4 w-4 transition-all ${
                          isWishlisted
                            ? "fill-red-500 text-red-500 scale-110"
                            : "text-foreground"
                        }`}
                      />
                    </Button>
                    <div className="w-full">
                      <ShareProduct
                        productName={product.name || "Product"}
                        productPrice={finalPrice}
                        productImage={product.images[0]}
                        slug={slug as string}
                      />
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/9779860120739?text=Hi%20I'm%20interested%20in%20${encodeURIComponent(
                      product.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="bg-green-500 text-white border-none flex items-center justify-center gap-2 py-2 px-4 hover:bg-green-600 hover:text-white flex-shrink min-w-0"
                    >
                      <MessageCircle className="h-5 w-5 flex-shrink-0" />
                      <span className="truncate">Ask on WhatsApp</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4 flex flex-col lg:flex-row gap-3 lg:gap-6 space-y-4 lg:justify-around lg:space-y-0">
          {[
            {
              icon: Package,
              label: "Free Shipping",
              desc: "On orders over Rs. 10000",
            },
            {
              icon: RotateCw,
              label: "7-Day Returns",
              desc: "Money-back guarantee",
            },
            {
              icon: Award,
              label: "Certified",
              desc: "925 Sterling Silver",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-start gap-3">
                <Icon className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Accordion sections */}
        <div className="max-w-3xl mx-auto my-16">
          <Accordion type="single" collapsible>
            <AccordionItem value="description">
              <AccordionTrigger className="text-lg font-serif">
                About This Piece
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4">
                {product.description}
              </AccordionContent>
            </AccordionItem>

            {stoneGuide && (
              <AccordionItem value="stone">
                <AccordionTrigger className="text-lg font-serif">
                  {stoneGuide.name} Guide
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4 space-y-3">
                  <div>
                    <p className="font-medium mb-1">Meaning & Properties</p>
                    <p>{stoneGuide.meaning}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Care Instructions</p>
                    <p>{stoneGuide.care}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="care">
              <AccordionTrigger className="text-lg font-serif">
                Care & Shipping
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4 space-y-4">
                <div>
                  <p className="font-medium mb-2">Care Instructions</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Store in a dry place away from direct sunlight</li>
                    <li>• Clean with a soft cloth to maintain shine</li>
                    <li>• Avoid exposure to harsh chemicals</li>
                    <li>• Remove jewelry before bathing or swimming</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Shipping Information</p>
                  <p className="text-sm">
                    All items are carefully packaged in our signature gift box
                    and shipped within 2-3 business days. Free shipping
                    available for orders over Rs. 5000.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
