// app/lib/proverbs.ts

import { detectSituation } from "./situations";
import { PROVERBS } from "./proverbs";
import {
  normalizeText,
  uniq,
  type ProverbEntry,
} from "./proverbs/shared";

export type ScoredProverbResult = {
  item: ProverbEntry;
  score: number;
  why: string[];
};

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

export type { ProverbEntry };
