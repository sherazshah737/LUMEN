import { CreditCard, Download, Receipt, Users } from "lucide-react";
import { Page } from "@/components/layout/page";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, Th, Td, Tr } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { IconTile } from "@/components/ui/icon-tile";
import { invoices } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/utils";

const usage = [
  { label: "Enrolled students", used: 1530, limit: 2500 },
  { label: "Storage", used: 184, limit: 500, unit: " GB" },
  { label: "Video transcoding", used: 42, limit: 100, unit: " hr/mo" },
];

export default function BillingPage() {
  return (
    <Page title="Billing" description="Plan, usage and statements">
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Current plan" description="Renews 1 November 2026" icon={CreditCard} accent="violet" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-4 rounded-tile bg-brand-soft p-4">
              <IconTile icon={Users} accent="violet" size={44} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-brand">Institution — up to 2,500 students</p>
                <p className="mt-0.5 text-[13px] text-ink-muted">
                  Unlimited courses and instructors, SSO, and priority support.
                </p>
              </div>
              <p className="text-lg font-semibold tabular-nums text-brand">{formatCurrency(1200)}<span className="text-xs font-medium">/mo</span></p>
            </div>

            <div className="mt-4 space-y-4">
              {usage.map((u) => (
                <div key={u.label}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-medium">{u.label}</span>
                    <span className="text-xs tabular-nums text-ink-muted">
                      {u.used.toLocaleString("en-GB")}{u.unit ?? ""} of {u.limit.toLocaleString("en-GB")}{u.unit ?? ""}
                    </span>
                  </div>
                  <Progress
                    value={(u.used / u.limit) * 100}
                    accent={u.used / u.limit > 0.8 ? "peach" : "violet"}
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              <Button variant="primary">Change plan</Button>
              <Button variant="ghost">Cancel subscription</Button>
            </div>
          </CardBody>
        </Card>

        <Card className="h-fit">
          <CardHeader title="Payment method" description="Charged monthly" icon={CreditCard} accent="sky" />
          <CardBody>
            <div className="flex items-center gap-3 rounded-tile bg-surface-muted/60 p-3.5">
              <IconTile icon={CreditCard} accent="sky" size={36} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium">Visa ending 4821</p>
                <p className="text-[11px] text-ink-faint">Expires 09 / 2029</p>
              </div>
            </div>
            <Button variant="secondary" className="mt-3 w-full">Update card</Button>
            <p className="mt-3 text-[12px] leading-relaxed text-ink-faint">
              Invoices go to finance@riverside.edu. Change the billing contact in settings.
            </p>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader title="Statements" description="Last six months" icon={Receipt} accent="mint" />
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
                  <Td className="text-right"><Button size="sm" variant="ghost"><Download size={13} /> PDF</Button></Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Page>
  );
}
