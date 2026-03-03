export type Mode = "encouragement" | "wisdom" | "success";
export type Sub = "peace" | "strength" | "direction" | "confidence" | "hope";

export type VerseItem = {
  title: string;
  body: string;
  ref: string;
  mode: Mode;
  sub?: Sub; // only for encouragement
  tags?: string[]; // used by Topic chips + Index
};

export const MODES: { key: Mode; label: string }[] = [
  { key: "encouragement", label: "Encourage Me" },
  { key: "wisdom", label: "Wisdom" },
  { key: "success", label: "Success" },
];

export const SUBS: { key: Sub; label: string }[] = [
  { key: "peace", label: "Peace" },
  { key: "strength", label: "Strength" },
  { key: "direction", label: "Direction" },
  { key: "confidence", label: "Confidence" },
  { key: "hope", label: "Hope" },
];

export const subCommentary: Record<Sub, string> = {
  peace:
    "Peace isn’t the absence of trouble—it’s the presence of order in your mind. Slow down. Let wisdom settle your spirit before you act.",
  strength:
    "Strength isn’t hype. It’s quiet endurance. Take the next right step—God builds courage through consistency.",
  direction:
    "Direction often comes after alignment. Choose what’s wise, true, and clean—then move. God steers a moving ship.",
  confidence:
    "Confidence is obedience with your shoulders back. You don’t need permission to do what’s right—just courage to begin.",
  hope:
    "Hope is a decision to see beyond the moment. Today is not the whole story. Keep sowing—harvest comes.",
};

export type Topic = {
  key: string;
  label: string;
  hint: string;
  query: string; // what we inject into search
};

export const TOPICS: Topic[] = [
  { key: "anxiety", label: "Anxiety", hint: "Calm the mind", query: "anxious" },
  { key: "fear", label: "Fear", hint: "Courage over panic", query: "fear" },
  { key: "anger", label: "Anger", hint: "Gentle control", query: "anger" },
  { key: "decision", label: "Decision", hint: "What to do next", query: "counsel" },
  { key: "discipline", label: "Discipline", hint: "Consistency wins", query: "diligent" },
  { key: "leadership", label: "Leadership", hint: "Influence + integrity", query: "counsel" },
  { key: "money", label: "Money", hint: "Stewardship", query: "wealth" },
  { key: "integrity", label: "Integrity", hint: "Clean conscience", query: "righteous" },
  { key: "relationships", label: "Relationships", hint: "Words + wisdom", query: "words" },
  { key: "work", label: "Work", hint: "Excellence", query: "diligent" },
  { key: "hope", label: "Hope", hint: "Hold on", query: "hope" },
];

