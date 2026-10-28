import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { IconTile } from "@/components/ui/icon-tile";
import { subjectAccent } from "@/components/ui/accent";
import { courseById, instructorById } from "@/data/mock";
import { formatNumber } from "@/lib/utils";

export default async function CourseLayout({
  children, params,
}: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = courseById(id);
  if (!course) notFound();

  const tabs = [
    { href: `/courses/${id}`, label: "Overview" },
    { href: `/courses/${id}/curriculum`, label: "Curriculum" },
    { href: `/courses/${id}/students`, label: "Students" },
    { href: `/courses/${id}/settings`, label: "Settings" },
  ];

  return (
    <>
      <header className="px-4 pt-5 pb-4 sm:px-7 sm:pt-7 sm:pb-5">
        <div className="flex flex-wrap items-start gap-4">
          <IconTile icon={BookOpen} accent={subjectAccent[course.subject] ?? "violet"} size={48} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-[22px] leading-tight font-semibold tracking-tight">{course.title}</h1>
              <Badge tone={statusTone[course.status]}>{course.status.replace("-", " ")}</Badge>
            </div>
            <p className="mt-1 text-[13px] text-ink-muted">
              {course.subject} · {course.level} · {course.weeks} weeks ·{" "}
              {formatNumber(course.enrolled)} enrolled · {instructorById(course.instructorId)?.name}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">Preview</Button>
            <Button variant="primary">Publish changes</Button>
          </div>
        </div>
        <div className="mt-5 max-w-xl"><Tabs items={tabs} /></div>
      </header>
      <div className="px-4 pb-8 sm:px-7">{children}</div>
    </>
  );
}
