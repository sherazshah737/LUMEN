import { cn } from "@/lib/utils";
import { initials } from "@/lib/utils";

export function Avatar({ name, size = 32, className }: { name: string; size?: number; className?: string }) {
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-brand-soft font-semibold text-brand",
        className,
      )}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
