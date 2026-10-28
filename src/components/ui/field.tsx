import { cn } from "@/lib/utils";

export function Field({
  label, hint, children, className,
}: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-[13px] font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-[11px] text-ink-faint">{hint}</span>}
    </label>
  );
}

const control =
  "w-full rounded-tile bg-surface-muted/70 px-3 text-sm text-ink placeholder:text-ink-faint " +
  "focus:bg-surface focus:outline-2 focus:outline-offset-1 focus:outline-brand transition";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(control, "h-9.5", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(control, "min-h-24 py-2.5 leading-relaxed", className)} {...props} />;
}

export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <select className={cn(control, "h-9.5 pr-8", className)} {...props}>
      {children}
    </select>
  );
}

export function Toggle({ checked, label }: { checked?: boolean; label: string }) {
  return (
    <label className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-[13px] text-ink">{label}</span>
      <input type="checkbox" defaultChecked={checked} className="peer sr-only" />
      <span className="relative h-5 w-9 shrink-0 cursor-pointer rounded-full bg-line-strong transition peer-checked:bg-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
        <span className="absolute top-0.5 left-0.5 size-4 rounded-full bg-white transition peer-checked:translate-x-4" />
      </span>
    </label>
  );
}
