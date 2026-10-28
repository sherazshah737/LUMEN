import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconTile } from "./icon-tile";
import type { Accent } from "./accent";

export function Stat({
  label, value, delta, hint, icon, accent = "violet",
}: {
  label: string; value: string; delta?: number; hint?: string;
  icon: LucideIcon; accent?: Accent;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className="rounded-tile bg-surface-muted/60 p-4">
      <div className="flex items-center gap-2.5">
        <IconTile icon={icon} accent={accent} size={32} />
        <p className="text-[13px] font-medium text-ink-muted">{label}</p>
      </div>
      <p className="mt-3 text-[28px] leading-none font-semibold tracking-tight tabular-nums text-ink">{value}</p>
      <div className="mt-2 flex items-center gap-1.5 text-xs">
        {delta !== undefined && delta !== 0 && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-semibold",
              up ? "bg-positive-soft text-positive" : "bg-critical-soft text-critical",
            )}
          >
            {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(delta)}%
          </span>
        )}
        {hint && <span className="truncate text-ink-faint">{hint}</span>}
      </div>
    </div>
  );
}
