import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, Search, Users } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, Th, Td, Tr } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { courseById, students } from "@/data/mock";
import { formatDate, relativeTime } from "@/lib/utils";

export default async function CourseStudentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = courseById(id);
  if (!course) notFound();

  const enrolled = students.filter((s) => s.courseIds.includes(id));

  return (
    <Card>
      <CardHeader
        title="Enrolled students"
        description={`${enrolled.length} shown · ${enrolled.filter((s) => s.status === "at-risk").length} at risk`}
        icon={Users}
        accent="violet"
        action={<Button size="sm" variant="secondary"><Download size={14} /> Export CSV</Button>}
      />
      <CardBody className="pt-0">
        <label className="relative mb-4 block md:max-w-xs">
          <Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-faint" />
          <input
            type="search"
            placeholder="Search this cohort"
            className="h-9.5 w-full rounded-tile bg-surface-muted/70 pr-3 pl-9 text-sm placeholder:text-ink-faint focus:bg-surface focus:outline-2 focus:outline-offset-1 focus:outline-brand"
          />
        </label>

        <Table>
          <thead>
            <tr>
              <Th>Student</Th><Th>Cohort</Th><Th>Status</Th>
              <Th className="w-40">Progress</Th><Th>Grade</Th><Th>Last active</Th><Th>Enrolled</Th>
            </tr>
          </thead>
          <tbody>
            {enrolled.map((s) => (
              <Tr key={s.id}>
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar name={s.name} size={34} />
                    <div className="min-w-0">
                      <Link href={`/students/${s.id}`} className="block truncate font-medium hover:text-brand">{s.name}</Link>
                      <p className="truncate text-[11px] text-ink-faint">{s.email}</p>
                    </div>
                  </div>
                </Td>
                <Td className="whitespace-nowrap text-ink-muted">{s.cohort}</Td>
                <Td><Badge tone={statusTone[s.status]}>{s.status.replace("-", " ")}</Badge></Td>
                <Td>
                  <div className="flex items-center gap-2.5">
                    <Progress value={s.progress} accent={s.progress < 40 ? "rose" : "violet"} className="w-20" />
                    <span className="text-xs tabular-nums text-ink-muted">{s.progress}%</span>
                  </div>
                </Td>
                <Td className="tabular-nums text-ink-muted">{s.averageGrade || "—"}</Td>
                <Td className="text-xs whitespace-nowrap text-ink-faint">{relativeTime(s.lastActive)}</Td>
                <Td className="text-xs whitespace-nowrap text-ink-faint">{formatDate(s.enrolled)}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
