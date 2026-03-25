// app/lib/proverbs.ts

import { detectSituation } from "./situations";

export type ProverbEntry = {
  ref: string;
  title: string;
  body: string;
  text: string;
  topics: string[];
  keywords: string[];
  intentTags: string[];
  moodTags: string[];
};

export type ScoredProverbResult = {
  item: ProverbEntry;
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

function uniq(items: string[]): string[] {
  return Array.from(new Set(items.filter(Boolean)));
}

function createProverb(
  ref: string,
  title: string,
  body: string,
  topics: string[],
  keywords: string[],
  intentTags: string[] = [],
  moodTags: string[] = []
): ProverbEntry {
  return {
    ref,
    title,
    body,
    text: body,
    topics: uniq(topics.map(normalizeText)),
    keywords: uniq(keywords.map(normalizeText)),
    intentTags: uniq(intentTags.map(normalizeText)),
    moodTags: uniq(moodTags.map(normalizeText)),
  };
}

const INTENT_EXPANSIONS: Record<string, string[]> = {
  hurting: [
    "hurting",
    "hurt",
    "pain",
    "wounded",
    "grief",
    "sorrow",
    "brokenhearted",
    "healing",
    "comfort",
    "crushed spirit",
    "heartache",
    "heartbroken",
    "loss",
    "mourning",
    "sad",
  ],
  lonely: [
    "lonely",
    "alone",
    "isolated",
    "rejected",
    "abandoned",
    "friend",
    "friendship",
    "belonging",
    "companionship",
    "unseen",
    "forgotten",
    "left out",
    "nobody sees me",
    "nobody understands me",
  ],
  discouraged: [
    "discouraged",
    "weary",
    "hopeless",
    "down",
    "heavy",
    "hope",
    "endure",
    "strength",
    "rise",
    "light",
    "burned out",
    "burnt out",
    "drained",
    "defeated",
    "stuck",
    "exhausted",
    "worn out",
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
    "steps",
    "plans",
    "next step",
    "confused",
    "lost",
    "discernment",
    "what should i do",
  ],
  money: [
    "money",
    "wealth",
    "finances",
    "debt",
    "provision",
    "lack",
    "stewardship",
    "planning",
    "diligence",
    "resources",
    "bills",
    "broke",
    "income",
    "expenses",
    "budget",
    "paycheck",
  ],
  fear: [
    "fear",
    "afraid",
    "anxiety",
    "anxious",
    "worry",
    "worried",
    "troubled",
    "peace",
    "calm",
    "trust",
    "courage",
    "overwhelmed",
    "panic",
    "stress",
    "uneasy",
  ],
  anger: [
    "anger",
    "angry",
    "rage",
    "temper",
    "gentle",
    "self-control",
    "patience",
    "words",
    "conflict",
    "frustrated",
    "frustration",
    "bitter",
    "bitterness",
    "resentful",
    "offended",
    "offense",
  ],
  relationships: [
    "relationship",
    "relationships",
    "conflict",
    "friendship",
    "marriage",
    "strife",
    "gentle answer",
    "words",
    "peace",
    "love",
    "difficult person",
    "difficult boss",
    "argument",
    "fighting",
    "tension",
    "drama",
    "hard to deal with",
    "hard person",
    "unfair",
    "unfair treatment",
  ],
  leadership: [
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
    "integrity",
    "correction",
    "stewardship",
    "supervisor",
    "manager",
    "workplace",
    "coworker",
  ],
};

function tokenizeQuery(query: string): string[] {
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
    "with",
    "about",
    "that",
    "this",
    "it",
  ]);

  return normalizeText(query)
    .split(" ")
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

