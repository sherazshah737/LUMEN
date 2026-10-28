import type { LucideIcon } from "lucide-react";
import { IconTile } from "./icon-tile";
import type { Accent } from "./accent";

export function EmptyState({
  icon, title, description, action, accent = "violet",
}: { icon: LucideIcon; title: string; description: string; action?: React.ReactNode; accent?: Accent }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
      <IconTile icon={icon} accent={accent} size={44} />
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mx-auto mt-1 max-w-sm text-[13px] leading-relaxed text-ink-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}
