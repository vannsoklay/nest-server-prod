import Link from "next/link";
import { Icon } from "@iconify/react";

import type { PublicProduct, PublicMerchant } from "@/types/storefront";
import type { ThemeConfig } from "@/types/theme";
import { formatCurrency } from "@/lib/formatters/currency";
import { radiusValue } from "@/components/storefront/storefront-shell";

export function ProductCard({
  config,
  merchant,
  product,
}: {
  config: ThemeConfig;
  merchant: PublicMerchant;
  product: PublicProduct;
}) {
  const media = product.media[0];
  const price =
    product.variants.length > 0
      ? Math.min(...product.variants.map((variant) => Number(variant.price)))
      : Number(product.price);
  const availabilityLabel = product.isPurchasable
    ? "In stock"
    : product.isAvailable
      ? "Browsing only"
      : "Sold out";
  const hasVariants = product.variants.length > 0;

  return (
    <Link
      className="group flex min-h-full flex-col overflow-hidden border transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
      href={`/${merchant.slug}/products/${product.slug}`}
      style={{
        backgroundColor: config.colors.background,
        borderColor: `color-mix(in srgb, ${config.colors.text} 10%, transparent)`,
        borderRadius: radiusValue(config.layout.borderRadius),
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
        {media?.type === "IMAGE" && (
          <div
            className="size-full bg-cover bg-center transition duration-500 group-hover:scale-[1.02]"
            style={{ backgroundImage: `url("${media.url}")` }}
          />
        )}
        {media?.type === "VIDEO" && (
          <video
            className="size-full object-cover transition duration-500 group-hover:scale-[1.02]"
            muted
            playsInline
            src={media.url}
          />
        )}
        {!media && (
          <div className="grid size-full place-items-center px-6 text-center text-sm opacity-50">
            {product.name}
          </div>
        )}
        <span
          className="absolute left-3 top-3 inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-md"
          style={{
            backgroundColor: product.isPurchasable
              ? `color-mix(in srgb, ${config.colors.background} 86%, transparent)`
              : "#fee2e2",
            borderColor: `color-mix(in srgb, ${config.colors.text} 10%, transparent)`,
            color: product.isPurchasable ? config.colors.text : "#b91c1c",
            borderRadius: radiusValue(config.layout.borderRadius),
          }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{
              backgroundColor: product.isPurchasable ? "#16a34a" : "#dc2626",
            }}
          />
          {availabilityLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3
          className="line-clamp-2 font-semibold leading-6"
          style={{
            fontFamily: `${config.typography.headingFont}, ui-sans-serif, system-ui, sans-serif`,
          }}
        >
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-5 opacity-60">
            {product.description}
          </p>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] opacity-45">
              {hasVariants ? "From" : "Price"}
            </p>
            <p className="font-semibold">
              {formatCurrency(price, product.currency)}
            </p>
          </div>
          {hasVariants && (
            <span
              className="inline-flex h-8 items-center gap-1 border px-2.5 text-xs font-semibold"
              style={{
                borderColor: `color-mix(in srgb, ${config.colors.accent} 18%, transparent)`,
                borderRadius: radiusValue(config.layout.borderRadius),
                color: config.colors.accent,
              }}
            >
              <Icon className="size-3.5" icon="gravity-ui:layers-3-diagonal" />
              {product.variants.length + 1}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
