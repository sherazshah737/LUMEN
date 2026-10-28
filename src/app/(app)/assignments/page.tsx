import Link from "next/link";
import { ClipboardCheck, Plus } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, Th, Td, Tr } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { IconTile } from "@/components/ui/icon-tile";
import { subjectAccent } from "@/components/ui/accent";
import { assignments, courseById } from "@/data/mock";
import { formatDate, percent } from "@/lib/utils";

export default function AssignmentsPage() {
  const totalAwaiting = assignments.reduce((sum, a) => sum + a.awaiting, 0);

  return (
    <Page
      title="Assignments"
      description={`${assignments.length} active · ${totalAwaiting} submissions awaiting marks`}
      actions={<Button variant="primary"><Plus size={16} /> New assignment</Button>}
    >
      <Card>
        <CardHeader title="All assignments" description="Across every course you teach" icon={ClipboardCheck} accent="peach" />
        <CardBody className="pt-0">
          <Table>
            <thead>
              <tr>
                <Th>Assignment</Th><Th>Due</Th><Th>Weight</Th>
                <Th className="w-44">Submitted</Th><Th>Unmarked</Th><Th></Th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => {
                const course = courseById(a.courseId);
                const accent = subjectAccent[course?.subject ?? ""] ?? "violet";
                const rate = percent(a.submitted, a.cohortSize);
                const overdue = new Date(a.dueDate) < new Date("2026-10-27T12:00:00Z");
                return (
                  <Tr key={a.id}>
                    <Td>
                      <div className="flex items-center gap-3">
                        <IconTile icon={ClipboardCheck} accent={accent} size={34} />
                        <div className="min-w-0">
                          <Link href={`/assignments/${a.id}`} className="block truncate font-medium hover:text-brand">
                            {a.title}
                          </Link>
                          <p className="truncate text-[11px] text-ink-faint">{course?.title}</p>
                        </div>
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap">
                      <span className="text-[13px] text-ink-muted">{formatDate(a.dueDate)}</span>
                      {overdue && <Badge tone="neutral" className="ml-2" dot={false}>Closed</Badge>}
                    </Td>
                    <Td className="tabular-nums text-ink-muted">{a.weightPct}%</Td>
                    <Td>
                      <div className="flex items-center gap-2.5">
                        <Progress value={rate} accent={accent} className="w-20" />
                        <span className="text-xs tabular-nums whitespace-nowrap text-ink-muted">
                          {a.submitted}/{a.cohortSize}
                        </span>
                      </div>
                    </Td>
                    <Td>
                      <Badge tone={a.awaiting > 50 ? "critical" : a.awaiting > 0 ? "warning" : "positive"} dot={false}>
                        {a.awaiting}
                      </Badge>
                    </Td>
                    <Td className="text-right">
                      {a.awaiting > 0 && (
                        <Button size="sm" variant="secondary" asChild>
                          <Link href="/grading">Mark</Link>
                        </Button>
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Page>
  );
}
