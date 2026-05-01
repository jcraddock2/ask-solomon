// app/lib/proverbs.ts

import { detectSituation } from "./situations";
import { PROVERBS } from "./proverbs/index";
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

const GENERIC_TOKENS = new Set([
  "life",
  "wisdom",
  "peace",
  "hope",
  "strength",
  "guidance",
  "good",
  "better",
  "right",
]);

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
    "invisible",
    "ignored",
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
    "failing",
    "failure",
    "behind",
  ],
  direction: [
    "direction",
    "guidance",
    "clarity",
    "path",
    "decision",
    "decisions",
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
    "bad decisions",
    "good judgment",
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
    "pressure",
    "peace of mind",
    "peace in my mind",
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
    "talks down to me",
    "disrespected",
    "dishonor",
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
  success: [
    "success",
    "successful",
    "succeed",
    "achievement",
    "progress",
    "growth",
    "discipline",
    "diligence",
    "work",
    "skill",
    "promotion",
    "advance",
    "advancement",
    "improve",
    "improvement",
    "excel",
    "excellence",
    "goals",
    "plans",
    "future",
    "purpose",
    "calling",
    "productive",
    "productivity",
    "motivation",
    "motivated",
    "lazy",
    "effort",
    "procrastinating",
    "procrastination",
    "failing",
    "failure",
    "behind",
  ],
  confidence: [
    "confidence",
    "courage",
    "boldness",
    "secure",
    "strength",
    "identity",
    "fearless",
    "steady",
    "not ashamed",
    "worth",
    "dignity",
    "approval",
    "rejection",
    "invisible",
    "self-doubt",
    "unsure",
    "hesitant",
  ],
  comparison: [
    "behind",
    "behind in life",
    "falling behind",
    "comparison",
    "compare",
    "comparing",
    "not enough",
    "late",
    "progress",
    "delay",
    "self-doubt",
    "second guessing",
    "second guess",
    "unsure",
    "uncertain",
  ],
  respect: [
    "respect",
    "respected",
    "honor",
    "honored",
    "esteem",
    "esteemed",
    "dignity",
    "good name",
    "praised",
    "overlooked",
    "ignored",
    "dishonored",
  ],
};

const WORD_ALIASES: Record<string, string[]> = {
  successful: ["success", "succeed", "achievement", "progress", "growth"],
  succeed: ["success", "successful", "achievement", "progress", "growth"],
  succeeding: ["success", "successful", "achievement", "progress", "growth"],
  success: ["successful", "succeed", "achievement", "progress", "growth"],

  motivate: ["motivation", "discipline", "drive", "effort"],
  motivated: ["motivation", "discipline", "drive", "effort", "success"],
  motivation: ["motivated", "discipline", "drive", "effort", "success"],
  discipline: ["diligence", "self-control", "effort", "work"],
  diligent: ["diligence", "discipline", "effort", "work"],
  diligence: ["diligent", "discipline", "effort", "work"],
  lazy: ["discipline", "diligence", "effort", "work", "success"],
  productive: ["productivity", "success", "work", "discipline"],
  productivity: ["productive", "success", "work", "discipline"],
  procrastinating: ["procrastination", "lazy", "discipline", "diligence", "effort"],
  procrastination: ["procrastinating", "lazy", "discipline", "diligence", "effort"],
  failing: ["failure", "discouraged", "success", "growth"],
  failure: ["failing", "discouraged", "success", "growth"],

  anxious: ["anxiety", "fear", "worry", "worried"],
  worried: ["worry", "fear", "anxiety", "anxious"],
  afraid: ["fear", "anxiety", "worry"],
  pressure: ["stress", "overwhelmed", "fear", "responsibility"],

  angry: ["anger", "conflict", "frustration"],
  frustrated: ["anger", "conflict", "stress", "tension"],

  directionless: ["direction", "guidance", "clarity"],
  lost: ["direction", "guidance", "clarity", "confused"],
  decisions: ["decision", "wisdom", "guidance", "clarity"],
  decision: ["decisions", "wisdom", "guidance", "clarity"],

  invisible: ["lonely", "rejected", "unseen", "ignored", "confidence"],
  rejected: ["lonely", "invisible", "unseen", "confidence"],
  confidence: ["courage", "boldness", "strength", "secure"],
  courage: ["confidence", "boldness", "strength"],

  behind: ["progress", "delay", "comparison", "discouraged", "success"],
  comparing: ["comparison", "behind", "self-doubt", "progress"],
  comparison: ["comparing", "behind", "self-doubt", "progress"],
  unsure: ["self-doubt", "confidence", "direction", "clarity"],
  uncertain: ["self-doubt", "direction", "clarity", "confidence"],
  hesitant: ["self-doubt", "confidence", "fear"],
  guessing: ["second guessing", "self-doubt", "uncertain"],
  second: ["second guessing", "self-doubt"],

  boss: ["leadership", "manager", "supervisor", "authority", "workplace"],
  manager: ["leadership", "boss", "supervisor", "authority", "workplace"],
  supervisor: ["leadership", "boss", "manager", "authority", "workplace"],
};

