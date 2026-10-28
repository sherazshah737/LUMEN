import Link from "next/link";
import { Download, GraduationCap, Search, UserPlus } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, Th, Td, Tr } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Select } from "@/components/ui/field";
import { students } from "@/data/mock";
import { relativeTime } from "@/lib/utils";

export default function StudentsPage() {
  const active = students.filter((s) => s.status === "active").length;
  const atRisk = students.filter((s) => s.status === "at-risk").length;
  const dormant = students.filter((s) => s.status === "dormant").length;

  return (
    <Page
      title="Students"
      description={`${students.length} students across your courses`}
      actions={
        <>
          <Button variant="secondary"><Download size={15} /> Export</Button>
          <Button variant="primary"><UserPlus size={16} /> Invite students</Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total" value={String(students.length)} icon={GraduationCap} accent="violet" />
        <Stat label="Active" value={String(active)} delta={6} icon={GraduationCap} accent="mint" />
        <Stat label="At risk" value={String(atRisk)} delta={-14} hint="improving" icon={GraduationCap} accent="peach" />
        <Stat label="Dormant" value={String(dormant)} hint="21+ days inactive" icon={GraduationCap} accent="rose" />
      </div>

      <Card className="mt-4">
        <CardHeader title="All students" description="Click a row for the full record" icon={GraduationCap} accent="violet" />
        <CardBody className="pt-0">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <label className="relative flex-1 md:max-w-xs">
              <Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-faint" />
              <input
                type="search"
                placeholder="Search by name or email"
                className="h-9.5 w-full rounded-tile bg-surface-muted/70 pr-3 pl-9 text-sm placeholder:text-ink-faint focus:bg-surface focus:outline-2 focus:outline-offset-1 focus:outline-brand"
              />
            </label>
            <Select className="w-auto" defaultValue="all">
              <option value="all">All cohorts</option>
              {[...new Set(students.map((s) => s.cohort))].map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Select className="w-auto" defaultValue="all">
              <option value="all">Any status</option>
              <option>Active</option><option>At risk</option><option>Dormant</option><option>Completed</option>
            </Select>
          </div>

          <Table>
            <thead>
              <tr>
                <Th>Student</Th><Th>Cohort</Th><Th>Status</Th>
                <Th className="w-40">Progress</Th><Th>Grade</Th><Th>Courses</Th><Th>Last active</Th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <Tr key={s.id}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <Avatar name={s.name} size={34} />
                      <div className="min-w-0">
                        <Link href={`/students/${s.id}`} className="block truncate font-medium hover:text-brand">
                          {s.name}
                        </Link>
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
                  <Td className="tabular-nums text-ink-muted">{s.courseIds.length}</Td>
                  <Td className="text-xs whitespace-nowrap text-ink-faint">{relativeTime(s.lastActive)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Page>
  );
}
