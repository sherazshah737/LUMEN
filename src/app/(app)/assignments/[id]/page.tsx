import Link from "next/link";
import { notFound } from "next/navigation";
import { ClipboardCheck, FileText, Scale, Users } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, Th, Td, Tr } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { assignmentById, courseById, studentById, submissions } from "@/data/mock";
import { formatDate, formatDateTime, percent } from "@/lib/utils";

const rubric = [
  { criterion: "Correctness of rotations", weight: 40, note: "All four cases handled, including double rotations." },
  { criterion: "Height invariant argument", weight: 25, note: "A short written justification, not a formal proof." },
  { criterion: "Tests", weight: 20, note: "Edge cases: empty tree, single node, duplicate keys." },
  { criterion: "Code clarity", weight: 15, note: "Naming, structure and comments where they earn their place." },
];

export default async function AssignmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const assignment = assignmentById(id);
  if (!assignment) notFound();
  const course = courseById(assignment.courseId);
  const rows = submissions.filter((s) => s.assignmentId === id);

  return (
    <Page
      title={assignment.title}
      description={`${course?.title} · due ${formatDate(assignment.dueDate)} · worth ${assignment.weightPct}% of the grade`}
      actions={
        <Button variant="primary" asChild>
          <Link href="/grading">Start marking</Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Submitted" value={`${assignment.submitted}`} hint={`${percent(assignment.submitted, assignment.cohortSize)}% of cohort`} icon={Users} accent="violet" />
        <Stat label="Awaiting marks" value={`${assignment.awaiting}`} icon={ClipboardCheck} accent="peach" />
        <Stat label="Max score" value={`${assignment.maxScore}`} icon={Scale} accent="sky" />
        <Stat label="Cohort size" value={`${assignment.cohortSize}`} icon={Users} accent="mint" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Recent submissions" description="Newest first" icon={ClipboardCheck} accent="violet" />
          <CardBody className="pt-0">
            <Table>
              <thead>
                <tr><Th>Student</Th><Th>Submitted</Th><Th>Attempt</Th><Th>Status</Th><Th>Score</Th><Th></Th></tr>
              </thead>
              <tbody>
                {rows.slice(0, 10).map((s) => {
                  const student = studentById(s.studentId);
                  return (
                    <Tr key={s.id}>
                      <Td>
                        <div className="flex items-center gap-3">
                          <Avatar name={student?.name ?? "?"} size={32} />
                          <span className="truncate font-medium">{student?.name}</span>
                        </div>
                      </Td>
                      <Td className="text-xs whitespace-nowrap text-ink-muted">
                        {s.submittedAt ? formatDateTime(s.submittedAt) : "—"}
                      </Td>
                      <Td className="tabular-nums text-ink-muted">{s.attempt} of {s.maxAttempts}</Td>
                      <Td><Badge tone={statusTone[s.status]}>{s.status}</Badge></Td>
                      <Td className="tabular-nums font-medium">{s.score ?? "—"}</Td>
                      <Td className="text-right">
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/grading/${s.id}`}>{s.status === "marked" ? "Review" : "Mark"}</Link>
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>

        <Card className="h-fit">
          <CardHeader title="Rubric" description={`${assignment.maxScore} points total`} icon={FileText} accent="amber" />
          <CardBody className="space-y-2.5">
            {rubric.map((r) => (
              <div key={r.criterion} className="rounded-tile bg-surface-muted/60 p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[13px] font-semibold">{r.criterion}</p>
                  <span className="shrink-0 text-xs font-medium tabular-nums text-ink-muted">{r.weight}%</span>
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">{r.note}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </Page>
  );
}
