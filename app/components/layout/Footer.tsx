"use client";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  shop: [
    { name: "New Arrivals", href: "/shop?sort=newest" },
    { name: "Rings", href: "/shop/jewelry/rings" },
    { name: "Necklaces", href: "/shop/jewelry/necklaces" },
    { name: "Earrings", href: "/shop/jewelry/earrings" },
    { name: "Gemstones", href: "/shop/gemstones" },
  ],
  about: [
    { name: "Our Story", href: "/about" },
    { name: "Craftsmanship", href: "/about#craftsmanship" },
    { name: "Bespoke Orders", href: "/bespoke" },
    { name: "Contact Us", href: "/contact" },
  ],
  support: [
    { name: "Shipping & Returns", href: "/shipping" },
    { name: "Care Instructions", href: "/care" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "FAQs", href: "/faq" },
  ],
};

const trustBadges = [
  { icon: "925", label: "925 Certified" },
  { icon: "✓", label: "Ethically Sourced" },
  { icon: "♻", label: "Sustainable" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Trust Badges */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 text-sm"
              >
                <span className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center font-serif text-xs">
                  {badge.icon}
                </span>
                <span className="tracking-wide">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-serif tracking-wider mb-4">
              <span className="font-semibold">ARYAL</span>
              <span className="font-light italic ml-1">Sirin Gems</span>
            </h2>
            <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6">
              Crafting exquisite Nepali silver jewelry and curating rare
              gemstones since generations. Each piece tells a story of heritage
              and artistry.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-medium tracking-widest uppercase mb-6">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-medium tracking-widest uppercase mb-6">
              About
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="text-sm font-medium tracking-widest uppercase mb-6">
              Support
            </h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-sm text-primary-foreground/70 space-y-2">
              <p>Kathmandu, Nepal</p>
              <p>+977 9800000000</p>
              <p>hello@aryalsiringems.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Copyright */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-primary-foreground/50">
              © {new Date().getFullYear()} Aryal Sirin Gems. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-primary-foreground/50">
                We Accept:
              </span>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 border border-primary-foreground/20 rounded">
                  eSewa
                </span>
                <span className="px-2 py-1 border border-primary-foreground/20 rounded">
                  Khalti
                </span>
                <span className="px-2 py-1 border border-primary-foreground/20 rounded">
                  Visa
                </span>
                <span className="px-2 py-1 border border-primary-foreground/20 rounded">
                  Mastercard
                </span>
              </div>
            </div>
            <div className="flex gap-4 text-xs text-primary-foreground/50">
              <Link href="/privacy" className="hover:text-primary-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
