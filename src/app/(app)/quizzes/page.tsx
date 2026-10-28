import Link from "next/link";
import { FileQuestion, Plus, Timer } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, Th, Td, Tr } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { IconTile } from "@/components/ui/icon-tile";
import { subjectAccent } from "@/components/ui/accent";
import { courseById, quizzes } from "@/data/mock";

export default function QuizzesPage() {
  return (
    <Page
      title="Quizzes"
      description={`${quizzes.length} quizzes · ${quizzes.filter((q) => q.status === "open").length} open now`}
      actions={<Button variant="primary"><Plus size={16} /> New quiz</Button>}
    >
      <Card>
        <CardHeader title="All quizzes" description="Across every course" icon={FileQuestion} accent="amber" />
        <CardBody className="pt-0">
          <Table>
            <thead>
              <tr>
                <Th>Quiz</Th><Th>Status</Th><Th>Questions</Th><Th>Time</Th>
                <Th>Attempts</Th><Th className="w-40">Average</Th><Th></Th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((q) => {
                const course = courseById(q.courseId);
                const accent = subjectAccent[course?.subject ?? ""] ?? "violet";
                return (
                  <Tr key={q.id}>
                    <Td>
                      <div className="flex items-center gap-3">
                        <IconTile icon={FileQuestion} accent={accent} size={34} />
                        <div className="min-w-0">
                          <Link href={`/quizzes/${q.id}/edit`} className="block truncate font-medium hover:text-brand">
                            {q.title}
                          </Link>
                          <p className="truncate text-[11px] text-ink-faint">{course?.title}</p>
                        </div>
                      </div>
                    </Td>
                    <Td><Badge tone={statusTone[q.status]}>{q.status}</Badge></Td>
                    <Td className="tabular-nums text-ink-muted">{q.questionCount}</Td>
                    <Td className="whitespace-nowrap text-ink-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Timer size={13} className="text-ink-faint" /> {q.timeLimitMin} min
                      </span>
                    </Td>
                    <Td className="tabular-nums text-ink-muted">{q.attempts}</Td>
                    <Td>
                      {q.taken > 0 ? (
                        <div className="flex items-center gap-2.5">
                          <Progress value={q.averageScore} accent={q.averageScore >= q.passMark ? "mint" : "rose"} className="w-20" />
                          <span className="text-xs tabular-nums text-ink-muted">{q.averageScore}%</span>
                        </div>
                      ) : (
                        <span className="text-xs text-ink-faint">Not taken yet</span>
                      )}
                    </Td>
                    <Td className="text-right">
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/quizzes/${q.id}/edit`}>Edit</Link>
                      </Button>
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
