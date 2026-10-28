export type Role = "student" | "instructor" | "admin";
export type CourseStatus = "draft" | "in-review" | "published" | "archived";
export type LessonKind = "video" | "reading" | "quiz" | "assignment" | "live";
export type SubmissionStatus = "awaiting" | "marked" | "late" | "missing" | "resubmit";
export type EnrolmentStatus = "active" | "at-risk" | "dormant" | "completed" | "not-started";

export interface Instructor {
  id: string;
  name: string;
  email: string;
  title: string;
  courses: number;
  students: number;
  rating: number;
  joined: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  cohort: string;
  enrolled: string;
  lastActive: string;
  status: EnrolmentStatus;
  progress: number;
  averageGrade: number;
  courseIds: string[];
}

export interface Lesson {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  kind: LessonKind;
  durationMin: number;
  published: boolean;
  order: number;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  status: CourseStatus;
  instructorId: string;
  enrolled: number;
  capacity: number;
  completionRate: number;
  averageGrade: number;
  priceGbp: number;
  updated: string;
  created: string;
  weeks: number;
  summary: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  weightPct: number;
  maxScore: number;
  submitted: number;
  awaiting: number;
  cohortSize: number;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string | null;
  status: SubmissionStatus;
  score: number | null;
  attempt: number;
  maxAttempts: number;
  fileName: string;
  fileSizeMb: number;
  feedback?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  questionCount: number;
  timeLimitMin: number;
  attempts: number;
  passMark: number;
  averageScore: number;
  taken: number;
  status: "draft" | "open" | "closed";
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  prompt: string;
  points: number;
  options: { id: string; label: string; correct: boolean }[];
  explanation: string;
}

export interface Announcement {
  id: string;
  courseId: string | null;
  title: string;
  body: string;
  postedAt: string;
  pinned: boolean;
  reach: number;
  openRate: number;
}

export interface Thread {
  id: string;
  courseId: string;
  title: string;
  authorId: string;
  replies: number;
  lastReplyAt: string;
  resolved: boolean;
  pinned: boolean;
}

export interface Message {
  id: string;
  from: "me" | "them";
  body: string;
  sentAt: string;
}

export interface Conversation {
  id: string;
  withName: string;
  withRole: Role;
  preview: string;
  unread: number;
  lastAt: string;
  messages: Message[];
}

export interface EnrolmentRequest {
  id: string;
  studentName: string;
  email: string;
  courseId: string;
  requestedAt: string;
  note: string;
}

export interface SeriesPoint {
  label: string;
  value: number;
  previous?: number;
}

export interface Invoice {
  id: string;
  period: string;
  amountGbp: number;
  status: "paid" | "due" | "refunded";
  issued: string;
}
