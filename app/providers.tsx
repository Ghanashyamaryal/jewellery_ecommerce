"use client";

import { Provider } from "react-redux";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { store } from "./store/store";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner position="top-center" />
      </TooltipProvider>
    </Provider>
  );
}
