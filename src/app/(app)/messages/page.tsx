import { Paperclip, Search, Send } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { conversations } from "@/data/mock";
import { cn, formatDateTime, relativeTime } from "@/lib/utils";

export default function MessagesPage() {
  const open = conversations[0];
  const unread = conversations.reduce((sum, c) => sum + c.unread, 0);

  return (
    <Page title="Messages" description={`${conversations.length} conversations · ${unread} unread`}>
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card className="flex h-[640px] flex-col">
          <div className="p-4">
            <label className="relative block">
              <Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-faint" />
              <input
                type="search"
                placeholder="Search messages"
                className="h-9.5 w-full rounded-tile bg-surface-muted/70 pr-3 pl-9 text-sm placeholder:text-ink-faint focus:bg-surface focus:outline-2 focus:outline-offset-1 focus:outline-brand"
              />
            </label>
          </div>
          <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto px-2 pb-2">
            {conversations.map((c, i) => (
              <li key={c.id}>
                <button
                  className={cn(
                    "flex w-full items-start gap-3 rounded-tile p-2.5 text-left transition",
                    i === 0 ? "bg-brand-soft" : "hover:bg-surface-muted/70",
                  )}
                >
                  <Avatar name={c.withName} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-[13px] font-semibold">{c.withName}</p>
                      <span className="shrink-0 text-[10px] text-ink-faint">{relativeTime(c.lastAt)}</span>
                    </div>
                    <p className="truncate text-[12px] text-ink-muted">{c.preview}</p>
                  </div>
                  {c.unread > 0 && <Badge tone="brand" dot={false}>{c.unread}</Badge>}
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="flex h-[640px] flex-col">
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <Avatar name={open.withName} size={38} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{open.withName}</p>
              <p className="truncate text-[12px] text-ink-faint capitalize">{open.withRole}</p>
            </div>
            <Button size="sm" variant="secondary">View profile</Button>
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">
            {open.messages.map((m) => (
              <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                <div className="max-w-[72%]">
                  <div
                    className={cn(
                      "rounded-card px-4 py-2.5 text-[13px] leading-relaxed",
                      m.from === "me" ? "bg-brand text-white" : "bg-surface-muted text-ink",
                    )}
                  >
                    {m.body}
                  </div>
                  <p className={cn("mt-1 text-[10px] text-ink-faint", m.from === "me" && "text-right")}>
                    {formatDateTime(m.sentAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <CardBody className="flex items-end gap-2 border-t border-line pt-4">
            <Button variant="ghost" size="sm" aria-label="Attach a file"><Paperclip size={16} /></Button>
            <textarea
              rows={1}
              placeholder="Write a reply…"
              className="min-h-9.5 flex-1 resize-none rounded-tile bg-surface-muted/70 px-3 py-2.5 text-sm placeholder:text-ink-faint focus:bg-surface focus:outline-2 focus:outline-offset-1 focus:outline-brand"
            />
            <Button variant="primary"><Send size={15} /> Send</Button>
          </CardBody>
        </Card>
      </div>
    </Page>
  );
}
