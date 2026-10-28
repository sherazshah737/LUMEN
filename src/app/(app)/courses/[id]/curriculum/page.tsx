import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen, FileText, GripVertical, ListChecks, Plus, Radio, Video,
} from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon-tile";
import type { Accent } from "@/components/ui/accent";
import { courseById, lessonsByCourse, modulesByCourse } from "@/data/mock";
import type { LessonKind } from "@/data/types";

const kindMeta: Record<LessonKind, { icon: typeof Video; accent: Accent; label: string }> = {
  video: { icon: Video, accent: "violet", label: "Video" },
  reading: { icon: FileText, accent: "sky", label: "Reading" },
  quiz: { icon: ListChecks, accent: "amber", label: "Quiz" },
  assignment: { icon: BookOpen, accent: "peach", label: "Assignment" },
  live: { icon: Radio, accent: "rose", label: "Live" },
};

export default async function CurriculumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = courseById(id);
  if (!course) notFound();

  const modules = modulesByCourse(id);
  const lessons = lessonsByCourse(id);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-ink-muted">
          {modules.length} modules · {lessons.length} lessons ·{" "}
          {lessons.filter((l) => !l.published).length} unpublished
        </p>
        <Button variant="primary"><Plus size={16} /> Add module</Button>
      </div>

      {modules.map((module) => {
        const moduleLessons = lessons.filter((l) => l.moduleId === module.id);
        const minutes = moduleLessons.reduce((sum, l) => sum + l.durationMin, 0);
        return (
          <Card key={module.id}>
            <CardHeader
              title={`${module.order}. ${module.title}`}
              description={`${moduleLessons.length} lessons · ${minutes} min`}
              icon={BookOpen}
              accent="violet"
              action={<Button size="sm" variant="ghost"><Plus size={14} /> Add lesson</Button>}
            />
            <CardBody className="space-y-1 pt-0">
              {moduleLessons.map((lesson) => {
                const meta = kindMeta[lesson.kind];
                return (
                  <div
                    key={lesson.id}
                    className="group flex items-center gap-3 rounded-tile p-2.5 transition hover:bg-surface-muted/70"
                  >
                    <GripVertical size={15} className="shrink-0 cursor-grab text-ink-faint opacity-0 transition group-hover:opacity-100" />
                    <IconTile icon={meta.icon} accent={meta.accent} size={32} />
                    <div className="min-w-0 flex-1">
                      <Link href={`/lessons/${lesson.id}/edit`} className="block truncate text-[13px] font-medium hover:text-brand">
                        {lesson.title}
                      </Link>
                      <p className="text-[11px] text-ink-faint">
                        {meta.label}{lesson.durationMin > 0 && ` · ${lesson.durationMin} min`}
                      </p>
                    </div>
                    <Badge tone={lesson.published ? "positive" : "neutral"}>
                      {lesson.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                );
              })}
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
