import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconTile } from "./icon-tile";
import type { Accent } from "./accent";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-card bg-surface shadow-card", className)} {...props} />;
}

/** A card nested inside another card — flat, tinted, no shadow. */
export function Panel({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-tile bg-surface-muted/70 p-4", className)} {...props} />;
}

export function CardHeader({
  title, description, icon, accent = "violet", action, className,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  accent?: Accent;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 px-5 pt-5 pb-4", className)}>
      {icon && <IconTile icon={icon} accent={accent} />}
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-[15px] font-semibold tracking-tight text-ink">{title}</h2>
        {description && <p className="truncate text-xs text-ink-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function CardBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-5 pb-5", className)} {...props} />;
}
