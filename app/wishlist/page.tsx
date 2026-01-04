"use client";

import Link from "next/link";
import { Heart, ShoppingBag, X, ShoppingCart } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { removeFromWishlist, selectWishlistItems } from "@/store/wishlistSlice";

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const wishlistItems = useAppSelector(selectWishlistItems);

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    dispatch(removeFromWishlist(productId));
    toast({
      title: "Removed from Wishlist",
      description: `${productName} has been removed from your wishlist.`,
    });
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ product: product, quantity: 1 }));
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Handle empty wishlist logic separately
  if (wishlistItems.length === 0) {
    return (
      <Layout>
        <section className="bg-muted/50 py-16">
          <section className="py-8">
            <div className="container mx-auto px-4 lg:px-8">
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
            </div>
          </section>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.product.id}
                  className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      handleRemoveFromWishlist(
                        item.product.id,
                        item.product.name
                      )
                    }
                    className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </button>

                  {/* Product Image */}
                  <Link
                    href={`/products/${item.product.slug || item.product.id}`}
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={item.product.images?.[0] || "/placeholder.jpg"}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    <Link
                      href={`/products/${item.product.slug || item.product.id}`}
                    >
                      <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                      <p className="text-lg font-serif">
                        Rs. {item.product.price?.toLocaleString()}
                      </p>
                      {item.product.inStock ? (
                        <span className="text-xs text-green-600 font-medium">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-xs text-red-600 font-medium">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={() => handleAddToCart(item.product)}
                      disabled={!item.product.inStock}
                      className="w-full"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
}
