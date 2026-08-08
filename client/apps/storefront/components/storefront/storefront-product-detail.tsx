import Link from "next/link";
import { Icon } from "@iconify/react";

import type { PublicProduct, PublicStorefront } from "@/types/storefront";
import { formatCurrency } from "@/lib/formatters/currency";
import { normalizeThemeConfig } from "@/lib/theme/theme-data";
import { ProductGallery } from "@/components/storefront/product-gallery";
import { PurchasePanel } from "@/components/storefront/purchase-panel";
import {
  radiusValue,
  StorefrontShell,
} from "@/components/storefront/storefront-shell";

export function StorefrontProductDetail({
  product,
  storefront,
}: {
  product: PublicProduct;
  storefront: PublicStorefront;
}) {
  const config = normalizeThemeConfig(storefront.theme.config);
  const lowestPrice =
    product.variants.length > 0
      ? Math.min(...product.variants.map((variant) => Number(variant.price)))
      : Number(product.price);

  return (
    <StorefrontShell config={config} merchant={storefront.merchant}>
      <main className="mx-auto max-w-7xl px-5 py-5 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold"
            href={`/${storefront.merchant.slug}`}
            style={{ color: config.colors.accent }}
          >
            <Icon className="size-4" icon="gravity-ui:arrow-left" />
            <span>Back to {storefront.merchant.name}</span>
          </Link>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span
              className="inline-flex h-8 items-center gap-1.5 px-3"
              style={{
                backgroundColor: `color-mix(in srgb, ${config.colors.text} 6%, ${config.colors.background})`,
                borderRadius: radiusValue(config.layout.borderRadius),
              }}
            >
              <Icon className="size-3.5" icon="gravity-ui:tag" />
              {product.variants.length ? "From " : ""}
              {formatCurrency(lowestPrice, product.currency)}
            </span>
            <span
              className="inline-flex h-8 items-center gap-1.5 px-3"
              style={{
                backgroundColor: `color-mix(in srgb, ${config.colors.accent} 10%, ${config.colors.background})`,
                borderRadius: radiusValue(config.layout.borderRadius),
                color: config.colors.accent,
              }}
            >
              <Icon className="size-3.5" icon="gravity-ui:layers-3-diagonal" />
              {product.variants.length + 1} option
              {product.variants.length === 0 ? "" : "s"}
            </span>
          </div>
        </div>
        <div className="mt-5 grid gap-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] lg:gap-10">
          <ProductGallery
            config={config}
            media={product.media}
            productName={product.name}
          />
          <PurchasePanel
            config={config}
            merchantSlug={storefront.merchant.slug}
            product={product}
          />
        </div>
      </main>
    </StorefrontShell>
  );
}
