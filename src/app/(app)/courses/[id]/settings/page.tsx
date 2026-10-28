import { notFound } from "next/navigation";
import { AlertTriangle, Settings, SlidersHorizontal } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea, Toggle } from "@/components/ui/field";
import { courseById, instructors } from "@/data/mock";

export default async function CourseSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = courseById(id);
  if (!course) notFound();

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader title="Course details" description="Shown on the catalogue page" icon={Settings} accent="violet" />
        <CardBody className="space-y-4">
          <Field label="Title"><Input defaultValue={course.title} /></Field>
          <Field label="Summary" hint="Two sentences at most — it appears in search results.">
            <Textarea defaultValue={course.summary} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Subject"><Input defaultValue={course.subject} /></Field>
            <Field label="Level">
              <Select defaultValue={course.level}>
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
              </Select>
            </Field>
            <Field label="Lead instructor">
              <Select defaultValue={course.instructorId}>
                {instructors.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
              </Select>
            </Field>
            <Field label="Length (weeks)"><Input type="number" defaultValue={course.weeks} /></Field>
          </div>
          <div className="flex gap-2 pt-1">
            <Button variant="primary">Save changes</Button>
            <Button variant="ghost">Discard</Button>
          </div>
        </CardBody>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader title="Enrolment" description="Who can join and when" icon={SlidersHorizontal} accent="sky" />
          <CardBody>
            <Field label="Capacity" className="mb-3"><Input type="number" defaultValue={course.capacity} /></Field>
            <Field label="Price (GBP)" className="mb-2"><Input type="number" defaultValue={course.priceGbp} /></Field>
            <div className="divide-y divide-line">
              <Toggle label="Open enrolment" checked />
              <Toggle label="Require approval" />
              <Toggle label="Allow late joining" checked />
              <Toggle label="Issue certificates" checked />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Danger zone" description="These actions affect enrolled students" icon={AlertTriangle} accent="rose" />
          <CardBody className="space-y-2">
            <Button variant="secondary" className="w-full">Duplicate course</Button>
            <Button variant="secondary" className="w-full">Archive course</Button>
            <Button variant="danger" className="w-full">Delete course</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
