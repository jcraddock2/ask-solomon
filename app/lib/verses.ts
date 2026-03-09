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
export function findBookMatches(q: string): BookMatch[] {
  const query = q.toLowerCase().trim();

  const matches: BookMatch[] = [];

  const TOPIC_MAP: Record<string, BookMatch> = {
    counsel: {
      topic: "counsel",
      label: "Seeking Counsel",
      pages: "42–46",
      chapters: ["The Power of Counsel"],
      blurb: "Wise leaders seek many counselors before major decisions.",
      keywords: ["counsel", "advice", "guidance", "wisdom"],
    },

    leadership: {
      topic: "leadership",
      label: "Leadership",
      pages: "42–46",
      chapters: ["The Power of Counsel", "Leading with Wisdom"],
      blurb: "Leadership grows from humility, wisdom, and guidance.",
      keywords: ["leadership", "leader", "influence", "authority"],
    },

    discipline: {
      topic: "discipline",
      label: "Discipline",
      pages: "54–58",
      chapters: ["The Path of Discipline"],
      blurb: "Discipline builds the structure that produces success.",
      keywords: ["discipline", "self-control", "consistency", "training"],
    },

    fear: {
      topic: "fear",
      label: "Overcoming Fear",
      pages: "77–80",
      chapters: ["Courage Over Fear"],
      blurb: "Fear loses power when wisdom and faith guide decisions.",
      keywords: ["fear", "afraid", "anxiety", "courage"],
    },

    speech: {
      topic: "speech",
      label: "The Power of Words",
      pages: "120–124",
      chapters: ["The Power of Words"],
      blurb: "Words can build life or destroy it.",
      keywords: ["speech", "words", "tongue", "communication"],
    },

    wealth: {
      topic: "wealth",
      label: "Money & Wealth",
      pages: "88–92",
      chapters: ["Wealth and Stewardship"],
      blurb: "Wealth grows through diligence, stewardship, and wisdom.",
      keywords: ["wealth", "money", "riches", "prosperity", "finances"],
    },

    integrity: {
      topic: "integrity",
      label: "Integrity",
      pages: "66–70",
      chapters: ["The Integrity Advantage"],
      blurb: "Integrity protects reputation and long-term success.",
      keywords: ["integrity", "character", "honesty", "truth"],
    },

    diligence: {
      topic: "diligence",
      label: "Diligence",
      pages: "72–76",
      chapters: ["The Diligent Path"],
      blurb: "Consistent effort produces lasting success.",
      keywords: ["diligence", "hard work", "effort", "work ethic"],
    },
  };

  for (const topic of Object.keys(TOPIC_MAP)) {
    const match = TOPIC_MAP[topic];
    if (query.includes(topic) && match) {
      matches.push(match);
      continue;
    }

    if (match.keywords.some((k) => query.includes(k.toLowerCase()))) {
      matches.push(match);
    }
  }

  return matches.slice(0, 4);
}
export const SMART_TOPIC_SUGGESTIONS: Record<string, string[]> = {
  fear: ["peace", "direction", "faith", "courage"],
  anxiety: ["peace", "trust", "direction"],
  anger: ["self-control", "speech", "patience"],
  speech: ["wisdom", "self-control", "relationships"],
  leadership: ["counsel", "integrity", "discipline"],
  money: ["stewardship", "discipline", "planning"],
  relationships: ["speech", "forgiveness", "wisdom"],
  discipline: ["diligence", "work", "success"],
  success: ["discipline", "wisdom", "planning"],
};
