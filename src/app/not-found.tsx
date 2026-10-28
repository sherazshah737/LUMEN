import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon-tile";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <IconTile icon={Compass} accent="violet" size={56} />
      <div>
        <p className="text-[13px] font-semibold tracking-wide text-ink-faint uppercase">Error 404</p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight">This page does not exist</h1>
        <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-ink-muted">
          The link may be out of date, or the course it pointed to has been archived.
        </p>
      </div>
      <div className="mt-1 flex gap-2">
        <Button variant="primary" asChild><Link href="/">Back to dashboard</Link></Button>
        <Button variant="secondary" asChild><Link href="/courses">Browse courses</Link></Button>
      </div>
    </main>
  );
}