function expandQuery(query: string): string[] {
  const base = tokenizeQuery(query);
  const expanded = new Set(base);
  const normalized = normalizeText(query);

  for (const token of base) {
    if (INTENT_EXPANSIONS[token]) {
      INTENT_EXPANSIONS[token].forEach((x) => expanded.add(x));
    }
  }

  const phraseRules: Array<[string[], keyof typeof INTENT_EXPANSIONS]> = [
    [["money stress", "worried about bills", "financial stress", "broke", "unpaid bills"], "money"],
    [["need direction", "need clarity", "what should i do", "next step", "feel lost", "need wisdom"], "direction"],
    [["i am hurting", "im hurting", "heartbroken", "in pain", "grieving", "deep pain"], "hurting"],
    [["i am lonely", "im lonely", "feel alone", "abandoned", "rejected", "unseen", "left out"], "lonely"],
    [["burned out", "burnt out", "worn out", "drained", "exhausted", "feel stuck"], "discouraged"],
    [["anxious", "overwhelmed", "panic", "worried", "afraid", "stressed"], "fear"],
    [["relationship conflict", "difficult person", "difficult boss", "argument", "tension", "hard to deal with"], "relationships"],
    [["angry", "frustrated", "bitter", "resentful", "offended"], "anger"],
    [["leadership pressure", "leading people", "team pressure", "as a leader", "boss", "manager", "supervisor"], "leadership"],
    [["unfair treatment", "treated unfairly", "not respected", "work conflict"], "relationships"],
  ];

  for (const [phrases, lane] of phraseRules) {
    if (phrases.some((phrase) => normalized.includes(phrase))) {
      INTENT_EXPANSIONS[lane].forEach((x) => expanded.add(x));
      expanded.add(lane);
    }
  }

  return Array.from(expanded);
}

