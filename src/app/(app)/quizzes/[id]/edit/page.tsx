import { notFound } from "next/navigation";
import { Check, GripVertical, Plus, Settings2, Sparkles, Trash2 } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, Toggle } from "@/components/ui/field";
import { IconTile } from "@/components/ui/icon-tile";
import { courseById, quizById, quizQuestions } from "@/data/mock";
import { cn } from "@/lib/utils";

export default async function QuizEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quiz = quizById(id);
  if (!quiz) notFound();

  const questions = quizQuestions.filter((q) => q.quizId === id);
  const course = courseById(quiz.courseId);

  return (
    <Page
      title={quiz.title}
      description={`${course?.title} · ${quiz.questionCount} questions · ${quiz.timeLimitMin} minutes`}
      actions={
        <>
          <Button variant="secondary">Preview</Button>
          <Button variant="primary">Save quiz</Button>
        </>
      }
    >
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          {questions.map((question, qi) => (
            <Card key={question.id}>
              <CardBody className="pt-5">
                <div className="flex items-start gap-3">
                  <GripVertical size={16} className="mt-1 shrink-0 cursor-grab text-ink-faint" />
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-surface-muted text-[11px] font-semibold text-ink-muted">
                    {qi + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Textarea defaultValue={question.prompt} className="min-h-0 font-medium" rows={2} />

                    <ul className="mt-3 space-y-2">
                      {question.options.map((option) => (
                        <li
                          key={option.id}
                          className={cn(
                            "flex items-center gap-3 rounded-tile px-3 py-2.5 text-[13px]",
                            option.correct ? "bg-positive-soft text-ink" : "bg-surface-muted/60",
                          )}
                        >
                          <span
                            className={cn(
                              "flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                              option.correct ? "bg-positive text-white" : "bg-line-strong text-ink-muted",
                            )}
                          >
                            {option.correct ? <Check size={11} strokeWidth={3} /> : option.id}
                          </span>
                          <span className="min-w-0 flex-1 truncate">{option.label}</span>
                          {option.correct && <Badge tone="positive" dot={false}>Correct</Badge>}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3 rounded-tile bg-surface-muted/50 p-3">
                      <p className="text-[11px] font-semibold tracking-wide text-ink-faint uppercase">Explanation</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">{question.explanation}</p>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <Button size="sm" variant="ghost"><Plus size={13} /> Add option</Button>
                      <span className="text-[11px] text-ink-faint">{question.points} points</span>
                      <Button size="sm" variant="ghost" className="ml-auto text-critical hover:bg-critical-soft">
                        <Trash2 size={13} /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}

          <Button variant="secondary" className="w-full"><Plus size={16} /> Add question</Button>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader title="Quiz settings" description="How students take it" icon={Settings2} accent="sky" />
            <CardBody>
              <Field label="Title" className="mb-3"><Input defaultValue={quiz.title} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Time limit (min)"><Input type="number" defaultValue={quiz.timeLimitMin} /></Field>
                <Field label="Pass mark (%)"><Input type="number" defaultValue={quiz.passMark} /></Field>
                <Field label="Attempts allowed"><Input type="number" defaultValue={quiz.attempts} /></Field>
                <Field label="Opens"><Input type="date" defaultValue="2026-11-03" /></Field>
              </div>
              <div className="mt-3 divide-y divide-line">
                <Toggle label="Shuffle questions" checked />
                <Toggle label="Shuffle options" checked />
                <Toggle label="Show answers after submit" checked />
                <Toggle label="Count towards final grade" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="pt-5">
              <IconTile icon={Sparkles} accent="violet" size={40} />
              <p className="mt-3 text-sm font-semibold">Generate questions</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                Pick lessons from this course and Lumen Assist drafts questions with distractors and explanations.
                Everything lands as a draft for you to edit.
              </p>
              <Button variant="primary" className="mt-3 w-full">Draft 5 questions</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </Page>
  );
}