export const DATA: VerseItem[] = [
  // ENCOURAGEMENT — Peace
  {
    mode: "encouragement",
    sub: "peace",
    title: "Peace in anxious moments",
    body: "When your mind is racing, choose the calm path—wisdom steadies the heart.",
    ref: "Proverbs 12:25",
    tags: ["anxiety", "peace", "fear"],
  },
  {
    mode: "encouragement",
    sub: "peace",
    title: "Guard your heart",
    body: "Protect what you allow into your mind. Peace is built by boundaries—what you focus on grows.",
    ref: "Proverbs 4:23",
    tags: ["peace", "discipline", "integrity"],
  },
  {
    mode: "encouragement",
    sub: "peace",
    title: "Gentle words soften pressure",
    body: "When tension rises, lower your voice—wisdom turns down the fire.",
    ref: "Proverbs 15:1",
    tags: ["anger", "relationships", "leadership"],
  },

  // ENCOURAGEMENT — Strength
  {
    mode: "encouragement",
    sub: "strength",
    title: "Strength for the day",
    body: "Don’t quit in the pressure—steady courage grows quietly and wins later.",
    ref: "Proverbs 24:10",
    tags: ["strength", "discipline", "work"],
  },
  {
    mode: "encouragement",
    sub: "strength",
    title: "Endurance over impulse",
    body: "Strong people don’t react fast—they respond wisely and finish well.",
    ref: "Proverbs 16:32",
    tags: ["anger", "discipline", "leadership"],
  },
  {
    mode: "encouragement",
    sub: "strength",
    title: "Keep your footing",
    body: "Your steps are established when your decisions are clean and consistent.",
    ref: "Proverbs 4:26",
    tags: ["discipline", "direction"],
  },

  // ENCOURAGEMENT — Direction
  {
    mode: "encouragement",
    sub: "direction",
    title: "Direction when unsure",
    body: "Seek counsel and walk the next right step—clarity comes with motion.",
    ref: "Proverbs 11:14",
    tags: ["decision", "leadership", "direction"],
  },
  {
    mode: "encouragement",
    sub: "direction",
    title: "He will make your paths straight",
    body: "Trust beyond your understanding. Guidance often comes one step at a time—move in faith.",
    ref: "Proverbs 3:5–6",
    tags: ["direction", "decision", "hope"],
  },
  {
    mode: "encouragement",
    sub: "direction",
    title: "Commit your plans",
    body: "Submit your work, then execute with discipline—momentum follows obedience.",
    ref: "Proverbs 16:3",
    tags: ["work", "discipline", "success"],
  },

  // ENCOURAGEMENT — Confidence
  {
    mode: "encouragement",
    sub: "confidence",
    title: "Boldness follows righteousness",
    body: "Fear shrinks when your conscience is clear—do what’s right and walk tall.",
    ref: "Proverbs 28:1",
    tags: ["fear", "integrity", "confidence"],
  },
  {
    mode: "encouragement",
    sub: "confidence",
    title: "Speak with clarity",
    body: "Let your words be clean and direct—confidence is felt in simplicity.",
    ref: "Proverbs 10:19",
    tags: ["relationships", "leadership", "integrity"],
  },

  // ENCOURAGEMENT — Hope
  {
    mode: "encouragement",
    sub: "hope",
    title: "Your hope will not be cut off",
    body: "Keep doing what’s wise and right. God protects the long-term outcome of faithful people.",
    ref: "Proverbs 23:18",
    tags: ["hope", "success"],
  },
  {
    mode: "encouragement",
    sub: "hope",
    title: "Light rises",
    body: "Even if it’s dim right now—keep walking. Wisdom brings morning.",
    ref: "Proverbs 4:18",
    tags: ["hope", "direction"],
  },

  // WISDOM
  {
    mode: "wisdom",
    title: "Wisdom is the main thing",
    body: "If you’re unsure what to do next—choose wisdom first. It will shape every other decision.",
    ref: "Proverbs 4:7",
    tags: ["decision", "wisdom", "leadership"],
  },
  {
    mode: "wisdom",
    title: "Plans succeed with counsel",
    body: "Don’t isolate. The right feedback protects you from blind spots and speeds your results.",
    ref: "Proverbs 15:22",
    tags: ["decision", "leadership", "relationships"],
  },
  {
    mode: "wisdom",
    title: "Listen first",
    body: "Quick answers create mistakes—wisdom listens before speaking.",
    ref: "Proverbs 18:13",
    tags: ["relationships", "leadership", "integrity"],
  },

  // SUCCESS
  {
    mode: "success",
    title: "Diligent hands bring wealth",
    body: "Success is often the reward of consistency. Do the work you don’t feel like doing.",
    ref: "Proverbs 10:4",
    tags: ["work", "discipline", "money"],
  },
  {
    mode: "success",
    title: "The plans of the diligent",
    body: "Steady, thoughtful work beats impulsive hustle. Consistency compounds.",
    ref: "Proverbs 21:5",
    tags: ["work", "discipline", "success"],
  },
  {
    mode: "success",
    title: "Skill creates opportunity",
    body: "Excellence opens doors—become so prepared your work speaks for you.",
    ref: "Proverbs 22:29",
    tags: ["work", "leadership", "success"],
  },
];
// -------------------------
// BOOK INDEX (Pro feature)
// -------------------------
export type BookMatch = {
  topic: string;          // internal key
  label: string;          // user-facing label
  blurb: string;          // 1-line why this matters
  pages: string;          // "pp. 12–15" style (you can refine later)
  chapters: string[];     // chapter/section names
  keywords: string[];     // words that should trigger this match
};

