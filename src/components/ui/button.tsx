import { Children, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-card hover:brightness-110",
  secondary: "bg-surface text-ink ring-1 ring-line-strong hover:bg-surface-muted",
  ghost: "text-ink-muted hover:bg-surface-muted hover:text-ink",
  danger: "bg-critical-soft text-critical hover:brightness-95",
};

const sizes: Record<Size, string> = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-9.5 gap-2 px-4 text-sm",
};

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  /** Render the single child element with the button styles instead of a <button>. */
  asChild?: boolean;
};

export function Button({ variant = "secondary", size = "md", asChild, className, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-tile font-medium transition-all",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant], sizes[size], className,
  );

  if (asChild) {
    const child = Children.only(props.children);
    if (isValidElement<{ className?: string }>(child)) {
      return cloneElement(child, { className: cn(classes, child.props.className) });
    }
  }

  return <button className={classes} {...props} />;
}
