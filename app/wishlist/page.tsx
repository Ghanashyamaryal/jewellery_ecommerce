"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  // Placeholder - in production, this would use Redux or context for wishlist state
  const wishlistItems: any[] = [];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} items saved
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-24">
              <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="text-2xl font-serif mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Save your favorite pieces to easily revisit them later
              </p>
              <Button asChild>
                <Link href="/shop" className="gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Start Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Wishlist items would be rendered here */}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
