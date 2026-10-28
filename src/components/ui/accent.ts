export type Accent = "violet" | "sky" | "mint" | "peach" | "rose" | "amber";

/** Tailwind classes per accent. Written out in full so the JIT compiler sees them. */
export const accentTile: Record<Accent, string> = {
  violet: "bg-violet-soft text-violet",
  sky: "bg-sky-soft text-sky",
  mint: "bg-mint-soft text-mint",
  peach: "bg-peach-soft text-peach",
  rose: "bg-rose-soft text-rose",
  amber: "bg-amber-soft text-amber",
};

export const accentBar: Record<Accent, string> = {
  violet: "bg-violet", sky: "bg-sky", mint: "bg-mint",
  peach: "bg-peach", rose: "bg-rose", amber: "bg-amber",
};

const order: Accent[] = ["violet", "sky", "mint", "peach", "rose", "amber"];

/** Same input always gets the same accent, so colours stay stable across pages. */
export function accentFor(key: string): Accent {
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return order[hash % order.length];
}

export const subjectAccent: Record<string, Accent> = {
  "Computer Science": "violet",
  Mathematics: "sky",
  Physics: "peach",
  Biology: "mint",
  Economics: "amber",
  Chemistry: "rose",
  Statistics: "sky",
};
