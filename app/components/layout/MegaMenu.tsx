"use client";

import { useState } from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/site";
import { useNavigation } from "@/hooks/use-navigation";
import type { NavFeature, NavLink, NavMenu } from "@/types/navigation";

const triggerClass =
  "group relative flex items-center gap-1 py-2 text-[13px] xl:text-sm font-medium tracking-[0.15em] xl:tracking-widest uppercase text-foreground outline-none cursor-pointer focus-visible:ring-1 focus-visible:ring-ring after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-foreground after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 data-[state=open]:after:scale-x-100 data-[active]:after:scale-x-100 motion-reduce:after:transition-none";

function Swatch({ color }: { color: string }) {
  return (
    <span
      className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-foreground/15"
      style={{ backgroundColor: color }}
    />
  );
}

function MenuLink({
  link,
  className,
  onPreview,
}: {
  link: NavLink;
  className?: string;
  onPreview?: (link: NavLink) => void;
}) {
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={link.href}
        onMouseEnter={() => onPreview?.(link)}
        onFocus={() => onPreview?.(link)}
        className={cn(
          "group/link flex items-center gap-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground outline-none",
          className
        )}
      >
        {link.swatch && <Swatch color={link.swatch} />}
        <span className="relative after:absolute after:left-0 after:-bottom-px after:h-px after:w-full after:bg-foreground after:origin-left after:scale-x-0 after:transition-transform after:duration-300 group-hover/link:after:scale-x-100 motion-reduce:after:transition-none">
          {link.name}
        </span>
        {link.badge && (
          <span className="text-[9px] uppercase tracking-wider bg-foreground text-background px-1.5 py-0.5">
            {link.badge}
          </span>
        )}
      </Link>
    </NavigationMenu.Link>
  );
}

function FeatureCard({ feature, preview }: { feature: NavFeature; preview?: NavLink | null }) {
  const showPreview = !!preview?.image;
  const href = showPreview ? preview!.href : feature.href;
  return (
    <NavigationMenu.Link asChild>
      <Link href={href} className="group/card block w-52 xl:w-60 outline-none">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={feature.image}
            alt={feature.title}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transition-none"
          />
          {showPreview && (
            <img
              key={preview!.href}
              src={preview!.image}
              alt={preview!.name}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover animate-fade-in transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:animate-none motion-reduce:transition-none"
            />
          )}
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-widest text-muted-foreground">
          {showPreview ? "Explore" : feature.eyebrow}
        </p>
        <p className="mt-1 font-serif text-base leading-snug line-clamp-2 group-hover/card:underline underline-offset-4">
          {showPreview ? preview!.name : feature.title}
        </p>
        {!showPreview && feature.price !== undefined && (
          <p className="mt-1 text-sm text-muted-foreground">
            NPR {feature.price.toLocaleString()}
          </p>
        )}
      </Link>
    </NavigationMenu.Link>
  );
}

function MegaMenuPanel({ menu }: { menu: NavMenu }) {
  const [preview, setPreview] = useState<NavLink | null>(null);
  const handlePreview = (link: NavLink) => setPreview(link.image ? link : null);

  return (
    <div onMouseLeave={() => setPreview(null)}>
      <div className="w-full max-w-390 mx-auto px-8 py-10 flex justify-between gap-12">
        <div className="flex flex-1 flex-col">
          <div
            className="grid gap-x-10 gap-y-8"
            style={{ gridTemplateColumns: `repeat(${menu.columns.length}, minmax(0, 1fr))` }}
          >
            {menu.columns.map((column) => (
              <div key={column.title}>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-foreground">
                  {column.title}
                </p>
                <ul className={cn(column.links.length > 8 && "columns-2 gap-x-6")}>
                  {column.links.map((link) => (
                    <li key={link.href} className="break-inside-avoid">
                      <MenuLink link={link} onPreview={handlePreview} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <NavigationMenu.Link asChild>
            <Link
              href={menu.viewAll.href}
              className="group/all mt-auto pt-8 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-widest text-foreground outline-none hover:underline underline-offset-4"
            >
              {menu.viewAll.name}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/all:translate-x-1 motion-reduce:transition-none" />
            </Link>
          </NavigationMenu.Link>
        </div>

        {menu.features.length > 0 && (
          <div className="flex gap-5">
            {menu.features.map((feature, i) => (
              <FeatureCard
                key={feature.href}
                feature={feature}
                preview={i === 0 ? preview : null}
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border bg-muted/40">
        <div className="w-full max-w-390 mx-auto px-8 py-3 flex items-center justify-between text-xs tracking-wide text-muted-foreground">
          <span>
            Free shipping over NPR {FREE_SHIPPING_THRESHOLD.toLocaleString()} · 925 certified silver ·
            Handcrafted in Kathmandu, Nepal
          </span>
          <NavigationMenu.Link asChild>
            <Link
              href="/bespoke"
              className="inline-flex items-center gap-1.5 uppercase tracking-widest text-foreground hover:underline underline-offset-4"
            >
              Design your own piece
              <ArrowRight className="h-3 w-3" />
            </Link>
          </NavigationMenu.Link>
        </div>
      </div>
    </div>
  );
}

export function MegaMenu() {
  const { menus, links } = useNavigation();
  const [value, setValue] = useState("");

  return (
    // Not `relative`, so the viewport and overlay position against the sticky header and span its full width
    <NavigationMenu.Root
      value={value}
      onValueChange={setValue}
      delayDuration={300}
      skipDelayDuration={400}
      className="hidden lg:block"
    >
      <NavigationMenu.List className="flex items-center gap-5 xl:gap-8">
        {menus.map((menu) => (
          <NavigationMenu.Item key={menu.name} value={menu.name}>
            <NavigationMenu.Trigger className={triggerClass}>
              {menu.name}
              {menu.badge && (
                <span className="absolute -top-2 -right-3 text-[8px] tracking-wider bg-gold text-white px-1 leading-3.5">
                  {menu.badge}
                </span>
              )}
              <ChevronDown
                className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                aria-hidden
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute inset-x-0 top-0 data-[motion=from-start]:animate-enter-from-left data-[motion=from-end]:animate-enter-from-right data-[motion=to-start]:animate-exit-to-left data-[motion=to-end]:animate-exit-to-right motion-reduce:animate-none!">
              <MegaMenuPanel menu={menu} />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
        {links.map((link) => (
          <NavigationMenu.Item key={link.href}>
            <NavigationMenu.Link asChild>
              <Link href={link.href} className={triggerClass}>
                {link.name}
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      {value && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-full h-screen bg-foreground/25 animate-fade-in pointer-events-none motion-reduce:animate-none"
        />
      )}
      <div className="absolute inset-x-0 top-full">
        <NavigationMenu.Viewport className="relative w-full overflow-hidden border-b border-border bg-background shadow-xl h-(--radix-navigation-menu-viewport-height) transition-[height] duration-300 ease-out data-[state=open]:animate-mega-in data-[state=closed]:animate-mega-out motion-reduce:transition-none motion-reduce:animate-none!" />
      </div>
    </NavigationMenu.Root>
  );
}
