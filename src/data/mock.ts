import type {
  Announcement, Assignment, Conversation, Course, EnrolmentRequest, Instructor,
  Invoice, Lesson, Module, Quiz, QuizQuestion, SeriesPoint, Student, Submission, Thread,
} from "./types";

export const instructors: Instructor[] = [
  { id: "i1", name: "Dr Imran Qureshi", email: "i.qureshi@academy.edu", title: "Senior Lecturer, Computer Science", courses: 4, students: 812, rating: 4.8, joined: "2024-02-11" },
  { id: "i2", name: "Prof Elena Rossi", email: "e.rossi@academy.edu", title: "Professor, Physics", courses: 3, students: 544, rating: 4.7, joined: "2023-09-04" },
  { id: "i3", name: "Dr Sara Khan", email: "s.khan@academy.edu", title: "Lecturer, Economics", courses: 2, students: 311, rating: 4.5, joined: "2025-01-20" },
  { id: "i4", name: "Dr Mark Lindqvist", email: "m.lindqvist@academy.edu", title: "Lecturer, Statistics", courses: 3, students: 402, rating: 4.6, joined: "2024-08-15" },
  { id: "i5", name: "Dr Amina Diallo", email: "a.diallo@academy.edu", title: "Senior Lecturer, Biology", courses: 2, students: 268, rating: 4.9, joined: "2025-03-02" },
];

export const courses: Course[] = [
  { id: "c1", title: "Data Structures & Algorithms", subject: "Computer Science", level: "Intermediate", status: "published", instructorId: "i1", enrolled: 412, capacity: 500, completionRate: 68, averageGrade: 74, priceGbp: 240, updated: "2026-10-25T09:12:00Z", created: "2025-09-01T10:00:00Z", weeks: 12, summary: "Core structures and algorithmic techniques used in day-to-day engineering work." },
  { id: "c2", title: "Introduction to Databases", subject: "Computer Science", level: "Beginner", status: "published", instructorId: "i1", enrolled: 287, capacity: 400, completionRate: 81, averageGrade: 78, priceGbp: 180, updated: "2026-10-21T14:40:00Z", created: "2025-06-12T10:00:00Z", weeks: 8, summary: "Relational modelling, SQL and the transaction guarantees behind them." },
  { id: "c3", title: "Classical Mechanics", subject: "Physics", level: "Intermediate", status: "published", instructorId: "i2", enrolled: 201, capacity: 300, completionRate: 59, averageGrade: 69, priceGbp: 220, updated: "2026-10-19T08:05:00Z", created: "2025-02-18T10:00:00Z", weeks: 10, summary: "Newtonian mechanics from first principles through to Lagrangian methods." },
  { id: "c4", title: "Linear Algebra Foundations", subject: "Mathematics", level: "Beginner", status: "published", instructorId: "i4", enrolled: 318, capacity: 400, completionRate: 73, averageGrade: 76, priceGbp: 160, updated: "2026-10-24T16:20:00Z", created: "2025-04-03T10:00:00Z", weeks: 8, summary: "Vectors, matrices and the geometry behind the algebra." },
  { id: "c5", title: "Advanced Algorithm Design", subject: "Computer Science", level: "Advanced", status: "in-review", instructorId: "i1", enrolled: 0, capacity: 250, completionRate: 0, averageGrade: 0, priceGbp: 280, updated: "2026-10-26T11:30:00Z", created: "2026-09-14T10:00:00Z", weeks: 8, summary: "Greedy methods, dynamic programming and amortised analysis." },
  { id: "c6", title: "Microeconomic Theory", subject: "Economics", level: "Intermediate", status: "published", instructorId: "i3", enrolled: 164, capacity: 250, completionRate: 64, averageGrade: 71, priceGbp: 190, updated: "2026-10-18T13:10:00Z", created: "2025-11-08T10:00:00Z", weeks: 10, summary: "Consumer choice, firm behaviour and market structure with worked cases." },
  { id: "c7", title: "Cell Biology Essentials", subject: "Biology", level: "Beginner", status: "published", instructorId: "i5", enrolled: 148, capacity: 200, completionRate: 77, averageGrade: 80, priceGbp: 150, updated: "2026-10-22T10:45:00Z", created: "2026-01-15T10:00:00Z", weeks: 6, summary: "Structure, transport and signalling inside the eukaryotic cell." },
  { id: "c8", title: "Statistics for Biology", subject: "Statistics", level: "Beginner", status: "in-review", instructorId: "i4", enrolled: 0, capacity: 200, completionRate: 0, averageGrade: 0, priceGbp: 140, updated: "2026-10-26T09:00:00Z", created: "2026-10-02T10:00:00Z", weeks: 6, summary: "Describing data, testing hypotheses and reading a paper critically." },
  { id: "c9", title: "Operating Systems", subject: "Computer Science", level: "Advanced", status: "draft", instructorId: "i1", enrolled: 0, capacity: 300, completionRate: 0, averageGrade: 0, priceGbp: 260, updated: "2026-10-27T08:15:00Z", created: "2026-10-10T10:00:00Z", weeks: 12, summary: "Processes, memory, scheduling and the abstractions above the metal." },
  { id: "c10", title: "Organic Chemistry I", subject: "Chemistry", level: "Intermediate", status: "archived", instructorId: "i5", enrolled: 92, capacity: 200, completionRate: 88, averageGrade: 73, priceGbp: 200, updated: "2026-06-30T12:00:00Z", created: "2024-09-20T10:00:00Z", weeks: 10, summary: "Reaction mechanisms, stereochemistry and synthesis planning." },
];

