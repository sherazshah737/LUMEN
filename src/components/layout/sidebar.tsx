"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { navGroups } from "./nav-config";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn("flex h-full w-64 shrink-0 flex-col gap-1 p-3", className)}>
      <div className="flex items-center gap-2.5 px-2 py-3">
        <span className="flex size-9 items-center justify-center rounded-tile bg-brand text-white shadow-card">
          <GraduationCap size={19} strokeWidth={2.2} />
        </span>
        <div className="min-w-0">
          <p className="text-[15px] leading-tight font-semibold tracking-tight">Lumen</p>
          <p className="truncate text-[11px] text-ink-faint">Riverside College</p>
        </div>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto pt-1 pb-2">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-4">
            <p className="px-2 pb-2 text-[11px] font-semibold tracking-wide text-ink-faint uppercase">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-tile px-2 py-2 text-sm transition-all",
                        active
                          ? "bg-surface font-semibold text-ink shadow-card"
                          : "text-ink-muted hover:bg-surface/70 hover:text-ink",
                      )}
                    >
                      <Icon
                        size={17}
                        strokeWidth={active ? 2.3 : 2}
                        className={cn("shrink-0", active ? "text-brand" : "text-ink-faint")}
                      />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
                            active ? "bg-brand-soft text-brand" : "bg-critical-soft text-critical",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="rounded-card bg-promo p-4 text-promo-ink">
        <Sparkles size={17} className="text-brand" />
        <p className="mt-2 text-[13px] font-semibold">Lumen Assist</p>
        <p className="mt-0.5 text-[11px] leading-relaxed text-promo-ink/65">
          Draft feedback, spot at-risk cohorts and summarise submissions.
        </p>
        <button className="mt-3 h-8 w-full rounded-tile bg-brand text-xs font-semibold text-white transition hover:brightness-110">
          Open assistant
        </button>
      </div>

      <div className="mt-1 flex items-center gap-2.5 rounded-tile px-2 py-2 transition hover:bg-surface/70">
        <Avatar name="Imran Qureshi" size={32} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium">Dr Imran Qureshi</p>
          <p className="truncate text-[11px] text-ink-faint">Senior Lecturer</p>
        </div>
      </div>
    </aside>
  );
}
