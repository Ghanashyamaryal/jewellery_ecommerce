"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SheetClose } from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useNavigation } from "@/hooks/use-navigation";

export function MobileNav() {
  const { menus, links } = useNavigation();

  return (
    <nav className="mt-8">
      <Accordion type="single" collapsible>
        {menus.map((menu) => {
          const [primary, ...rest] = menu.columns;
          return (
            <AccordionItem key={menu.name} value={menu.name}>
              <AccordionTrigger className="text-base font-medium tracking-widest uppercase hover:no-underline">
                <span className="flex items-center gap-2">
                  {menu.name}
                  {menu.badge && (
                    <span className="text-[9px] tracking-wider bg-gold text-white px-1">
                      {menu.badge}
                    </span>
                  )}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {primary && (
                  <ul className="grid grid-cols-2 gap-3 mb-5">
                    {primary.links.map((link) => (
                      <li key={link.href}>
                        <SheetClose asChild>
                          <Link href={link.href} className="group block">
                            <div className="aspect-square overflow-hidden bg-muted">
                              {link.image && (
                                <img
                                  src={link.image}
                                  alt={link.name}
                                  loading="lazy"
                                  className="h-full w-full object-cover transition-transform duration-500 group-active:scale-105"
                                />
                              )}
                            </div>
                            <span className="mt-1.5 block text-sm">{link.name}</span>
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                )}

                {rest.map((column) => (
                  <div key={column.title} className="mb-5">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest">
                      {column.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {column.links.map((link) => (
                        <SheetClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors"
                          >
                            {link.swatch && (
                              <span
                                className="h-2 w-2 rounded-full ring-1 ring-foreground/15"
                                style={{ backgroundColor: link.swatch }}
                              />
                            )}
                            {link.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                ))}

                <SheetClose asChild>
                  <Link
                    href={menu.viewAll.href}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest"
                  >
                    {menu.viewAll.name}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </SheetClose>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {links.map((link) => (
        <SheetClose asChild key={link.href}>
          <Link
            href={link.href}
            className="block border-b border-border py-4 text-base font-medium tracking-widest uppercase"
          >
            {link.name}
          </Link>
        </SheetClose>
      ))}
    </nav>
  );
}
