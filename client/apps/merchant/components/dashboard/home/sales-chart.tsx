import type { SalesPoint } from "@/types/dashboard";
import { formatCurrency } from "@/lib/formatters/currency";

export function SalesChart({
  currency,
  sales,
}: {
  currency: string;
  sales: SalesPoint[];
}) {
  const maximum = Math.max(...sales.map(({ revenue }) => revenue), 1);
  const total = sales.reduce((sum, point) => sum + point.revenue, 0);
  const average = total / Math.max(sales.length, 1);

  return (
    <section className="rounded-2xl border border-separator bg-surface p-5 shadow-sm xl:col-span-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="font-semibold">Sales performance</h3>
          <p className="mt-1 text-xs text-muted">
            Paid revenue over seven days
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-right text-sm">
          <div className="rounded-xl bg-surface-secondary px-3 py-2">
            <p className="text-[11px] font-medium uppercase text-muted">
              Total
            </p>
            <p className="mt-1 font-semibold">
              {formatCurrency(total, currency)}
            </p>
          </div>
          <div className="rounded-xl bg-surface-secondary px-3 py-2">
            <p className="text-[11px] font-medium uppercase text-muted">
              Daily avg
            </p>
            <p className="mt-1 font-semibold">
              {formatCurrency(average, currency)}
            </p>
          </div>
        </div>
      </div>
      <div
        aria-label="Seven day paid revenue chart"
        className="mt-6 flex h-56 items-end gap-2 border-t border-separator pt-6 sm:gap-3"
        role="img"
      >
        {sales.map((point) => {
          const height =
            point.revenue === 0
              ? 4
              : Math.max(12, Math.round((point.revenue / maximum) * 100));

          return (
            <div
              className="group flex h-full min-w-0 flex-1 flex-col justify-end"
              key={point.date}
            >
              <div className="relative flex flex-1 items-end rounded-t-xl bg-surface-secondary/60">
                <div
                  className="w-full rounded-t-xl bg-accent/75 transition group-hover:bg-accent"
                  style={{ height: `${height}%` }}
                  title={`${point.label}: ${formatCurrency(
                    point.revenue,
                    currency,
                  )}`}
                />
              </div>
              <span className="mt-2 truncate text-center text-[10px] text-muted sm:text-xs">
                {point.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
