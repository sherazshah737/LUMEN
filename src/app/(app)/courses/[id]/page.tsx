import { notFound } from "next/navigation";
import { CalendarClock, ClipboardCheck, GraduationCap, Megaphone, TrendingUp, Users } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { Badge } from "@/components/ui/badge";
import { Table, Th, Td, Tr } from "@/components/ui/table";
import { AreaChart } from "@/components/charts/area-chart";
import { announcements, assignments, courseById, enrolmentSeries } from "@/data/mock";
import { formatDate, formatNumber, percent, relativeTime } from "@/lib/utils";

export default async function CourseOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = courseById(id);
  if (!course) notFound();

  const courseAssignments = assignments.filter((a) => a.courseId === id);
  const courseNotices = announcements.filter((a) => a.courseId === id);

  return (
    <div className="space-y-4">
      <p className="max-w-3xl text-[14px] leading-relaxed text-ink-muted">{course.summary}</p>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="flex flex-col xl:col-span-2">
          <CardHeader title="Enrolment trend" description="New enrolments per month" icon={TrendingUp} accent="violet" />
          <CardBody className="min-h-[280px] flex-1">
            <AreaChart data={enrolmentSeries} height="100%" showPrevious />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Course health" description="This term" icon={GraduationCap} accent="mint" />
          <CardBody className="grid gap-3">
            <Stat label="Enrolled" value={formatNumber(course.enrolled)} hint={`${percent(course.enrolled, course.capacity)}% of capacity`} icon={Users} accent="violet" />
            <Stat label="Completion" value={`${course.completionRate}%`} delta={course.completionRate > 70 ? 4 : -6} icon={TrendingUp} accent="sky" />
            <Stat label="Average grade" value={`${course.averageGrade}%`} delta={2} icon={GraduationCap} accent="mint" />
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Assignments" description={`${courseAssignments.length} set this term`} icon={ClipboardCheck} accent="peach" />
          <CardBody className="pt-0">
            <Table>
              <thead>
                <tr><Th>Title</Th><Th>Due</Th><Th>Submitted</Th><Th>Unmarked</Th></tr>
              </thead>
              <tbody>
                {courseAssignments.map((a) => (
                  <Tr key={a.id}>
                    <Td className="font-medium">{a.title}</Td>
                    <Td className="text-xs whitespace-nowrap text-ink-muted">{formatDate(a.dueDate)}</Td>
                    <Td className="tabular-nums text-ink-muted">{a.submitted} / {a.cohortSize}</Td>
                    <Td>
                      <Badge tone={a.awaiting > 50 ? "critical" : a.awaiting > 0 ? "warning" : "positive"} dot={false}>
                        {a.awaiting}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Announcements" description="Posted to this cohort" icon={Megaphone} accent="amber" />
          <CardBody className="space-y-3">
            {courseNotices.map((n) => (
              <div key={n.id} className="rounded-tile bg-surface-muted/60 p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13px] font-semibold">{n.title}</p>
                  {n.pinned && <Badge tone="brand" dot={false}>Pinned</Badge>}
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">{n.body}</p>
                <p className="mt-2 flex items-center gap-1.5 text-[11px] text-ink-faint">
                  <CalendarClock size={12} /> {relativeTime(n.postedAt)} · {n.openRate}% opened
                </p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
