// app/lib/intent.ts

type SearchableItem = {
  ref: string;
  title?: string;
  text?: string;
  body?: string;
  topics?: string[];
  keywords?: string[];
  tags?: string[];
};

type IntentBucket = {
  name: string;
  patterns: string[];
  boostTopics: string[];
  boostKeywords: string[];
  relatedTerms: string[];
  avoidIfMissing?: string[];
};

const INTENT_MAP: IntentBucket[] = [
  {
    name: "overwhelmed",
    patterns: [
      "i feel overwhelmed",
      "overwhelmed",
      "too much",
      "stressed",
      "stress",
      "pressure",
      "burned out",
      "burnt out",
      "exhausted",
      "tired",
      "mentally drained",
      "i can't handle this",
      "i cant handle this",
      "life feels heavy",
    ],
    boostTopics: ["encouragement", "peace", "strength", "wisdom", "guidance"],
    boostKeywords: ["rest", "peace", "calm", "strength", "help", "trust", "refuge"],
    relatedTerms: ["overwhelmed", "stress", "pressure", "heavy", "peace", "rest", "trust"],
    avoidIfMissing: ["peace", "strength", "trust", "guidance", "encouragement"],
  },
  {
    name: "fear",
    patterns: [
      "afraid",
      "fear",
      "scared",
      "anxious",
      "anxiety",
      "worried",
      "worry",
      "nervous",
      "panic",
      "uncertain",
      "i don't know what will happen",
      "i dont know what will happen",
    ],
    boostTopics: ["peace", "faith", "encouragement", "wisdom", "protection"],
    boostKeywords: ["fear", "trust", "peace", "courage", "secure", "refuge"],
    relatedTerms: ["fear", "afraid", "anxious", "worry", "peace", "trust", "refuge"],
    avoidIfMissing: ["peace", "trust", "protection", "faith"],
  },
  {
    name: "guidance",
    patterns: [
      "i need direction",
      "need direction",
      "need guidance",
      "what should i do",
      "which way",
      "next step",
      "decision",
      "decide",
      "unclear",
      "confused",
      "i need wisdom",
      "show me what to do",
    ],
    boostTopics: ["wisdom", "guidance", "discernment", "direction"],
    boostKeywords: ["path", "understanding", "instruction", "wisdom", "discernment", "steps"],
    relatedTerms: ["guidance", "direction", "path", "steps", "wisdom", "instruction"],
    avoidIfMissing: ["wisdom", "guidance", "direction", "discernment"],
  },
  {
    name: "money",
    patterns: [
      "money",
      "finances",
      "financial",
      "bills",
      "debt",
      "broke",
      "provision",
      "income",
      "prosperity",
      "wealth",
      "poor",
      "struggling financially",
      "worried about money",
      "money stress",
    ],
    boostTopics: ["finances", "work", "wisdom", "discipline", "stewardship"],
    boostKeywords: ["wealth", "provision", "diligence", "stewardship", "planning", "debt"],
    relatedTerms: ["money", "debt", "wealth", "provision", "stewardship", "diligence"],
    avoidIfMissing: ["finances", "stewardship", "wealth", "provision", "diligence"],
  },
  {
    name: "discouraged",
    patterns: [
      "discouraged",
      "down",
      "sad",
      "hopeless",
      "hopelessness",
      "depressed",
      "low",
      "feel like quitting",
      "want to give up",
      "giving up",
      "defeated",
      "heavy heart",
      "weary",
    ],
    boostTopics: ["hope", "encouragement", "strength", "faith", "peace"],
    boostKeywords: ["hope", "joy", "strength", "heart", "renew", "rise"],
    relatedTerms: ["discouraged", "hope", "strength", "heart", "joy", "rise"],
    avoidIfMissing: ["hope", "encouragement", "strength", "faith"],
  },
  {
    name: "hurting",
    patterns: [
      "i am hurting",
      "im hurting",
      "i’m hurting",
      "hurting",
      "hurt",
      "heartbroken",
      "broken heart",
      "in pain",
      "emotionally hurt",
      "wounded",
      "deeply hurt",
      "grieving",
      "grief",
      "sorrow",
      "broken",
    ],
    boostTopics: ["encouragement", "peace", "relationships", "hope", "healing"],
    boostKeywords: ["heart", "healing", "comfort", "peace", "hope", "gentle", "restore"],
    relatedTerms: ["hurt", "hurting", "heart", "healing", "comfort", "peace", "hope", "grief"],
    avoidIfMissing: ["encouragement", "peace", "hope", "healing", "relationships"],
  },
  {
    name: "leadership",
    patterns: [
      "leadership",
      "lead people",
      "team",
      "staff",
      "manager",
      "supervisor",
      "conflict at work",
      "how do i lead",
      "influence",
      "authority",
      "communication",
    ],
    boostTopics: ["leadership", "wisdom", "speech", "relationships", "justice"],
    boostKeywords: ["lead", "counsel", "speech", "understanding", "discipline", "justice"],
    relatedTerms: ["leadership", "speech", "justice", "counsel", "understanding"],
    avoidIfMissing: ["leadership", "wisdom", "speech", "justice"],
  },
  {
    name: "relationships",
    patterns: [
      "relationship",
      "marriage",
      "friend",
      "friendship",
      "people problem",
      "conflict",
      "argument",
      "offended",
      "forgiveness",
      "betrayed",
      "trust issue",
    ],
    boostTopics: ["relationships", "speech", "wisdom", "peace", "love"],
    boostKeywords: ["gentle", "answer", "love", "peace", "friend", "forgive", "kindness"],
    relatedTerms: ["relationships", "friend", "peace", "love", "gentle", "forgive"],
    avoidIfMissing: ["relationships", "peace", "love", "speech"],
  },
  {
    name: "confidence",
    patterns: [
      "confidence",
      "boldness",
      "self doubt",
      "insecure",
      "i feel small",
      "hesitant",
      "timid",
      "second guessing",
    ],
    boostTopics: ["confidence", "strength", "wisdom", "faith", "courage"],
    boostKeywords: ["bold", "strength", "courage", "trust", "steadfast"],
    relatedTerms: ["confidence", "bold", "strength", "courage", "trust"],
    avoidIfMissing: ["confidence", "strength", "faith", "courage"],
  },
  {
    name: "discipline",
    patterns: [
      "discipline",
      "lazy",
      "procrastinating",
      "procrastination",
      "stuck",
      "unmotivated",
      "motivation",
      "consistency",
      "focus",
      "productive",
    ],
    boostTopics: ["discipline", "work", "wisdom", "diligence"],
    boostKeywords: ["diligent", "work", "instruction", "discipline", "focus", "effort"],
    relatedTerms: ["discipline", "work", "diligence", "focus", "effort"],
    avoidIfMissing: ["discipline", "work", "diligence"],
  },
];

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(input: string): string[] {
  return normalize(input).split(" ").filter(Boolean);
}

