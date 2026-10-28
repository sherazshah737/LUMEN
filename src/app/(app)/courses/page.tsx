import Link from "next/link";
import { BookOpen, Filter, Plus, Search } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody } from "@/components/ui/card";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, Th, Td, Tr } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { IconTile } from "@/components/ui/icon-tile";
import { Select } from "@/components/ui/field";
import { subjectAccent } from "@/components/ui/accent";
import { courses, instructorById } from "@/data/mock";
import { formatCurrency, formatDate, formatNumber, percent } from "@/lib/utils";

export default function CoursesPage() {
  return (
    <Page
      title="Courses"
      description={`${courses.length} courses · ${courses.filter((c) => c.status === "published").length} live this term`}
      actions={
        <Button variant="primary" asChild>
          <Link href="/courses/new"><Plus size={16} /> New course</Link>
        </Button>
      }
    >
      <Card>
        <CardBody className="pt-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <label className="relative flex-1 md:max-w-xs">
              <Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-faint" />
              <input
                type="search"
                placeholder="Search courses"
                className="h-9.5 w-full rounded-tile bg-surface-muted/70 pr-3 pl-9 text-sm placeholder:text-ink-faint focus:bg-surface focus:outline-2 focus:outline-offset-1 focus:outline-brand"
              />
            </label>
            <Select className="w-auto" defaultValue="all">
              <option value="all">All subjects</option>
              {[...new Set(courses.map((c) => c.subject))].map((s) => <option key={s}>{s}</option>)}
            </Select>
            <Select className="w-auto" defaultValue="all">
              <option value="all">Any status</option>
              <option>Published</option>
              <option>In review</option>
              <option>Draft</option>
              <option>Archived</option>
            </Select>
            <Button size="sm" variant="ghost"><Filter size={14} /> More filters</Button>
          </div>

          <Table>
            <thead>
              <tr>
                <Th>Course</Th>
                <Th>Instructor</Th>
                <Th>Status</Th>
                <Th>Capacity</Th>
                <Th className="w-40">Completion</Th>
                <Th>Price</Th>
                <Th>Updated</Th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => {
                const accent = subjectAccent[c.subject] ?? "violet";
                const full = percent(c.enrolled, c.capacity);
                return (
                  <Tr key={c.id}>
                    <Td>
                      <div className="flex items-center gap-3">
                        <IconTile icon={BookOpen} accent={accent} size={34} />
                        <div className="min-w-0">
                          <Link href={`/courses/${c.id}`} className="block truncate font-medium hover:text-brand">
                            {c.title}
                          </Link>
                          <p className="truncate text-[11px] text-ink-faint">{c.subject} · {c.level} · {c.weeks} weeks</p>
                        </div>
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap text-ink-muted">{instructorById(c.instructorId)?.name}</Td>
                    <Td><Badge tone={statusTone[c.status]}>{c.status.replace("-", " ")}</Badge></Td>
                    <Td className="whitespace-nowrap tabular-nums text-ink-muted">
                      {formatNumber(c.enrolled)} / {formatNumber(c.capacity)}
                      <span className="ml-1.5 text-[11px] text-ink-faint">{full}%</span>
                    </Td>
                    <Td>
                      {c.status === "published" ? (
                        <div className="flex items-center gap-2.5">
                          <Progress value={c.completionRate} accent={accent} dashed className="w-20" />
                          <span className="text-xs font-medium tabular-nums text-ink-muted">{c.completionRate}%</span>
                        </div>
                      ) : (
                        <span className="text-xs text-ink-faint">—</span>
                      )}
                    </Td>
                    <Td className="tabular-nums text-ink-muted">{formatCurrency(c.priceGbp)}</Td>
                    <Td className="text-xs whitespace-nowrap text-ink-faint">{formatDate(c.updated)}</Td>
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
