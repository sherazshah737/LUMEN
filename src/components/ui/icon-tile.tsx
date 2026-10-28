import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { accentTile, type Accent } from "./accent";

export function IconTile({
  icon: Icon, accent = "violet", size = 36, className,
}: { icon: LucideIcon; accent?: Accent; size?: number; className?: string }) {
  return (
    <span
      style={{ width: size, height: size }}
      className={cn("inline-flex shrink-0 items-center justify-center rounded-tile", accentTile[accent], className)}
    >
      <Icon size={size * 0.47} strokeWidth={2.1} />
    </span>
  );
}
