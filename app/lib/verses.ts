import { BOOK_INDEX } from "./bookIndex";

export type Mode = "encouragement" | "wisdom" | "success";
export type Sub = "peace" | "strength" | "direction" | "confidence" | "hope";

export type VerseItem = {
  title: string;
  body: string;
  ref: string;
  mode: Mode;
  sub?: Sub;
  tags?: string[];
  keywords?: string[];
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
  query: string;
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
    tags: ["anxiety", "peace", "fear", "worry", "calm", "encouragement"],
    keywords: ["anxious", "anxiety", "worry", "fear", "calm", "peace", "troubled"],
  },
  {
    mode: "encouragement",
    sub: "peace",
    title: "Guard your heart",
    body: "Protect what you allow into your mind. Peace is built by boundaries—what you focus on grows.",
    ref: "Proverbs 4:23",
    tags: ["peace", "discipline", "integrity", "heart", "boundaries", "inner life"],
    keywords: ["heart", "inner life", "boundaries", "guard your heart", "peace", "focus"],
  },
  {
    mode: "encouragement",
    sub: "peace",
    title: "Gentle words soften pressure",
    body: "When tension rises, lower your voice—wisdom turns down the fire.",
    ref: "Proverbs 15:1",
    tags: ["anger", "relationships", "leadership", "gentle", "speech", "conflict"],
    keywords: ["gentle", "words", "speech", "anger", "conflict", "relationship conflict"],
  },

  // ENCOURAGEMENT — Strength
  {
    mode: "encouragement",
    sub: "strength",
    title: "Strength for the day",
    body: "Don’t quit in the pressure—steady courage grows quietly and wins later.",
    ref: "Proverbs 24:10",
    tags: ["strength", "discipline", "work", "weary", "adversity", "perseverance"],
    keywords: ["weary", "adversity", "pressure", "strength", "endure", "persevere"],
  },
  {
    mode: "encouragement",
    sub: "strength",
    title: "Endurance over impulse",
    body: "Strong people don’t react fast—they respond wisely and finish well.",
    ref: "Proverbs 16:32",
    tags: ["anger", "discipline", "leadership", "strength", "self-control"],
    keywords: ["endurance", "impulse", "anger", "self-control", "respond wisely", "finish well"],
  },
  {
    mode: "encouragement",
    sub: "strength",
    title: "Keep your footing",
    body: "Your steps are established when your decisions are clean and consistent.",
    ref: "Proverbs 4:26",
    tags: ["discipline", "direction", "strength", "consistency"],
    keywords: ["footing", "steady", "steps", "consistent", "discipline", "direction"],
  },

  // ENCOURAGEMENT — Direction
  {
    mode: "encouragement",
    sub: "direction",
    title: "Direction when unsure",
    body: "Seek counsel and walk the next right step—clarity comes with motion.",
    ref: "Proverbs 11:14",
    tags: ["decision", "leadership", "direction", "counsel", "guidance", "clarity"],
    keywords: ["unsure", "direction", "guidance", "counsel", "clarity", "next step", "decision"],
  },
  {
    mode: "encouragement",
    sub: "direction",
    title: "He will make your paths straight",
    body: "Trust beyond your understanding. Guidance often comes one step at a time—move in faith.",
    ref: "Proverbs 3:5–6",
    tags: ["direction", "decision", "hope", "trust", "guidance", "clarity"],
    keywords: ["paths", "guidance", "trust", "direction", "faith", "understanding", "clarity"],
  },
  {
    mode: "encouragement",
    sub: "direction",
    title: "Commit your plans",
    body: "Submit your work, then execute with discipline—momentum follows obedience.",
    ref: "Proverbs 16:3",
    tags: ["work", "discipline", "success", "plans", "direction"],
    keywords: ["plans", "commit", "work", "discipline", "momentum", "obedience"],
  },

  // ENCOURAGEMENT — Confidence
  {
    mode: "encouragement",
    sub: "confidence",
    title: "Boldness follows righteousness",
    body: "Fear shrinks when your conscience is clear—do what’s right and walk tall.",
    ref: "Proverbs 28:1",
    tags: ["fear", "integrity", "confidence", "boldness", "righteousness"],
    keywords: ["boldness", "confidence", "fear", "clear conscience", "righteous", "walk tall"],
  },
  {
    mode: "encouragement",
    sub: "confidence",
    title: "Speak with clarity",
    body: "Let your words be clean and direct—confidence is felt in simplicity.",
    ref: "Proverbs 10:19",
    tags: ["relationships", "leadership", "integrity", "confidence", "speech"],
    keywords: ["clarity", "words", "speak", "communication", "confidence", "simplicity"],
  },

  // ENCOURAGEMENT — Hope
  {
    mode: "encouragement",
    sub: "hope",
    title: "Your hope will not be cut off",
    body: "Keep doing what’s wise and right. God protects the long-term outcome of faithful people.",
    ref: "Proverbs 23:18",
    tags: ["hope", "success", "future", "faithfulness", "discouraged"],
    keywords: ["hope", "future", "faithful", "outcome", "keep going", "not cut off", "discouraged"],
  },
  {
    mode: "encouragement",
    sub: "hope",
    title: "Light rises",
    body: "Even if it’s dim right now—keep walking. Wisdom brings morning.",
    ref: "Proverbs 4:18",
    tags: ["hope", "direction", "light", "future", "discouraged"],
    keywords: ["light", "morning", "hope", "future", "dim", "keep walking", "discouraged"],
  },
  {
    mode: "encouragement",
    sub: "hope",
    title: "Healing for a wounded heart",
    body: "Even deep pain does not have the final word—wisdom leads the wounded heart toward comfort and healing.",
    ref: "Proverbs 17:22",
    tags: ["hurting", "hurt", "pain", "grief", "healing", "comfort", "sorrow", "hope"],
    keywords: [
      "hurting",
      "hurt",
      "pain",
      "wounded",
      "grief",
      "sorrow",
      "broken",
      "brokenhearted",
      "comfort",
      "healing",
    ],
  },
  {
    mode: "encouragement",
    sub: "hope",
    title: "You are not alone in this",
    body: "When you feel unseen or isolated, wisdom reminds you that your life still carries value, meaning, and hope.",
    ref: "Proverbs 3:5–6",
    tags: ["lonely", "alone", "isolated", "rejected", "comfort", "hope", "belonging"],
    keywords: [
      "lonely",
      "alone",
      "isolated",
      "rejected",
      "abandoned",
      "unseen",
      "belonging",
      "comfort",
      "friendship",
    ],
  },

  // WISDOM
  {
    mode: "wisdom",
    title: "Wisdom is the main thing",
    body: "If you’re unsure what to do next—choose wisdom first. It will shape every other decision.",
    ref: "Proverbs 4:7",
    tags: ["decision", "wisdom", "leadership"],
    keywords: ["wisdom", "decision", "unsure", "what to do", "next step", "understanding"],
  },
  {
    mode: "wisdom",
    title: "Plans succeed with counsel",
    body: "Don’t isolate. The right feedback protects you from blind spots and speeds your results.",
    ref: "Proverbs 15:22",
    tags: ["decision", "leadership", "relationships", "counsel"],
    keywords: ["counsel", "advice", "feedback", "plans", "leadership", "guidance"],
  },
  {
    mode: "wisdom",
    title: "Listen first",
    body: "Quick answers create mistakes—wisdom listens before speaking.",
    ref: "Proverbs 18:13",
    tags: ["relationships", "leadership", "integrity", "speech"],
    keywords: ["listen", "speaking", "quick answers", "mistakes", "communication", "wisdom"],
  },

  // SUCCESS
  {
    mode: "success",
    title: "Diligent hands bring wealth",
    body: "Success is often the reward of consistency. Do the work you don’t feel like doing.",
    ref: "Proverbs 10:4",
    tags: ["work", "discipline", "money", "success", "diligence"],
    keywords: ["wealth", "money", "work", "discipline", "consistency", "diligent"],
  },
  {
    mode: "success",
    title: "The plans of the diligent",
    body: "Steady, thoughtful work beats impulsive hustle. Consistency compounds.",
    ref: "Proverbs 21:5",
    tags: ["work", "discipline", "success", "planning", "diligence"],
    keywords: ["diligent", "plans", "steady work", "consistency", "planning", "success"],
  },
  {
    mode: "success",
    title: "Skill creates opportunity",
    body: "Excellence opens doors—become so prepared your work speaks for you.",
    ref: "Proverbs 22:29",
    tags: ["work", "leadership", "success", "skill", "excellence"],
    keywords: ["skill", "opportunity", "prepared", "excellence", "work", "promotion"],
  },
];
// -------------------------
// BOOK INDEX (Pro feature)
// -------------------------
export type BookMatch = {
  topic: string;
  label: string;
  blurb: string;
  pages: string;
  chapters: string[];
  keywords: string[];
};

