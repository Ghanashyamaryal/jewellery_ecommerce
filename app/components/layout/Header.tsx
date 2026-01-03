"use client";
import { useState } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { openCart, selectCartItemsCount } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

const navigation = [
  {
    name: "Jewelry",
    href: "/shop/jewelry",
    submenu: [
      { name: "All Jewelry", href: "/shop/jewelry" },
      { name: "Rings", href: "/shop?category=rings" },
      { name: "Necklaces", href: "/shop?category=necklaces" },
      { name: "Earrings", href: "/shop?category=earrings" },
      { name: "Pendants", href: "/shop?category=pendants" },
      { name: "Bracelets", href: "/shop?category=bracelets" },
    ],
  },
  {
    name: "Gemstones",
    href: "/shop/gemstones",
    submenu: [
      { name: "All Gemstones", href: "/shop/gemstones" },
      { name: "Amethyst", href: "/shop?stone=amethyst" },
      { name: "Turquoise", href: "/shop?stone=turquoise" },
      { name: "Moonstone", href: "/shop?stone=moonstone" },
      { name: "Garnet", href: "/shop?stone=garnet" },
      { name: "Peridot", href: "/shop?stone=peridot" },
    ],
  },
  {
    name: "Lifestyle",
    href: "/shop/lifestyle",
    submenu: [
      { name: "All Lifestyle", href: "/shop/lifestyle" },
      { name: "Pooja Items", href: "/shop?category=pooja-items" },
      { name: "Silver Utensils", href: "/shop?category=utensils" },
      { name: "Home Decor", href: "/shop?category=decor" },
    ],
  },
  { name: "Bespoke", href: "/bespoke" },
];

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cartItemsCount = useAppSelector(selectCartItemsCount);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="bg-primary text-primary-foreground py-1 text-center text-xs md:text-sm overflow-hidden ">
        <div className="animate-marquee whitespace-nowrap">
          Free Shipping on Orders Above NPR 10,000 • 925 Certified Silver
        </div>
      </div>

      <div className="w-full max-w-390 mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile menu */}
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
            >
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-muted-foreground transition-colors tracking-wide block py-2"
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="pl-4 space-y-2 mt-2">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-xl md:text-2xl font-serif font-cursive ">
              <span className="font-semibold">Aryal siring gems</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors tracking-widest uppercase outline-none">
                    {item.name}
                    <ChevronDown className="h-3 w-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-48 bg-background border border-border shadow-lg z-50"
                  >
                    {item.submenu.map((sub) => (
                      <DropdownMenuItem key={sub.name} asChild>
                        <Link
                          href={sub.href}
                          className="w-full px-4 py-2 text-sm hover:bg-muted cursor-pointer"
                        >
                          {sub.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors tracking-widest uppercase"
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Utility Icons */}
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
              asChild
              className="text-foreground hover:text-muted-foreground hidden sm:flex"
            >
              {/* <Link href="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link> */}
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

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-border animate-fade-in">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search for jewelry, gemstones..."
                className="w-full pl-12 pr-4 py-3 bg-muted border-0 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
