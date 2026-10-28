import { Tabs } from "@/components/ui/tabs";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="px-4 pt-5 pb-4 sm:px-7 sm:pt-7 sm:pb-5">
        <h1 className="text-[22px] leading-tight font-semibold tracking-tight">Settings</h1>
        <p className="mt-0.5 text-[13px] text-ink-muted">Institution, branding and connected tools</p>
        <div className="mt-5 max-w-md">
          <Tabs
            items={[
              { href: "/settings", label: "General" },
              { href: "/settings/branding", label: "Branding" },
              { href: "/settings/integrations", label: "Integrations" },
            ]}
          />
        </div>
      </header>
      <div className="px-4 pb-8 sm:px-7">{children}</div>
    </>
  );
}
