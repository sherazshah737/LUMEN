import Link from "next/link";
import {
  ArrowRight, BookOpen, CalendarClock, ClipboardCheck, GraduationCap,
  MessagesSquare, TrendingUp, Users,
} from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, Th, Td, Tr } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { IconTile } from "@/components/ui/icon-tile";
import { AiStrip } from "@/components/ui/ai-strip";
import { subjectAccent } from "@/components/ui/accent";
import { assignments, courseById, courses, students, threads } from "@/data/mock";
import { formatDateShort, formatNumber, relativeTime } from "@/lib/utils";

export default function DashboardPage() {
  const live = courses.filter((c) => c.status === "published");
  const enrolled = live.reduce((sum, c) => sum + c.enrolled, 0);
  const awaiting = assignments.reduce((sum, a) => sum + a.awaiting, 0);
  const atRisk = students.filter((s) => s.status === "at-risk" || s.status === "dormant");

  return (
    <Page
      title="Good morning, Imran"
      description="Monday 27 October · Autumn 2026 term, week 7"
      actions={<Button variant="primary">New course</Button>}
    >
      <AiStrip
        headline="Classical Mechanics is slipping"
        detail="completion fell 8% this week and 105 lab reports are unmarked. Three students have not opened week 6."
      />

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title="This term at a glance"
            description="Compared with Autumn 2025"
            icon={TrendingUp}
            accent="violet"
          />
          <CardBody className="grid gap-3 sm:grid-cols-2">
            <Stat label="Active enrolments" value={formatNumber(enrolled)} delta={12} hint="vs last term" icon={Users} accent="violet" />
            <Stat label="Live courses" value={String(live.length)} hint="2 awaiting review" icon={BookOpen} accent="sky" />
            <Stat label="Awaiting marking" value={String(awaiting)} delta={-8} hint="across 6 assignments" icon={ClipboardCheck} accent="peach" />
            <Stat label="Average grade" value="74%" delta={3} hint="cohort mean" icon={GraduationCap} accent="mint" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Deadlines this week"
            description={`${awaiting} submissions unmarked`}
            icon={CalendarClock}
            accent="peach"
          />
          <CardBody className="space-y-2">
            {assignments.slice(0, 4).map((a) => {
              const course = courseById(a.courseId);
              return (
                <Link
                  key={a.id}
                  href={`/assignments/${a.id}`}
                  className="flex items-start gap-3 rounded-tile p-2.5 transition hover:bg-surface-muted/70"
                >
                  <IconTile icon={ClipboardCheck} accent={subjectAccent[course?.subject ?? ""] ?? "violet"} size={32} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">{a.title}</p>
                    <p className="truncate text-[11px] text-ink-faint">
                      {course?.title} · due {formatDateShort(a.dueDate)}
                    </p>
                  </div>
                  <Badge tone={a.awaiting > 50 ? "critical" : a.awaiting > 0 ? "warning" : "positive"} dot={false}>
                    {a.awaiting}
                  </Badge>
                </Link>
              );
            })}
          </CardBody>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Courses needing attention"
            description="Lowest completion first"
            icon={BookOpen}
            accent="sky"
            action={
              <Button size="sm" variant="ghost" asChild>
                <Link href="/courses">All courses <ArrowRight size={13} /></Link>
              </Button>
            }
          />
          <CardBody className="pt-0">
            <Table>
              <thead>
                <tr>
                  <Th>Course</Th>
                  <Th>Status</Th>
                  <Th>Enrolled</Th>
                  <Th className="w-44">Completion</Th>
                </tr>
              </thead>
              <tbody>
                {[...live].sort((a, b) => a.completionRate - b.completionRate).slice(0, 5).map((c) => {
                  const accent = subjectAccent[c.subject] ?? "violet";
                  return (
                    <Tr key={c.id}>
                      <Td>
                        <div className="flex items-center gap-3">
                          <IconTile icon={BookOpen} accent={accent} size={34} />
                          <div className="min-w-0">
                            <Link href={`/courses/${c.id}`} className="block truncate font-medium hover:text-brand">
                              {c.title}
                            </Link>
                            <p className="truncate text-[11px] text-ink-faint">{c.subject} · {c.level}</p>
                          </div>
                        </div>
                      </Td>
                      <Td><Badge tone={statusTone[c.status]}>{c.status}</Badge></Td>
                      <Td className="tabular-nums text-ink-muted">{formatNumber(c.enrolled)}</Td>
                      <Td>
                        <div className="flex items-center gap-2.5">
                          <Progress value={c.completionRate} accent={accent} dashed className="w-24" />
                          <span className="text-xs font-medium tabular-nums text-ink-muted">{c.completionRate}%</span>
                        </div>
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Students at risk"
            description="Low progress or inactive"
            icon={Users}
            accent="rose"
          />
          <CardBody className="space-y-2">
            {atRisk.slice(0, 5).map((s) => (
              <Link
                key={s.id}
                href={`/students/${s.id}`}
                className="flex items-center gap-3 rounded-tile p-2.5 transition hover:bg-surface-muted/70"
              >
                <Avatar name={s.name} size={34} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{s.name}</p>
                  <p className="truncate text-[11px] text-ink-faint">Active {relativeTime(s.lastActive)}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Progress value={s.progress} accent={s.progress < 30 ? "rose" : "amber"} className="w-14" />
                  <span className="w-8 text-right text-[11px] font-medium tabular-nums text-ink-muted">
                    {s.progress}%
                  </span>
                </div>
              </Link>
            ))}
          </CardBody>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader
          title="Open discussion threads"
          description="Unresolved questions from your cohorts"
          icon={MessagesSquare}
          accent="amber"
          action={
            <Button size="sm" variant="secondary" asChild>
              <Link href="/discussions">Open discussions</Link>
            </Button>
          }
        />
        <CardBody className="pt-0">
          <Table>
            <thead>
              <tr>
                <Th>Thread</Th>
                <Th>Course</Th>
                <Th>Replies</Th>
                <Th>Last reply</Th>
              </tr>
            </thead>
            <tbody>
              {threads.filter((t) => !t.resolved).map((t) => (
                <Tr key={t.id}>
                  <Td className="font-medium">{t.title}</Td>
                  <Td className="text-ink-muted">{courseById(t.courseId)?.title}</Td>
                  <Td className="tabular-nums text-ink-muted">{t.replies}</Td>
                  <Td className="text-xs whitespace-nowrap text-ink-faint">{relativeTime(t.lastReplyAt)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Page>
  );
}
