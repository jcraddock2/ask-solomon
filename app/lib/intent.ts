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
type Interpretation = {
  message: string;
  lane: string | null;
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
  "help",
  "please",
  "can",
  "could",
  "would",
  "should",
  "how",
  "what",
  "do",
  "did",
  "does",
  "have",
  "has",
  "not",
  "no",
  "get",
  "go",
  "going",
  "about",
  "like",
  "some",
  "they",
  "their",
  "there",
  "when",
  "why",
  "who",
  "us",
  "we",
  "our",
  "him",
  "her",
  "his",
]);

const INTENT_LANES: IntentLane[] = [
  {
    name: "hurting",
    terms: [
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
      "my husband died",
      "my wife died",
      "my spouse died",
      "death of my",
      "passed away recently",
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
      "no savings",
      "savings",
      "no money saved",
      "spent everything i had",
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
      "terrified",
      "feel safe",
      "not safe",
      "unsafe",
      "dont feel safe",
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
      "relationship tension",
      "friction",
      "division",
      "quarrel",
      "difficult person",
      "difficult boss",
      "mean boss",
      "toxic boss",
      "toxic relationship",
      "disrespected",
      "ignored",
      "overlooked",
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
      "temper",
      "my temper",
      "lose my temper",
      "want to hurt",
      "hurt someone",
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
      "no self control",
    ],
  },
  {
    name: "addiction",
    terms: [
      "addiction",
      "addict",
      "addicted",
      "substance",
      "bad habit",
      "bad habits",
      "cant stop using",
      "cant stop drinking",
      "cant stop using drugs",
      "compulsive",
      "compulsion",
      "recovery",
      "sober",
      "sobriety",
      "bondage",
      "chains",
      "drinking",
      "alcohol",
      "drugs",
      "gambling",
      "pornography",
      "freedom",
    ],
  },
  {
    name: "leadership",
    terms: [
      "leader",
      "leadership",
      "boss",
      "manager",
      "supervisor",
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
      "work",
      "workplace",
    ],
  },
  {
    name: "confidence",
    terms: [
      "confidence",
      "confident",
      "courage",
      "bold",
      "boldness",
      "insecure",
      "insecurity",
      "self doubt",
      "self-doubt",
      "second guessing",
      "second-guessing",
      "hesitant",
      "fear of people",
      "approval",
      "rejected",
      "not good enough",
    ],
  },
  {
    name: "comparison",
    terms: [
      "behind",
      "behind in life",
      "falling behind",
      "comparison",
      "comparing",
      "everyone else",
      "not enough",
      "not where i should be",
      "late in life",
      "stuck behind",
    ],
  },
];
const LANE_EXPANSIONS: Record<string, string[]> = {
  hurting: [
    "hurt",
    "pain",
    "grief",
    "loss",
    "broken",
    "sorrow",
    "mourning",
    "wounded",
  ],
  lonely: [
    "alone",
    "isolated",
    "rejected",
    "abandoned",
    "unseen",
    "left out",
    "unsupported",
  ],
  discouraged: [
    "tired",
    "drained",
    "stuck",
    "defeated",
    "hopeless",
    "worn out",
    "burned out",
    "exhausted",
  ],
  direction: [
    "guidance",
    "clarity",
    "decision",
    "wisdom",
    "next step",
    "confused",
    "lost",
    "discernment",
  ],
  money: [
    "bills",
    "debt",
    "financial",
    "provision",
    "lack",
    "income",
    "expenses",
    "budget",
  ],
  fear: [
    "afraid",
    "anxious",
    "worried",
    "panic",
    "stress",
    "overwhelmed",
    "uneasy",
  ],
  conflict: [
    "argument",
    "strife",
    "friction",
    "drama",
    "difficult person",
    "difficult boss",
    "disrespected",
    "ignored",
    "overlooked",
  ],
  anger: [
    "angry",
    "mad",
    "frustrated",
    "resentful",
    "bitter",
    "rage",
    "irritated",
  ],
  temptation: [
    "tempted",
    "lust",
    "compromise",
    "weakness",
    "self control",
    "discipline",
    "impulse",
    "addiction",
  ],
  leadership: [
    "boss",
    "manager",
    "supervisor",
    "authority",
    "respect",
    "responsibility",
    "influence",
    "workplace",
  ],
  confidence: [
    "courage",
    "bold",
    "boldness",
    "insecure",
    "self doubt",
    "approval",
    "hesitant",
    "not good enough",
  ],
  comparison: [
    "behind",
    "behind in life",
    "falling behind",
    "not enough",
    "progress",
    "late in life",
    "stuck",
    "discouraged",
  ],
};
function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(input: string): string[] {
  return normalize(input)
    .split(" ")
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function includesPhrase(query: string, phrases: string[]): boolean {
  return phrases.some((phrase) => normalize(query).includes(normalize(phrase)));
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
  const interpreted = interpretQueryAdvanced(query);
const lane = interpreted.lane || detectIntentLane(query);
  const laneTerms = lane ? (LANE_EXPANSIONS[lane] || []) : [];
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
  if (topics.includes(lane)) score += 10;
  if (intentTags.includes(lane)) score += 14;
  if (moodTags.includes(lane)) score += 10;
  if (tags.includes(lane)) score += 8;
  if (keywords.includes(lane)) score += 8;
}
if (lane && title.includes(lane)) score += 8;
if (lane && body.includes(lane)) score += 6;
   for (const term of laneTerms) {
  const normalizedTerm = normalize(term);

  if (title.includes(normalizedTerm)) score += 5;
  if (body.includes(normalizedTerm)) score += 4;
  if (tags.includes(normalizedTerm)) score += 6;
  if (keywords.includes(normalizedTerm)) score += 6;
  if (topics.includes(normalizedTerm)) score += 6;
  if (intentTags.includes(normalizedTerm)) score += 7;
  if (moodTags.includes(normalizedTerm)) score += 6;
} 
    return { item, score };
  });

  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.item);
}

