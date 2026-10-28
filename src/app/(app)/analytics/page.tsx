import { Activity, BarChart3, GraduationCap, TrendingUp, Users } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { Select } from "@/components/ui/field";
import { AreaChart } from "@/components/charts/area-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { AiStrip } from "@/components/ui/ai-strip";
import { completionBySubject, engagementSeries, enrolmentSeries, gradeDistribution } from "@/data/mock";
import { formatNumber } from "@/lib/utils";

export default function AnalyticsPage() {
  const enrolled = enrolmentSeries.at(-1)?.value ?? 0;

  return (
    <Page
      title="Analytics"
      description="Autumn 2026 term, week 7"
      actions={
        <Select className="w-auto" defaultValue="term">
          <option value="term">This term</option>
          <option value="year">This year</option>
          <option value="all">All time</option>
        </Select>
      }
    >
      <AiStrip
        headline="Physics is the outlier"
        detail="completion sits 14 points below every other subject, and the drop starts at the week-4 lab report."
        cta="Open the breakdown"
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="New enrolments" value={formatNumber(enrolled)} delta={12} hint="this month" icon={Users} accent="violet" />
        <Stat label="Weekly active" value="2.1k" delta={7} icon={Activity} accent="sky" />
        <Stat label="Completion rate" value="71%" delta={3} icon={TrendingUp} accent="mint" />
        <Stat label="Average grade" value="74%" delta={-1} icon={GraduationCap} accent="peach" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="flex flex-col xl:col-span-2">
          <CardHeader title="Enrolments over time" description="This year against last" icon={TrendingUp} accent="violet" />
          <CardBody className="min-h-[280px] flex-1"><AreaChart data={enrolmentSeries} height="100%" showPrevious /></CardBody>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Grade distribution" description="All marked work" icon={BarChart3} accent="amber" />
          <CardBody className="min-h-[280px] flex-1">
            <BarChart data={gradeDistribution} height="100%" name="Students" multicolour />
          </CardBody>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader title="Completion by subject" description="Percentage finishing the course" icon={BarChart3} accent="sky" />
          <CardBody className="min-h-[260px] flex-1">
            <BarChart data={completionBySubject} height="100%" name="Completion %" multicolour horizontal />
          </CardBody>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Activity by day" description="Lesson views this week" icon={Activity} accent="mint" />
          <CardBody className="min-h-[260px] flex-1">
            <BarChart data={engagementSeries} height="100%" name="Views" />
          </CardBody>
        </Card>
      </div>
    </Page>
  );
}
