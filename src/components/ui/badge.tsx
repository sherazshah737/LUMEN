import { cn } from "@/lib/utils";

type Tone = "neutral" | "brand" | "positive" | "warning" | "critical";

const tones: Record<Tone, { chip: string; dot: string }> = {
  neutral: { chip: "bg-surface-muted text-ink-muted", dot: "bg-ink-faint" },
  brand: { chip: "bg-brand-soft text-brand", dot: "bg-brand" },
  positive: { chip: "bg-positive-soft text-positive", dot: "bg-positive" },
  warning: { chip: "bg-warning-soft text-warning", dot: "bg-warning" },
  critical: { chip: "bg-critical-soft text-critical", dot: "bg-critical" },
};

export function Badge({
  tone = "neutral", dot = true, className, children, ...props
}: React.ComponentProps<"span"> & { tone?: Tone; dot?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium whitespace-nowrap capitalize",
        tones[tone].chip, className,
      )}
      {...props}
    >
      {dot && <span className={cn("size-1.5 rounded-full", tones[tone].dot)} />}
      {children}
    </span>
  );
}

export const statusTone: Record<string, Tone> = {
  published: "positive", active: "positive", paid: "positive", marked: "positive",
  open: "brand", completed: "brand",
  "in-review": "warning", "at-risk": "warning", late: "warning", awaiting: "warning",
  draft: "neutral", dormant: "neutral", closed: "neutral", archived: "neutral", "not-started": "neutral",
  missing: "critical", resubmit: "critical", overdue: "critical", refunded: "critical",
};