const TOPIC_MAP: Record<string, BookMatch> = {
  confidence: {
    topic: "confidence",
    label: "Confidence Begins Internally",
    pages: "41–44",
    chapters: ["Identity", "Confidence"],
    blurb:
      "Confidence grows when you stop letting fear, insecurity, and other people’s opinions define your value.",
    keywords: ["confidence", "self doubt", "insecure", "fear", "boldness"],
  },
  leadership: {
    topic: "leadership",
    label: "Leadership Starts Within",
    pages: "90–98",
    chapters: ["Leadership"],
    blurb:
      "Leadership requires emotional control, clear judgment, and the discipline to respond instead of react.",
    keywords: ["leadership", "leader", "manager", "boss", "responsibility"],
  },
  relationships: {
    topic: "relationships",
    label: "Wisdom With Difficult People",
    pages: "105–110",
    chapters: ["Relationships"],
    blurb:
      "Difficult people test your peace, your patience, and your ability to stay wise under pressure.",
    keywords: [
      "relationships",
      "conflict",
      "difficult people",
      "boss",
      "manager",
      "toxic",
      "frustrated",
      "anger",
      "boundaries",
    ],
  },
  direction: {
    topic: "direction",
    label: "Clarity Comes One Step at a Time",
    pages: "118–123",
    chapters: ["Purpose", "Direction"],
    blurb:
      "When you do not know what to do, wisdom helps you take the next clean step instead of freezing in confusion.",
    keywords: ["direction", "clarity", "confused", "lost", "decision", "purpose"],
  },
  resilience: {
    topic: "resilience",
    label: "Failure Becomes Wisdom",
    pages: "155–160",
    chapters: ["Resilience"],
    blurb:
      "Failure is not the end of your story. It becomes wisdom when you learn, adjust, and keep moving.",
    keywords: ["failure", "failing", "discouraged", "setback", "resilience"],
  },
};