export const modules: Module[] = [
  { id: "m1", courseId: "c1", title: "Foundations", order: 1 },
  { id: "m2", courseId: "c1", title: "Linear structures", order: 2 },
  { id: "m3", courseId: "c1", title: "Trees and hashing", order: 3 },
  { id: "m4", courseId: "c1", title: "Graphs", order: 4 },
];

export const lessons: Lesson[] = [
  { id: "l1", courseId: "c1", moduleId: "m1", title: "Course introduction", kind: "video", durationMin: 6, published: true, order: 1 },
  { id: "l2", courseId: "c1", moduleId: "m1", title: "Complexity and Big-O", kind: "video", durationMin: 14, published: true, order: 2 },
  { id: "l3", courseId: "c1", moduleId: "m1", title: "Recursion and base cases", kind: "video", durationMin: 18, published: true, order: 3 },
  { id: "l4", courseId: "c1", moduleId: "m1", title: "Module 1 check", kind: "quiz", durationMin: 10, published: true, order: 4 },
  { id: "l5", courseId: "c1", moduleId: "m2", title: "Arrays vs linked lists", kind: "reading", durationMin: 9, published: true, order: 1 },
  { id: "l6", courseId: "c1", moduleId: "m2", title: "Stacks, queues and deques", kind: "video", durationMin: 21, published: true, order: 2 },
  { id: "l7", courseId: "c1", moduleId: "m2", title: "Amortised analysis", kind: "video", durationMin: 16, published: false, order: 3 },
  { id: "l8", courseId: "c1", moduleId: "m3", title: "Trees and traversal", kind: "video", durationMin: 16, published: true, order: 1 },
  { id: "l9", courseId: "c1", moduleId: "m3", title: "Balanced trees", kind: "video", durationMin: 24, published: true, order: 2 },
  { id: "l10", courseId: "c1", moduleId: "m3", title: "Hashing and collisions", kind: "video", durationMin: 19, published: true, order: 3 },
  { id: "l11", courseId: "c1", moduleId: "m3", title: "Assignment 3 — Balanced trees", kind: "assignment", durationMin: 0, published: true, order: 4 },
  { id: "l12", courseId: "c1", moduleId: "m4", title: "Graph representations", kind: "video", durationMin: 15, published: false, order: 1 },
  { id: "l13", courseId: "c1", moduleId: "m4", title: "Shortest paths", kind: "video", durationMin: 22, published: false, order: 2 },
  { id: "l14", courseId: "c1", moduleId: "m4", title: "Office hours", kind: "live", durationMin: 60, published: true, order: 3 },
];

