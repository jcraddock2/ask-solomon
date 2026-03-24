// app/lib/intent.ts

export type SearchableItem = {
  title?: string;
  body?: string;
  text?: string;
  ref?: string;
  tags?: string[];
  keywords?: string[];
  topics?: string[];
  intentTags?: string[];
  moodTags?: string[];
};

type IntentLane = {
  name: string;
  terms: string[];
};

const STOPWORDS = new Set([
  "i",
  "am",
  "im",
  "i'm",
  "ive",
  "i've",
  "me",
  "my",
  "mine",
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
  "been",
  "being",
  "feel",
  "feeling",
  "need",
  "want",
  "with",
  "that",
  "this",
  "it",
  "so",
  "very",
  "just",
  "really",
]);

const INTENT_LANES: IntentLane[] = [
  {
    name: "hurting",
    terms: [
      "hurting",
      "hurt",
      "heartbroken",
      "heartbreak",
      "broken",
      "pain",
      "painful",
      "wounded",
      "grief",
      "grieving",
      "sorrow",
      "sad",
      "crushed",
      "weeping",
      "mourning",
      "loss",
    ],
  },
  {
    name: "lonely",
    terms: [
      "lonely",
      "alone",
      "isolated",
      "abandoned",
      "unseen",
      "left out",
      "rejected",
      "forgotten",
      "nobody sees me",
      "nobody understands me",
      "by myself",
    ],
  },
  {
    name: "discouraged",
    terms: [
      "discouraged",
      "down",
      "hopeless",
      "tired",
      "drained",
      "worn out",
      "exhausted",
      "defeated",
      "burned out",
      "burnt out",
      "empty",
      "giving up",
      "stuck",
    ],
  },
  {
    name: "direction",
    terms: [
      "direction",
      "guidance",
      "clarity",
      "wisdom",
      "decision",
      "choose",
      "choice",
      "next step",
      "which way",
      "what should i do",
      "uncertain",
      "confused",
      "lost",
      "discernment",
      "understanding",
    ],
  },
  {
    name: "money",
    terms: [
      "money",
      "finances",
      "financial",
      "bills",
      "debt",
      "broke",
      "poverty",
      "provision",
      "income",
      "budget",
      "wealth",
      "prosperity",
      "paycheck",
      "expenses",
      "lack",
    ],
  },
  {
    name: "fear",
    terms: [
      "fear",
      "afraid",
      "scared",
      "anxious",
      "anxiety",
      "worried",
      "worry",
      "panic",
      "nervous",
      "overwhelmed",
      "troubled",
      "uneasy",
      "stress",
    ],
  },
  {
    name: "conflict",
    terms: [
      "conflict",
      "argument",
      "fighting",
      "strife",
      "drama",
      "offense",
      "offended",
      "offense",
      "relationship tension",
      "friction",
      "division",
      "quarrel",
      "difficult person",
      "difficult boss",
    ],
  },
  {
    name: "anger",
    terms: [
      "anger",
      "angry",
      "mad",
      "furious",
      "resentful",
      "resentment",
      "rage",
      "irritated",
      "frustrated",
      "frustration",
      "bitter",
      "bitterness",
    ],
  },
  {
    name: "temptation",
    terms: [
      "temptation",
      "tempted",
      "lust",
      "sin",
      "compromise",
      "wrong choice",
      "weakness",
      "self control",
      "self-control",
      "discipline",
      "impulse",
      "addiction",
    ],
  },
  {
    name: "leadership",
    terms: [
      "leader",
      "leadership",
      "boss",
      "team",
      "people",
      "influence",
      "authority",
      "respect",
      "management",
      "responsibility",
      "pressure",
      "stewardship",
      "example",
      "integrity",
      "correction",
    ],
  },
];

function normalize(input: string): string {
  return input.toLowerCase().replace(/[^\w\s']/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(input: string): string[] {
  return normalize(input)
    .split(" ")
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function findMatchingLanes(query: string): IntentLane[] {
  const q = normalize(query);
  const words = tokenize(query);

  return INTENT_LANES.filter((lane) =>
    lane.terms.some((term) => {
      const t = normalize(term);
      return q.includes(t) || words.includes(t);
    })
  );
}

export function expandSmartTerms(query: string): string[] {
  const baseWords = tokenize(query);
  const matchedLanes = findMatchingLanes(query);

  const expanded = new Set<string>(baseWords);

  for (const lane of matchedLanes) {
    expanded.add(lane.name);
    for (const term of lane.terms) {
      const normalized = normalize(term);
      if (normalized && normalized.length > 2) {
        expanded.add(normalized);
      }
    }
  }

  return Array.from(expanded);
}

export function detectIntentLane(query: string): string | null {
  const matched = findMatchingLanes(query);
  if (matched.length === 0) return null;
  return matched[0].name;
}

export function smartSearch<T extends SearchableItem>(items: T[], query: string): T[] {
  const q = normalize(query);
  if (!q) return items;

  const expanded = expandSmartTerms(query);
  const lane = detectIntentLane(query);

  const scored = items.map((item) => {
    let score = 0;

    const title = normalize(item.title || "");
    const body = normalize(item.body || item.text || "");
    const tags = (item.tags || []).map(normalize);
    const keywords = (item.keywords || []).map(normalize);
    const topics = (item.topics || []).map(normalize);
    const intentTags = (item.intentTags || []).map(normalize);
    const moodTags = (item.moodTags || []).map(normalize);

    if (title.includes(q)) score += 10;
    if (body.includes(q)) score += 8;

    for (const term of expanded) {
      if (title.includes(term)) score += 6;
      if (body.includes(term)) score += 4;
      if (tags.includes(term)) score += 5;
      if (keywords.includes(term)) score += 5;
      if (topics.includes(term)) score += 5;
      if (intentTags.includes(term)) score += 7;
      if (moodTags.includes(term)) score += 6;
    }

    if (lane) {
      if (topics.includes(lane)) score += 8;
      if (intentTags.includes(lane)) score += 10;
      if (moodTags.includes(lane)) score += 8;
      if (tags.includes(lane)) score += 7;
      if (keywords.includes(lane)) score += 7;
    }

    return { item, score };
  });

  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.item);
}