export function findBookMatches(q: string): BookMatch[] {
  const query = q.toLowerCase().trim();
  if (!query) return [];

  const queryWords = query
    .split(/[^a-z0-9]+/i)
    .map((word) => word.trim())
    .filter(Boolean);

  const matches: BookMatch[] = [];

  for (const topic of Object.keys(TOPIC_MAP)) {
    const match = TOPIC_MAP[topic];

    const keywordHit = match.keywords.some((k) => {
      const keyword = k.toLowerCase();
      return query.includes(keyword) || queryWords.includes(keyword);
    });

    if (query.includes(topic.toLowerCase()) || keywordHit) {
      matches.push(match);
    }
  }

  const isDifficultPeopleQuery =
    query.includes("boss") ||
    query.includes("manager") ||
    query.includes("supervisor") ||
    query.includes("leader") ||
    query.includes("difficult") ||
    query.includes("toxic") ||
    query.includes("conflict") ||
    query.includes("frustrated") ||
    query.includes("disrespected");

  const bookIndexMatches = BOOK_INDEX.map((entry) => {
    const title = entry.title.toLowerCase();
    const excerpt = entry.excerpt.toLowerCase();
    const tags = entry.tags.map((t) => t.toLowerCase());
    const keywords = entry.keywords.map((k) => k.toLowerCase());
    const searchPhrase = entry.searchPhrase.toLowerCase();

    const searchable = [
      title,
      excerpt,
      searchPhrase,
      ...tags,
      ...keywords,
    ].join(" ");

    let score = 0;

    for (const word of queryWords) {
      if (title.includes(word)) score += 10;
      if (searchPhrase.includes(word)) score += 12;
      if (tags.some((tag) => tag.includes(word))) score += 8;
      if (keywords.some((keyword) => keyword.includes(word))) score += 7;
      if (excerpt.includes(word)) score += 3;
      if (searchable.includes(word)) score += 1;
    }

    if (searchable.includes(query)) score += 35;

    if (isDifficultPeopleQuery) {
      if (
        keywords.includes("difficult boss") ||
        keywords.includes("boss") ||
        keywords.includes("conflict") ||
        keywords.includes("toxic people") ||
        tags.includes("difficult people") ||
        tags.includes("relationships")
      ) {
        score += 45;
      }

      if (
        tags.includes("leadership") ||
        keywords.includes("leader") ||
        keywords.includes("manager")
      ) {
        score += 18;
      }

      if (
        tags.includes("confidence") ||
        tags.includes("success") ||
        tags.includes("fear")
      ) {
        score -= 15;
      }
    }

    return {
      topic: entry.id,
      label: entry.title,
      pages: entry.page,
      chapters: [entry.chapter],
      blurb: entry.excerpt,
      keywords: entry.keywords,
      score,
    };
  })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ score, ...match }) => match);

  const combined = [...matches, ...bookIndexMatches];

  const deduped = combined.filter(
    (item, index, arr) =>
      index === arr.findIndex((x) => x.label === item.label)
  );

  return deduped.slice(0, 6);
}
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

