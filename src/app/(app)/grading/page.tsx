import Link from "next/link";
import { CheckCheck, ClipboardCheck, Clock } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, Th, Td, Tr } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { AiStrip } from "@/components/ui/ai-strip";
import { EmptyState } from "@/components/ui/empty-state";
import { assignmentById, courseById, studentById, submissions } from "@/data/mock";
import { formatDateTime, relativeTime } from "@/lib/utils";

export default function GradingQueuePage() {
  const queue = submissions.filter((s) => s.status !== "marked");
  const marked = submissions.filter((s) => s.status === "marked");

  return (
    <Page
      title="Grading queue"
      description={`${queue.length} submissions waiting · oldest ${relativeTime(queue.at(-1)?.submittedAt ?? "2026-10-22T09:00:00Z")}`}
      actions={<Button variant="primary" asChild><Link href={`/grading/${queue[0]?.id ?? "sub1"}`}>Mark next</Link></Button>}
    >
      <AiStrip
        headline="14 submissions share the same mistake"
        detail="students are rotating the wrong subtree in the right-left case. Lumen Assist drafted one explanation you can reuse."
        cta="See the draft"
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Stat label="Waiting" value={String(queue.length)} icon={Clock} accent="peach" />
        <Stat label="Marked today" value={String(marked.length)} delta={18} icon={CheckCheck} accent="mint" />
        <Stat label="Average turnaround" value="1.8 days" delta={-12} hint="faster than last term" icon={ClipboardCheck} accent="violet" />
      </div>

      <Card className="mt-4">
        <CardHeader title="Waiting for marks" description="Sorted by submission time" icon={ClipboardCheck} accent="peach" />
        <CardBody className="pt-0">
          {queue.length === 0 ? (
            <EmptyState
              icon={CheckCheck}
              accent="mint"
              title="Queue is clear"
              description="Every submission has been marked. New ones appear here as students submit."
            />
          ) : (
            <Table>
              <thead>
                <tr><Th>Student</Th><Th>Assignment</Th><Th>Submitted</Th><Th>Attempt</Th><Th>Status</Th><Th></Th></tr>
              </thead>
              <tbody>
                {queue.map((s) => {
                  const student = studentById(s.studentId);
                  const assignment = assignmentById(s.assignmentId);
                  return (
                    <Tr key={s.id}>
                      <Td>
                        <div className="flex items-center gap-3">
                          <Avatar name={student?.name ?? "?"} size={32} />
                          <div className="min-w-0">
                            <p className="truncate font-medium">{student?.name}</p>
                            <p className="truncate text-[11px] text-ink-faint">{student?.cohort}</p>
                          </div>
                        </div>
                      </Td>
                      <Td>
                        <p className="truncate text-[13px]">{assignment?.title}</p>
                        <p className="truncate text-[11px] text-ink-faint">{courseById(assignment?.courseId ?? "")?.title}</p>
                      </Td>
                      <Td className="text-xs whitespace-nowrap text-ink-muted">
                        {s.submittedAt ? formatDateTime(s.submittedAt) : "Not submitted"}
                      </Td>
                      <Td className="tabular-nums text-ink-muted">{s.attempt} of {s.maxAttempts}</Td>
                      <Td><Badge tone={statusTone[s.status]}>{s.status}</Badge></Td>
                      <Td className="text-right">
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={`/grading/${s.id}`}>Open</Link>
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </CardBody>
      </Card>
    </Page>
  );
}