const LANE_PHRASE_BOOSTS: Array<{
  phrases: string[];
  intents: string[];
  moods?: string[];
  bonus: number;
  label: string;
}> = [
  {
    phrases: [
      "second guessing",
      "second guess",
      "second guessing myself",
      "i second guess myself",
      "self-doubt",
      "unsure",
      "uncertain",
      "hesitant",
    ],
    intents: ["comparison", "confidence", "direction"],
    moods: ["uncertain", "insecure", "hesitant"],
    bonus: 36,
    label: "self doubt lane",
  },
{
  phrases: [
    "behind in life",
    "falling behind",
    "i feel behind",
    "i am behind",
    "feel behind",
    "behind everyone",
    "everyone else is ahead",
    "not enough",
    "late in life",
    "too late",
  ],
  intents: ["discouraged", "direction", "hope", "purpose"],
  moods: ["discouraged", "stuck", "uncertain", "weary"],
  bonus: 48,
  label: "behind in life lane",
},
  {
    phrases: [
      "confidence",
      "courage",
      "boldness",
      "invisible",
      "rejected",
      "insecure",
      "small",
      "approval",
    ],
    intents: ["confidence"],
    moods: ["insecure", "rejected", "unseen"],
    bonus: 30,
    label: "confidence lane",
  },
  {
    phrases: [
      "respect",
      "respected",
      "honor",
      "honored",
      "overlooked",
      "ignored",
      "disrespected",
      "dishonored",
      "i want to be respected",
      "i want respect",
      "people do not respect me",
      "not respected",
    ],
    intents: ["respect", "confidence", "leadership"],
    moods: ["ignored", "overlooked", "disrespected"],
    bonus: 40,
    label: "respect lane",
  },
];

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
    "do",
    "how",
    "can",
    "should",
    "would",
    "just",
    "really",
    "keep",
    "stop",
    "myself",
  ]);

