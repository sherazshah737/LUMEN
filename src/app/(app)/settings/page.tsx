import { Bell, Building2, Globe } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Toggle } from "@/components/ui/field";

export default function GeneralSettingsPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader title="Institution" description="Appears on certificates and invoices" icon={Building2} accent="violet" />
        <CardBody className="space-y-4">
          <Field label="Name"><Input defaultValue="Riverside College" /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Contact email"><Input type="email" defaultValue="registry@riverside.edu" /></Field>
            <Field label="Support email"><Input type="email" defaultValue="help@riverside.edu" /></Field>
          </div>
          <Field label="Address"><Input defaultValue="14 Mill Lane, Cambridge CB2 1RX" /></Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Timezone">
              <Select defaultValue="Europe/London">
                <option>Europe/London</option><option>Europe/Berlin</option>
                <option>America/New_York</option><option>Asia/Karachi</option>
              </Select>
            </Field>
            <Field label="Currency">
              <Select defaultValue="GBP"><option>GBP</option><option>EUR</option><option>USD</option></Select>
            </Field>
            <Field label="Academic year start"><Input type="date" defaultValue="2026-09-14" /></Field>
          </div>
          <div className="flex gap-2 pt-1">
            <Button variant="primary">Save changes</Button>
            <Button variant="ghost">Discard</Button>
          </div>
        </CardBody>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader title="Notifications" description="What reaches your inbox" icon={Bell} accent="peach" />
          <CardBody>
            <div className="divide-y divide-line">
              <Toggle label="New submissions" checked />
              <Toggle label="Enrolment requests" checked />
              <Toggle label="Discussion replies" />
              <Toggle label="Weekly summary" checked />
              <Toggle label="Billing and invoices" checked />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Localisation" description="Defaults for new courses" icon={Globe} accent="sky" />
          <CardBody className="space-y-3">
            <Field label="Language">
              <Select defaultValue="en-GB">
                <option value="en-GB">English (UK)</option><option value="en-US">English (US)</option>
                <option value="de">German</option><option value="es">Spanish</option>
              </Select>
            </Field>
            <Field label="Date format">
              <Select defaultValue="dmy"><option value="dmy">31 Oct 2026</option><option value="mdy">Oct 31, 2026</option></Select>
            </Field>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