function scoreTextMatch(haystack: string, needles: string[], points = 1): number {
  let score = 0;
  for (const needle of needles) {
    if (haystack.includes(needle)) score += points;
  }
  return score;
}

function uniqueByRef<T extends SearchableItem>(items: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of items) {
    if (seen.has(item.ref)) continue;
    seen.add(item.ref);
    out.push(item);
  }
  return out;
}

export function detectIntent(query: string): IntentBucket[] {
  const q = normalize(query);
  if (!q) return [];

  return INTENT_MAP.filter((intent) =>
    intent.patterns.some((pattern) => q.includes(normalize(pattern)))
  );
}

function expandedTerms(query: string): string[] {
  const q = normalize(query);
  const tokens = new Set<string>(tokenize(q));

  for (const intent of detectIntent(q)) {
    tokens.add(intent.name);
    for (const topic of intent.boostTopics) tokens.add(normalize(topic));
    for (const keyword of intent.boostKeywords) tokens.add(normalize(keyword));
    for (const term of intent.relatedTerms) tokens.add(normalize(term));
  }

  return Array.from(tokens);
}

export function rankByIntent<T extends SearchableItem>(items: T[], query: string): T[] {
  const q = normalize(query);
  if (!q) return items;

  const matchedIntents = detectIntent(q);
  const expanded = expandedTerms(q);

  const ranked = items
    .map((item) => {
   const topicText = normalize((item.topics || []).join(" "));
const keywordText = normalize((item.keywords || []).join(" "));
const tagText = normalize((item.tags || []).join(" "));
const textText = normalize(
  [item.title || "", item.text || "", item.body || "", item.ref || ""].join(" ")
);

      let score = 0;

      const qWords = tokenize(q);

     score += scoreTextMatch(textText, qWords, 2);
score += scoreTextMatch(topicText, qWords, 5);
score += scoreTextMatch(keywordText, qWords, 6);
score += scoreTextMatch(tagText, qWords, 8);

if (textText.includes(q)) score += 12;
if (topicText.includes(q)) score += 18;
if (keywordText.includes(q)) score += 20;
if (tagText.includes(q)) score += 24;

score += scoreTextMatch(textText, expanded, 4);
score += scoreTextMatch(topicText, expanded, 10);
score += scoreTextMatch(keywordText, expanded, 12);
score += scoreTextMatch(tagText, expanded, 16);

      for (const intent of matchedIntents) {
     const topicHits = scoreTextMatch(topicText, intent.boostTopics.map(normalize), 20);
const keywordHits = scoreTextMatch(keywordText, intent.boostKeywords.map(normalize), 22);
const tagHits = scoreTextMatch(
  tagText,
  [...intent.boostTopics, ...intent.boostKeywords, ...intent.relatedTerms].map(normalize),
  24
);
const relatedHits = scoreTextMatch(textText, intent.relatedTerms.map(normalize), 8);

score += topicHits + keywordHits + tagHits + relatedHits;

        if (
          intent.avoidIfMissing &&
          !intent.avoidIfMissing.some((term) => {
            const n = normalize(term);
        return (
  topicText.includes(n) ||
  keywordText.includes(n) ||
  tagText.includes(n) ||
  textText.includes(n)
);
          })
        ) {
          score -= 18;
        }
      }

      if (matchedIntents.length > 0) score += 8;

      return { item, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.item);

  return uniqueByRef(ranked);
}

export function smartSearch<T extends SearchableItem>(items: T[], query: string): T[] {
  const q = normalize(query);
  if (!q) return items;

  const ranked = rankByIntent(items, q);

  const strong = ranked.filter((item) => {
  const blob = normalize(
  [
    item.title || "",
    item.text || "",
    item.body || "",
    (item.topics || []).join(" "),
    (item.keywords || []).join(" "),
    (item.tags || []).join(" "),
  ].join(" ")
); 

    const intents = detectIntent(q);
    const expanded = expandedTerms(q);
    const qWords = tokenize(q);

    const directHit = qWords.some((word) => blob.includes(word));
    const expandedHit = expanded.some((term) => blob.includes(term));
    const intentHit = intents.some((intent) =>
      [...intent.boostTopics, ...intent.boostKeywords, ...intent.relatedTerms].some((term) =>
        blob.includes(normalize(term))
      )
    );

    return directHit || expandedHit || intentHit;
  });

  return strong.length > 0 ? strong.slice(0, 12) : ranked.slice(0, 12);
}
