"use client";

import { Bell, Search } from "lucide-react";

export function Topbar({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <header className="flex flex-wrap items-center gap-4 px-4 pt-5 pb-4 sm:px-7 sm:pt-7 sm:pb-5">
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-[22px] leading-tight font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-0.5 truncate text-[13px] text-ink-muted">{description}</p>}
      </div>

      <label className="relative hidden md:block">
        <Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-faint" />
        <input
          type="search"
          placeholder="Search courses, students…"
          className="h-9.5 w-60 rounded-tile bg-surface pr-3 pl-9 text-sm shadow-card placeholder:text-ink-faint focus:outline-2 focus:outline-offset-1 focus:outline-brand"
        />
      </label>

      <button
        aria-label="Notifications"
        className="relative flex size-9.5 items-center justify-center rounded-tile bg-surface text-ink-muted shadow-card transition hover:text-ink"
      >
        <Bell size={17} />
        <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-critical ring-2 ring-surface" />
      </button>

      {actions}
    </header>
  );
}
