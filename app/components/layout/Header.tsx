"use client";
import { useCallback, useState } from "react";
import { Search, ShoppingBag, Heart, Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { openCart, selectCartItemsCount } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { HeaderSearch } from "./HeaderSearch";
import { Logo } from "../common/Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cartItemsCount = useAppSelector(selectCartItemsCount);

  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="w-full max-w-390 mx-auto px-2  lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] overflow-y-auto"
              aria-describedby={undefined}
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <MobileNav />
            </SheetContent>
          </Sheet>

          <Link href="/" aria-label="Aryal Siring Gems — home" className="flex items-center">
            <Logo />
          </Link>

          <MegaMenu />

          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-foreground hover:text-muted-foreground"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-foreground hover:text-muted-foreground hidden sm:flex"
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(openCart())}
              className="text-foreground hover:text-muted-foreground relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>

        {isSearchOpen && <HeaderSearch onClose={closeSearch} />}
      </div>
    </header>
  );
}
