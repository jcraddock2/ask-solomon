// app/lib/proverbs.ts

export type ProverbEntry = {
  ref: string;
  title: string;
  body: string;
  text: string; // alias of body for search compatibility
  topics: string[];
  keywords?: string[];
  intentTags?: string[];
  moodTags?: string[];
};

type ScoredResult = {
  item: ProverbEntry;
  score: number;
};

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "been",
  "but",
  "by",
  "can",
  "could",
  "do",
  "for",
  "from",
  "get",
  "had",
  "has",
  "have",
  "he",
  "her",
  "him",
  "his",
  "i",
  "if",
  "im",
  "i'm",
  "in",
  "into",
  "is",
  "it",
  "its",
  "just",
  "me",
  "my",
  "of",
  "on",
  "or",
  "our",
  "she",
  "so",
  "that",
  "the",
  "their",
  "them",
  "they",
  "this",
  "to",
  "up",
  "was",
  "we",
  "what",
  "when",
  "with",
  "you",
  "your",
]);

const INTENT_GROUPS: Array<{
  name: string;
  triggers: string[];
  boosts: string[];
}> = [
  {
    name: "overwhelmed",
    triggers: [
      "overwhelmed",
      "stressed",
      "stress",
      "anxious",
      "anxiety",
      "heavy",
      "too much",
      "burned out",
      "burnout",
      "exhausted",
      "tired",
      "pressure",
      "pressured",
      "cant keep up",
      "can't keep up",
      "falling apart",
      "mentally drained",
      "drained",
    ],
    boosts: ["peace", "calm", "trust", "patience", "heart", "fear", "rest", "gentle"],
  },
  {
    name: "guidance",
    triggers: [
      "guidance",
      "direction",
      "what should i do",
      "what do i do",
      "next step",
      "decision",
      "choices",
      "confused",
      "uncertain",
      "unsure",
      "dont know",
      "don't know",
      "wisdom",
      "discernment",
      "clarity",
      "show me",
      "lead me",
    ],
    boosts: ["wisdom", "understanding", "instruction", "path", "way", "counsel", "discernment"],
  },
  {
    name: "money",
    triggers: [
      "money",
      "finances",
      "financial",
      "bills",
      "debt",
      "income",
      "provision",
      "poverty",
      "wealth",
      "rich",
      "business",
      "success",
      "prosperity",
      "paycheck",
      "paycheck to paycheck",
      "broke",
      "struggling financially",
    ],
    boosts: ["money", "wealth", "diligence", "planning", "provision", "work", "stewardship"],
  },
  {
    name: "fear",
    triggers: [
      "afraid",
      "fear",
      "scared",
      "worried",
      "worry",
      "nervous",
      "panic",
      "troubled",
      "trouble",
      "uneasy",
    ],
    boosts: ["trust", "peace", "heart", "fear", "security", "refuge"],
  },
  {
    name: "motivation",
    triggers: [
      "lazy",
      "discipline",
      "motivation",
      "motivated",
      "productive",
      "focus",
      "work ethic",
      "consistency",
      "stuck",
      "procrastinating",
      "procrastination",
      "need discipline",
      "need focus",
    ],
    boosts: ["diligence", "discipline", "work", "effort", "planning", "correction"],
  },
  {
    name: "relationships",
    triggers: [
      "relationship",
      "marriage",
      "friend",
      "friends",
      "people",
      "conflict",
      "argument",
      "offended",
      "offense",
      "anger",
      "communication",
      "gossip",
      "harsh words",
      "drama",
    ],
    boosts: ["speech", "kindness", "peace", "anger", "friendship", "love", "correction"],
  },
  {
    name: "leadership",
    triggers: [
      "leader",
      "leadership",
      "influence",
      "team",
      "staff",
      "manager",
      "supervisor",
      "authority",
      "example",
      "responsibility",
      "employees",
    ],
    boosts: ["wisdom", "integrity", "correction", "speech", "planning", "justice", "counsel"],
  },
];

function createProverb(
  ref: string,
  title: string,
  body: string,
  topics: string[],
  keywords: string[] = [],
  intentTags: string[] = [],
  moodTags: string[] = []
): ProverbEntry {
  return {
    ref,
    title,
    body,
    text: body,
    topics,
    keywords,
    intentTags,
    moodTags,
  };
}