export const PROVERBS: ProverbEntry[] = [
  // HURTING / HEALING / HEART PAIN
  createProverb(
    "Proverbs 17:22",
    "Healing for a wounded heart",
    "A joyful heart strengthens the whole person, but a crushed spirit drains strength. Wisdom leads the hurting heart toward healing.",
    ["healing", "heart", "hope"],
    ["hurting", "hurt", "pain", "wounded", "healing", "comfort", "crushed spirit", "brokenhearted"],
    ["hurting", "healing", "comfort"],
    ["heavy", "wounded", "broken"]
  ),
  createProverb(
    "Proverbs 14:13",
    "Hidden pain is still pain",
    "Even when someone looks fine on the outside, the heart may still ache. Wisdom makes room for honest pain.",
    ["pain", "heart", "wisdom"],
    ["pain", "grief", "heartache", "ache", "sorrow", "inner pain", "hurting"],
    ["hurting", "grief", "honesty"],
    ["sad", "aching", "heavy"]
  ),
  createProverb(
    "Proverbs 18:14",
    "A crushed spirit needs care",
    "The human spirit can endure much, but a crushed spirit must be handled with tenderness, wisdom, and care.",
    ["healing", "strength", "care"],
    ["crushed spirit", "broken", "wounded", "pain", "care", "healing", "hurting"],
    ["hurting", "healing", "strength"],
    ["crushed", "weak", "tired"]
  ),
  createProverb(
    "Proverbs 12:25",
    "Anxiety weighs the heart down",
    "An anxious heart grows heavy, but the right word brings lift, comfort, and steadiness.",
    ["anxiety", "comfort", "peace"],
    ["anxiety", "heavy heart", "comfort", "encouragement", "burdened", "troubled"],
    ["fear", "comfort", "encouragement"],
    ["heavy", "troubled", "anxious"]
  ),

  // LONELY / REJECTED / FRIENDSHIP
  createProverb(
    "Proverbs 18:24",
    "A faithful friend stays close",
    "Some connections fade, but a true friend stays near and steady. Wisdom values loyal friendship.",
    ["friendship", "relationships", "loyalty"],
    ["friend", "friendship", "lonely", "alone", "companionship", "loyal", "close friend"],
    ["lonely", "relationships", "friendship"],
    ["alone", "isolated", "unseen"]
  ),
  createProverb(
    "Proverbs 17:17",
    "A true friend loves at all times",
    "Real friendship does not disappear under pressure. Love remains steady in hard seasons.",
    ["friendship", "love", "relationships"],
    ["friend", "friendship", "love", "support", "hard season", "loyalty"],
    ["lonely", "relationships", "support"],
    ["alone", "needing support"]
  ),
  createProverb(
    "Proverbs 13:20",
    "Walk with the wise",
    "The people near you shape your future. Wise companionship strengthens the soul and direction of your life.",
    ["friendship", "direction", "wisdom"],
    ["friendship", "companionship", "wise friends", "walk with the wise", "relationships"],
    ["lonely", "direction", "relationships"],
    ["isolated", "seeking people"]
  ),
  createProverb(
    "Proverbs 27:9",
    "Wise counsel refreshes the soul",
    "The sweetness of trusted counsel refreshes the inner life. You were not meant to carry everything alone.",
    ["counsel", "friendship", "encouragement"],
    ["counsel", "friend", "comfort", "refresh", "alone", "trusted voice"],
    ["lonely", "direction", "comfort"],
    ["alone", "drained", "unseen"]
  ),

  // DISCOURAGED / HOPE / KEEP GOING
  createProverb(
    "Proverbs 24:10",
    "Strength shows in adversity",
    "If you collapse under pressure, strength is too small. Wisdom builds inner endurance for hard days.",
    ["strength", "endurance", "adversity"],
    ["discouraged", "pressure", "adversity", "strength", "endure", "hard day"],
    ["discouraged", "strength", "hope"],
    ["weary", "tired", "under pressure"]
  ),
  createProverb(
    "Proverbs 23:18",
    "Your hope is not cut off",
    "There is a future for the one who stays rooted in wisdom. Your hope still has a tomorrow.",
    ["hope", "future", "faithfulness"],
    ["hope", "future", "not cut off", "tomorrow", "keep going", "discouraged"],
    ["discouraged", "hope", "future"],
    ["weary", "low", "uncertain"]
  ),
  createProverb(
    "Proverbs 4:18",
    "Light rises step by step",
    "The path of wisdom grows brighter with time. Even if things feel dim now, light can still rise.",
    ["hope", "direction", "light"],
    ["hope", "light", "brighter", "future", "dim", "discouraged", "morning"],
    ["discouraged", "direction", "hope"],
    ["dim", "tired", "uncertain"]
  ),
  createProverb(
    "Proverbs 24:16",
    "You can rise again",
    "Even if you fall repeatedly, you can rise again—resilience is part of wisdom.",
    ["resilience", "strength", "hope"],
    ["fall", "failure", "get back up", "resilience", "discouraged", "rise", "stuck"],
    ["discouraged", "strength"],
    ["down", "defeated"]
  ),

  // DIRECTION / COUNSEL / DECISIONS
  createProverb(
    "Proverbs 3:5-6",
    "Trust and direction",
    "Trust beyond your own understanding, and wisdom will help straighten the path ahead.",
    ["direction", "trust", "guidance"],
    ["direction", "guidance", "trust", "path", "clarity", "understanding", "decision"],
    ["direction", "trust", "guidance"],
    ["uncertain", "seeking"]
  ),
  createProverb(
    "Proverbs 11:14",
    "Direction comes with counsel",
    "Where wise counsel is present, people are strengthened and protected from avoidable failure.",
    ["direction", "counsel", "leadership"],
    ["counsel", "guidance", "direction", "advice", "clarity", "decision", "leadership", "team"],
    ["direction", "leadership", "guidance"],
    ["uncertain", "stuck"]
  ),
  createProverb(
    "Proverbs 15:22",
    "Plans succeed with counsel",
    "Plans gain strength when they are tested with wise voices. You do not have to decide alone.",
    ["direction", "plans", "counsel"],
    ["plans", "counsel", "guidance", "decision", "clarity", "wise voices"],
    ["direction", "decision", "guidance"],
    ["unsure", "stuck"]
  ),
  createProverb(
    "Proverbs 16:3",
    "Commit your plans",
    "Entrust your work and plans to God, then move with steady discipline and faith.",
    ["direction", "plans", "work"],
    ["plans", "commit", "direction", "work", "obedience", "momentum"],
    ["direction", "work", "guidance"],
    ["uncertain", "motivated"]
  ),
  createProverb(
    "Proverbs 19:21",
    "There is still a bigger plan",
    "Many plans fill a person’s heart, but the Lord’s purpose will stand.",
    ["purpose", "direction", "trust"],
    ["plans", "purpose", "confusion", "direction", "uncertain", "future"],
    ["direction", "trust"],
    ["uncertain", "confused"]
  ),
  createProverb(
    "Proverbs 20:5",
    "Clarity is within reach",
    "The purposes of a person’s heart are deep, but understanding draws them out.",
    ["clarity", "understanding", "wisdom"],
    ["clarity", "confusion", "understanding", "deep thoughts", "direction"],
    ["direction", "wisdom"],
    ["uncertain", "thinking"]
  ),
  createProverb(
    "Proverbs 29:18",
    "Clarity creates direction",
    "Where there is no vision, people drift—but clarity anchors your path.",
    ["vision", "direction", "clarity"],
    ["vision", "direction", "clarity", "drift", "purpose", "focus", "lost"],
    ["direction", "focus"],
    ["lost", "uncertain"]
  ),

  // MONEY / WORK / STEWARDSHIP
  createProverb(
    "Proverbs 10:4",
    "Diligent hands build provision",
    "Laziness drains opportunity, but diligent work creates provision over time.",
    ["money", "work", "diligence"],
    ["money", "wealth", "work", "diligent", "provision", "income", "resources"],
    ["money", "work", "stewardship"],
    ["stressed", "under pressure"]
  ),
  createProverb(
    "Proverbs 21:5",
    "Planning beats hurry",
    "Steady planning leads toward abundance, but rushed decisions often create lack.",
    ["money", "planning", "diligence"],
    ["money", "planning", "abundance", "lack", "finances", "steady work", "budget", "expenses"],
    ["money", "direction", "stewardship"],
    ["stressed", "urgent"]
  ),
  createProverb(
    "Proverbs 22:7",
    "Debt creates pressure",
    "Debt brings weight and pressure. Wisdom moves toward stewardship, restraint, and freedom.",
    ["money", "debt", "stewardship"],
    ["debt", "money", "pressure", "finances", "lack", "stewardship", "burden", "bills"],
    ["money", "stewardship", "freedom"],
    ["stressed", "burdened"]
  ),
  createProverb(
    "Proverbs 13:11",
    "Steady growth lasts",
    "Quick gain fades fast, but patient and honest increase becomes lasting strength.",
    ["money", "growth", "stewardship"],
    ["money", "wealth", "growth", "slow growth", "patient increase", "finances"],
    ["money", "stewardship", "planning"],
    ["stressed", "impatient"]
  ),

  // FEAR / ANXIETY / PEACE
  createProverb(
    "Proverbs 29:25",
    "Fear is a trap",
    "The fear of people traps the heart, but trust opens a steadier path.",
    ["fear", "trust", "peace"],
    ["fear", "afraid", "fear of man", "trust", "anxiety", "trap", "worried", "overwhelmed"],
    ["fear", "peace", "trust"],
    ["anxious", "afraid"]
  ),
  createProverb(
    "Proverbs 3:24",
    "Rest without terror",
    "Wisdom creates a steadier inner life, so rest becomes possible even in uncertain seasons.",
    ["peace", "rest", "fear"],
    ["rest", "sleep", "peace", "fear", "terror", "calm", "safety"],
    ["fear", "peace", "comfort"],
    ["anxious", "restless"]
  ),
  createProverb(
    "Proverbs 18:10",
    "You have a place of safety",
    "The name of the Lord is a strong tower; the righteous run to it and are safe.",
    ["safety", "protection", "trust"],
    ["safe", "protection", "fear", "security", "refuge", "help"],
    ["fear", "comfort"],
    ["afraid", "vulnerable"]
  ),
  createProverb(
    "Proverbs 30:5",
    "You can rely on truth",
    "Every word of God is proven true; He is a shield to those who take refuge in Him.",
    ["truth", "trust", "protection"],
    ["truth", "trust", "protection", "shield", "safe", "reliable"],
    ["fear", "trust"],
    ["uncertain", "seeking"]
  ),

  // ANGER / WORDS / RELATIONSHIPS / DIFFICULT PEOPLE
  createProverb(
    "Proverbs 15:1",
    "A gentle answer turns anger down",
    "When tension rises, gentleness can cool what harshness would inflame.",
    ["anger", "relationships", "speech"],
    ["anger", "gentle answer", "conflict", "words", "relationships", "response", "difficult person", "difficult boss"],
    ["anger", "relationships", "peace"],
    ["triggered", "frustrated"]
  ),
  createProverb(
    "Proverbs 17:27",
    "Calm restraint shows wisdom",
    "Measured words and a calm spirit reflect strength, not weakness.",
    ["anger", "speech", "wisdom"],
    ["calm", "restraint", "words", "spirit", "anger", "self-control", "frustrated"],
    ["anger", "wisdom", "relationships"],
    ["heated", "frustrated"]
  ),
  createProverb(
    "Proverbs 19:11",
    "Patience makes room for peace",
    "Good sense makes a person slow to anger, and restraint becomes a kind of quiet strength.",
    ["anger", "peace", "relationships"],
    ["slow to anger", "patience", "offense", "restraint", "peace", "frustrated", "difficult person"],
    ["anger", "relationships", "peace"],
    ["offended", "frustrated", "triggered"]
  ),
  createProverb(
    "Proverbs 15:28",
    "Wise responses are thoughtful",
    "The wise heart pauses before speaking, choosing words that heal instead of words that escalate.",
    ["speech", "wisdom", "relationships"],
    ["response", "careful words", "conflict", "speech", "harsh words", "tension"],
    ["relationships", "anger", "wisdom"],
    ["triggered", "tense"]
  ),
  createProverb(
    "Proverbs 16:32",
    "Self-control is real strength",
    "Ruling your spirit is greater strength than overpowering someone else.",
    ["self-control", "strength", "anger"],
    ["self-control", "anger", "restraint", "frustrated", "reacting", "control your spirit"],
    ["anger", "wisdom", "strength"],
    ["triggered", "heated"]
  ),
  createProverb(
    "Proverbs 12:18",
    "Words can wound or heal",
    "Reckless words pierce deeply, but wise speech brings healing.",
    ["speech", "healing", "relationships"],
    ["harsh words", "reckless words", "healing words", "conflict", "wounded by words"],
    ["relationships", "anger", "healing"],
    ["hurt", "offended", "tense"]
  ),
  createProverb(
    "Proverbs 25:15",
    "Gentleness carries strength",
    "Patient restraint and gentle speech can move hard resistance better than force.",
    ["gentleness", "speech", "relationships"],
    ["gentleness", "patient", "soft tongue", "difficult boss", "difficult person", "resistance"],
    ["relationships", "anger", "leadership"],
    ["tense", "frustrated"]
  ),
  createProverb(
    "Proverbs 26:4-5",
    "Discern your response",
    "Wisdom knows when to answer and when not to answer. Not every conflict deserves the same response.",
    ["wisdom", "speech", "discernment"],
    ["answer", "respond", "argument", "conflict", "fool", "discernment", "difficult person"],
    ["relationships", "wisdom", "direction"],
    ["tense", "frustrated", "uncertain"]
  ),

  // INTEGRITY / WISDOM / LEADERSHIP
  createProverb(
    "Proverbs 28:1",
    "Boldness follows integrity",
    "A clear conscience strengthens confidence. Wisdom makes courage cleaner and steadier.",
    ["confidence", "integrity", "fear"],
    ["confidence", "boldness", "integrity", "fear", "clear conscience", "leadership", "authority"],
    ["confidence", "fear", "leadership"],
    ["hesitant", "uncertain"]
  ),
  createProverb(
    "Proverbs 4:7",
    "Wisdom comes first",
    "When the way forward is unclear, start by valuing wisdom above impulse.",
    ["wisdom", "direction", "decision"],
    ["wisdom", "direction", "decision", "understanding", "clarity", "next step", "leadership"],
    ["direction", "leadership", "decision"],
    ["uncertain", "seeking"]
  ),
  createProverb(
    "Proverbs 16:9",
    "Plan your way, stay open",
    "A person can plan the path, but wisdom stays open to God's direction along the way.",
    ["direction", "plans", "wisdom"],
    ["direction", "plans", "path", "guidance", "clarity", "decision"],
    ["direction", "decision", "trust"],
    ["uncertain", "planning"]
  ),
  createProverb(
    "Proverbs 21:2",
    "Your perspective may be incomplete",
    "Every way seems right to a person, but the Lord weighs the heart.",
    ["wisdom", "perspective", "humility"],
    ["right", "decision", "perspective", "judgment", "heart", "understanding"],
    ["direction", "wisdom"],
    ["uncertain", "confident"]
  ),
  createProverb(
    "Proverbs 27:17",
    "You are shaped by people around you",
    "As iron sharpens iron, people strengthen one another.",
    ["relationships", "growth", "strength"],
    ["friendship", "people", "relationships", "growth", "support", "team", "leadership"],
    ["lonely", "relationships", "leadership"],
    ["isolated", "seeking"]
  ),
  createProverb(
    "Proverbs 29:11",
    "You don’t have to react emotionally",
    "Fools release everything they feel, but the wise hold steady and respond.",
    ["self-control", "wisdom", "emotion"],
    ["emotion", "anger", "control", "reaction", "wisdom", "response", "frustrated"],
    ["anger", "wisdom"],
    ["triggered", "emotional"]
  ),
  createProverb(
    "Proverbs 28:13",
    "You are not stuck where you are",
    "Those who hide their struggles do not move forward, but those who face them find mercy.",
    ["growth", "healing", "honesty"],
    ["struggle", "healing", "honest", "change", "growth", "freedom", "stuck"],
    ["hurting", "healing"],
    ["stuck", "ashamed"]
  ),
];