// ✅ Starter map (edit/expand anytime; no UI changes needed)
export const BOOK_INDEX: BookMatch[] = [
  {
    topic: "faith",
    label: "Faith",
    blurb: "Trust beyond what you can see—how to keep moving when you can’t prove the outcome yet.",
    pages: "pp. 12–15",
    chapters: ["Trust That Moves", "Faith Under Pressure"],
    keywords: ["faith", "trust", "believe", "belief", "doubt"],
  },
  {
    topic: "fear",
    label: "Fear",
    blurb: "How to act with courage when your emotions are loud.",
    pages: "pp. 16–19",
    chapters: ["Courage is a Choice", "Winning the Inner Battle"],
    keywords: ["fear", "afraid", "anxious", "anxiety", "panic", "worry"],
  },
  {
    topic: "peace",
    label: "Peace",
    blurb: "How to quiet the mind and restore order inside.",
    pages: "pp. 20–23",
    chapters: ["Peace as a Practice", "The Discipline of Calm"],
    keywords: ["peace", "calm", "rest", "still", "quiet", "anxious", "anxiety"],
  },
  {
    topic: "direction",
    label: "Direction",
    blurb: "How to decide what to do next when you feel stuck.",
    pages: "pp. 24–28",
    chapters: ["Clarity Comes with Motion", "Counsel and Commitment"],
    keywords: ["direction", "decide", "decision", "stuck", "uncertain", "confused", "guidance", "path"],
  },
  {
    topic: "discipline",
    label: "Discipline",
    blurb: "Consistency that compounds—how small habits create big outcomes.",
    pages: "pp. 29–33",
    chapters: ["Diligence Wins", "The Power of Daily Obedience"],
    keywords: ["discipline", "diligent", "diligence", "habit", "consistent", "consistency", "lazy", "sloth"],
  },
  {
    topic: "leadership",
    label: "Leadership",
    blurb: "How to influence with wisdom, not pressure.",
    pages: "pp. 34–38",
    chapters: ["Counsel Creates Strength", "Integrity Builds Trust"],
    keywords: ["leadership", "leader", "influence", "team", "people", "manager", "authority", "counsel"],
  },
  {
    topic: "relationships",
    label: "Relationships",
    blurb: "How words and wisdom repair conflict and strengthen connection.",
    pages: "pp. 39–42",
    chapters: ["Words That Heal", "Conflict With Control"],
    keywords: ["relationship", "relationships", "marriage", "friend", "friends", "conflict", "argument", "words", "tongue"],
  },
  {
    topic: "money",
    label: "Money & Stewardship",
    blurb: "Wisdom that protects you from short-term thinking and financial chaos.",
    pages: "pp. 43–47",
    chapters: ["Stewardship Over Impulse", "Wealth With Wisdom"],
    keywords: ["money", "wealth", "debt", "rich", "poor", "stewardship", "finance", "finances"],
  },
  {
    topic: "integrity",
    label: "Integrity",
    blurb: "The clean conscience advantage—how character builds confidence.",
    pages: "pp. 48–52",
    chapters: ["Clean Hands, Strong Heart", "The Long Reward of Integrity"],
    keywords: ["integrity", "honest", "honesty", "righteous", "character", "truth", "upright"],
  },
  {
    topic: "work",
    label: "Work & Excellence",
    blurb: "How diligence and skill create opportunity.",
    pages: "pp. 53–57",
    chapters: ["Skill Opens Doors", "Excellence Over Excuses"],
    keywords: ["work", "job", "career", "lazy", "slack", "excellence", "skill", "promotion"],
  },
  {
    topic: "hope",
    label: "Hope",
    blurb: "How to keep your spirit up and stay steady in a long season.",
    pages: "pp. 58–61",
    chapters: ["Hope That Holds", "Light Rises"],
    keywords: ["hope", "discouraged", "discouragement", "tired", "weary", "depressed", "down"],
  },
];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function findBookMatches(query: string): BookMatch[] {
  const q = normalize(query);
  if (!q) return [];

  // Token list helps catch short queries like "faith" or "fear"
  const tokens = new Set(q.split(" ").filter(Boolean));

  // Match if query contains keyword OR token equals keyword
  const matches = BOOK_INDEX.filter((m) => {
    const keys = m.keywords.map(normalize);
    return keys.some((k) => q.includes(k) || tokens.has(k));
  });

  // Small “best first” ordering: more keyword hits = higher
  const scored = matches
    .map((m) => {
      const keys = m.keywords.map(normalize);
      const score = keys.reduce((acc, k) => (q.includes(k) || tokens.has(k) ? acc + 1 : acc), 0);
      return { m, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.map((x) => x.m).slice(0, 4); // show top 4
}
