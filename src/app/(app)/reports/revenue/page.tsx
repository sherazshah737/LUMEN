import { Download, Receipt, TrendingUp, Wallet } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, Th, Td, Tr } from "@/components/ui/table";
import { AreaChart } from "@/components/charts/area-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { courses, invoices, revenueSeries } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function RevenuePage() {
  const current = revenueSeries.at(-1)?.value ?? 0;
  const byCourse = courses
    .filter((c) => c.status === "published")
    .map((c) => ({ label: c.title.split(" ").slice(0, 2).join(" "), value: c.enrolled * c.priceGbp }))
    .sort((a, b) => b.value - a.value);

  return (
    <Page
      title="Revenue"
      description="Course income, last six months"
      actions={<Button variant="secondary"><Download size={15} /> Export</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="This month" value={formatCurrency(current)} delta={6} icon={Wallet} accent="mint" />
        <Stat label="Six-month total" value={formatCurrency(revenueSeries.reduce((s, r) => s + r.value, 0))} icon={TrendingUp} accent="violet" />
        <Stat label="Average per student" value={formatCurrency(192)} delta={2} icon={Receipt} accent="sky" />
        <Stat label="Refund rate" value="1.2%" delta={-4} hint="below target" icon={Receipt} accent="peach" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="flex flex-col xl:col-span-2">
          <CardHeader title="Monthly revenue" description="Gross, before platform fees" icon={TrendingUp} accent="mint" />
          <CardBody className="min-h-[280px] flex-1"><AreaChart data={revenueSeries} height="100%" /></CardBody>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="By course" description="Enrolments × price" icon={Receipt} accent="violet" />
          <CardBody className="min-h-[280px] flex-1">
            <BarChart data={byCourse} height="100%" name="Revenue" multicolour horizontal />
          </CardBody>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader title="Invoices" description="Platform statements" icon={Receipt} accent="sky" />
        <CardBody className="pt-0">
          <Table>
            <thead>
              <tr><Th>Invoice</Th><Th>Period</Th><Th>Issued</Th><Th>Amount</Th><Th>Status</Th><Th></Th></tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <Tr key={inv.id}>
                  <Td className="font-mono text-[12px] font-medium">{inv.id}</Td>
                  <Td className="text-ink-muted">{inv.period}</Td>
                  <Td className="text-xs whitespace-nowrap text-ink-faint">{formatDate(inv.issued)}</Td>
                  <Td className="font-medium tabular-nums">{formatCurrency(inv.amountGbp)}</Td>
                  <Td><Badge tone={statusTone[inv.status]}>{inv.status}</Badge></Td>
                  <Td className="text-right">
                    <Button size="sm" variant="ghost"><Download size={13} /> PDF</Button>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Page>
  );
}