export function findBookMatches(q: string): BookMatch[] {
  const query = q.toLowerCase().trim();
  if (!query) return [];

  const queryWords = query
    .split(/[^a-z0-9]+/i)
    .map((word) => word.trim())
    .filter(Boolean);

  const matches: BookMatch[] = [];

  for (const topic of Object.keys(TOPIC_MAP)) {
    const match = TOPIC_MAP[topic];

    const keywordHit = match.keywords.some((k) => {
      const keyword = k.toLowerCase();
      return query.includes(keyword) || queryWords.includes(keyword);
    });

    if (query.includes(topic) || keywordHit) {
      matches.push(match);
    }
  }

  const isDifficultPeopleQuery =
    query.includes("boss") ||
    query.includes("manager") ||
    query.includes("supervisor") ||
    query.includes("leader") ||
    query.includes("difficult") ||
    query.includes("toxic") ||
    query.includes("conflict") ||
    query.includes("frustrated") ||
    query.includes("disrespected");

  const bookIndexMatches: BookMatch[] = BOOK_INDEX.map((entry) => {
    const title = entry.title.toLowerCase();
    const excerpt = entry.excerpt.toLowerCase();
    const tags = entry.tags.map((t) => t.toLowerCase());
    const keywords = entry.keywords.map((k) => k.toLowerCase());
    const searchPhrase = entry.searchPhrase.toLowerCase();

    const searchable = [
      title,
      excerpt,
      searchPhrase,
      ...tags,
      ...keywords,
    ].join(" ");

    let score = 0;

    for (const word of queryWords) {
      if (title.includes(word)) score += 10;
      if (searchPhrase.includes(word)) score += 12;
      if (tags.some((tag) => tag.includes(word))) score += 8;
      if (keywords.some((keyword) => keyword.includes(word))) score += 7;
      if (excerpt.includes(word)) score += 3;
      if (searchable.includes(word)) score += 1;
    }

    if (searchable.includes(query)) score += 35;

    if (isDifficultPeopleQuery) {
      if (
        keywords.includes("difficult boss") ||
        keywords.includes("boss") ||
        keywords.includes("conflict") ||
        keywords.includes("toxic people") ||
        tags.includes("difficult people") ||
        tags.includes("relationships")
      ) {
        score += 45;
      }

      if (
        tags.includes("leadership") ||
        keywords.includes("leader") ||
        keywords.includes("manager")
      ) {
        score += 18;
      }

      if (
        tags.includes("confidence") ||
        tags.includes("success") ||
        tags.includes("fear")
      ) {
        score -= 15;
      }
    }

    return {
      topic: entry.id,
      label: entry.title,
      pages: entry.page,
      chapters: [entry.chapter],
      blurb: entry.excerpt,
      keywords: entry.keywords,
      score,
    };
  })
    .filter((match) => match.score > 0)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .map(({ score, ...match }) => match);

  const combined = [...matches, ...bookIndexMatches];

  const deduped = combined.filter(
    (item, index, arr) =>
      index === arr.findIndex((x) => x.label === item.label)
  );

  return deduped.slice(0, 6);
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

// -------------------------
// SMART VERSE SEARCH
// -------------------------
export type ScoredVerse = VerseItem & {
  score: number;
  why: string[];
};

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): string[] {
  return normalizeText(value)
    .split(" ")
    .map((x) => x.trim())
    .filter(Boolean);
}

