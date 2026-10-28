import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";

const highlights = [
  { value: "1,530", label: "students" },
  { value: "6", label: "live courses" },
  { value: "1.8d", label: "marking turnaround" },
];

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <span className="flex size-11 items-center justify-center rounded-tile bg-brand text-white shadow-card">
            <GraduationCap size={22} strokeWidth={2.2} />
          </span>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">Welcome back to Riverside</h1>
          <p className="mt-1.5 text-[14px] text-ink-muted">Sign in to pick up where you left off.</p>

          <form className="mt-7 space-y-4">
            <Field label="Email"><Input type="email" placeholder="you@riverside.edu" autoComplete="email" /></Field>
            <Field label="Password"><Input type="password" placeholder="••••••••" autoComplete="current-password" /></Field>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[13px] text-ink-muted">
                <input type="checkbox" className="size-4 rounded border-line-strong accent-[var(--brand)]" />
                Keep me signed in
              </label>
              <Link href="/login" className="text-[13px] font-medium text-brand hover:underline">Forgot password?</Link>
            </div>

            <Button variant="primary" className="w-full" type="submit">Sign in</Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-line" />
            <span className="text-[11px] font-medium tracking-wide text-ink-faint uppercase">or</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <Button variant="secondary" className="w-full">Continue with single sign-on</Button>

          <p className="mt-6 text-center text-[13px] text-ink-muted">
            Need an account?{" "}
            <Link href="/login" className="font-medium text-brand hover:underline">Ask your administrator</Link>
          </p>
        </div>
      </div>

      <div className="hidden flex-1 items-center justify-center bg-promo p-12 text-promo-ink lg:flex">
        <div className="max-w-md">
          <p className="text-[28px] leading-snug font-semibold tracking-tight">
            Teaching tools that stay out of the way.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-promo-ink/70">
            Lumen keeps courses, cohorts and marking in one place, so the admin takes minutes
            instead of evenings.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6">
            {highlights.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-semibold tabular-nums">{s.value}</dt>
                <dd className="mt-0.5 text-[12px] text-promo-ink/60">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}
