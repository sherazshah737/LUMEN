import { BookOpen, Check, Sparkles } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { IconTile } from "@/components/ui/icon-tile";
import { instructors } from "@/data/mock";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Basics", done: false, current: true },
  { label: "Curriculum", done: false, current: false },
  { label: "Pricing", done: false, current: false },
  { label: "Review", done: false, current: false },
];

export default function NewCoursePage() {
  return (
    <Page title="New course" description="Step 1 of 4 — the basics">
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-4">
          <Card>
            <CardBody className="pt-5">
              <ol className="flex flex-wrap gap-2">
                {steps.map((step, i) => (
                  <li
                    key={step.label}
                    className={cn(
                      "flex items-center gap-2 rounded-tile px-3 py-2 text-[13px] font-medium",
                      step.current ? "bg-brand-soft text-brand" : "bg-surface-muted/70 text-ink-muted",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-5 items-center justify-center rounded-full text-[11px] font-semibold",
                        step.current ? "bg-brand text-white" : "bg-line-strong text-ink-muted",
                      )}
                    >
                      {step.done ? <Check size={11} /> : i + 1}
                    </span>
                    {step.label}
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Course basics" description="You can change any of this later" icon={BookOpen} accent="violet" />
            <CardBody className="space-y-4">
              <Field label="Title" hint="Students see this in the catalogue."><Input placeholder="e.g. Operating Systems" /></Field>
              <Field label="Summary"><Textarea placeholder="What will students be able to do by the end?" /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Subject"><Input placeholder="Computer Science" /></Field>
                <Field label="Level">
                  <Select defaultValue="Beginner">
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                  </Select>
                </Field>
                <Field label="Lead instructor">
                  <Select>{instructors.map((i) => <option key={i.id}>{i.name}</option>)}</Select>
                </Field>
                <Field label="Length (weeks)"><Input type="number" defaultValue={8} /></Field>
              </div>
              <div className="flex gap-2 pt-1">
                <Button variant="primary">Continue to curriculum</Button>
                <Button variant="ghost">Save as draft</Button>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card className="h-fit">
          <CardBody className="pt-5">
            <IconTile icon={Sparkles} accent="violet" size={40} />
            <p className="mt-3 text-sm font-semibold">Start from an outline</p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
              Describe the course in a sentence and Lumen Assist drafts the modules, lessons and a first
              assessment plan. You keep editing from there.
            </p>
            <Textarea className="mt-3" placeholder="A 10-week introduction to operating systems for second-year students…" />
            <Button variant="primary" className="mt-3 w-full">Draft an outline</Button>
          </CardBody>
        </Card>
      </div>
    </Page>
  );
}