export const PROVERBS: ProverbEntry[] = [
  createProverb(
    "Proverbs 1:7",
    "Wisdom Starts Here",
    "The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.",
    ["wisdom", "instruction", "foundation"],
    ["knowledge", "instruction", "teachability", "learning", "reverence"],
    ["guidance", "leadership"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 3:5-6",
    "Trust Him With the Path",
    "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    ["guidance", "trust", "direction"],
    ["path", "decision", "clarity", "understanding", "next step"],
    ["guidance", "fear", "overwhelmed"],
    ["confused", "uncertain", "anxious"]
  ),
  createProverb(
    "Proverbs 3:7-8",
    "Humility Brings Health",
    "Do not be wise in your own eyes; fear the Lord and shun evil. This will bring health to your body and nourishment to your bones.", 
        ["humility", "wisdom", "health"],
    ["humble", "correction", "healing", "instruction"],
    ["guidance"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 3:9-10",
    "Honor God First",
    "Honor the Lord with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing, and your vats will brim over with new wine.",
    ["money", "stewardship", "honor"],
    ["wealth", "firstfruits", "provision", "giving", "abundance"],
    ["money"],
    ["worried"]
  ),
  createProverb(
    "Proverbs 4:7",
    "Get Wisdom Above All",
    "Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.",
    ["wisdom", "understanding", "guidance"],
    ["wisdom", "understanding", "discernment", "clarity"],
    ["guidance", "leadership"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 4:23",
    "Guard Your Heart",
    "Above all else, guard your heart, for everything you do flows from it.",
    ["heart", "discipline", "inner life"],
    ["heart", "mindset", "emotions", "protection", "focus"],
    ["overwhelmed", "fear", "motivation"],
    ["anxious", "drained"]
  ),
  createProverb(
    "Proverbs 6:6-8",
    "Learn From the Ant",
    "Go to the ant, you sluggard; consider its ways and be wise! It has no commander, no overseer or ruler, yet it stores its provisions in summer and gathers its food at harvest.",
    ["diligence", "work", "planning"],
    ["discipline", "initiative", "preparedness", "work ethic", "effort"],
    ["motivation", "money"],
    ["stuck"]
  ),
  createProverb(
    "Proverbs 10:4",
    "Diligent Hands Produce",
    "Lazy hands make for poverty, but diligent hands bring wealth.",
    ["diligence", "money", "work"],
    ["wealth", "poverty", "effort", "labor", "discipline"],
    ["money", "motivation"],
    ["stuck", "worried"]
  ),
  createProverb(
    "Proverbs 10:9",
    "Integrity Walks Securely",
    "Whoever walks in integrity walks securely, but whoever takes crooked paths will be found out.",
    ["integrity", "character", "leadership"],
    ["integrity", "honesty", "security", "character"],
    ["leadership", "guidance"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 10:12",
    "Love Covers Offense",
    "Hatred stirs up conflict, but love covers over all wrongs.",
    ["relationships", "love", "conflict"],
    ["offense", "forgiveness", "conflict", "peace", "love"],
    ["relationships"],
    ["hurt", "angry"]
  ),
  createProverb(
    "Proverbs 10:19",
    "Use Fewer Words",
    "Sin is not ended by multiplying words, but the prudent hold their tongues.",
    ["speech", "wisdom", "relationships"],
    ["words", "tongue", "restraint", "communication", "prudence"],
    ["relationships", "leadership"],
    ["angry", "frustrated"]
  ),
  createProverb(
    "Proverbs 11:14",
    "Guidance Comes Through Counsel",
    "For lack of guidance a nation falls, but victory is won through many advisers.",
    ["guidance", "counsel", "leadership"],
    ["advisers", "counsel", "wisdom", "guidance", "decision"],
    ["guidance", "leadership"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 11:25",
    "Refresh Others and Be Refreshed",
    "A generous person will prosper; whoever refreshes others will be refreshed.",
    ["generosity", "relationships", "prosperity"],
    ["generous", "refresh", "prosper", "kindness", "service"],
    ["money", "relationships", "leadership"],
    ["drained"]
  ),
  createProverb(
    "Proverbs 12:1",
    "Love Correction",
    "Whoever loves discipline loves knowledge, but whoever hates correction is stupid.",
    ["discipline", "growth", "wisdom"],
    ["correction", "feedback", "coaching", "learning", "teachability"],
    ["motivation", "leadership", "guidance"],
    ["stuck"]
  ),
  createProverb(
    "Proverbs 12:18",
    "Words Can Wound or Heal",
    "The words of the reckless pierce like swords, but the tongue of the wise brings healing.",
    ["speech", "healing", "relationships"],
    ["words", "healing", "gentle", "communication", "tongue"],
    ["relationships", "leadership"],
    ["hurt", "angry"]
  ),
  createProverb(
    "Proverbs 12:25",
    "Anxiety Weighs You Down",
    "Anxiety weighs down the heart, but a kind word cheers it up.",
    ["anxiety", "encouragement", "heart"],
    ["anxiety", "heavy", "kind word", "encouragement", "cheer"],
    ["overwhelmed", "fear"],
    ["anxious", "heavy", "drained"]
  ),
  createProverb(
    "Proverbs 13:4",
    "Desire Must Meet Diligence",
    "A sluggard’s appetite is never filled, but the desires of the diligent are fully satisfied.",
    ["diligence", "motivation", "work"],
    ["desire", "diligent", "satisfied", "effort", "discipline"],
    ["motivation", "money"],
    ["stuck"]
  ),
  createProverb(
    "Proverbs 13:12",
    "Hope Deferred Hurts",
    "Hope deferred makes the heart sick, but a longing fulfilled is a tree of life.",
    ["hope", "heart", "encouragement"],
    ["hope", "delay", "heart sick", "fulfilled", "longing"],
    ["overwhelmed", "fear"],
    ["discouraged", "weary"]
  ),
  createProverb(
    "Proverbs 13:20",
    "Walk With the Wise",
    "Walk with the wise and become wise, for a companion of fools suffers harm.",
    ["wisdom", "relationships", "influence"],
    ["companions", "circle", "friends", "influence", "wise"],
    ["guidance", "relationships", "leadership"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 14:23",
    "Work Produces Profit",
    "All hard work brings a profit, but mere talk leads only to poverty.",
    ["work", "money", "diligence"],
    ["hard work", "profit", "poverty", "action", "effort"],
    ["money", "motivation"],
    ["stuck", "worried"]
  ),
  createProverb(
    "Proverbs 14:29",
    "Patience Shows Understanding",
    "Whoever is patient has great understanding, but one who is quick-tempered displays folly.",
    ["patience", "wisdom", "relationships"],
    ["patience", "temper", "understanding", "anger", "calm"],
    ["overwhelmed", "relationships", "leadership"],
    ["angry", "pressured"]
  ),
  createProverb(
    "Proverbs 15:1",
    "A Gentle Answer Changes the Room",
    "A gentle answer turns away wrath, but a harsh word stirs up anger.",
    ["speech", "relationships", "peace"],
    ["gentle", "harsh", "anger", "answer", "wrath"],
    ["relationships", "leadership"],
    ["angry", "tense"]
  ),
  createProverb(
    "Proverbs 15:13",
    "A Glad Heart Strengthens You",
    "A happy heart makes the face cheerful, but heartache crushes the spirit.",
    ["encouragement", "heart", "joy"],
    ["heart", "spirit", "cheerful", "joy", "emotional strength"],
    ["overwhelmed"],
    ["sad", "heavy"]
  ),
  createProverb(
    "Proverbs 15:22",
    "Plans Succeed With Counsel",
    "Plans fail for lack of counsel, but with many advisers they succeed.",
    ["planning", "guidance", "leadership"],
    ["plans", "counsel", "advisers", "success", "decision"],
    ["guidance", "leadership", "money"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 15:23",
    "Right Words at the Right Time",
    "A person finds joy in giving an apt reply—and how good is a timely word!",
    ["speech", "encouragement", "wisdom"],
    ["timely word", "apt reply", "encouragement", "wisdom", "communication"],
    ["relationships", "leadership"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 15:33",
    "Humility Comes Before Honor",
    "Wisdom’s instruction is to fear the Lord, and humility comes before honor.",
    ["humility", "wisdom", "leadership"],
    ["honor", "humility", "instruction", "wisdom", "promotion"],
    ["leadership", "guidance"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 16:3",
    "Commit It to the Lord",
    "Commit to the Lord whatever you do, and he will establish your plans.",
    ["planning", "trust", "guidance"],
    ["commit", "plans", "establish", "work", "direction"],
    ["guidance", "money", "leadership"],
    ["uncertain", "anxious"]
  ),
  createProverb(
    "Proverbs 16:9",
    "God Directs the Steps",
    "In their hearts humans plan their course, but the Lord establishes their steps.",
    ["guidance", "planning", "trust"],
    ["steps", "course", "direction", "planning", "path"],
    ["guidance"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 16:18",
    "Pride Goes Before Destruction",
    "Pride goes before destruction, a haughty spirit before a fall.",
    ["humility", "warning", "leadership"],
    ["pride", "fall", "warning", "humility", "self-awareness"],
    ["leadership", "guidance"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 16:24",
    "Kind Words Heal",
    "Gracious words are a honeycomb, sweet to the soul and healing to the bones.",
    ["speech", "healing", "encouragement"],
    ["gracious", "healing", "sweet", "words", "soul"],
    ["relationships", "overwhelmed", "leadership"],
    ["hurt", "anxious"]
  ),
  createProverb(
    "Proverbs 17:9",
    "Cover Offense Wisely",
    "Whoever would foster love covers over an offense, but whoever repeats the matter separates close friends.",
    ["relationships", "love", "wisdom"],
    ["offense", "repeats", "friendship", "love", "gossip"],
    ["relationships"],
    ["hurt", "angry"]
  ),
  createProverb(
    "Proverbs 17:17",
    "A Friend Loves at All Times",
    "A friend loves at all times, and a brother is born for a time of adversity.",
    ["relationships", "support", "love"],
    ["friend", "adversity", "support", "loyalty", "love"],
    ["relationships", "overwhelmed"],
    ["hurt", "weary"]
  ),
  createProverb(
    "Proverbs 18:10",
    "Run to the Strong Tower",
    "The name of the Lord is a fortified tower; the righteous run to it and are safe.",
    ["trust", "security", "fear"],
    ["safe", "tower", "refuge", "security", "protection"],
    ["fear", "overwhelmed"],
    ["afraid", "anxious"]
  ),
  createProverb(
    "Proverbs 18:13",
    "Listen Before Answering",
    "To answer before listening—that is folly and shame.",
    ["wisdom", "speech", "leadership"],
    ["listen", "answer", "folly", "communication", "discernment"],
    ["relationships", "leadership"],
    ["tense"]
  ),
  createProverb(
    "Proverbs 18:21",
    "Life and Death Are in the Tongue",
    "The tongue has the power of life and death, and those who love it will eat its fruit.",
    ["speech", "power", "relationships"],
    ["tongue", "words", "life", "death", "fruit"],
    ["relationships", "leadership"],
    ["angry", "tense"]
  ),
  createProverb(
    "Proverbs 19:11",
    "Wisdom Slows Down Anger",
    "A person’s wisdom yields patience; it is to one’s glory to overlook an offense.",
    ["patience", "relationships", "wisdom"],
    ["patience", "offense", "anger", "wisdom", "glory"],
    ["relationships", "overwhelmed", "leadership"],
    ["angry", "hurt"]
  ),
  createProverb(
    "Proverbs 19:20",
    "Accept Instruction for the Future",
    "Listen to advice and accept discipline, and at the end you will be counted among the wise.",
    ["instruction", "wisdom", "growth"],
    ["advice", "discipline", "future", "coaching", "wise"],
    ["guidance", "leadership", "motivation"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 20:13",
    "Wake Up and Work",
    "Do not love sleep or you will grow poor; stay awake and you will have food to spare.",
    ["discipline", "work", "money"],
    ["sleep", "awake", "effort", "poverty", "provision"],
    ["motivation", "money"],
    ["stuck"]
  ),
  createProverb(
    "Proverbs 20:18",
    "Make Plans With Guidance",
    "Plans are established by seeking advice; so if you wage war, obtain guidance.",
    ["planning", "guidance", "counsel"],
    ["plans", "advice", "guidance", "strategy", "counsel"],
    ["guidance", "leadership"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 21:5",
    "Steady Planning Wins",
    "The plans of the diligent lead to profit as surely as haste leads to poverty.",
    ["planning", "money", "diligence"],
    ["diligent", "profit", "haste", "poverty", "planning"],
    ["money", "motivation", "leadership"],
    ["worried", "stuck"]
  ),
  createProverb(
    "Proverbs 21:23",
    "Guard Your Mouth",
    "Those who guard their mouths and their tongues keep themselves from calamity.",
    ["speech", "wisdom", "self-control"],
    ["mouth", "tongue", "guard", "self-control", "calamity"],
    ["relationships", "leadership"],
    ["angry", "tense"]
  ),
  createProverb(
    "Proverbs 22:1",
    "A Good Name Is Better",
    "A good name is more desirable than great riches; to be esteemed is better than silver or gold.",
    ["integrity", "money", "character"],
    ["good name", "reputation", "riches", "esteem", "character"],
    ["money", "leadership"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 22:6",
    "Train the Right Way Early",
    "Start children off on the way they should go, and even when they are old they will not turn from it.",
    ["training", "guidance", "legacy"],
    ["train", "children", "way", "legacy", "formation"],
    ["guidance", "leadership"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 22:29",
    "Skill Opens Doors",
    "Do you see someone skilled in their work? They will serve before kings; they will not serve before officials of low rank.",
    ["work", "excellence", "favor"],
    ["skilled", "work", "excellence", "promotion", "favor"],
    ["motivation", "money", "leadership"],
    ["stuck"]
  ),
  createProverb(
    "Proverbs 24:3-4",
    "Build With Wisdom",
    "By wisdom a house is built, and through understanding it is established; through knowledge its rooms are filled with rare and beautiful treasures.",
    ["wisdom", "building", "success"],
    ["build", "understanding", "knowledge", "established", "treasures"],
    ["guidance", "money", "leadership"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 24:10",
    "Don’t Collapse Under Pressure",
    "If you falter in a time of trouble, how small is your strength!",
    ["strength", "trouble", "resilience"],
    ["trouble", "strength", "pressure", "resilience", "endurance"],
    ["overwhelmed", "fear"],
    ["pressured", "weary"]
  ),
  createProverb(
    "Proverbs 24:16",
    "Get Up Again",
    "For though the righteous fall seven times, they rise again, but the wicked stumble when calamity strikes.",
    ["resilience", "hope", "perseverance"],
    ["rise again", "fall", "resilience", "comeback", "perseverance"],
    ["overwhelmed", "motivation"],
    ["discouraged", "weary"]
  ),
  createProverb(
    "Proverbs 27:17",
    "Sharpen One Another",
    "As iron sharpens iron, so one person sharpens another.",
    ["relationships", "growth", "leadership"],
    ["iron sharpens iron", "growth", "challenge", "friendship", "development"],
    ["leadership", "relationships"],
    ["stuck"]
  ),
  createProverb(
    "Proverbs 27:23",
    "Know the State of Your Flocks",
    "Be sure you know the condition of your flocks, give careful attention to your herds.",
    ["stewardship", "leadership", "planning"],
    ["condition", "attention", "oversight", "stewardship", "management"],
    ["money", "leadership"],
    ["uncertain"]
  ),
  createProverb(
    "Proverbs 28:13",
    "Don’t Hide It",
    "Whoever conceals their sins does not prosper, but the one who confesses and renounces them finds mercy.",
    ["integrity", "mercy", "freedom"],
    ["conceal", "confess", "mercy", "freedom", "honesty"],
    ["guidance", "leadership"],
    ["ashamed"]
  ),
  createProverb(
    "Proverbs 28:20",
    "Faithful Beats Fast",
    "A faithful person will be richly blessed, but one eager to get rich will not go unpunished.",
    ["money", "faithfulness", "character"],
    ["faithful", "rich", "blessed", "patience", "integrity"],
    ["money", "motivation"],
    ["worried"]
  ),
  createProverb(
    "Proverbs 29:11",
    "Restrain the Emotion",
    "Fools give full vent to their rage, but the wise bring calm in the end.",
    ["self-control", "anger", "wisdom"],
    ["rage", "calm", "self-control", "emotion", "wisdom"],
    ["relationships", "overwhelmed", "leadership"],
    ["angry", "pressured"]
  ),
  createProverb(
    "Proverbs 29:18",
    "Vision Matters",
    "Where there is no vision, the people perish: but he that keepeth the law, happy is he.",
    ["vision", "leadership", "direction"],
    ["vision", "direction", "purpose", "clarity", "leadership"],
    ["guidance", "leadership", "motivation"],
    ["uncertain", "stuck"]
  ),
  createProverb(
    "Proverbs 31:25",
    "Strength and Dignity",
    "She is clothed with strength and dignity; she can laugh at the days to come.",
    ["strength", "confidence", "future"],
    ["strength", "dignity", "future", "confidence", "courage"],
    ["fear", "overwhelmed"],
    ["afraid", "anxious"]
  ),
];

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(" ")
    .filter((word) => word.length > 0 && !STOP_WORDS.has(word));
}

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function scorePhraseMatch(query: string, candidate: string): number {
  if (!query || !candidate) return 0;

  const q = normalizeText(query);
  const c = normalizeText(candidate);

  if (!q || !c) return 0;
  if (c.includes(q)) return 14;

  return 0;
}

const PHRASE_INTENT_MAP: Array<{
  phrases: string[];
  topics: string[];
  keywords: string[];
  moods: string[];
  intents: string[];
}> = [
  {
    phrases: ["i am angry", "im angry", "i'm angry", "mad", "furious", "offended", "irritated"],
    topics: ["speech", "relationships", "patience", "self-control"],
    keywords: ["anger", "wrath", "gentle", "harsh", "patience", "offense", "calm", "tongue"],
    moods: ["angry", "tense", "hurt", "pressured"],
    intents: ["relationships"],
  },
  {
    phrases: ["i feel overwhelmed", "overwhelmed", "stressed", "anxious", "i cant keep up", "i can't keep up"],
    topics: ["anxiety", "heart", "trust", "encouragement"],
    keywords: ["anxiety", "heart", "peace", "trust", "strength", "kind word"],
    moods: ["anxious", "heavy", "drained", "weary"],
    intents: ["overwhelmed", "fear"],
  },
  {
    phrases: ["i need guidance", "direction", "what should i do", "what do i do", "next step", "confused"],
    topics: ["guidance", "planning", "wisdom"],
    keywords: ["wisdom", "path", "steps", "counsel", "understanding", "instruction"],
    moods: ["uncertain", "confused"],
    intents: ["guidance"],
  },
  {
    phrases: ["worried about money", "money problems", "bills", "debt", "broke", "financial stress"],
    topics: ["money", "planning", "diligence"],
    keywords: ["wealth", "profit", "poverty", "planning", "diligence", "provision"],
    moods: ["worried", "stuck"],
    intents: ["money"],
  },
  {
    phrases: ["i feel like giving up", "discouraged", "hopeless", "want to quit"],
    topics: ["resilience", "hope", "encouragement"],
    keywords: ["rise again", "hope", "strength", "perseverance", "heart"],
    moods: ["discouraged", "weary"],
    intents: ["overwhelmed", "motivation"],
  },
];

function detectIntentGroups(query: string) {
  const q = normalizeText(query);

  return INTENT_GROUPS.filter((group) =>
    group.triggers.some((trigger) => q.includes(normalizeText(trigger)))
  );
}

function detectPhraseMapping(query: string) {
  const q = normalizeText(query);

  return PHRASE_INTENT_MAP.filter((entry) =>
    entry.phrases.some((phrase) => q.includes(normalizeText(phrase)))
  );
}

function includesNormalized(list: string[] | undefined, value: string): boolean {
  if (!list || list.length === 0) return false;
  const v = normalizeText(value);
  return list.map(normalizeText).includes(v);
}

function countTokenHits(item: ProverbEntry, tokens: string[]): number {
  const fields = [
    item.title,
    item.body,
    item.text,
    item.ref,
    ...item.topics,
    ...(item.keywords ?? []),
    ...(item.intentTags ?? []),
    ...(item.moodTags ?? []),
  ].map(normalizeText);

  let hits = 0;

  for (const token of tokens) {
    for (const field of fields) {
      if (field === token) {
        hits += 2;
      } else if (field.includes(token)) {
        hits += 1;
      }
    }
  }

  return hits;
}

function scoreItem(item: ProverbEntry, query: string): number {
  const q = normalizeText(query);
  const tokens = unique(tokenize(query));
  const matchedIntents = detectIntentGroups(query); 
    const phraseMappings = detectPhraseMapping(query);
  const clusterRefs = getClusterRefs(query);
  
  const titleN = normalizeText(item.title);
  const bodyN = normalizeText(item.body);
  const textN = normalizeText(item.text);
  const topicsN = item.topics.map(normalizeText);
  const keywordsN = (item.keywords ?? []).map(normalizeText);
  const intentsN = (item.intentTags ?? []).map(normalizeText);
  const moodsN = (item.moodTags ?? []).map(normalizeText);

  let score = 0;

  // Strong direct phrase matching
  score += scorePhraseMatch(query, item.title);
  score += scorePhraseMatch(query, item.body);

  // Basic token matching
  for (const token of tokens) {
    if (titleN.includes(token)) score += 5;
    if (bodyN.includes(token)) score += 3;
    if (textN.includes(token)) score += 2;
    if (topicsN.includes(token)) score += 8;
    if (keywordsN.includes(token)) score += 10;
    if (intentsN.includes(token)) score += 11;
    if (moodsN.includes(token)) score += 9;
  }

  // Intent-group boosts
  for (const intent of matchedIntents) {
    const intentName = normalizeText(intent.name);

    if (intentsN.includes(intentName)) score += 24;

    for (const boost of intent.boosts) {
      const b = normalizeText(boost);

      if (titleN.includes(b)) score += 7;
      if (bodyN.includes(b)) score += 6;
      if (topicsN.includes(b)) score += 10;
      if (keywordsN.includes(b)) score += 11;
      if (moodsN.includes(b)) score += 8;
    }
  }

  // Phrase interpreter boosts
  for (const mapping of phraseMappings) {
    for (const topic of mapping.topics) {
      if (includesNormalized(item.topics, topic)) score += 18;
    }

    for (const keyword of mapping.keywords) {
      if (includesNormalized(item.keywords, keyword)) score += 20;
      if (titleN.includes(normalizeText(keyword))) score += 8;
      if (bodyN.includes(normalizeText(keyword))) score += 7;
    }

    for (const mood of mapping.moods) {
      if (includesNormalized(item.moodTags, mood)) score += 16;
    }

    for (const intent of mapping.intents) {
      if (includesNormalized(item.intentTags, intent)) score += 18;
    }
  }

  // Specific anger prioritization
  if (
    q.includes("angry") ||
    q.includes("mad") ||
    q.includes("offended") ||
    q.includes("furious") ||
    q.includes("wrath")
  ) {
    if (topicsN.includes("self control")) score += 22;
    if (topicsN.includes("speech")) score += 18;
    if (topicsN.includes("patience")) score += 18;
    if (keywordsN.includes("anger")) score += 20;
    if (keywordsN.includes("wrath")) score += 20;
    if (keywordsN.includes("gentle")) score += 16;
    if (keywordsN.includes("harsh")) score += 14;
    if (keywordsN.includes("offense")) score += 15;
    if (moodsN.includes("angry")) score += 18;
    if (moodsN.includes("tense")) score += 10;

    if (item.ref === "Proverbs 15:1") score += 40;
    if (item.ref === "Proverbs 14:29") score += 36;
    if (item.ref === "Proverbs 19:11") score += 34;
    if (item.ref === "Proverbs 29:11") score += 32;
    if (item.ref === "Proverbs 12:18") score += 28;
    if (item.ref === "Proverbs 21:23") score += 24;
    if (item.ref === "Proverbs 10:19") score += 22;
  }

  // Specific overwhelm prioritization
  if (
    q.includes("overwhelmed") ||
    q.includes("stressed") ||
    q.includes("anxious") ||
    q.includes("heavy") ||
    q.includes("drained")
  ) {
    if (item.ref === "Proverbs 12:25") score += 42;
    if (item.ref === "Proverbs 3:5-6") score += 30;
    if (item.ref === "Proverbs 4:23") score += 24;
    if (item.ref === "Proverbs 24:10") score += 20;
    if (item.ref === "Proverbs 31:25") score += 16;
  }

  // Specific guidance prioritization
  if (
    q.includes("guidance") ||
    q.includes("direction") ||
    q.includes("what should i do") ||
    q.includes("next step") ||
    q.includes("confused")
  ) {
    if (item.ref === "Proverbs 3:5-6") score += 42;
    if (item.ref === "Proverbs 16:3") score += 28;
    if (item.ref === "Proverbs 16:9") score += 26;
    if (item.ref === "Proverbs 11:14") score += 24;
    if (item.ref === "Proverbs 15:22") score += 22;
    if (item.ref === "Proverbs 20:18") score += 22;
    if (item.ref === "Proverbs 4:7") score += 18;
  }

  // Specific money prioritization
  if (
    q.includes("money") ||
    q.includes("debt") ||
    q.includes("bills") ||
    q.includes("financial") ||
    q.includes("broke")
  ) {
    if (item.ref === "Proverbs 21:5") score += 38;
    if (item.ref === "Proverbs 10:4") score += 30;
    if (item.ref === "Proverbs 14:23") score += 28;
    if (item.ref === "Proverbs 3:9-10") score += 22;
    if (item.ref === "Proverbs 28:20") score += 20;
    if (item.ref === "Proverbs 22:1") score += 16;
  }

  // Small penalty so vague matches do not outrank true intent matches
  const tokenHits = countTokenHits(item, tokens);
  if (phraseMappings.length > 0 || matchedIntents.length > 0) {
    if (tokenHits <= 1) score -= 6;
  }

  if (
    query.includes("i am angry") ||
    query.includes("im angry") ||
    query.includes("i m angry") ||
    query.includes("i'm angry") ||
    query.includes("mad at someone") ||
    query.includes("i am mad") ||
    query.includes("im mad")
  ) {
    return "anger patience gentle answer self-control offense";
  }

  if (
    query.includes("i feel overwhelmed") ||
    query.includes("overwhelmed") ||
    query.includes("stressed") ||
    query.includes("anxious") ||
    query.includes("too much") ||
    query.includes("cant keep up") ||
    query.includes("can't keep up") ||
    query.includes("drained")
  ) {
    return "overwhelmed anxiety heart trust peace strength";
  }

  if (
    query.includes("i need guidance") ||
    query.includes("what should i do") ||
    query.includes("what do i do") ||
    query.includes("next step") ||
    query.includes("direction") ||
    query.includes("confused") ||
    query.includes("unsure")
  ) {
    return "guidance wisdom path steps counsel understanding";
  }

  if (
    query.includes("money problems") ||
    query.includes("worried about money") ||
    query.includes("financial stress") ||
    query.includes("debt") ||
    query.includes("bills") ||
    query.includes("broke")
  ) {
    return "money diligence planning wealth provision profit poverty";
  }

  if (
    query.includes("i feel like giving up") ||
    query.includes("discouraged") ||
    query.includes("hopeless") ||
    query.includes("want to quit") ||
    query.includes("feel defeated")
  ) {
    return "discouraged hope resilience rise again perseverance strength";
  }

  return q;
}

export function searchProverbs(q: string): ProverbEntry[] {
const query = normalizeUserQuery(q.trim());
  if (!query) return PROVERBS;

  const scored: ScoredResult[] = PROVERBS.map((item) => ({
    item,
    score: scoreItem(item, query),
  }));

  const ranked = scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.item.ref.localeCompare(b.item.ref);
    })
    .map((entry) => entry.item);

  if (ranked.length === 0) {
    return PROVERBS.filter((p) =>
      [
        "Proverbs 3:5-6",
        "Proverbs 4:23",
        "Proverbs 12:25",
        "Proverbs 15:1",
        "Proverbs 16:3",
        "Proverbs 24:16",
      ].includes(p.ref)
    );
  }

  return ranked;
}
