import { Image as ImageIcon, Palette, Upload } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, Input, Toggle } from "@/components/ui/field";
import { IconTile } from "@/components/ui/icon-tile";

const swatches = [
  { name: "Violet", value: "var(--violet)", active: true },
  { name: "Sky", value: "var(--sky)" },
  { name: "Mint", value: "var(--mint)" },
  { name: "Peach", value: "var(--peach)" },
  { name: "Rose", value: "var(--rose)" },
  { name: "Amber", value: "var(--amber)" },
];

export default function BrandingSettingsPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader title="Accent colour" description="Used for buttons, links and highlights" icon={Palette} accent="violet" />
        <CardBody>
          <div className="flex flex-wrap gap-3">
            {swatches.map((s) => (
              <button
                key={s.name}
                className="flex flex-col items-center gap-2 rounded-tile p-2 transition hover:bg-surface-muted/70"
              >
                <span
                  className="size-12 rounded-tile ring-offset-2 ring-offset-surface data-[active=true]:ring-2 data-[active=true]:ring-ink"
                  style={{ background: s.value }}
                  data-active={s.active}
                />
                <span className="text-[11px] font-medium text-ink-muted">{s.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Custom accent (hex)"><Input defaultValue="#6D4AFF" /></Field>
            <Field label="Login page headline"><Input defaultValue="Welcome back to Riverside" /></Field>
          </div>

          <div className="mt-4 divide-y divide-line">
            <Toggle label="Let students choose light or dark" checked />
            <Toggle label="Show institution name in the sidebar" checked />
            <Toggle label="Use custom domain" />
          </div>

          <div className="mt-5 flex gap-2">
            <Button variant="primary">Save branding</Button>
            <Button variant="ghost">Reset to default</Button>
          </div>
        </CardBody>
      </Card>

      <Card className="h-fit">
        <CardHeader title="Logo" description="SVG or PNG, at least 256px" icon={ImageIcon} accent="sky" />
        <CardBody>
          <div className="flex flex-col items-center gap-3 rounded-tile border-2 border-dashed border-line-strong px-6 py-10 text-center">
            <IconTile icon={Upload} accent="sky" size={42} />
            <div>
              <p className="text-[13px] font-semibold">Drop your logo here</p>
              <p className="mt-0.5 text-[12px] text-ink-muted">Transparent background works best.</p>
            </div>
            <Button variant="secondary" size="sm">Choose a file</Button>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-ink-faint">
            A separate square mark is used for the sidebar and favicon. Upload one under advanced options.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
