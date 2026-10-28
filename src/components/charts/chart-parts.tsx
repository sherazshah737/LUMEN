"use client";

type TooltipEntry = { name?: string; value?: number | string; color?: string };

type ChartTooltipProps = {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
};

export const axisProps = {
  stroke: "var(--ink-faint)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
  tickMargin: 8,
} as const;

export const gridProps = {
  stroke: "var(--line)",
  strokeDasharray: "3 3",
  vertical: false,
} as const;

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-tile bg-surface px-3 py-2 shadow-raised">
      <p className="mb-1 text-[11px] font-medium text-ink-faint">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="flex items-center gap-2 text-xs">
          <span className="size-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-ink-muted">{entry.name}</span>
          <span className="ml-auto font-semibold tabular-nums text-ink">
            {typeof entry.value === "number" ? entry.value.toLocaleString("en-GB") : entry.value}
          </span>
        </p>
      ))}
    </div>
  );
}