const firstNames = ["Aisha","Daniel","Mei Lin","Tomas","Priya","Jonas","Sofia","Lucas","Fatima","Noah","Yuki","Omar","Clara","Diego","Nadia","Henrik","Leila","Marcus","Ines","Rahul"];
const lastNames = ["Rahman","Okafor","Chen","Novak","Nair","Weber","Marino","Silva","Haddad","Berg","Tanaka","Farouk","Dubois","Reyes","Hassan","Lund","Mansour","Bell","Costa","Mehta"];
const lastActiveDates = ["2026-10-25T14:02:00Z","2026-10-27T07:40:00Z","2026-10-27T10:15:00Z","2026-10-06T19:51:00Z","2026-10-26T16:30:00Z","2026-08-14T11:00:00Z","2026-10-27T08:07:00Z","2026-10-20T09:22:00Z","2026-10-26T20:11:00Z","2026-10-27T06:45:00Z","2026-10-12T13:08:00Z","2026-10-27T11:02:00Z","2026-10-24T17:35:00Z","2026-10-02T10:20:00Z","2026-10-26T12:48:00Z","2026-10-25T09:30:00Z","2026-10-18T15:12:00Z","2026-10-26T18:00:00Z","2026-10-27T09:05:00Z","2026-10-14T08:40:00Z"];

/** Fixed "today" so the demo data reads the same on every machine. */
export const TODAY = new Date("2026-10-27T12:00:00Z");
const daysSince = (iso: string) => (TODAY.getTime() - new Date(iso).getTime()) / 86_400_000;

const cohorts = ["Autumn 2026","Autumn 2026","Spring 2026","Autumn 2026","Spring 2026"];

export const students: Student[] = Array.from({ length: 20 }, (_, i) => {
  const progress = [68,54,91,22,77,8,63,45,86,71,34,95,58,12,80,66,41,73,88,29][i];
  const grade = [82,71,93,38,79,0,74,61,88,76,47,95,69,25,83,72,55,78,90,44][i];
  const lastActive = lastActiveDates[i];
  return {
    id: `s${i + 1}`,
    name: `${firstNames[i]} ${lastNames[i]}`,
    email: `${firstNames[i].toLowerCase().replace(/\s/g, ".")}.${lastNames[i].toLowerCase()}@example.edu`,
    cohort: cohorts[i % cohorts.length],
    enrolled: ["2026-09-12","2026-09-12","2026-02-03","2026-09-14","2026-02-03","2026-09-20","2026-09-12","2026-09-18","2026-02-10","2026-09-12","2026-09-25","2026-01-28","2026-09-12","2026-10-01","2026-02-03","2026-09-12","2026-09-30","2026-09-12","2026-02-03","2026-10-05"][i],
    lastActive,
    status:
      progress === 0 ? "not-started"
      : progress >= 95 ? "completed"
      : daysSince(lastActive) > 21 ? "dormant"
      : progress < 40 || grade < 50 ? "at-risk"
      : "active",
    progress,
    averageGrade: grade,
    courseIds: ["c1", i % 2 === 0 ? "c4" : "c2", i % 3 === 0 ? "c3" : "c6"].filter(Boolean),
  };
});

export const assignments: Assignment[] = [
  { id: "a1", courseId: "c1", title: "Assignment 3 — Balanced trees", dueDate: "2026-10-30T23:59:00Z", weightPct: 15, maxScore: 100, submitted: 389, awaiting: 23, cohortSize: 412 },
  { id: "a2", courseId: "c1", title: "Assignment 2 — Hash maps", dueDate: "2026-10-12T23:59:00Z", weightPct: 10, maxScore: 100, submitted: 405, awaiting: 0, cohortSize: 412 },
  { id: "a3", courseId: "c4", title: "Problem set 4 — Eigenvalues", dueDate: "2026-10-29T23:59:00Z", weightPct: 10, maxScore: 50, submitted: 240, awaiting: 78, cohortSize: 318 },
  { id: "a4", courseId: "c3", title: "Lab report 5 — Pendulum", dueDate: "2026-11-02T23:59:00Z", weightPct: 12, maxScore: 60, submitted: 96, awaiting: 105, cohortSize: 201 },
  { id: "a5", courseId: "c6", title: "Reading response 6", dueDate: "2026-10-31T23:59:00Z", weightPct: 5, maxScore: 20, submitted: 140, awaiting: 24, cohortSize: 164 },
  { id: "a6", courseId: "c2", title: "Schema design exercise", dueDate: "2026-11-05T23:59:00Z", weightPct: 15, maxScore: 100, submitted: 61, awaiting: 226, cohortSize: 287 },
];