function tokenizeQuery(query: string): string[] {
  return normalizeText(query)
    .split(" ")
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

function expandQuery(query: string): string[] {
  const normalized = normalizeText(query);
  const base = tokenizeQuery(query);
  const expanded = new Set<string>(base);

  for (const token of base) {
    if (INTENT_EXPANSIONS[token]) {
      INTENT_EXPANSIONS[token].forEach((x) => expanded.add(x));
    }

    if (WORD_ALIASES[token]) {
      WORD_ALIASES[token].forEach((x) => expanded.add(x));
    }
  }

  const phraseRules: Array<[string[], keyof typeof INTENT_EXPANSIONS]> = [
    [["money stress", "worried about bills", "financial stress", "broke", "unpaid bills"], "money"],
    [["need direction", "need clarity", "what should i do", "next step", "feel lost", "need wisdom"], "direction"],
    [["i am hurting", "im hurting", "heartbroken", "in pain", "grieving", "deep pain"], "hurting"],
    [["i am lonely", "im lonely", "feel alone", "abandoned", "rejected", "unseen", "left out"], "lonely"],
    [["burned out", "burnt out", "worn out", "drained", "exhausted", "feel stuck"], "discouraged"],
    [["anxious", "overwhelmed", "panic", "worried", "afraid", "stressed", "peace in my mind", "peace of mind", "under pressure"], "fear"],
    [["relationship conflict", "difficult person", "difficult boss", "argument", "tension", "hard to deal with", "talks down to me", "disrespected"], "relationships"],
    [["angry", "frustrated", "bitter", "resentful", "offended"], "anger"],
    [["leadership pressure", "leading people", "team pressure", "as a leader", "boss", "manager", "supervisor", "under pressure"], "leadership"],
    [["unfair treatment", "treated unfairly", "not respected", "work conflict", "talks down to me"], "relationships"],
    [["i want to be respected", "i want respect", "people do not respect me", "i feel disrespected", "i feel overlooked", "i feel ignored"], "respect"],
    [["want to be successful", "want success", "how do i succeed", "how to succeed", "i want to grow", "i want to improve my life", "i need motivation", "i feel lazy", "i want discipline", "i want to advance", "i want to do better", "i want progress", "stop procrastinating", "tired of failing"], "success"],
    [["i need confidence", "i feel invisible", "i feel rejected", "i need courage", "i need boldness", "i feel small", "i feel insecure"], "confidence"],
    [["bad decisions", "keep making bad decisions", "i keep making bad decisions", "need good judgment"], "direction"],
    [["i feel behind in life", "behind in life", "falling behind", "i feel behind", "i am behind", "second guessing myself", "i second guess myself"], "comparison"],
    [["purpose", "my purpose", "calling", "why am i here", "what am i here for", "meaning", "lost in life"], "purpose"],
    [["hope", "need hope", "hopeless", "no hope", "will it get better", "keep going"], "hope"],
    [["identity", "who am i", "self worth", "not enough", "worthless", "overlooked", "unwanted"], "identity"],
    [["waiting", "still waiting", "taking too long", "not making progress", "progress", "stuck", "delayed"], "progress"],
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
  const topics = (item.topics || []).map(normalizeText);
  const keywords = (item.keywords || []).map(normalizeText);
  const intentTags = (item.intentTags || []).map(normalizeText);
  const moodTags = (item.moodTags || []).map(normalizeText);

  let score = 0;
  const why: string[] = [];

  if (!normalizedQuery.trim()) {
    return { item, score: 0, why: [] };
  }

  const haystack = [
    title,
    text,
    ref,
    ...topics,
    ...keywords,
    ...intentTags,
    ...moodTags,
  ].join(" ");

  const queryIncludesAny = (phrases: string[]) =>
    phrases.some((phrase) => normalizedQuery.includes(normalizeText(phrase)));

  const itemHasAny = (terms: string[]) =>
    terms.some((term) => haystack.includes(normalizeText(term)));

  const itemHasIntent = (terms: string[]) =>
    terms.some((term) => intentTags.includes(normalizeText(term)));

  const itemHasMood = (terms: string[]) =>
    terms.some((term) => moodTags.includes(normalizeText(term)));

  const itemHasTopic = (terms: string[]) =>
    terms.some((term) => topics.includes(normalizeText(term)));

  const boostLane = (
    label: string,
    queryPhrases: string[],
    preferredIntents: string[],
    preferredMoods: string[],
    preferredTopics: string[],
    preferredTerms: string[],
    bonus: number
  ) => {
    if (!queryIncludesAny(queryPhrases)) return;

    let laneScore = 0;

    if (itemHasIntent(preferredIntents)) laneScore += bonus;
    if (itemHasMood(preferredMoods)) laneScore += Math.round(bonus * 0.7);
    if (itemHasTopic(preferredTopics)) laneScore += Math.round(bonus * 0.6);
    if (itemHasAny(preferredTerms)) laneScore += Math.round(bonus * 0.5);

    if (laneScore > 0) {
      score += laneScore;
      why.push(label);
    }
  };

  boostLane(
    "behind in life",
    ["behind in life", "feel behind", "falling behind", "i am behind", "too late", "missed my chance", "second guessing myself", "comparison"],
    ["comparison", "identity", "purpose", "direction", "wisdom"],
    ["discouraged", "uncertain", "ashamed", "overlooked", "weary"],
    ["contentment", "patience", "purpose", "wisdom", "direction", "growth"],
    ["path", "steps", "season", "wait", "wisdom", "future", "hope", "heart"],
    34
  );

  boostLane(
    "discouragement",
    ["discouraged", "down", "heavy", "tired", "weary", "worn out", "burned out", "losing hope", "defeated", "giving up"],
    ["hope", "encouragement", "strength", "healing", "direction", "wisdom"],
    ["discouraged", "weary", "hurting", "overwhelmed", "afraid"],
    ["hope", "strength", "peace", "healing", "encouragement"],
    ["hope", "heart", "life", "strength", "healing", "path", "trust"],
    32
  );

  boostLane(
    "purpose",
    ["purpose", "my purpose", "calling", "what am i here for", "why am i here", "meaning", "direction in life", "lost in life"],
    ["purpose", "direction", "wisdom", "identity", "calling"],
    ["uncertain", "seeking", "discouraged", "restless"],
    ["purpose", "direction", "wisdom", "calling", "growth"],
    ["path", "steps", "plan", "wisdom", "understanding", "heart", "future"],
    34
  );

  boostLane(
    "direction",
    ["need direction", "need guidance", "what should i do", "which way", "decision", "decide", "confused", "uncertain", "clarity", "lost"],
    ["direction", "wisdom", "guidance", "discernment"],
    ["uncertain", "seeking", "confused", "anxious"],
    ["direction", "wisdom", "instruction", "understanding"],
    ["path", "way", "steps", "wisdom", "instruction", "understanding", "counsel"],
    30
  );

  boostLane(
    "hope",
    ["hope", "need hope", "no hope", "hopeless", "future", "will it get better", "better days", "keep going"],
    ["hope", "encouragement", "strength", "healing", "purpose"],
    ["discouraged", "weary", "hurting", "afraid", "overwhelmed"],
    ["hope", "future", "strength", "peace", "healing"],
    ["hope", "future", "life", "heart", "healing", "strength", "trust"],
    32
  );

  boostLane(
    "identity",
    ["identity", "who am i", "self worth", "worthless", "not enough", "i am not enough", "feel invisible", "invisible", "rejected", "overlooked", "unwanted"],
    ["identity", "confidence", "wisdom", "purpose", "healing"],
    ["rejected", "ashamed", "discouraged", "overlooked", "uncertain"],
    ["identity", "confidence", "wisdom", "healing", "purpose"],
    ["heart", "upright", "honor", "wisdom", "confidence", "life", "favor"],
    34
  );

  boostLane(
    "waiting / progress",
    ["waiting", "still waiting", "taking too long", "not making progress", "progress", "stuck", "delayed", "slow", "nothing is happening"],
    ["patience", "growth", "purpose", "direction", "diligence", "hope"],
    ["discouraged", "weary", "restless", "uncertain"],
    ["patience", "growth", "diligence", "wisdom", "future"],
    ["path", "steps", "diligent", "wait", "season", "growth", "future", "hope"],
    32
  );

  if (title.includes(normalizedQuery)) {
    score += 20;
    why.push("title phrase");
  }

  if (text.includes(normalizedQuery)) {
    score += 12;
    why.push("text phrase");
  }

  for (const rule of LANE_PHRASE_BOOSTS) {
    const matchedPhrase = rule.phrases.some((phrase) =>
      normalizedQuery.includes(normalizeText(phrase))
    );

    if (!matchedPhrase) continue;

    const intentMatch = hasAny(intentTags, rule.intents);
    const moodMatch = rule.moods ? hasAny(moodTags, rule.moods) : false;

    if (intentMatch) {
      score += rule.bonus;
      why.push(rule.label);
    } else if (moodMatch) {
      score += Math.round(rule.bonus * 0.55);
      why.push(`${rule.label} mood`);
    }
  }

  for (const token of tokens) {
    if (title.includes(token)) {
      score += scoreTokenHit(token, "title");
      why.push(`title:${token}`);
    }

    if (keywords.includes(token)) {
      score += scoreTokenHit(token, "keyword");
      why.push(`keyword:${token}`);
    }

    if (topics.includes(token)) {
      score += scoreTokenHit(token, "topic");
      why.push(`topic:${token}`);
    }

    if (intentTags.includes(token)) {
      score += scoreTokenHit(token, "intent");
      why.push(`intent:${token}`);
    }

    if (moodTags.includes(token)) {
      score += scoreTokenHit(token, "mood");
      why.push(`mood:${token}`);
    }

    if (text.includes(token)) {
      score += scoreTokenHit(token, "text");
      why.push(`text:${token}`);
    }

    if (ref.includes(token)) {
      score += scoreTokenHit(token, "ref");
      why.push(`ref:${token}`);
    }
  }

  const topicHits = countMatches(topics, situation.boostTopics);
  const intentHits = countMatches(intentTags, situation.boostIntentTags);
  const moodHits = countMatches(moodTags, situation.boostMoodTags);

  score += applySituationBoosts(topicHits, intentHits, moodHits, why);

  const specificHits = tokens.filter(
    (token) =>
      !GENERIC_TOKENS.has(token) &&
      (
        keywords.includes(token) ||
        topics.includes(token) ||
        intentTags.includes(token) ||
        moodTags.includes(token) ||
        title.includes(token) ||
        text.includes(token)
      )
  );

  if (specificHits.length >= 2) {
    score += 10;
    why.push("strong intent match");
  }

  if (specificHits.length >= 3 && hasAny(intentTags, tokens)) {
    score += 8;
    why.push("lane confirmation");
  }

  if (score === 0) {
    const softTokens = tokens.filter(
      (token) =>
        !GENERIC_TOKENS.has(token) &&
        (
          title.includes(token) ||
          text.includes(token) ||
          keywords.includes(token) ||
          topics.includes(token)
        )
    );

    if (softTokens.length >= 2) {
      score += 6;
      why.push("soft match");
    }
  }

  return {
    item,
    score,
    why: uniq(why).slice(0, 6),
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
