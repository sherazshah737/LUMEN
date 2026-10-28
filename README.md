# Lumen — LMS Admin Dashboard

A production-ready admin dashboard for online teaching: courses, cohorts, marking,
analytics and billing. Built with Next.js App Router, TypeScript and Tailwind CSS v4.

---

## What's inside

**30 pages**, all working against a typed mock data layer — no placeholder screens.

| Area | Pages |
| --- | --- |
| Overview | Dashboard, Analytics |
| Teaching | Courses, Course detail, Curriculum, Course students, Course settings, New course, Lesson editor, Quizzes, Quiz editor, Assignments, Assignment detail, Grading queue, Mark submission, Gradebook |
| People | Students, Student profile, Instructors, Enrolments |
| Communication | Announcements, Messages, Discussions |
| Operations | Revenue, Engagement, Billing, Settings, Branding, Integrations |
| Auth & errors | Login, 404 |

## Stack

- **Next.js 15** (App Router, React 19, server components)
- **TypeScript** — strict mode, no `any`
- **Tailwind CSS v4** — CSS-first config, no `tailwind.config.js`
- **Recharts** for charts, **lucide-react** for icons
- **Self-hosted fonts** (Geist via `@fontsource-variable`) — no Google Fonts request,
  so the build works offline and behind a firewall

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # ESLint
```

Node 20 or newer.

## Project structure

```
src/
├── app/
│   ├── (app)/           # authenticated shell — sidebar + mobile nav
│   │   ├── page.tsx     # dashboard
│   │   ├── courses/     # nested layout with tabs
│   │   └── …
│   ├── login/           # no shell
│   ├── layout.tsx
│   └── globals.css      # all design tokens live here
├── components/
│   ├── ui/              # Card, Badge, Button, Table, Stat, Progress, IconTile…
│   ├── layout/          # Sidebar, Topbar, MobileNav, Page
│   └── charts/          # Recharts wrappers
├── data/
│   ├── types.ts         # the domain model
│   └── mock.ts          # seed data + lookup helpers
└── lib/utils.ts         # cn(), formatters
```

## Theming

Every colour, radius and shadow is a CSS custom property in `src/app/globals.css`.
Dark mode is the same token names redefined — no `dark:` classes anywhere in the
components, so a new theme is one file.

```css
:root {
  --brand: #6d4aff;      /* change this and the whole app follows */
  --canvas: #f6f6f8;
  --radius-card: 1rem;
}
```

Dark mode follows the system by default. To force a theme, set `data-theme="dark"`
or `data-theme="light"` on `<html>`.

Six per-item accents (`violet`, `sky`, `mint`, `peach`, `rose`, `amber`) colour
subjects, categories and list rows. `src/components/ui/accent.ts` maps subjects to
accents and hashes arbitrary keys to a stable colour.

## Connecting real data

All data flows from `src/data/mock.ts`. Every page imports from there and nothing
else, so replacing it is the whole integration:

1. Keep the interfaces in `src/data/types.ts` — they are the contract.
2. Replace each exported array with a fetch, a database query, or an ORM call.
3. Pages are server components, so you can `await` directly inside them.

```ts
// before
export const courses: Course[] = [ … ];

// after
export async function getCourses(): Promise<Course[]> {
  return db.course.findMany();
}
```

Form controls are presentational — wire them to server actions or your API.

## Responsive

Every page works from 390px up. Below `lg` the sidebar becomes a slide-out drawer
(`src/components/layout/mobile-nav.tsx`). Tables scroll horizontally rather than
reflowing, which keeps dense data readable on a phone.

## Accessibility

Semantic landmarks, `aria-current` on active navigation, labelled icon-only
buttons, visible focus rings on every interactive element, and text contrast that
meets WCAG AA in both themes.

## Licence

Covered by your marketplace licence. The bundled Geist fonts are SIL OFL 1.1.
