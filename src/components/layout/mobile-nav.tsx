"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { navGroups } from "./nav-config";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 bg-canvas/85 px-4 backdrop-blur lg:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="flex size-9 items-center justify-center rounded-tile bg-surface text-ink-muted shadow-card"
        >
          <Menu size={18} />
        </button>
        <span className="flex size-8 items-center justify-center rounded-tile bg-brand text-white">
          <GraduationCap size={17} strokeWidth={2.2} />
        </span>
        <span className="flex-1 text-[15px] font-semibold tracking-tight">Lumen</span>
        <Avatar name="Imran Qureshi" size={30} />
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
          />
          <nav className="absolute inset-y-0 left-0 flex w-72 flex-col bg-canvas p-3 shadow-raised">
            <div className="flex items-center gap-2.5 px-2 py-3">
              <span className="flex size-9 items-center justify-center rounded-tile bg-brand text-white">
                <GraduationCap size={19} strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] leading-tight font-semibold tracking-tight">Lumen</p>
                <p className="truncate text-[11px] text-ink-faint">Riverside College</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="flex size-8 items-center justify-center rounded-tile text-ink-muted hover:bg-surface"
              >
                <X size={17} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto pt-1">
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
                            onClick={() => setOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex items-center gap-2.5 rounded-tile px-2 py-2 text-sm transition",
                              active ? "bg-surface font-semibold text-ink shadow-card" : "text-ink-muted",
                            )}
                          >
                            <Icon size={17} className={cn("shrink-0", active ? "text-brand" : "text-ink-faint")} />
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.badge && (
                              <span className="rounded-md bg-critical-soft px-1.5 py-0.5 text-[11px] font-semibold text-critical tabular-nums">
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
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
