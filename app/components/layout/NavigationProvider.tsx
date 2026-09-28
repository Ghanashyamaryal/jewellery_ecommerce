"use client";

import { createContext, type ReactNode } from "react";
import type { NavigationData } from "@/types/navigation";

export const NavigationContext = createContext<NavigationData>({ menus: [], links: [] });

export function NavigationProvider({
  value,
  children,
}: {
  value: NavigationData;
  children: ReactNode;
}) {
  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}