function uniq(items: string[]): string[] {
  return Array.from(new Set(items));
}

function expandQueryTokens(rawQuery: string): string[] {
  const base = tokenize(rawQuery);
  const expanded = [...base];

  const q = normalizeText(rawQuery);

  const synonymMap: Record<string, string[]> = {
    anxious: ["anxiety", "peace", "calm", "fear"],
    anxiety: ["anxious", "peace", "calm", "fear"],
    afraid: ["fear", "courage", "confidence"],
    fear: ["afraid", "courage", "confidence"],
    hurt: ["hurting", "comfort", "healing", "peace"],
    hurting: ["hurt", "comfort", "healing", "peace"],
    angry: ["anger", "gentle", "self-control"],
    anger: ["angry", "gentle", "self-control"],
    direction: ["guidance", "counsel", "decision"],
    guidance: ["direction", "counsel", "wisdom"],
    decision: ["direction", "counsel", "wisdom"],
    money: ["wealth", "finances", "work", "diligence"],
    finances: ["money", "wealth", "stewardship"],
    work: ["diligence", "discipline", "success"],
    leadership: ["leader", "counsel", "integrity"],
    confidence: ["boldness", "fear", "courage"],
    hope: ["future", "light", "faithfulness"],
    weary: ["strength", "endure", "pressure"],
    overwhelmed: ["anxious", "direction", "peace"],
  };

  for (const token of base) {
    const extras = synonymMap[token];
    if (extras) expanded.push(...extras);
  }

  if (q.includes("heavy heart")) {
    expanded.push("heart", "comfort", "peace", "anxious");
  }

  if (q.includes("what should i do")) {
    expanded.push("decision", "direction", "counsel", "wisdom");
  }

  if (q.includes("i need guidance")) {
    expanded.push("guidance", "direction", "counsel", "wisdom");
  }

  if (q.includes("i feel overwhelmed")) {
    expanded.push("overwhelmed", "peace", "direction", "anxious");
  }

  return uniq(expanded);
}

function scoreVerse(item: VerseItem, rawQuery: string): ScoredVerse {
  const query = normalizeText(rawQuery);
  const queryTokens = expandQueryTokens(rawQuery);

  const haystackTitle = normalizeText(item.title);
  const haystackBody = normalizeText(item.body);
  const haystackRef = normalizeText(item.ref);
  const haystackTags = (item.tags || []).map(normalizeText);
  const haystackKeywords = (item.keywords || []).map(normalizeText);

  let score = 0;
  const why: string[] = [];

  if (!query) {
    return { ...item, score: 0, why: [] };
  }

  if (haystackTitle.includes(query)) {
    score += 12;
    why.push("title phrase");
  }

  if (haystackBody.includes(query)) {
    score += 10;
    why.push("body phrase");
  }

  if (haystackRef.includes(query)) {
    score += 20;
    why.push("reference");
  }

  if (haystackTags.some((t) => t.includes(query) || query.includes(t))) {
    score += 14;
    why.push("topic tag");
  }

  if (haystackKeywords.some((k) => k.includes(query) || query.includes(k))) {
    score += 16;
    why.push("keyword phrase");
  }

  for (const token of queryTokens) {
    if (!token) continue;

    if (haystackTitle.includes(token)) score += 5;
    if (haystackBody.includes(token)) score += 3;
    if (haystackTags.some((t) => t.includes(token))) score += 6;
    if (haystackKeywords.some((k) => k.includes(token))) score += 7;
  }

  if (item.mode === "encouragement") {
    if (queryTokens.includes("anxious") || queryTokens.includes("peace")) {
      if (item.sub === "peace") score += 4;
    }

    if (queryTokens.includes("strength") || queryTokens.includes("weary")) {
      if (item.sub === "strength") score += 4;
    }

    if (
      queryTokens.includes("direction") ||
      queryTokens.includes("guidance") ||
      queryTokens.includes("decision")
    ) {
      if (item.sub === "direction") score += 4;
    }

    if (queryTokens.includes("confidence") || queryTokens.includes("courage")) {
      if (item.sub === "confidence") score += 4;
    }

    if (queryTokens.includes("hope") || queryTokens.includes("future")) {
      if (item.sub === "hope") score += 4;
    }
  }

  return {
    ...item,
    score,
    why: uniq(why),
  };
}

