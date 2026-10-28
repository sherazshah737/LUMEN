import { notFound } from "next/navigation";
import { Eye, FileText, Paperclip, Upload, Video } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea, Toggle } from "@/components/ui/field";
import { IconTile } from "@/components/ui/icon-tile";
import { courseById, lessons } from "@/data/mock";

export default async function LessonEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) notFound();
  const course = courseById(lesson.courseId);

  return (
    <Page
      title={lesson.title}
      description={`${course?.title} · lesson ${lesson.order}`}
      actions={
        <>
          <Button variant="secondary"><Eye size={15} /> Preview</Button>
          <Button variant="primary">Save lesson</Button>
        </>
      }
    >
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-4">
          <Card>
            <CardHeader title="Content" description="What students see in the player" icon={FileText} accent="violet" />
            <CardBody className="space-y-4">
              <Field label="Lesson title"><Input defaultValue={lesson.title} /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Type">
                  <Select defaultValue={lesson.kind}>
                    <option value="video">Video</option><option value="reading">Reading</option>
                    <option value="quiz">Quiz</option><option value="assignment">Assignment</option>
                    <option value="live">Live session</option>
                  </Select>
                </Field>
                <Field label="Duration (minutes)"><Input type="number" defaultValue={lesson.durationMin} /></Field>
              </div>
              <Field label="Description" hint="Shown under the player and in the course outline.">
                <Textarea defaultValue="A walkthrough of rotation cases, with a worked example for each one." />
              </Field>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Media" description="Video or slides for this lesson" icon={Video} accent="sky" />
            <CardBody>
              <div className="flex flex-col items-center gap-3 rounded-tile border-2 border-dashed border-line-strong px-6 py-10 text-center">
                <IconTile icon={Upload} accent="sky" size={42} />
                <div>
                  <p className="text-[13px] font-semibold">Drop a video here</p>
                  <p className="mt-0.5 text-[12px] text-ink-muted">MP4 or MOV, up to 2 GB. Captions generated automatically.</p>
                </div>
                <Button variant="secondary" size="sm">Choose a file</Button>
              </div>

              <div className="mt-3 flex items-center gap-3 rounded-tile bg-surface-muted/60 p-3">
                <IconTile icon={Paperclip} accent="violet" size={32} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">avl-rotations-slides.pdf</p>
                  <p className="text-[11px] text-ink-faint">3.2 MB · uploaded 22 Oct 2026</p>
                </div>
                <Button size="sm" variant="ghost">Replace</Button>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader title="Visibility" description="Controls student access" icon={Eye} accent="mint" />
          <CardBody>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[13px] text-ink-muted">Current state</span>
              <Badge tone={lesson.published ? "positive" : "neutral"}>
                {lesson.published ? "Published" : "Draft"}
              </Badge>
            </div>
            <div className="divide-y divide-line">
              <Toggle label="Visible to students" checked={lesson.published} />
              <Toggle label="Require previous lesson" checked />
              <Toggle label="Allow downloads" />
              <Toggle label="Count towards completion" checked />
            </div>
            <Field label="Release date" className="mt-4"><Input type="date" defaultValue="2026-11-03" /></Field>
          </CardBody>
        </Card>
      </div>
    </Page>
  );
}
