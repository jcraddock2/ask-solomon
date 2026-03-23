// app/lib/proverbs.ts

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
  ],
  fear: [
    "fear",
    "afraid",
    "anxiety",
    "anxious",
    "worry",
    "troubled",
    "peace",
    "calm",
    "trust",
    "courage",
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

  if (normalized.includes("money stress")) {
    INTENT_EXPANSIONS.money.forEach((x) => expanded.add(x));
  }

  if (normalized.includes("need direction")) {
    INTENT_EXPANSIONS.direction.forEach((x) => expanded.add(x));
  }

  if (normalized.includes("i am hurting") || normalized.includes("im hurting")) {
    INTENT_EXPANSIONS.hurting.forEach((x) => expanded.add(x));
  }

  if (normalized.includes("i am lonely") || normalized.includes("im lonely")) {
    INTENT_EXPANSIONS.lonely.forEach((x) => expanded.add(x));
  }

  if (normalized.includes("relationship conflict")) {
    INTENT_EXPANSIONS.relationships.forEach((x) => expanded.add(x));
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
    ["counsel", "guidance", "direction", "advice", "clarity", "decision"],
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
    ["money", "planning", "abundance", "lack", "finances", "steady work"],
    ["money", "direction", "stewardship"],
    ["stressed", "urgent"]
  ),
  createProverb(
    "Proverbs 22:7",
    "Debt creates pressure",
    "Debt brings weight and pressure. Wisdom moves toward stewardship, restraint, and freedom.",
    ["money", "debt", "stewardship"],
    ["debt", "money", "pressure", "finances", "lack", "stewardship", "burden"],
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
    ["fear", "afraid", "fear of man", "trust", "anxiety", "trap"],
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

  // ANGER / WORDS / RELATIONSHIPS
  createProverb(
    "Proverbs 15:1",
    "A gentle answer turns anger down",
    "When tension rises, gentleness can cool what harshness would inflame.",
    ["anger", "relationships", "speech"],
    ["anger", "gentle answer", "conflict", "words", "relationships", "response"],
    ["anger", "relationships", "peace"],
    ["triggered", "frustrated"]
  ),
  createProverb(
    "Proverbs 17:27",
    "Calm restraint shows wisdom",
    "Measured words and a calm spirit reflect strength, not weakness.",
    ["anger", "speech", "wisdom"],
    ["calm", "restraint", "words", "spirit", "anger", "self-control"],
    ["anger", "wisdom", "relationships"],
    ["heated", "frustrated"]
  ),

  // INTEGRITY / WISDOM / LEADERSHIP
  createProverb(
    "Proverbs 28:1",
    "Boldness follows integrity",
    "A clear conscience strengthens confidence. Wisdom makes courage cleaner and steadier.",
    ["confidence", "integrity", "fear"],
    ["confidence", "boldness", "integrity", "fear", "clear conscience"],
    ["confidence", "fear", "leadership"],
    ["hesitant", "uncertain"]
  ),
  createProverb(
    "Proverbs 4:7",
    "Wisdom comes first",
    "When the way forward is unclear, start by valuing wisdom above impulse.",
    ["wisdom", "direction", "decision"],
    ["wisdom", "direction", "decision", "understanding", "clarity", "next step"],
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
    // -------------------------
  // EXPANSION — EMOTIONAL DEPTH (A)
  // -------------------------

  createProverb(
    "Proverbs 12:25",
    "A heavy heart can be lifted",
    "Anxiety weighs a heart down, but a good word brings life back into it.",
    ["anxiety", "heart", "comfort"],
    ["heavy heart", "anxiety", "burdened", "comfort", "encouragement", "lift"],
    ["hurting", "encouragement", "comfort"],
    ["heavy", "burdened", "low"]
  ),

  createProverb(
    "Proverbs 13:12",
    "Hope restores the heart",
    "Hope delayed can make the heart sick, but when it returns, it brings life again.",
    ["hope", "heart", "restoration"],
    ["hope", "discouraged", "heart sick", "waiting", "restoration", "desire"],
    ["discouraged", "hope"],
    ["weary", "waiting", "low"]
  ),

  createProverb(
    "Proverbs 15:13",
    "A joyful heart changes your strength",
    "A glad heart shows in your face, but sorrow can drain your spirit.",
    ["heart", "joy", "emotion"],
    ["sorrow", "joy", "spirit", "emotions", "inner state", "hurting"],
    ["hurting", "healing"],
    ["sad", "low", "heavy"]
  ),

  createProverb(
    "Proverbs 17:22",
    "Joy strengthens the body",
    "A joyful heart brings strength and healing, but a crushed spirit weakens you.",
    ["healing", "strength", "heart"],
    ["healing", "joy", "crushed spirit", "strength", "hurt", "pain"],
    ["hurting", "healing"],
    ["weak", "drained", "wounded"]
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
    "Proverbs 21:2",
    "Your perspective may be incomplete",
    "Every way seems right to a person, but the Lord weighs the heart.",
    ["wisdom", "perspective", "humility"],
    ["right", "decision", "perspective", "judgment", "heart", "understanding"],
    ["direction", "wisdom"],
    ["uncertain", "confident"]
  ),

  createProverb(
    "Proverbs 24:16",
    "You can rise again",
    "Even if you fall repeatedly, you can rise again—resilience is part of wisdom.",
    ["resilience", "strength", "hope"],
    ["fall", "failure", "get back up", "resilience", "discouraged", "rise"],
    ["discouraged", "strength"],
    ["down", "defeated"]
  ),

  createProverb(
    "Proverbs 27:17",
    "You are shaped by people around you",
    "As iron sharpens iron, people strengthen one another.",
    ["relationships", "growth", "strength"],
    ["friendship", "people", "relationships", "growth", "support"],
    ["lonely", "relationships"],
    ["isolated", "seeking"]
  ),

  createProverb(
    "Proverbs 28:13",
    "You are not stuck where you are",
    "Those who hide their struggles do not move forward, but those who face them find mercy.",
    ["growth", "healing", "honesty"],
    ["struggle", "healing", "honest", "change", "growth", "freedom"],
    ["hurting", "healing"],
    ["stuck", "ashamed"]
  ),

  createProverb(
    "Proverbs 29:11",
    "You don’t have to react emotionally",
    "Fools release everything they feel, but the wise hold steady and respond.",
    ["self-control", "wisdom", "emotion"],
    ["emotion", "anger", "control", "reaction", "wisdom", "response"],
    ["anger", "wisdom"],
    ["triggered", "emotional"]
  ),

  createProverb(
    "Proverbs 29:18",
    "Clarity creates direction",
    "Where there is no vision, people drift—but clarity anchors your path.",
    ["vision", "direction", "clarity"],
    ["vision", "direction", "clarity", "drift", "purpose", "focus"],
    ["direction", "focus"],
    ["lost", "uncertain"]
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

function scoreProverbItem(item: ProverbEntry, query: string): ScoredProverbResult {
  const normalizedQuery = normalizeText(query);
  const tokens = expandQuery(query);

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
if (normalizedQuery.includes("hurting")) {
  if (intentTags.includes("hurting")) score += 20;
}

if (normalizedQuery.includes("lonely")) {
  if (intentTags.includes("lonely")) score += 20;
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
    why: uniq(why).slice(0, 4),
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
   
