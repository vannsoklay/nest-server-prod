import type {
  PublicArticle,
  PublicProduct,
  PublicStorefront,
} from "@/types/storefront";
import { Icon } from "@iconify/react";
import { normalizeThemeConfig } from "@/lib/theme/theme-data";
import { ProductCard } from "@/components/storefront/product-card";
import {
  radiusValue,
  StorefrontShell,
} from "@/components/storefront/storefront-shell";

export function StorefrontHome({
  articles,
  products,
  storefront,
}: {
  articles: PublicArticle[];
  products: PublicProduct[];
  storefront: PublicStorefront;
}) {
  const config = normalizeThemeConfig(storefront.theme.config);
  const enabledSections = config.sections.filter((section) => section.enabled);

  return (
    <StorefrontShell config={config} merchant={storefront.merchant}>
      <main>
        {enabledSections.map((section) => {
          switch (section.type) {
            case "hero":
              return config.layout.showHero ? (
                <Hero
                  config={config}
                  key={section.id}
                  merchantName={storefront.merchant.name}
                  products={[...storefront.featuredProducts, ...products]}
                />
              ) : null;
            case "productGrid":
              return (
                <ProductGrid
                  config={config}
                  key={section.id}
                  merchant={storefront.merchant}
                  products={products}
                  title="Shop all"
                />
              );
            case "featuredCollection":
              return (
                <ProductGrid
                  config={config}
                  key={section.id}
                  merchant={storefront.merchant}
                  products={storefront.featuredProducts.slice(0, 4)}
                  title={config.featuredCollection.title}
                />
              );
            case "socialFeed":
              return (
                <SocialFeed
                  articles={articles}
                  config={config}
                  key={section.id}
                  merchantSlug={storefront.merchant.slug}
                />
              );
            case "contactForm":
              return (
                <ContactSection
                  config={config}
                  email={storefront.merchant.email}
                  key={section.id}
                />
              );
            case "footer":
              return (
                <Footer
                  config={config}
                  key={section.id}
                  merchantName={storefront.merchant.name}
                />
              );
          }
        })}
      </main>
    </StorefrontShell>
  );
}