export function interpretQuery(query: string): string {
  const q = normalize(query);

  // HIGH-SPECIFICITY: boss / authority / workplace conflict
  if (
    includesPhrase(q, [
      "my boss",
      "boss is",
      "mean boss",
      "difficult boss",
      "toxic boss",
      "manager",
      "supervisor",
    ])
  ) {
    if (
      includesPhrase(q, [
        "mean",
        "difficult",
        "toxic",
        "rude",
        "harsh",
        "unfair",
        "disrespectful",
      ])
    ) {
      return "You may be dealing with a difficult boss or unhealthy work dynamic.";
    }

    return "You may be carrying stress from a difficult work relationship or authority figure.";
  }

  // HIGH-SPECIFICITY: behind / comparison
  if (
    includesPhrase(q, [
      "behind in life",
      "falling behind",
      "everyone else",
      "not where i should be",
      "late in life",
      "behind",
      "comparison",
      "comparing myself",
    ])
  ) {
    return "You may be feeling behind and comparing your progress to others.";
  }

  // HIGH-SPECIFICITY: self-doubt / indecision
  if (
    includesPhrase(q, [
      "second guessing",
      "second-guessing",
      "keep doubting",
      "self doubt",
      "self-doubt",
      "can't decide",
      "cannot decide",
      "unsure",
      "uncertain",
    ])
  ) {
    return "You may be stuck in self-doubt and struggling to trust your decisions.";
  }

  // HIGH-SPECIFICITY: direction / lost
  if (
    includesPhrase(q, [
      "i feel lost",
      "no direction",
      "need direction",
      "what should i do",
      "what do i do",
      "which way",
      "next step",
      "need clarity",
      "need guidance",
    ])
  ) {
    return "You may be feeling uncertain and searching for clear direction.";
  }

  // HIGH-SPECIFICITY: money pressure
  if (
    includesPhrase(q, [
      "no money",
      "money stress",
      "financial stress",
      "bills",
      "debt",
      "broke",
      "can't pay",
      "cannot pay",
      "expenses",
    ])
  ) {
    return "You may be feeling pressure around money, provision, or stability.";
  }

  // HIGH-SPECIFICITY: loneliness / rejection
  if (
    includesPhrase(q, [
      "no one cares",
      "nobody cares",
      "lonely",
      "alone",
      "left out",
      "rejected",
      "abandoned",
      "unseen",
    ])
  ) {
    return "You may be feeling alone, rejected, or unsupported right now.";
  }

  // HIGH-SPECIFICITY: burnout / exhaustion
  if (
    includesPhrase(q, [
      "burned out",
      "burnt out",
      "exhausted",
      "worn out",
      "drained",
      "tired",
    ])
  ) {
    return "You may be feeling worn down and running low on energy.";
  }

  // HIGH-SPECIFICITY: anger / frustration
  if (
    includesPhrase(q, [
      "angry",
      "mad",
      "furious",
      "frustrated",
      "resentful",
      "bitter",
    ])
  ) {
    return "You may be dealing with frustration, anger, or unresolved hurt.";
  }

  // MID-LEVEL: confidence
  if (
    includesPhrase(q, [
      "confidence",
      "confident",
      "courage",
      "bold",
      "insecure",
      "not good enough",
      "approval",
      "fear of people",
    ])
  ) {
    return "You may be struggling with confidence or a sense of self-worth.";
  }

  // MID-LEVEL: relationship conflict
  if (
    includesPhrase(q, [
      "relationship",
      "conflict",
      "argument",
      "drama",
      "friction",
      "tension",
      "difficult person",
      "disrespected",
      "ignored",
      "overlooked",
    ])
  ) {
    return "You may be facing tension or conflict in an important relationship.";
  }

  // MID-LEVEL: direction
  if (
    includesPhrase(q, [
      "direction",
      "decision",
      "clarity",
      "guidance",
      "wisdom",
      "discernment",
    ])
  ) {
    return "You may be looking for clarity and direction in your next step.";
  }

  // MID-LEVEL: discouragement
  if (
    includesPhrase(q, [
      "discouraged",
      "hopeless",
      "down",
      "defeated",
      "giving up",
      "stuck",
    ])
  ) {
    return "You may be feeling discouraged and losing momentum.";
  }

  // MID-LEVEL: fear / anxiety
  if (
    includesPhrase(q, [
      "fear",
      "afraid",
      "scared",
      "anxious",
      "anxiety",
      "worried",
      "worry",
      "panic",
      "overwhelmed",
      "stress",
    ])
  ) {
    return "You may be carrying fear, anxiety, or inner pressure right now.";
  }

  // MID-LEVEL: hurting
  if (
    includesPhrase(q, [
      "hurting",
      "hurt",
      "heartbroken",
      "broken",
      "pain",
      "grief",
      "loss",
      "sorrow",
      "mourning",
    ])
  ) {
    return "You may be carrying pain, grief, or emotional hurt.";
  }

  return "You may be looking for wisdom for what you’re facing right now.";
}
export function interpretQueryAdvanced(query: string): Interpretation {
  const q = normalize(query);

  if (
    includesPhrase(q, [
      "my boss",
      "boss is",
      "mean boss",
      "difficult boss",
      "toxic boss",
      "manager",
      "supervisor",
    ])
  ) {
    if (
      includesPhrase(q, [
        "mean",
        "difficult",
        "toxic",
        "rude",
        "harsh",
        "unfair",
        "disrespectful",
      ])
    ) {
      return {
        message: "You may be dealing with a difficult boss or unhealthy work dynamic.",
        lane: "conflict",
      };
    }

    return {
      message: "You may be carrying stress from a difficult work relationship or authority figure.",
      lane: "leadership",
    };
  }

  if (
    includesPhrase(q, [
      "behind in life",
      "falling behind",
      "everyone else",
      "not where i should be",
      "late in life",
      "behind",
      "comparison",
      "comparing myself",
    ])
  ) {
    return {
      message: "You may be feeling behind and comparing your progress to others.",
      lane: "comparison",
    };
  }

  if (
    includesPhrase(q, [
      "second guessing",
      "second-guessing",
      "keep doubting",
      "self doubt",
      "self-doubt",
      "can't decide",
      "cannot decide",
      "unsure",
      "uncertain",
    ])
  ) {
    return {
      message: "You may be stuck in self-doubt and struggling to trust your decisions.",
      lane: "confidence",
    };
  }

  if (
    includesPhrase(q, [
      "i feel lost",
      "no direction",
      "need direction",
      "what should i do",
      "what do i do",
      "which way",
      "next step",
      "need clarity",
      "need guidance",
    ])
  ) {
    return {
      message: "You may be feeling uncertain and searching for clear direction.",
      lane: "direction",
    };
  }

  if (
    includesPhrase(q, [
      "no money",
      "money stress",
      "financial stress",
      "bills",
      "debt",
      "broke",
      "can't pay",
      "cannot pay",
      "expenses",
    ])
  ) {
    return {
      message: "You may be feeling pressure around money, provision, or stability.",
      lane: "money",
    };
  }

  if (
    includesPhrase(q, [
      "no one cares",
      "nobody cares",
      "lonely",
      "alone",
      "left out",
      "rejected",
      "abandoned",
      "unseen",
    ])
  ) {
    return {
      message: "You may be feeling alone, rejected, or unsupported right now.",
      lane: "lonely",
    };
  }

  if (
    includesPhrase(q, [
      "burned out",
      "burnt out",
      "exhausted",
      "worn out",
      "drained",
      "tired",
    ])
  ) {
    return {
      message: "You may be feeling worn down and running low on energy.",
      lane: "discouraged",
    };
  }

  if (
    includesPhrase(q, [
      "angry",
      "mad",
      "furious",
      "frustrated",
      "resentful",
      "bitter",
    ])
  ) {
    return {
      message: "You may be dealing with frustration, anger, or unresolved hurt.",
      lane: "anger",
    };
  }

  if (
    includesPhrase(q, [
      "confidence",
      "confident",
      "courage",
      "bold",
      "insecure",
      "not good enough",
      "approval",
      "fear of people",
    ])
  ) {
    return {
      message: "You may be struggling with confidence or a sense of self-worth.",
      lane: "confidence",
    };
  }

  if (
    includesPhrase(q, [
      "relationship",
      "conflict",
      "argument",
      "drama",
      "friction",
      "tension",
      "difficult person",
      "disrespected",
      "ignored",
      "overlooked",
    ])
  ) {
    return {
      message: "You may be facing tension or conflict in an important relationship.",
      lane: "conflict",
    };
  }

  if (
    includesPhrase(q, [
      "direction",
      "decision",
      "clarity",
      "guidance",
      "wisdom",
      "discernment",
    ])
  ) {
    return {
      message: "You may be looking for clarity and direction in your next step.",
      lane: "direction",
    };
  }

  if (
    includesPhrase(q, [
      "discouraged",
      "hopeless",
      "down",
      "defeated",
      "giving up",
      "stuck",
    ])
  ) {
    return {
      message: "You may be feeling discouraged and losing momentum.",
      lane: "discouraged",
    };
  }

  if (
    includesPhrase(q, [
      "fear",
      "afraid",
      "scared",
      "anxious",
      "anxiety",
      "worried",
      "worry",
      "panic",
      "overwhelmed",
      "stress",
    ])
  ) {
    return {
      message: "You may be carrying fear, anxiety, or inner pressure right now.",
      lane: "fear",
    };
  }

  if (
    includesPhrase(q, [
      "hurting",
      "hurt",
      "heartbroken",
      "broken",
      "pain",
      "grief",
      "loss",
      "sorrow",
      "mourning",
    ])
  ) {
    return {
      message: "You may be carrying pain, grief, or emotional hurt.",
      lane: "hurting",
    };
  }

  return {
    message: "You may be looking for wisdom for what you’re facing right now.",
    lane: null,
  };
}
