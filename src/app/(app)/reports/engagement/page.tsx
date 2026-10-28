import { Activity, Clock, PlayCircle, Repeat } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { Table, Th, Td, Tr } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { IconTile } from "@/components/ui/icon-tile";
import { BarChart } from "@/components/charts/bar-chart";
import { AreaChart } from "@/components/charts/area-chart";
import { subjectAccent } from "@/components/ui/accent";
import { completionBySubject, courses, engagementSeries, enrolmentSeries, lessons } from "@/data/mock";

export default function EngagementPage() {
  const watched = lessons
    .filter((l) => l.durationMin > 0)
    .slice(0, 6)
    .map((l, i) => ({ ...l, views: 380 - i * 34, completion: 92 - i * 7 }));

  return (
    <Page title="Engagement" description="How students are actually using the material">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Weekly active" value="2,114" delta={7} icon={Activity} accent="violet" />
        <Stat label="Average session" value="38 min" delta={4} icon={Clock} accent="sky" />
        <Stat label="Lessons started" value="8,902" delta={11} icon={PlayCircle} accent="mint" />
        <Stat label="Repeat viewing" value="23%" delta={-2} hint="of all views" icon={Repeat} accent="peach" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader title="Activity by day" description="Lesson views this week" icon={Activity} accent="violet" />
          <CardBody className="min-h-[260px] flex-1"><BarChart data={engagementSeries} height="100%" name="Views" /></CardBody>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Completion by subject" description="Students finishing the course" icon={PlayCircle} accent="mint" />
          <CardBody className="min-h-[260px] flex-1">
            <BarChart data={completionBySubject} height="100%" name="Completion %" multicolour horizontal />
          </CardBody>
        </Card>
      </div>

      <Card className="mt-4 flex flex-col">
        <CardHeader title="Enrolment momentum" description="New sign-ups per month" icon={Activity} accent="sky" />
        <CardBody className="min-h-[240px] flex-1"><AreaChart data={enrolmentSeries} height="100%" /></CardBody>
      </Card>

      <Card className="mt-4">
        <CardHeader title="Most-watched lessons" description="Views and completion rate" icon={PlayCircle} accent="amber" />
        <CardBody className="pt-0">
          <Table>
            <thead>
              <tr><Th>Lesson</Th><Th>Length</Th><Th>Views</Th><Th className="w-44">Completion</Th></tr>
            </thead>
            <tbody>
              {watched.map((l) => {
                const subject = courses.find((c) => c.id === l.courseId)?.subject ?? "";
                const accent = subjectAccent[subject] ?? "violet";
                return (
                  <Tr key={l.id}>
                    <Td>
                      <div className="flex items-center gap-3">
                        <IconTile icon={PlayCircle} accent={accent} size={32} />
                        <span className="truncate font-medium">{l.title}</span>
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap text-ink-muted">{l.durationMin} min</Td>
                    <Td className="tabular-nums text-ink-muted">{l.views}</Td>
                    <Td>
                      <div className="flex items-center gap-2.5">
                        <Progress value={l.completion} accent={accent} className="w-24" />
                        <span className="text-xs tabular-nums text-ink-muted">{l.completion}%</span>
                      </div>
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
