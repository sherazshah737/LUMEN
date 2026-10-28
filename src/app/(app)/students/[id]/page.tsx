import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen, CalendarClock, ClipboardCheck, GraduationCap, Mail, MessageSquare, TrendingUp,
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
import { BarChart } from "@/components/charts/bar-chart";
import { subjectAccent } from "@/components/ui/accent";
import { assignmentById, courseById, studentById, submissions } from "@/data/mock";
import { formatDate, formatDateTime, relativeTime } from "@/lib/utils";

export default async function StudentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = studentById(id);
  if (!student) notFound();

  const rows = submissions.filter((s) => s.studentId === id);
  const courses = student.courseIds.map(courseById).filter(Boolean);
  const scores = [
    { label: "Wk 1", value: Math.max(30, student.averageGrade - 12) },
    { label: "Wk 2", value: Math.max(30, student.averageGrade - 6) },
    { label: "Wk 3", value: student.averageGrade },
    { label: "Wk 4", value: Math.min(100, student.averageGrade + 4) },
    { label: "Wk 5", value: Math.min(100, student.averageGrade + 2) },
    { label: "Wk 6", value: Math.min(100, student.averageGrade + 7) },
  ];

  return (
    <Page
      title={student.name}
      description={`${student.email} · ${student.cohort} · joined ${formatDate(student.enrolled)}`}
      actions={
        <>
          <Button variant="secondary"><Mail size={15} /> Email</Button>
          <Button variant="primary" asChild><Link href="/messages"><MessageSquare size={15} /> Message</Link></Button>
        </>
      }
    >
      <Card>
        <CardBody className="flex flex-wrap items-center gap-4 pt-5">
          <Avatar name={student.name} size={56} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-base font-semibold">{student.name}</p>
              <Badge tone={statusTone[student.status]}>{student.status.replace("-", " ")}</Badge>
            </div>
            <p className="mt-0.5 text-[13px] text-ink-muted">
              Last active {relativeTime(student.lastActive)} · {courses.length} courses enrolled
            </p>
          </div>
        </CardBody>
      </Card>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Overall progress" value={`${student.progress}%`} icon={TrendingUp} accent="violet" />
        <Stat label="Average grade" value={student.averageGrade ? `${student.averageGrade}%` : "—"} delta={student.averageGrade >= 70 ? 5 : -3} icon={GraduationCap} accent="mint" />
        <Stat label="Submissions" value={String(rows.length)} icon={ClipboardCheck} accent="peach" />
        <Stat label="Courses" value={String(courses.length)} icon={BookOpen} accent="sky" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="flex flex-col xl:col-span-2">
          <CardHeader title="Grade trend" description="Marked work, most recent six weeks" icon={TrendingUp} accent="violet" />
          <CardBody className="min-h-[240px] flex-1"><BarChart data={scores} height="100%" name="Score" /></CardBody>
        </Card>

        <Card>
          <CardHeader title="Enrolled courses" description="Progress per course" icon={BookOpen} accent="sky" />
          <CardBody className="space-y-3">
            {courses.map((c, i) => {
              const accent = subjectAccent[c!.subject] ?? "violet";
              const progress = Math.max(5, student.progress - i * 11);
              return (
                <div key={c!.id} className="flex items-center gap-3">
                  <IconTile icon={BookOpen} accent={accent} size={32} />
                  <div className="min-w-0 flex-1">
                    <Link href={`/courses/${c!.id}`} className="block truncate text-[13px] font-medium hover:text-brand">
                      {c!.title}
                    </Link>
                    <Progress value={progress} accent={accent} className="mt-1.5" />
                  </div>
                  <span className="shrink-0 text-xs tabular-nums text-ink-muted">{progress}%</span>
                </div>
              );
            })}
          </CardBody>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader title="Submission history" description="Every piece of work handed in" icon={CalendarClock} accent="amber" />
        <CardBody className="pt-0">
          <Table>
            <thead>
              <tr><Th>Assignment</Th><Th>Submitted</Th><Th>Attempt</Th><Th>Status</Th><Th>Score</Th></tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <Tr key={s.id}>
                  <Td className="font-medium">{assignmentById(s.assignmentId)?.title}</Td>
                  <Td className="text-xs whitespace-nowrap text-ink-muted">
                    {s.submittedAt ? formatDateTime(s.submittedAt) : "Not submitted"}
                  </Td>
                  <Td className="tabular-nums text-ink-muted">{s.attempt} of {s.maxAttempts}</Td>
                  <Td><Badge tone={statusTone[s.status]}>{s.status}</Badge></Td>
                  <Td className="tabular-nums font-medium">{s.score ?? "—"}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Page>
  );
}
