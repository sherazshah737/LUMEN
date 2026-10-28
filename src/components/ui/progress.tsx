import { cn } from "@/lib/utils";
import { accentBar, type Accent } from "./accent";

export function Progress({
  value, accent = "violet", className, dashed = false,
}: { value: number; accent?: Accent; className?: string; dashed?: boolean }) {
  const pct = Math.min(100, Math.max(0, value));
  if (dashed) {
    return (
      <div className={cn("flex gap-[3px]", className)} role="progressbar" aria-valuenow={pct}>
        {Array.from({ length: 20 }, (_, i) => (
          <span
            key={i}
            className={cn("h-1.5 flex-1 rounded-full", i * 5 < pct ? accentBar[accent] : "bg-surface-muted")}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-muted", className)}>
      <div className={cn("h-full rounded-full transition-[width]", accentBar[accent])} style={{ width: `${pct}%` }} />
    </div>
  );
}
