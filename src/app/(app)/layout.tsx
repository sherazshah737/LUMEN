import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden lg:flex" />
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <MobileNav />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