const subStatuses = ["awaiting","marked","late","marked","awaiting","missing","marked","resubmit"] as const;
export const submissions: Submission[] = Array.from({ length: 16 }, (_, i) => {
  const st = subStatuses[i % subStatuses.length];
  return {
    id: `sub${i + 1}`,
    assignmentId: "a1",
    studentId: `s${i + 1}`,
    submittedAt: st === "missing" ? null : `2026-10-${String(22 + (i % 5)).padStart(2, "0")}T${String(9 + (i % 12)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}:00Z`,
    status: st,
    score: st === "marked" ? [88,76,91,69,84,72,95,61][i % 8] : null,
    attempt: 1 + (i % 2),
    maxAttempts: 2,
    fileName: `${lastNames[i].toLowerCase()}-avl.zip`,
    fileSizeMb: Number((1.4 + (i % 7) * 0.45).toFixed(1)),
    feedback: st === "marked" ? "Rotations are correct and well tested. Add a short proof of the height invariant in the write-up." : undefined,
  };
});

export const quizzes: Quiz[] = [
  { id: "q1", courseId: "c1", title: "Mid-term quiz — Data Structures", questionCount: 10, timeLimitMin: 30, attempts: 1, passMark: 60, averageScore: 71, taken: 388, status: "closed" },
  { id: "q2", courseId: "c1", title: "Module 1 check", questionCount: 6, timeLimitMin: 15, attempts: 3, passMark: 50, averageScore: 84, taken: 402, status: "open" },
  { id: "q3", courseId: "c4", title: "Matrix operations check", questionCount: 8, timeLimitMin: 20, attempts: 2, passMark: 55, averageScore: 77, taken: 290, status: "open" },
  { id: "q4", courseId: "c2", title: "Normalisation quiz", questionCount: 12, timeLimitMin: 25, attempts: 1, passMark: 60, averageScore: 68, taken: 254, status: "closed" },
  { id: "q5", courseId: "c5", title: "Greedy vs DP diagnostic", questionCount: 10, timeLimitMin: 30, attempts: 1, passMark: 60, averageScore: 0, taken: 0, status: "draft" },
];

export const quizQuestions: QuizQuestion[] = [
  { id: "qq1", quizId: "q1", prompt: "What is the worst-case time complexity of searching an unsorted singly linked list?", points: 10,
    options: [ { id: "A", label: "O(1) — constant time", correct: false }, { id: "B", label: "O(n) — linear time", correct: true }, { id: "C", label: "O(log n) — logarithmic time", correct: false }, { id: "D", label: "O(n log n) — linearithmic", correct: false } ],
    explanation: "Every node may need to be visited, so the cost grows linearly with n." },
  { id: "qq2", quizId: "q1", prompt: "Which structure gives amortised O(1) append and O(1) random access?", points: 10,
    options: [ { id: "A", label: "A singly linked list", correct: false }, { id: "B", label: "A dynamic array", correct: true }, { id: "C", label: "A doubly linked list", correct: false }, { id: "D", label: "A binary search tree", correct: false } ],
    explanation: "Dynamic arrays double their capacity, which amortises the cost of growth to O(1)." },
  { id: "qq3", quizId: "q1", prompt: "In an AVL tree, what is the maximum allowed difference in height between two sibling subtrees?", points: 10,
    options: [ { id: "A", label: "0", correct: false }, { id: "B", label: "1", correct: true }, { id: "C", label: "2", correct: false }, { id: "D", label: "log n", correct: false } ],
    explanation: "The AVL invariant permits a balance factor of -1, 0 or 1 at every node." },
];