export function findVerseMatches(
  q: string,
  options?: {
    mode?: Mode;
    sub?: Sub | "all";
    limit?: number;
  }
): ScoredVerse[] {
  const query = q.trim();
  const limit = options?.limit ?? 20;

  let pool = DATA;

  if (options?.mode) {
    pool = pool.filter((item) => item.mode === options.mode);
  }

  if (options?.mode === "encouragement" && options?.sub && options.sub !== "all") {
    pool = pool.filter((item) => item.sub === options.sub);
  }

  if (!query) {
    return pool.slice(0, limit).map((item) => ({
      ...item,
      score: 0,
      why: [],
    }));
  }

  return pool
    .map((item) => scoreVerse(item, query))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

type SearchOptions = {
  mode?: Mode;
  sub?: Sub | "all";
  limit?: number;
};

type ScoredVerseResult = {
  item: VerseItem;
  score: number;
  why: string[];
};

const GENERIC_TERMS = new Set([
  "wisdom",
  "encouragement",
  "peace",
  "help",
  "hope",
  "strength",
  "heart",
]);

const INTENT_MAP: Record<string, string[]> = {
  lonely: [
    "lonely",
    "alone",
    "isolated",
    "abandoned",
    "rejected",
    "unseen",
    "belonging",
    "comfort",
    "friendship",
    "companionship",
  ],
  hurting: [
    "hurting",
    "hurt",
    "pain",
    "wounded",
    "grief",
    "sorrow",
    "broken",
    "brokenhearted",
    "comfort",
    "healing",
  ],
  direction: [
    "direction",
    "guidance",
    "clarity",
    "path",
    "decision",
    "counsel",
    "understanding",
    "wisdom",
  ],
  money: [
    "money",
    "finances",
    "debt",
    "provision",
    "lack",
    "wealth",
    "stewardship",
    "planning",
    "resources",
    "diligence",
  ],
  anxiety: [
    "anxiety",
    "anxious",
    "fear",
    "worry",
    "overwhelmed",
    "troubled",
    "peace",
    "calm",
    "rest",
  ],
  anger: [
    "anger",
    "angry",
    "rage",
    "temper",
    "patience",
    "gentle",
    "self-control",
    "response",
  ],
  relationships: [
    "relationship",
    "relationships",
    "conflict",
    "marriage",
    "friendship",
    "strife",
    "gentle",
    "words",
    "love",
    "peace",
  ],
};

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeSearch(value: string) {
  const STOPWORDS = new Set([
    "i",
    "am",
    "im",
    "ive",
    "me",
    "my",
    "the",
    "a",
    "an",
    "and",
    "or",
    "to",
    "for",
    "of",
    "in",
    "on",
    "at",
    "is",
    "are",
    "be",
    "feel",
    "feeling",
    "need",
    "want",
    "right",
    "now",
  ]);

  return normalizeSearchText(value)
    .split(" ")
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function expandIntentTokens(query: string) {
  const tokens = tokenizeSearch(query);
  const expanded = new Set(tokens);

  for (const token of tokens) {
    if (INTENT_MAP[token]) {
      for (const related of INTENT_MAP[token]) expanded.add(related);
    }
  }

  const full = normalizeSearchText(query);

  if (full.includes("money stress")) {
    INTENT_MAP.money.forEach((t) => expanded.add(t));
  }
  if (full.includes("need direction")) {
    INTENT_MAP.direction.forEach((t) => expanded.add(t));
  }
  if (full.includes("relationship conflict")) {
    INTENT_MAP.relationships.forEach((t) => expanded.add(t));
  }
  if (full.includes("feeling discouraged")) {
    ["discouraged", "hope", "strength", "comfort", "courage"].forEach((t) =>
      expanded.add(t)
    );
  }
  if (full.includes("overwhelmed")) {
    INTENT_MAP.anxiety.forEach((t) => expanded.add(t));
  }

  return Array.from(expanded);
}

function scoreVerseItem(item: VerseItem, query: string): ScoredVerseResult {
  const why: string[] = [];
  let score = 0;

  const normalizedQuery = normalizeSearchText(query);
  const tokens = expandIntentTokens(query);

  const title = normalizeSearchText(item.title || "");
  const body = normalizeSearchText(item.body || "");
  const ref = normalizeSearchText(item.ref || "");
  const tags = (item.tags || []).map(normalizeSearchText);
  const keywords = (item.keywords || []).map(normalizeSearchText);

  const allMeta = [...tags, ...keywords];

  if (!normalizedQuery) {
    return { item, score: 0, why };
  }

  if (title.includes(normalizedQuery)) {
    score += 18;
    why.push("title phrase");
  }

  if (body.includes(normalizedQuery)) {
    score += 12;
    why.push("body phrase");
  }

  for (const token of tokens) {
    if (title.includes(token)) {
      score += 8;
      why.push(`title:${token}`);
    }

    if (keywords.includes(token)) {
      score += 10;
      why.push(`keyword:${token}`);
    }

    if (tags.includes(token)) {
      score += 8;
      why.push(`tag:${token}`);
    }

    if (body.includes(token)) {
      score += 4;
      why.push(`body:${token}`);
    }

    if (ref.includes(token)) {
      score += 6;
      why.push(`ref:${token}`);
    }
  }

  const specificMatches = tokens.filter(
    (t) =>
      keywords.includes(t) ||
      tags.includes(t) ||
      title.includes(t) ||
      body.includes(t)
  );

  const genericHits = specificMatches.filter((t) => GENERIC_TERMS.has(t)).length;
  const nonGenericHits = specificMatches.filter((t) => !GENERIC_TERMS.has(t)).length;

  if (nonGenericHits >= 2) {
    score += 10;
    why.push("strong intent match");
  }

  if (nonGenericHits === 0 && genericHits > 0) {
    score -= 8;
  }

  if (allMeta.includes("lonely") || allMeta.includes("alone") || allMeta.includes("rejected")) {
    if (normalizedQuery.includes("lonely") || normalizedQuery.includes("alone")) {
      score += 12;
      why.push("loneliness intent");
    }
  }

  if (
    allMeta.includes("hurting") ||
    allMeta.includes("grief") ||
    allMeta.includes("healing") ||
    allMeta.includes("comfort")
  ) {
    if (
      normalizedQuery.includes("hurting") ||
      normalizedQuery.includes("hurt") ||
      normalizedQuery.includes("pain")
    ) {
      score += 12;
      why.push("pain intent");
    }
  }

  return {
    item,
    score,
    why: Array.from(new Set(why)).slice(0, 4),
  };
}

export function searchVerseItemsScored(
  query: string,
  options: SearchOptions = {}
): ScoredVerseResult[] {
  const { mode, sub = "all", limit = 50 } = options;

  let pool = [...DATA];

  if (mode) {
    pool = pool.filter((item) => item.mode === mode);
  }

  if (mode === "encouragement" && sub !== "all") {
    pool = pool.filter((item) => item.sub === sub);
  }

  if (!query.trim()) {
    return pool.slice(0, limit).map((item) => ({
      item,
      score: 0,
      why: [],
    }));
  }

  return pool
    .map((item) => scoreVerseItem(item, query))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
