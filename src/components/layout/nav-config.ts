import {
  BarChart3, BookOpen, CalendarCheck, CreditCard, FileCheck2, GraduationCap,
  LayoutDashboard, MessageSquare, Megaphone, Settings, Table2, Users, UserCheck,
  FileQuestion, MessagesSquare, Receipt, Activity,
} from "lucide-react";

export type NavItem = { href: string; label: string; icon: typeof LayoutDashboard; badge?: number };
export type NavGroup = { title: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Teaching",
    items: [
      { href: "/courses", label: "Courses", icon: BookOpen },
      { href: "/assignments", label: "Assignments", icon: FileCheck2 },
      { href: "/quizzes", label: "Quizzes", icon: FileQuestion },
      { href: "/grading", label: "Grading queue", icon: CalendarCheck, badge: 23 },
      { href: "/gradebook", label: "Gradebook", icon: Table2 },
    ],
  },
  {
    title: "People",
    items: [
      { href: "/students", label: "Students", icon: GraduationCap },
      { href: "/instructors", label: "Instructors", icon: Users },
      { href: "/enrolments", label: "Enrolments", icon: UserCheck, badge: 3 },
    ],
  },
  {
    title: "Communication",
    items: [
      { href: "/announcements", label: "Announcements", icon: Megaphone },
      { href: "/messages", label: "Messages", icon: MessageSquare, badge: 3 },
      { href: "/discussions", label: "Discussions", icon: MessagesSquare },
    ],
  },
  {
    title: "Operations",
    items: [
      { href: "/reports/revenue", label: "Revenue", icon: Receipt },
      { href: "/reports/engagement", label: "Engagement", icon: Activity },
      { href: "/billing", label: "Billing", icon: CreditCard },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
];
