"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Heart,
  Share2,
  Package,
  RotateCw,
  Award,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";

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
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);

  if (!product) {
    return (
      <Layout>
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-3xl font-serif mb-4">Product not found</h1>
            <Button asChild>
              <Link href="/shop">Back to Shop</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
      })
    );
  };

  const stoneGuide = product.stoneType
    ? stoneGuides[
        product.stoneType
          .toLowerCase()
          .replace(/\s+/g, "") as keyof typeof stoneGuides
      ]
    : null;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      {/* Product */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            href="/shop"
            className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block"
          >
            ← Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted overflow-hidden rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnails would go here in full implementation */}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2 tracking-widest uppercase">
                  {product.category}
                </p>
                <h1 className="text-4xl font-serif mb-4">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-foreground text-foreground"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    (128 reviews)
                  </span>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-3xl font-serif mb-2">
                  Rs. {product.price.toLocaleString()}
                </p>
                {product.isNew && (
                  <Badge variant="secondary" className="mt-3">
                    New Arrival
                  </Badge>
                )}
              </div>

              <div>
                <p className="text-sm font-medium mb-3">Details</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Material: {product.metalType}</li>
                  {product.stoneType && <li>• Stone: {product.stoneType}</li>}
                  {product.weight && <li>• Weight: {product.weight}g</li>}
                  <li>• Handcrafted in Nepal</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-input rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 border-l border-r">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">In stock</p>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="w-full tracking-widest uppercase"
                >
                  Add to Cart
                </Button>
              </div>

              <div className="flex gap-3 pt-6 border-t">
                <Button variant="outline" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/977xxxxxxxxxxx?text=Hi%20I'm%20interested%20in%20${encodeURIComponent(
                  product.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ask on WhatsApp
                </Button>
              </a>

              {/* Benefits */}
              <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                {[
                  {
                    icon: Package,
                    label: "Free Shipping",
                    desc: "On orders over Rs. 5000",
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
                        <p className="text-xs text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <Separator className="my-12" />

          {/* Accordion sections */}
          <div className="max-w-3xl mx-auto mb-16">
            <Accordion type="single" collapsible>
              <AccordionItem value="description">
                <AccordionTrigger className="text-lg font-serif">
                  About This Piece
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  {product.description ||
                    "This beautifully crafted piece combines traditional Nepali silversmithing techniques with contemporary design. Each item is handcrafted by our master artisans and made from 925 certified sterling silver with natural gemstones."}
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

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-3xl font-serif text-center mb-12">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/product/${relatedProduct.slug}`}
                  >
                    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">
                          {relatedProduct.category}
                        </p>
                        <h3 className="font-serif mb-2 group-hover:text-primary transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <p className="font-medium">
                          Rs. {relatedProduct.price.toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
