import type { DashboardIconName } from "@/components/dashboard/dashboard-icon";
import { DashboardIcon } from "@/components/dashboard/dashboard-icon";

export function MetricCard({
  accent,
  helper,
  icon,
  label,
  value,
}: {
  accent: "accent" | "danger" | "success" | "warning";
  helper: string;
  icon: DashboardIconName;
  label: string;
  value: string;
}) {
  const colors = {
    accent: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    danger: "bg-red-500/10 text-red-700 dark:text-red-300",
    success:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    warning: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  };

  return (
    <article className="rounded-2xl border border-separator bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted">{label}</p>
          <p className="mt-2 truncate text-2xl font-semibold tracking-normal">
            {value}
          </p>
        </div>
        <span
          className={`grid size-10 shrink-0 place-items-center rounded-xl ${colors[accent]}`}
        >
          <DashboardIcon name={icon} />
        </span>
      </div>
      <div className="mt-5 border-t border-separator pt-3">
        <p className="truncate text-xs font-medium text-muted">{helper}</p>
      </div>
    </article>
  );
}
