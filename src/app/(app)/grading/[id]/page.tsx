import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, FileCode2, MessageSquareQuote, Scale, Sparkles } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { Avatar } from "@/components/ui/avatar";
import { IconTile } from "@/components/ui/icon-tile";
import { assignmentById, courseById, studentById, submissions } from "@/data/mock";
import { formatDateTime } from "@/lib/utils";

const criteria = [
  { label: "Correctness of rotations", max: 40, given: 34 },
  { label: "Height invariant argument", max: 25, given: 20 },
  { label: "Tests", max: 20, given: 18 },
  { label: "Code clarity", max: 15, given: 13 },
];

export default async function MarkSubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const submission = submissions.find((s) => s.id === id);
  if (!submission) notFound();

  const student = studentById(submission.studentId);
  const assignment = assignmentById(submission.assignmentId);
  const course = courseById(assignment?.courseId ?? "");
  const index = submissions.findIndex((s) => s.id === id);
  const total = criteria.reduce((sum, c) => sum + c.given, 0);

  return (
    <Page
      title="Mark submission"
      description={`${assignment?.title} · ${course?.title}`}
      actions={
        <>
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/grading/${submissions[Math.max(0, index - 1)].id}`}><ChevronLeft size={15} /> Previous</Link>
          </Button>
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/grading/${submissions[Math.min(submissions.length - 1, index + 1)].id}`}>
              Next <ChevronRight size={15} />
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 xl:grid-cols-5">
        <div className="space-y-4 xl:col-span-3">
          <Card>
            <CardBody className="flex flex-wrap items-center gap-3 pt-5">
              <Avatar name={student?.name ?? "?"} size={42} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{student?.name}</p>
                <p className="truncate text-[12px] text-ink-faint">
                  {student?.cohort} · attempt {submission.attempt} of {submission.maxAttempts} ·{" "}
                  {submission.submittedAt ? formatDateTime(submission.submittedAt) : "not submitted"}
                </p>
              </div>
              <Badge tone={statusTone[submission.status]}>{submission.status}</Badge>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Submission" description={`${submission.fileName} · ${submission.fileSizeMb} MB`} icon={FileCode2} accent="violet" />
            <CardBody>
              <pre className="overflow-x-auto rounded-tile bg-surface-muted/70 p-4 font-mono text-[12px] leading-relaxed text-ink">
{`def rotate_right(node):
    pivot = node.left
    node.left = pivot.right
    pivot.right = node
    node.height = 1 + max(height(node.left), height(node.right))
    pivot.height = 1 + max(height(pivot.left), height(pivot.right))
    return pivot

def rebalance(node):
    balance = height(node.left) - height(node.right)
    if balance > 1:
        if height(node.left.left) < height(node.left.right):
            node.left = rotate_left(node.left)
        return rotate_right(node)
    return node`}
              </pre>
              <p className="mt-3 text-[12px] leading-relaxed text-ink-muted">
                Rotations are correct for all four cases. The height update order is right — children before parent.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="flex items-start gap-3 pt-5">
              <IconTile icon={Sparkles} accent="violet" size={36} />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold">Suggested feedback</p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                  &ldquo;Your rotations handle every case correctly and the tests cover the awkward ones. The write-up
                  asserts the height invariant without showing why it holds after a double rotation — add two or three
                  sentences there and this is full marks.&rdquo;
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="secondary">Use this</Button>
                  <Button size="sm" variant="ghost">Rewrite</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-4 xl:col-span-2">
          <Card>
            <CardHeader title="Rubric" description={`${total} of ${assignment?.maxScore ?? 100} points`} icon={Scale} accent="amber" />
            <CardBody className="space-y-3">
              {criteria.map((c) => (
                <div key={c.label}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-medium">{c.label}</span>
                    <span className="shrink-0 text-xs tabular-nums text-ink-faint">of {c.max}</span>
                  </div>
                  <Input type="number" defaultValue={c.given} max={c.max} className="mt-1.5" />
                </div>
              ))}
              <div className="flex items-center justify-between rounded-tile bg-brand-soft px-3.5 py-3">
                <span className="text-[13px] font-semibold text-brand">Total</span>
                <span className="text-lg font-semibold tabular-nums text-brand">
                  {total} / {assignment?.maxScore ?? 100}
                </span>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Feedback" description="The student sees this straight away" icon={MessageSquareQuote} accent="mint" />
            <CardBody>
              <Field label="Comments">
                <Textarea
                  className="min-h-32"
                  defaultValue="Rotations are correct and well tested. Add a short proof of the height invariant in the write-up."
                />
              </Field>
              <div className="mt-3 flex gap-2">
                <Button variant="primary" className="flex-1">Save and next</Button>
                <Button variant="secondary">Return</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Page>
  );
}
