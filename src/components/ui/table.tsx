import { cn } from "@/lib/utils";

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  );
}

export function Th({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "bg-surface-muted/60 px-5 py-2.5 text-left text-[11px] font-semibold tracking-wide whitespace-nowrap",
        "text-ink-faint uppercase first:rounded-l-tile last:rounded-r-tile",
        className,
      )}
      {...props}
    />
  );
}

export function Td({ className, ...props }: React.ComponentProps<"td">) {
  return <td className={cn("px-5 py-3.5 align-middle text-ink", className)} {...props} />;
}

export function Tr({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn("border-b border-line/70 transition-colors last:border-0 hover:bg-surface-muted/50", className)}
      {...props}
    />
  );
}
