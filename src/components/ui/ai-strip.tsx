import { ArrowRight, Sparkles } from "lucide-react";

export function AiStrip({ headline, detail, cta = "Review cohort" }: { headline: string; detail: string; cta?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-card bg-brand-soft px-4 py-3.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-tile bg-brand text-white">
        <Sparkles size={15} strokeWidth={2.2} />
      </span>
      <p className="min-w-0 flex-1 text-[13px] leading-relaxed text-ink">
        <span className="font-semibold">{headline}</span>
        <span className="text-ink-muted"> — {detail}</span>
      </p>
      <button className="inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-brand hover:gap-1.5">
        {cta} <ArrowRight size={14} />
      </button>
    </div>
  );
}
