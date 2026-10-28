import {
  CalendarDays, CreditCard, Database, MessageSquare, Plug, Video, Webhook,
} from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { IconTile } from "@/components/ui/icon-tile";
import type { Accent } from "@/components/ui/accent";

const integrations: {
  name: string; description: string; icon: typeof Video; accent: Accent; connected: boolean;
}[] = [
  { name: "Video conferencing", description: "Run live sessions and record them straight to the lesson.", icon: Video, accent: "sky", connected: true },
  { name: "Calendar", description: "Push deadlines and live sessions into staff and student calendars.", icon: CalendarDays, accent: "violet", connected: true },
  { name: "Payments", description: "Take course fees and issue refunds without leaving Lumen.", icon: CreditCard, accent: "mint", connected: true },
  { name: "Team chat", description: "Send announcements and at-risk alerts to a channel.", icon: MessageSquare, accent: "amber", connected: false },
  { name: "Student records", description: "Sync enrolments with your student information system.", icon: Database, accent: "peach", connected: false },
  { name: "Webhooks", description: "Post events to your own endpoint as they happen.", icon: Webhook, accent: "rose", connected: false },
];

export default function IntegrationsSettingsPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((i) => (
          <Card key={i.name}>
            <CardBody className="pt-5">
              <div className="flex items-start gap-3">
                <IconTile icon={i.icon} accent={i.accent} size={40} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-[14px] font-semibold">{i.name}</p>
                    {i.connected && <Badge tone="positive">Connected</Badge>}
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">{i.description}</p>
                </div>
              </div>
              <Button variant={i.connected ? "secondary" : "primary"} size="sm" className="mt-4 w-full">
                {i.connected ? "Manage" : "Connect"}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader title="API access" description="For building against Lumen directly" icon={Plug} accent="violet" />
        <CardBody className="space-y-4">
          <Field label="Publishable key" hint="Safe to use in client-side code.">
            <Input readOnly defaultValue="pk_live_8f2a91c4e07b4d55" className="font-mono text-[12px]" />
          </Field>
          <Field label="Secret key" hint="Rotate this immediately if it is ever exposed.">
            <Input readOnly type="password" defaultValue="sk_live_000000000000000000" className="font-mono text-[12px]" />
          </Field>
          <div className="flex gap-2">
            <Button variant="secondary">Reveal secret key</Button>
            <Button variant="danger">Rotate keys</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