function Hero({
  config,
  merchantName,
  products,
}: {
  config: ReturnType<typeof normalizeThemeConfig>;
  merchantName: string;
  products: PublicProduct[];
}) {
  const heroImage =
    config.hero.imageUrl ||
    products.find((product) =>
      product.media.some((media) => media.type === "IMAGE"),
    )?.media.find((media) => media.type === "IMAGE")?.url ||
    "";
  const purchasableCount = products.filter((product) => product.isPurchasable)
    .length;
  const variantCount = products.reduce(
    (total, product) => total + product.variants.length,
    0,
  );

  return (
    <section className="mx-auto max-w-7xl px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-8">
      <div
        className="relative isolate flex min-h-[420px] items-end overflow-hidden px-6 py-8 sm:min-h-[500px] sm:px-12 sm:py-12 lg:min-h-[560px]"
        style={{
          backgroundColor: config.colors.primary,
          backgroundImage: heroImage
            ? `linear-gradient(90deg, rgb(0 0 0 / 76%), rgb(0 0 0 / 38%) 46%, rgb(0 0 0 / 10%)), url("${heroImage}")`
            : `linear-gradient(135deg, ${config.colors.primary}, color-mix(in srgb, ${config.colors.accent} 68%, #ffffff))`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: radiusValue(config.layout.borderRadius),
          color: "#ffffff",
        }}
      >
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur-md">
            <Icon className="size-3.5" icon="gravity-ui:bag" />
            <span>{merchantName}</span>
          </div>
          <h1
            className="mt-5 text-4xl font-semibold tracking-normal sm:text-6xl"
            style={{
              fontFamily: `${config.typography.headingFont}, ui-sans-serif, system-ui, sans-serif`,
            }}
          >
            {config.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 opacity-85 sm:text-lg">
            {config.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              className="inline-flex h-12 items-center gap-2 bg-white px-5 text-sm font-bold text-black transition hover:-translate-y-0.5"
              href="#products"
              style={{ borderRadius: radiusValue(config.layout.borderRadius) }}
            >
              <span>Shop products</span>
              <Icon className="size-4" icon="gravity-ui:arrow-right" />
            </a>
            {products.length > 0 && (
              <span className="inline-flex h-12 items-center rounded-full bg-black/20 px-4 text-sm font-semibold backdrop-blur-md">
                {purchasableCount || products.length} ready now
              </span>
            )}
          </div>
          <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            <HeroStat label="Products" value={products.length} />
            <HeroStat label="Options" value={variantCount + products.length} />
            <HeroStat label="Store" value="Online" />
          </dl>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border-t border-white/28 pt-3">
      <dt className="text-[11px] font-bold uppercase tracking-[0.16em] opacity-65">
        {label}
      </dt>
      <dd className="mt-1 text-lg font-semibold">{value}</dd>
    </div>
  );
}

function ProductGrid({
  config,
  merchant,
  products,
  title,
}: {
  config: ReturnType<typeof normalizeThemeConfig>;
  merchant: PublicStorefront["merchant"];
  products: PublicProduct[];
  title: string;
}) {
  const purchasableProducts = products.filter((product) => product.isPurchasable)
    .length;

  return (
    <section className={spacingClass(config.layout.spacing)} id="products">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]"
              style={{ color: config.colors.accent }}
            >
              <Icon className="size-3.5" icon="gravity-ui:circle-check" />
              <span>Available now</span>
            </p>
            <h2
              className="mt-2 text-3xl font-semibold tracking-normal"
              style={{
                fontFamily: `${config.typography.headingFont}, ui-sans-serif, system-ui, sans-serif`,
              }}
            >
              {title}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span
              className="inline-flex h-8 items-center border px-3 font-medium"
              style={{
                borderColor: `color-mix(in srgb, ${config.colors.text} 12%, transparent)`,
                borderRadius: radiusValue(config.layout.borderRadius),
              }}
            >
              {products.length} product{products.length === 1 ? "" : "s"}
            </span>
            <span
              className="inline-flex h-8 items-center px-3 font-medium"
              style={{
                backgroundColor: `color-mix(in srgb, ${config.colors.accent} 7%, ${config.colors.background})`,
                borderRadius: radiusValue(config.layout.borderRadius),
                color: config.colors.accent,
              }}
            >
              {purchasableProducts} purchasable
            </span>
          </div>
        </div>
        {products.length ? (
          <div
            className={`grid gap-x-5 gap-y-8 ${columnClass(config.layout.productGridColumns)}`}
          >
            {products.map((product) => (
              <ProductCard
                config={config}
                key={product.id}
                merchant={merchant}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div
            className="border px-6 py-16 text-center"
            style={{
              borderColor: `color-mix(in srgb, ${config.colors.text} 13%, transparent)`,
              borderRadius: radiusValue(config.layout.borderRadius),
            }}
          >
            <p className="font-semibold">The next collection is on its way</p>
            <p className="mt-2 text-sm opacity-60">
              There are no products published to this storefront right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function SocialFeed({
  articles,
  config,
  merchantSlug,
}: {
  articles: PublicArticle[];
  config: ReturnType<typeof normalizeThemeConfig>;
  merchantSlug: string;
}) {
  if (!articles.length) return null;

  return (
    <section className={spacingClass(config.layout.spacing)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]"
              style={{ color: config.colors.accent }}
            >
              <Icon className="size-3.5" icon="gravity-ui:sparkles" />
              <span>Store stories</span>
            </p>
            <h2
              className="mt-2 text-3xl font-semibold tracking-normal"
              style={{
                fontFamily: `${config.typography.headingFont}, ui-sans-serif, system-ui, sans-serif`,
              }}
            >
              {config.socialFeed.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 opacity-60">
            New launches, care notes, and product moments from the store.
          </p>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <article
              className="overflow-hidden border transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              key={article.id}
              style={{
                borderColor: `color-mix(in srgb, ${config.colors.text} 13%, transparent)`,
                borderRadius: radiusValue(config.layout.borderRadius),
              }}
            >
              <div
                className="aspect-[16/10] bg-black/5 bg-cover bg-center"
                style={
                  article.mediaUrls[0]
                    ? {
                        backgroundImage: `url("${article.mediaUrls[0]}")`,
                      }
                    : undefined
                }
              />
              <div className="p-5">
                <h3 className="font-semibold">{article.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 opacity-65">
                  {article.content}
                </p>
                <p
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide"
                  style={{ color: config.colors.accent }}
                >
                  <Icon className="size-3.5" icon="gravity-ui:arrow-up-right-from-square" />
                  <span>{merchantSlug} story</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({
  config,
  email,
}: {
  config: ReturnType<typeof normalizeThemeConfig>;
  email: string | null;
}) {
  return (
    <section className={spacingClass(config.layout.spacing)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          className="flex flex-col gap-5 border px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7"
          style={{
            backgroundColor: `color-mix(in srgb, ${config.colors.text} 4%, ${config.colors.background})`,
            borderColor: `color-mix(in srgb, ${config.colors.text} 12%, transparent)`,
            borderRadius: radiusValue(config.layout.borderRadius),
          }}
        >
          <div className="max-w-2xl">
            <h2
              className="text-2xl font-semibold"
              style={{
                fontFamily: `${config.typography.headingFont}, ui-sans-serif, system-ui, sans-serif`,
              }}
            >
              {config.contactForm.title}
            </h2>
            <p className="mt-2 text-sm leading-6 opacity-65">
              Questions about a product or your order? We would love to help.
            </p>
          </div>
          {email && (
            <a
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 px-5 text-sm font-bold text-white"
              href={`mailto:${email}`}
              style={{
                backgroundColor: config.colors.primary,
                borderRadius: radiusValue(config.layout.borderRadius),
              }}
            >
              <Icon className="size-4" icon="gravity-ui:envelope" />
              <span>Email store</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer({
  config,
  merchantName,
}: {
  config: ReturnType<typeof normalizeThemeConfig>;
  merchantName: string;
}) {
  return (
    <footer
      className="mt-12 border-t px-5 py-10 text-sm sm:px-8"
      style={{
        borderColor: `color-mix(in srgb, ${config.colors.text} 13%, transparent)`,
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>{config.footer.text}</p>
        <p className="text-xs opacity-50">© 2026 {merchantName}</p>
      </div>
    </footer>
  );
}

function spacingClass(
  spacing: ReturnType<typeof normalizeThemeConfig>["layout"]["spacing"],
) {
  return {
    compact: "py-8",
    comfortable: "py-12 sm:py-16",
    spacious: "py-16 sm:py-24",
  }[spacing];
}

function columnClass(columns: number) {
  if (columns <= 2) return "sm:grid-cols-2";
  if (columns >= 5) return "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
  return "sm:grid-cols-2 lg:grid-cols-3";
}
