// app/lib/intent.ts

type SearchableItem = {
  ref: string;
  title?: string;
  text?: string;
  body?: string;
  topics?: string[];
  keywords?: string[];
};

type IntentBucket = {
  name: string;
  patterns: string[];
  boostTopics: string[];
  boostKeywords: string[];
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
      "mentally drained",
      "life feels heavy",
      "heavy heart",
    ],
    boostTopics: ["encouragement", "peace", "strength", "wisdom", "guidance"],
    boostKeywords: ["rest", "peace", "calm", "strength", "help", "trust", "refuge"],
    avoidIfMissing: ["peace", "strength", "trust", "guidance", "encouragement"],
  },
  {
    name: "fear",
    patterns: [
      "fear",
      "afraid",
      "scared",
      "anxious",
      "anxiety",
      "worried",
      "worry",
      "nervous",
      "panic",
      "uncertain",
    ],
    boostTopics: ["peace", "faith", "encouragement", "wisdom", "protection"],
    boostKeywords: ["fear", "trust", "peace", "courage", "secure", "refuge"],
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

export function rankByIntent<T extends SearchableItem>(items: T[], query: string): T[] {
  const q = normalize(query);
  if (!q) return items;

  const matchedIntents = detectIntent(q);

  const ranked = items
    .map((item) => {
      const topicText = normalize((item.topics || []).join(" "));
      const keywordText = normalize((item.keywords || []).join(" "));
      const textText = normalize(
        [item.title || "", item.text || "", item.body || "", item.ref || ""].join(" ")
      );

      let score = 0;

      const qWords = q.split(" ").filter(Boolean);

      score += scoreTextMatch(textText, qWords, 2);
      score += scoreTextMatch(topicText, qWords, 4);
      score += scoreTextMatch(keywordText, qWords, 5);

      if (textText.includes(q)) score += 10;
      if (topicText.includes(q)) score += 14;
      if (keywordText.includes(q)) score += 16;

      for (const intent of matchedIntents) {
        const topicHits = scoreTextMatch(topicText, intent.boostTopics.map(normalize), 16);
        const keywordHits = scoreTextMatch(keywordText, intent.boostKeywords.map(normalize), 18);
        const bodyHits = scoreTextMatch(textText, intent.boostKeywords.map(normalize), 6);

        score += topicHits + keywordHits + bodyHits;

        if (
          intent.avoidIfMissing &&
          !intent.avoidIfMissing.some((term) => {
            const n = normalize(term);
            return topicText.includes(n) || keywordText.includes(n) || textText.includes(n);
          })
        ) {
          score -= 12;
        }
      }

      if (matchedIntents.length > 0) score += 6;

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
      ].join(" ")
    );

    const intents = detectIntent(q);
    const qWords = q.split(" ").filter(Boolean);

    const directHit = qWords.some((word) => blob.includes(word));
    const intentHit = intents.some((intent) =>
      [...intent.boostTopics, ...intent.boostKeywords].some((term) =>
        blob.includes(normalize(term))
      )
    );

    return directHit || intentHit;
  });

  return strong.length > 0 ? strong.slice(0, 12) : ranked.slice(0, 12);
}
