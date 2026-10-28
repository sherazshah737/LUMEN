import { Check, UserCheck, X } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, Th, Td, Tr } from "@/components/ui/table";
import { courseById, enrolmentRequests, students } from "@/data/mock";
import { formatDate, relativeTime } from "@/lib/utils";

export default function EnrolmentsPage() {
  return (
    <Page
      title="Enrolments"
      description={`${enrolmentRequests.length} requests need a decision`}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Pending requests" value={String(enrolmentRequests.length)} icon={UserCheck} accent="peach" />
        <Stat label="Approved this month" value="47" delta={21} icon={Check} accent="mint" />
        <Stat label="Declined this month" value="4" icon={X} accent="rose" />
      </div>

      <Card className="mt-4">
        <CardHeader title="Awaiting approval" description="Requests to join a course" icon={UserCheck} accent="peach" />
        <CardBody className="space-y-2 pt-0">
          {enrolmentRequests.length === 0 ? (
            <EmptyState
              icon={Check}
              accent="mint"
              title="Nothing to approve"
              description="New enrolment requests land here when a course needs approval to join."
            />
          ) : (
            enrolmentRequests.map((r) => (
              <div key={r.id} className="flex flex-wrap items-center gap-3 rounded-tile bg-surface-muted/60 p-3.5">
                <Avatar name={r.studentName} size={40} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold">{r.studentName}</p>
                  <p className="truncate text-[12px] text-ink-muted">
                    {courseById(r.courseId)?.title} · requested {relativeTime(r.requestedAt)}
                  </p>
                  <p className="mt-1 truncate text-[12px] text-ink-faint">{r.note}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary"><X size={14} /> Decline</Button>
                  <Button size="sm" variant="primary"><Check size={14} /> Approve</Button>
                </div>
              </div>
            ))
          )}
        </CardBody>
      </Card>

      <Card className="mt-4">
        <CardHeader title="Recently enrolled" description="Joined in the last few weeks" icon={Check} accent="mint" />
        <CardBody className="pt-0">
          <Table>
            <thead>
              <tr><Th>Student</Th><Th>Cohort</Th><Th>Courses</Th><Th>Enrolled</Th></tr>
            </thead>
            <tbody>
              {students.slice(0, 8).map((s) => (
                <Tr key={s.id}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <Avatar name={s.name} size={32} />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{s.name}</p>
                        <p className="truncate text-[11px] text-ink-faint">{s.email}</p>
                      </div>
                    </div>
                  </Td>
                  <Td className="whitespace-nowrap text-ink-muted">{s.cohort}</Td>
                  <Td className="tabular-nums text-ink-muted">{s.courseIds.length}</Td>
                  <Td className="text-xs whitespace-nowrap text-ink-faint">{formatDate(s.enrolled)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Page>
  );
}
