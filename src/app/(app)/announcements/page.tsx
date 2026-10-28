import { Eye, Megaphone, Pin, Plus, Send, Users } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Select, Textarea, Input } from "@/components/ui/field";
import { IconTile } from "@/components/ui/icon-tile";
import { Progress } from "@/components/ui/progress";
import { announcements, courseById, courses } from "@/data/mock";
import { formatNumber, relativeTime } from "@/lib/utils";

export default function AnnouncementsPage() {
  const totalReach = announcements.reduce((sum, a) => sum + a.reach, 0);
  const avgOpen = Math.round(announcements.reduce((sum, a) => sum + a.openRate, 0) / announcements.length);

  return (
    <Page title="Announcements" description={`${announcements.length} posted this term`}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Posted this term" value={String(announcements.length)} icon={Megaphone} accent="amber" />
        <Stat label="Total reach" value={formatNumber(totalReach)} icon={Users} accent="violet" />
        <Stat label="Average open rate" value={`${avgOpen}%`} delta={4} icon={Eye} accent="mint" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="space-y-3 xl:col-span-2">
          {announcements.map((a) => (
            <Card key={a.id}>
              <CardBody className="pt-5">
                <div className="flex items-start gap-3">
                  <IconTile icon={Megaphone} accent={a.pinned ? "amber" : "violet"} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[14px] font-semibold">{a.title}</p>
                      {a.pinned && <Badge tone="brand" dot={false}><Pin size={10} /> Pinned</Badge>}
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{a.body}</p>
                    <p className="mt-2 text-[11px] text-ink-faint">
                      {a.courseId ? courseById(a.courseId)?.title : "All courses"} · {relativeTime(a.postedAt)} ·
                      reached {formatNumber(a.reach)}
                    </p>
                    <div className="mt-2.5 flex items-center gap-2.5">
                      <Progress value={a.openRate} accent={a.openRate >= 70 ? "mint" : "amber"} className="max-w-40" />
                      <span className="shrink-0 text-[11px] font-medium tabular-nums text-ink-muted">
                        {a.openRate}% opened
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <CardHeader title="New announcement" description="Goes out by email and in-app" icon={Plus} accent="violet" />
          <CardBody className="space-y-3">
            <Field label="Audience">
              <Select defaultValue="all">
                <option value="all">All courses</option>
                {courses.filter((c) => c.status === "published").map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </Select>
            </Field>
            <Field label="Title"><Input placeholder="e.g. Reading week schedule" /></Field>
            <Field label="Message" hint="Keep it to a few sentences — open rates drop fast after that.">
              <Textarea placeholder="What do students need to know?" />
            </Field>
            <Button variant="primary" className="w-full"><Send size={15} /> Post announcement</Button>
          </CardBody>
        </Card>
      </div>
    </Page>
  );
}
