import { Download, Table2 } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Select } from "@/components/ui/field";
import { assignments, students } from "@/data/mock";
import { cn } from "@/lib/utils";

/** Deterministic per-cell marks so the grid is stable between renders. */
function markFor(studentIndex: number, columnIndex: number, base: number) {
  if (base === 0) return null;
  const drift = ((studentIndex * 7 + columnIndex * 13) % 19) - 9;
  return Math.max(0, Math.min(100, base + drift));
}

function gradeTone(score: number | null) {
  if (score === null) return "text-ink-faint";
  if (score >= 70) return "text-positive";
  if (score >= 50) return "text-ink";
  if (score >= 40) return "text-warning";
  return "text-critical";
}

export default function GradebookPage() {
  const columns = assignments.slice(0, 5);

  return (
    <Page
      title="Gradebook"
      description="Data Structures & Algorithms · Autumn 2026"
      actions={<Button variant="secondary"><Download size={15} /> Export</Button>}
    >
      <Card>
        <CardHeader
          title="Marks by assignment"
          description={`${students.length} students · ${columns.length} assessments`}
          icon={Table2}
          accent="sky"
          action={
            <Select className="w-auto" defaultValue="c1">
              <option value="c1">Data Structures &amp; Algorithms</option>
              <option value="c2">Introduction to Databases</option>
              <option value="c4">Linear Algebra Foundations</option>
            </Select>
          }
        />
        <CardBody className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 rounded-l-tile bg-surface-muted/90 px-5 py-2.5 text-left text-[11px] font-semibold tracking-wide text-ink-faint uppercase backdrop-blur">
                    Student
                  </th>
                  {columns.map((a) => (
                    <th
                      key={a.id}
                      className="bg-surface-muted/60 px-4 py-2.5 text-center text-[11px] font-semibold tracking-wide text-ink-faint uppercase"
                    >
                      <span className="block max-w-28 truncate normal-case">{a.title.split("—")[0].trim()}</span>
                      <span className="text-[10px] font-medium">{a.weightPct}%</span>
                    </th>
                  ))}
                  <th className="rounded-r-tile bg-surface-muted/60 px-4 py-2.5 text-center text-[11px] font-semibold tracking-wide text-ink-faint uppercase">
                    Overall
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, si) => (
                  <tr key={s.id} className="border-b border-line/70 transition-colors last:border-0 hover:bg-surface-muted/50">
                    <td className="sticky left-0 z-10 bg-surface px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={s.name} size={30} />
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-medium">{s.name}</p>
                          <p className="truncate text-[11px] text-ink-faint">{s.cohort}</p>
                        </div>
                      </div>
                    </td>
                    {columns.map((a, ci) => {
                      const score = markFor(si, ci, s.averageGrade);
                      return (
                        <td key={a.id} className="px-4 py-3 text-center">
                          <span className={cn("text-[13px] font-medium tabular-nums", gradeTone(score))}>
                            {score ?? "—"}
                          </span>
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 text-center">
                      <span className={cn("text-[13px] font-semibold tabular-nums", gradeTone(s.averageGrade || null))}>
                        {s.averageGrade || "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </Page>
  );
}
