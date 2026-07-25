import type { CSSProperties } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

import type { PublicMerchant } from "@/types/storefront";
import type { ThemeConfig } from "@/types/theme";
import { StorefrontCustomerAuth } from "@/components/storefront/storefront-customer-auth";

type StorefrontStyle = CSSProperties & {
  "--store-accent": string;
  "--store-background": string;
  "--store-primary": string;
  "--store-text": string;
};

export function StorefrontShell({
  children,
  config,
  merchant,
}: {
  children: React.ReactNode;
  config: ThemeConfig;
  merchant: PublicMerchant;
}) {
  const style: StorefrontStyle = {
    "--store-accent": config.colors.accent,
    "--store-background": config.colors.background,
    "--store-primary": config.colors.primary,
    "--store-text": config.colors.text,
    backgroundColor: config.colors.background,
    color: config.colors.text,
    fontFamily: `${config.typography.bodyFont}, ui-sans-serif, system-ui, sans-serif`,
  };

  return (
    <div className="min-h-dvh" style={style}>
      <header
        className="sticky top-0 z-30 border-b shadow-[0_1px_0_rgb(255_255_255_/_0.32)] backdrop-blur-xl"
        style={{
          backgroundColor: `color-mix(in srgb, ${config.colors.background} 92%, transparent)`,
          borderColor: `color-mix(in srgb, ${config.colors.text} 14%, transparent)`,
        }}
      >
        <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link
            className="flex min-w-0 items-center gap-3"
            href={`/${merchant.slug}`}
          >
            {config.storefront.logoUrl ? (
              <span
                aria-label={merchant.name}
                className="block h-10 w-32 bg-contain bg-left bg-no-repeat"
                role="img"
                style={{
                  backgroundImage: `url("${config.storefront.logoUrl}")`,
                }}
              />
            ) : (
              <span
                className="grid size-10 shrink-0 place-items-center font-black text-white"
                style={{
                  backgroundColor: config.colors.primary,
                  borderRadius: radiusValue(config.layout.borderRadius),
                }}
              >
                {merchant.name.slice(0, 1).toUpperCase()}
              </span>
            )}
            <span
              className="min-w-0 truncate text-base font-semibold"
              style={{
                fontFamily: `${config.typography.headingFont}, ui-sans-serif, system-ui, sans-serif`,
              }}
            >
              {merchant.name}
            </span>
          </Link>
          <nav className="flex shrink-0 items-center gap-2 text-sm font-medium sm:gap-3">
            <Link
              className="inline-flex h-10 items-center gap-2 px-3"
              href={`/${merchant.slug}#products`}
              style={{
                borderRadius: radiusValue(config.layout.borderRadius),
              }}
            >
              <Icon className="size-4" icon="gravity-ui:magnifier" />
              <span className="hidden sm:inline">Shop</span>
            </Link>
            {merchant.email && (
              <a
                aria-label={`Contact ${merchant.name}`}
                className="hidden h-10 items-center gap-2 px-3 sm:inline-flex"
                href={`mailto:${merchant.email}`}
                style={{
                  borderRadius: radiusValue(config.layout.borderRadius),
                }}
              >
                <Icon className="size-4" icon="gravity-ui:envelope" />
                <span>Contact</span>
              </a>
            )}
            <StorefrontCustomerAuth />
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

export function radiusValue(radius: ThemeConfig["layout"]["borderRadius"]) {
  return {
    none: "0",
    small: "0.5rem",
    medium: "1rem",
    large: "1.75rem",
  }[radius];
}
