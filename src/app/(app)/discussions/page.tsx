import { CheckCircle2, MessagesSquare, Pin, Plus } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Select } from "@/components/ui/field";
import { courseById, studentById, threads } from "@/data/mock";
import { relativeTime } from "@/lib/utils";

export default function DiscussionsPage() {
  const openThreads = threads.filter((t) => !t.resolved);
  const replies = threads.reduce((sum, t) => sum + t.replies, 0);

  return (
    <Page
      title="Discussions"
      description={`${openThreads.length} unresolved · ${replies} replies this term`}
      actions={<Button variant="primary"><Plus size={16} /> Start a thread</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Open threads" value={String(openThreads.length)} icon={MessagesSquare} accent="amber" />
        <Stat label="Resolved" value={String(threads.length - openThreads.length)} delta={9} icon={CheckCircle2} accent="mint" />
        <Stat label="Median first reply" value="4.2 hr" delta={-18} hint="faster than last term" icon={MessagesSquare} accent="violet" />
      </div>

      <Card className="mt-4">
        <CardHeader
          title="All threads"
          description="Newest activity first"
          icon={MessagesSquare}
          accent="amber"
          action={
            <Select className="w-auto" defaultValue="all">
              <option value="all">All courses</option>
              <option>Data Structures &amp; Algorithms</option>
              <option>Linear Algebra Foundations</option>
              <option>Introduction to Databases</option>
            </Select>
          }
        />
        <CardBody className="space-y-2 pt-0">
          {threads.map((t) => {
            const author = studentById(t.authorId);
            return (
              <div
                key={t.id}
                className="flex flex-wrap items-center gap-3 rounded-tile p-3 transition hover:bg-surface-muted/70"
              >
                <Avatar name={author?.name ?? "?"} size={38} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-[13px] font-semibold">{t.title}</p>
                    {t.pinned && <Badge tone="brand" dot={false}><Pin size={10} /> Pinned</Badge>}
                    <Badge tone={t.resolved ? "positive" : "warning"}>{t.resolved ? "Resolved" : "Open"}</Badge>
                  </div>
                  <p className="mt-0.5 truncate text-[12px] text-ink-faint">
                    {author?.name} in {courseById(t.courseId)?.title} · last reply {relativeTime(t.lastReplyAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums">{t.replies}</p>
                    <p className="text-[10px] text-ink-faint">replies</p>
                  </div>
                  <Button size="sm" variant="secondary">Open</Button>
                </div>
              </div>
            );
          })}
        </CardBody>
      </Card>
    </Page>
  );
}