export const announcements: Announcement[] = [
  { id: "an1", courseId: "c1", title: "Assignment 3 deadline extended", body: "You now have until Friday 30 October at 23:59. The rubric is unchanged.", postedAt: "2026-10-25T10:00:00Z", pinned: true, reach: 412, openRate: 78 },
  { id: "an2", courseId: "c1", title: "Office hours moved to Thursday", body: "This week only, office hours run Thursday 16:00–18:00 instead of Wednesday.", postedAt: "2026-10-22T09:30:00Z", pinned: false, reach: 412, openRate: 71 },
  { id: "an3", courseId: null, title: "Platform maintenance, Sunday 02:00–04:00", body: "The platform will be read-only for two hours while we upgrade the database.", postedAt: "2026-10-20T16:45:00Z", pinned: false, reach: 8412, openRate: 64 },
  { id: "an4", courseId: "c4", title: "Reading list for week 6 is up", body: "Chapters 9 and 10 plus the two papers linked in resources. Come with questions.", postedAt: "2026-10-18T11:15:00Z", pinned: false, reach: 318, openRate: 69 },
];

export const threads: Thread[] = [
  { id: "t1", courseId: "c1", title: "When exactly does the base case fire?", authorId: "s1", replies: 7, lastReplyAt: "2026-10-27T09:40:00Z", resolved: false, pinned: true },
  { id: "t2", courseId: "c1", title: "Big-O for hash collisions", authorId: "s3", replies: 12, lastReplyAt: "2026-10-26T18:22:00Z", resolved: true, pinned: false },
  { id: "t3", courseId: "c1", title: "Assignment 3 clarification", authorId: "s7", replies: 8, lastReplyAt: "2026-10-27T07:05:00Z", resolved: false, pinned: false },
  { id: "t4", courseId: "c4", title: "Study group — Thursdays", authorId: "s9", replies: 23, lastReplyAt: "2026-10-25T20:10:00Z", resolved: false, pinned: false },
  { id: "t5", courseId: "c2", title: "Which normal form do we need for the exam?", authorId: "s12", replies: 4, lastReplyAt: "2026-10-24T14:33:00Z", resolved: true, pinned: false },
];

export const conversations: Conversation[] = [
  { id: "cv1", withName: "Aisha Rahman", withRole: "student", preview: "Thanks — that clears it up.", unread: 0, lastAt: "2026-10-27T10:32:00Z",
    messages: [
      { id: "mm1", from: "them", body: "Hello — I have a question about the assignment 3 rubric. Does the write-up need a formal proof?", sentAt: "2026-10-27T10:04:00Z" },
      { id: "mm2", from: "me", body: "Not a formal proof. A short argument for why the height invariant holds after a rotation is enough.", sentAt: "2026-10-27T10:21:00Z" },
      { id: "mm3", from: "them", body: "Thanks — that clears it up.", sentAt: "2026-10-27T10:32:00Z" },
    ] },
  { id: "cv2", withName: "Daniel Okafor", withRole: "student", preview: "Could I get an extension?", unread: 2, lastAt: "2026-10-27T08:50:00Z",
    messages: [
      { id: "mm4", from: "them", body: "I have been unwell this week. Could I get a short extension on assignment 3?", sentAt: "2026-10-27T08:44:00Z" },
      { id: "mm5", from: "them", body: "Happy to send a note if you need one.", sentAt: "2026-10-27T08:50:00Z" },
    ] },
  { id: "cv3", withName: "Prof Elena Rossi", withRole: "instructor", preview: "Shall we align the lab schedules?", unread: 0, lastAt: "2026-10-26T15:12:00Z",
    messages: [
      { id: "mm6", from: "them", body: "Our lab sessions clash with your office hours. Shall we align the schedules?", sentAt: "2026-10-26T15:12:00Z" },
    ] },
  { id: "cv4", withName: "Admissions office", withRole: "admin", preview: "Two enrolment requests need review", unread: 1, lastAt: "2026-10-26T09:00:00Z",
    messages: [
      { id: "mm7", from: "them", body: "Two enrolment requests for Advanced Algorithm Design need your review before Friday.", sentAt: "2026-10-26T09:00:00Z" },
    ] },
];

