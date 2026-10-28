import { Mail, Star, UserPlus, Users } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Table, Th, Td, Tr } from "@/components/ui/table";
import { courses, instructors } from "@/data/mock";
import { formatDate, formatNumber } from "@/lib/utils";

export default function InstructorsPage() {
  return (
    <Page
      title="Instructors"
      description={`${instructors.length} teaching staff · ${courses.filter((c) => c.status === "published").length} live courses between them`}
      actions={<Button variant="primary"><UserPlus size={16} /> Invite instructor</Button>}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {instructors.map((i) => (
          <Card key={i.id}>
            <CardBody className="pt-5">
              <div className="flex items-start gap-3">
                <Avatar name={i.name} size={44} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{i.name}</p>
                  <p className="truncate text-[12px] text-ink-muted">{i.title}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-amber-soft px-2 py-1 text-xs font-semibold text-amber">
                  <Star size={12} fill="currentColor" /> {i.rating}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-tile bg-surface-muted/60 px-3 py-2.5">
                  <p className="text-[11px] text-ink-faint">Courses</p>
                  <p className="text-lg font-semibold tabular-nums">{i.courses}</p>
                </div>
                <div className="rounded-tile bg-surface-muted/60 px-3 py-2.5">
                  <p className="text-[11px] text-ink-faint">Students</p>
                  <p className="text-lg font-semibold tabular-nums">{formatNumber(i.students)}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <p className="truncate text-[11px] text-ink-faint">Joined {formatDate(i.joined)}</p>
                <Button size="sm" variant="ghost"><Mail size={13} /> Contact</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <CardHeader title="Teaching load" description="Courses currently assigned" icon={Users} accent="sky" />
        <CardBody className="pt-0">
          <Table>
            <thead>
              <tr><Th>Instructor</Th><Th>Course</Th><Th>Subject</Th><Th>Enrolled</Th><Th>Completion</Th></tr>
            </thead>
            <tbody>
              {courses.filter((c) => c.status === "published").map((c) => {
                const instructor = instructors.find((i) => i.id === c.instructorId);
                return (
                  <Tr key={c.id}>
                    <Td>
                      <div className="flex items-center gap-3">
                        <Avatar name={instructor?.name ?? "?"} size={30} />
                        <span className="truncate font-medium">{instructor?.name}</span>
                      </div>
                    </Td>
                    <Td className="text-ink-muted">{c.title}</Td>
                    <Td className="text-ink-muted">{c.subject}</Td>
                    <Td className="tabular-nums text-ink-muted">{formatNumber(c.enrolled)}</Td>
                    <Td className="tabular-nums text-ink-muted">{c.completionRate}%</Td>
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
