"use client";

import { Icon } from "@iconify/react";
import { Button, Card, Chip } from "@heroui/react";
import { useState } from "react";

import type { PublicProductMedia } from "@/types/storefront";
import type { ThemeConfig } from "@/types/theme";
import { radiusValue } from "@/components/storefront/storefront-shell";

export function ProductGallery({
  config,
  media,
  productName,
}: {
  config: ThemeConfig;
  media: PublicProductMedia[];
  productName: string;
}) {
  const [selected, setSelected] = useState(0);
  const active = media[selected];

  return (
    <div className="space-y-4">
      <Card
        className="relative aspect-square overflow-hidden border shadow-none"
        variant="secondary"
        style={{
          backgroundColor: `color-mix(in srgb, ${config.colors.text} 4%, ${config.colors.background})`,
          borderColor: `color-mix(in srgb, ${config.colors.text} 10%, transparent)`,
          borderRadius: radiusValue(config.layout.borderRadius),
        }}
      >
        {media.length > 0 && (
          <span
            className="absolute right-4 top-4 z-10 inline-flex h-8 items-center gap-1.5 px-3 text-xs font-bold backdrop-blur-md"
            style={{
              backgroundColor: `color-mix(in srgb, ${config.colors.background} 78%, transparent)`,
              borderRadius: radiusValue(config.layout.borderRadius),
              color: config.colors.text,
            }}
          >
            <Icon className="size-3.5" icon="gravity-ui:image" />
            {selected + 1}/{media.length}
          </span>
        )}
        {active?.type === "IMAGE" && (
          <div
            aria-label={productName}
            className="size-full bg-cover bg-center"
            role="img"
            style={{ backgroundImage: `url("${active.url}")` }}
          />
        )}
        {active?.type === "VIDEO" && (
          <video
            className="size-full object-contain"
            controls
            playsInline
            src={active.url}
          />
        )}
        {!active && (
          <div className="grid size-full place-items-center px-8 text-center">
            <div>
              <Icon className="mx-auto size-10 opacity-35" icon="gravity-ui:image" />
              <p className="mt-3 text-lg font-semibold opacity-55">
                {productName}
              </p>
            </div>
          </div>
        )}
      </Card>
      {media.length > 1 && (
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-6">
          {media.map((item, index) => (
            <Button
              aria-label={`View media ${index + 1}`}
              className="aspect-square min-w-0 overflow-hidden border p-0 shadow-none transition hover:-translate-y-0.5"
              variant={selected === index ? "primary" : "secondary"}
              key={`${item.url}-${index}`}
              style={{
                borderColor:
                  selected === index
                    ? config.colors.primary
                    : `color-mix(in srgb, ${config.colors.text} 10%, transparent)`,
                borderRadius: radiusValue(config.layout.borderRadius),
              }}
              type="button"
              onPress={() => setSelected(index)}
            >
              {item.type === "IMAGE" && (
                <span
                  aria-hidden="true"
                  className="size-full bg-cover bg-center"
                  style={{ backgroundImage: `url("${item.url}")` }}
                />
              )}
              {item.type === "VIDEO" && (
                <span className="grid size-full place-items-center">
                  <Chip size="sm" variant="soft">
                    VIDEO
                  </Chip>
                </span>
              )}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