export function getRelatedProverbs(
  source: ProverbEntry,
  limit = 4
): ProverbEntry[] {
  const related = PROVERBS
    .filter((item) => item.ref !== source.ref)
    .map((item) => {
      let score = 0;

      for (const topic of source.topics || []) {
        if ((item.topics || []).includes(topic)) score += 4;
      }

      for (const tag of source.intentTags || []) {
        if ((item.intentTags || []).includes(tag)) score += 3;
      }

      for (const mood of source.moodTags || []) {
        if ((item.moodTags || []).includes(mood)) score += 2;
      }

      return { item, score };
    });

  return related
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.item);
}

function countMatches(source: string[], targets: string[]): number {
  let hits = 0;

  for (const target of targets) {
    if (source.includes(normalizeText(target))) hits += 1;
  }

  return hits;
}

function hasAny(source: string[], targets: string[]): boolean {
  return countMatches(source, targets) > 0;
}

function scoreProverbItem(item: ProverbEntry, query: string): ScoredProverbResult {
  const normalizedQuery = normalizeText(query);
  const tokens = expandQuery(query);
  const situation = detectSituation(query);

  const title = normalizeText(item.title);
  const text = normalizeText(item.text);
  const ref = normalizeText(item.ref);
  const topics = item.topics || [];
  const keywords = item.keywords || [];
  const intentTags = item.intentTags || [];
  const moodTags = item.moodTags || [];

  let score = 0;
  const why: string[] = [];

  if (!normalizedQuery.trim()) {
    return { item, score: 0, why: [] };
  }

  if (title.includes(normalizedQuery)) {
    score += 20;
    why.push("title phrase");
  }

  if (text.includes(normalizedQuery)) {
    score += 12;
    why.push("text phrase");
  }

  // Strong lane boosts
  if (
    normalizedQuery.includes("hurting") ||
    normalizedQuery.includes("heartbroken") ||
    normalizedQuery.includes("grieving") ||
    normalizedQuery.includes("in pain")
  ) {
    if (intentTags.includes("hurting")) {
      score += 22;
      why.push("hurting lane");
    }
  }

  if (
    normalizedQuery.includes("lonely") ||
    normalizedQuery.includes("alone") ||
    normalizedQuery.includes("abandoned") ||
    normalizedQuery.includes("rejected") ||
    normalizedQuery.includes("unseen") ||
    normalizedQuery.includes("left out")
  ) {
    if (intentTags.includes("lonely")) {
      score += 22;
      why.push("lonely lane");
    }
  }

  if (
    normalizedQuery.includes("discouraged") ||
    normalizedQuery.includes("burned out") ||
    normalizedQuery.includes("burnt out") ||
    normalizedQuery.includes("stuck") ||
    normalizedQuery.includes("drained") ||
    normalizedQuery.includes("exhausted")
  ) {
    if (intentTags.includes("discouraged")) {
      score += 22;
      why.push("discouraged lane");
    }
  }

  if (
    normalizedQuery.includes("direction") ||
    normalizedQuery.includes("clarity") ||
    normalizedQuery.includes("what should i do") ||
    normalizedQuery.includes("lost") ||
    normalizedQuery.includes("confused")
  ) {
    if (intentTags.includes("direction")) {
      score += 22;
      why.push("direction lane");
    }
  }

  if (
    normalizedQuery.includes("money") ||
    normalizedQuery.includes("bills") ||
    normalizedQuery.includes("debt") ||
    normalizedQuery.includes("broke") ||
    normalizedQuery.includes("financial")
  ) {
    if (intentTags.includes("money")) {
      score += 22;
      why.push("money lane");
    }
  }

  if (
    normalizedQuery.includes("fear") ||
    normalizedQuery.includes("afraid") ||
    normalizedQuery.includes("anxious") ||
    normalizedQuery.includes("worried") ||
    normalizedQuery.includes("overwhelmed") ||
    normalizedQuery.includes("panic")
  ) {
    if (intentTags.includes("fear")) {
      score += 22;
      why.push("fear lane");
    }
  }

  if (
    normalizedQuery.includes("angry") ||
    normalizedQuery.includes("frustrated") ||
    normalizedQuery.includes("resentful") ||
    normalizedQuery.includes("bitter") ||
    normalizedQuery.includes("offended")
  ) {
    if (intentTags.includes("anger")) {
      score += 22;
      why.push("anger lane");
    }
  }

  // Leadership stays lighter so workplace conflict does not overshadow response wisdom
  if (
    normalizedQuery.includes("boss") ||
    normalizedQuery.includes("team") ||
    normalizedQuery.includes("leadership") ||
    normalizedQuery.includes("manager") ||
    normalizedQuery.includes("supervisor")
  ) {
    if (intentTags.includes("leadership")) {
      score += 8;
      why.push("leadership lane");
    }
  }

  if (
    normalizedQuery.includes("difficult boss") ||
    normalizedQuery.includes("difficult person") ||
    normalizedQuery.includes("hard to deal with") ||
    normalizedQuery.includes("unfair treatment") ||
    normalizedQuery.includes("argument") ||
    normalizedQuery.includes("conflict") ||
    normalizedQuery.includes("tension")
  ) {
    if (intentTags.includes("relationships") || intentTags.includes("anger")) {
      score += 26;
      why.push("conflict lane");
    }
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

    if (topics.includes(token)) {
      score += 8;
      why.push(`topic:${token}`);
    }

    if (intentTags.includes(token)) {
      score += 14;
      why.push(`intent:${token}`);
    }

    if (moodTags.includes(token)) {
      score += 6;
      why.push(`mood:${token}`);
    }

    if (text.includes(token)) {
      score += 4;
      why.push(`text:${token}`);
    }

    if (ref.includes(token)) {
      score += 4;
      why.push(`ref:${token}`);
    }
  }

  // Situation Router base boosts
  const topicHits = countMatches(topics, situation.boostTopics);
  const intentHits = countMatches(intentTags, situation.boostIntentTags);
  const moodHits = countMatches(moodTags, situation.boostMoodTags);

  if (topicHits > 0) {
    score += topicHits * 6;
    why.push("situation topics");
  }

  if (intentHits > 0) {
    score += intentHits * 7;
    why.push("situation intent");
  }

  if (moodHits > 0) {
    score += moodHits * 4;
    why.push("situation mood");
  }

  // WORKPLACE CONFLICT / DIFFICULT PEOPLE
  if (situation.types.includes("workplace_conflict")) {
    if (
      hasAny(topics, ["speech", "self-control", "gentleness"]) ||
      hasAny(keywords, ["response", "gentle answer", "restraint"]) ||
      hasAny(intentTags, ["anger", "relationships"])
    ) {
      score += 30;
      why.push("conflict response wisdom");
    } else if (
      hasAny(topics, ["wisdom", "peace"]) ||
      hasAny(intentTags, ["wisdom"])
    ) {
      score += 10;
      why.push("general wisdom (conflict)");
    }
  }

  if (
    situation.types.includes("difficult_person") &&
    (
      hasAny(topics, ["patience", "self-control", "wisdom", "speech", "gentleness"]) ||
      hasAny(intentTags, ["anger", "relationships"]) ||
      hasAny(keywords, ["difficult person", "restraint", "gentle answer", "response"])
    )
  ) {
    score += 24;
    why.push("matched difficult person");
  }

  // FEAR / ANXIETY
  if (situation.types.includes("fear_anxiety")) {
    if (
      hasAny(topics, ["peace", "trust", "rest", "safety", "protection"]) ||
      hasAny(intentTags, ["fear", "peace", "trust", "comfort"]) ||
      hasAny(moodTags, ["anxious", "afraid", "restless", "troubled"])
    ) {
      score += 28;
      why.push("fear peace lane");
    } else if (
      hasAny(topics, ["strength", "wisdom"]) ||
      hasAny(intentTags, ["hope"])
    ) {
      score += 10;
      why.push("general support (fear)");
    }
  }

  // CONFUSION / DIRECTION
  if (situation.types.includes("confusion")) {
    if (
      hasAny(topics, ["direction", "guidance", "clarity", "plans", "purpose"]) ||
      hasAny(intentTags, ["direction", "guidance", "decision", "trust"]) ||
      hasAny(keywords, ["direction", "clarity", "decision", "counsel", "path", "next step"])
    ) {
      score += 28;
      why.push("clarity direction lane");
    } else if (
      hasAny(topics, ["wisdom", "understanding"]) ||
      hasAny(intentTags, ["wisdom"])
    ) {
      score += 10;
      why.push("general wisdom (direction)");
    }
  }

  // MONEY / FINANCIAL PRESSURE
  if (situation.types.includes("financial_pressure")) {
    if (
      hasAny(topics, ["money", "planning", "diligence", "stewardship", "debt", "work"]) ||
      hasAny(intentTags, ["money", "work", "stewardship"]) ||
      hasAny(keywords, ["money", "debt", "bills", "budget", "finances", "provision"])
    ) {
      score += 28;
      why.push("financial wisdom lane");
    } else if (
      hasAny(topics, ["trust", "peace", "hope"]) ||
      hasAny(intentTags, ["trust", "comfort"])
    ) {
      score += 10;
      why.push("general support (money)");
    }
  }

  // LONELINESS / REJECTION
  if (
    situation.types.includes("loneliness") ||
    situation.types.includes("rejection")
  ) {
    if (
      hasAny(topics, ["friendship", "relationships", "love", "encouragement", "counsel"]) ||
      hasAny(intentTags, ["lonely", "relationships", "friendship", "comfort"]) ||
      hasAny(moodTags, ["alone", "isolated", "unseen"])
    ) {
      score += 28;
      why.push("comfort companionship lane");
    } else if (
      hasAny(topics, ["direction", "growth", "strength"]) ||
      hasAny(intentTags, ["wisdom"])
    ) {
      score += 10;
      why.push("general support (lonely)");
    }
  }

  // BURNOUT / DISCOURAGEMENT
  if (situation.types.includes("burnout")) {
    if (
      hasAny(topics, ["strength", "hope", "peace", "rest"]) ||
      hasAny(intentTags, ["discouraged", "strength", "hope"]) ||
      hasAny(moodTags, ["weary", "tired", "drained"])
    ) {
      score += 28;
      why.push("renewal strength lane");
    } else if (
      hasAny(topics, ["direction", "wisdom"]) ||
      hasAny(intentTags, ["guidance"])
    ) {
      score += 10;
      why.push("general support (burnout)");
    }
  }

  // Special boosts for difficult people / conflict searches
  if (
    normalizedQuery.includes("boss") ||
    normalizedQuery.includes("difficult") ||
    normalizedQuery.includes("conflict") ||
    normalizedQuery.includes("frustrated")
  ) {
    if (
      keywords.includes("difficult boss") ||
      keywords.includes("difficult person") ||
      keywords.includes("gentle answer") ||
      keywords.includes("restraint") ||
      keywords.includes("response") ||
      keywords.includes("conflict")
    ) {
      score += 18;
      why.push("workable conflict wisdom");
    }
  }

  const specificHits = tokens.filter(
    (token) =>
      keywords.includes(token) ||
      topics.includes(token) ||
      intentTags.includes(token) ||
      moodTags.includes(token) ||
      title.includes(token) ||
      text.includes(token)
  );

  const nonGeneric = specificHits.filter(
    (x) => !["wisdom", "hope", "peace", "strength", "guidance"].includes(x)
  );

  if (nonGeneric.length >= 2) {
    score += 10;
    why.push("strong intent match");
  }

  return {
    item,
    score,
    why: uniq(why).slice(0, 5),
  };
}

export function searchProverbsScored(
  query: string,
  limit = 8
): ScoredProverbResult[] {
  if (!query.trim()) return [];

  return PROVERBS
    .map((item) => scoreProverbItem(item, query))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function searchProverbs(
  query: string,
  limit = 8
): ProverbEntry[] {
  return searchProverbsScored(query, limit).map((x) => x.item);
}