export const enrolmentRequests: EnrolmentRequest[] = [
  { id: "er1", studentName: "Yusuf Adeyemi", email: "y.adeyemi@example.edu", courseId: "c5", requestedAt: "2026-10-26T08:12:00Z", note: "Completed Data Structures with 88%." },
  { id: "er2", studentName: "Hanna Virtanen", email: "h.virtanen@example.edu", courseId: "c5", requestedAt: "2026-10-25T17:40:00Z", note: "Transferring from another institution." },
  { id: "er3", studentName: "Ravi Pillai", email: "r.pillai@example.edu", courseId: "c1", requestedAt: "2026-10-24T11:05:00Z", note: "Late enrolment, cohort already started." },
];

export const enrolmentSeries: SeriesPoint[] = [
  { label: "Nov", value: 142, previous: 118 }, { label: "Dec", value: 168, previous: 131 },
  { label: "Jan", value: 221, previous: 164 }, { label: "Feb", value: 198, previous: 172 },
  { label: "Mar", value: 246, previous: 189 }, { label: "Apr", value: 231, previous: 201 },
  { label: "May", value: 278, previous: 214 }, { label: "Jun", value: 262, previous: 228 },
  { label: "Jul", value: 240, previous: 236 }, { label: "Aug", value: 295, previous: 247 },
  { label: "Sep", value: 348, previous: 262 }, { label: "Oct", value: 391, previous: 281 },
];

export const engagementSeries: SeriesPoint[] = [
  { label: "Mon", value: 1840 }, { label: "Tue", value: 2120 }, { label: "Wed", value: 2380 },
  { label: "Thu", value: 2210 }, { label: "Fri", value: 1960 }, { label: "Sat", value: 980 }, { label: "Sun", value: 760 },
];

export const completionBySubject: SeriesPoint[] = [
  { label: "Computer Science", value: 72 }, { label: "Mathematics", value: 73 },
  { label: "Physics", value: 59 }, { label: "Economics", value: 64 },
  { label: "Biology", value: 77 }, { label: "Chemistry", value: 88 },
];

export const gradeDistribution: SeriesPoint[] = [
  { label: "A", value: 62 }, { label: "B", value: 148 }, { label: "C", value: 121 },
  { label: "D", value: 58 }, { label: "F", value: 23 },
];

export const revenueSeries: SeriesPoint[] = [
  { label: "May", value: 39800 }, { label: "Jun", value: 41100 }, { label: "Jul", value: 41900 },
  { label: "Aug", value: 43400 }, { label: "Sep", value: 45600 }, { label: "Oct", value: 48200 },
];

export const invoices: Invoice[] = [
  { id: "INV-2026-114", period: "October 2026", amountGbp: 48200, status: "paid", issued: "2026-10-01" },
  { id: "INV-2026-098", period: "September 2026", amountGbp: 45600, status: "paid", issued: "2026-09-01" },
  { id: "INV-2026-081", period: "August 2026", amountGbp: 43400, status: "paid", issued: "2026-08-01" },
  { id: "INV-2026-067", period: "July 2026", amountGbp: 41900, status: "paid", issued: "2026-07-01" },
  { id: "INV-2026-052", period: "June 2026", amountGbp: 41100, status: "refunded", issued: "2026-06-01" },
  { id: "INV-2026-039", period: "May 2026", amountGbp: 39800, status: "paid", issued: "2026-05-01" },
];

// lookups
export const courseById = (id: string) => courses.find((c) => c.id === id);
export const instructorById = (id: string) => instructors.find((i) => i.id === id);
export const studentById = (id: string) => students.find((s) => s.id === id);
export const assignmentById = (id: string) => assignments.find((a) => a.id === id);
export const quizById = (id: string) => quizzes.find((q) => q.id === id);
export const lessonsByCourse = (id: string) => lessons.filter((l) => l.courseId === id);
export const modulesByCourse = (id: string) => modules.filter((m) => m.courseId === id);
