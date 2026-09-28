"use client";

import { useContext } from "react";
import { NavigationContext } from "@/components/layout/NavigationProvider";

export const useNavigation = () => useContext(NavigationContext);
