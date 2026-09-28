import { Fragment } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Product } from "@/types/catalog";

export function ProductBreadcrumb({ product }: { product: Product }) {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: product.category.name, href: `/shop/${product.category.slug}` },
    ...(product.subcategory
      ? [
          {
            label: product.subcategory.name,
            href: `/shop/${product.category.slug}/${product.subcategory.slug}`,
          },
        ]
      : []),
  ];

  return (
    <Breadcrumb className="w-full max-w-390 mx-auto px-4 lg:px-8 pt-6">
      <BreadcrumbList>
        {trail.map((crumb) => (
          <Fragment key={crumb.href}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={crumb.href}>{crumb.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1">{product.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
