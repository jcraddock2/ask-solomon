// app/lib/proverbs.ts

export type ProverbEntry = {
  ref: string;
  title: string;
  body: string;
  text: string;
  topics: string[];
  keywords?: string[];
  intentTags?: string[];
  moodTags?: string[];
};

type ScoredResult = {
  item: ProverbEntry;
  score: number;
};

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

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text).split(" ").filter(Boolean);
}

const INTENT_MAP: Record<string, string[]> = {
  overwhelmed: [
    "overwhelmed",
    "stressed",
    "pressure",
    "burdened",
    "heavy",
    "too much",
    "mental load",
  ],
  guidance: [
    "guidance",
    "direction",
    "clarity",
    "decision",
    "next step",
    "discernment",
    "which way",
    "what should i do",
    "lost",
    "confused",
    "uncertain",
  ],
  money: [
    "money",
    "finances",
    "debt",
    "bills",
    "wealth",
    "provision",
    "lack",
    "income",
    "prosperity",
    "poor",
  ],
  fear: [
    "fear",
    "afraid",
    "panic",
    "worried",
    "scared",
    "anxious",
    "anxiety",
    "nervous",
  ],
  wisdom: [
    "wisdom",
    "understanding",
    "insight",
    "knowledge",
    "discernment",
    "wise",
  ],
  discipline: [
    "discipline",
    "lazy",
    "focus",
    "self control",
    "consistency",
    "diligence",
    "motivation",
  ],
  relationships: [
    "relationship",
    "friend",
    "conflict",
    "marriage",
    "peace",
    "people",
    "argument",
    "strife",
    "wife",
    "husband",
  ],
  pride: [
    "pride",
    "ego",
    "humility",
    "arrogance",
    "teachable",
    "correction",
    "wise in my own eyes",
  ],
  anger: [
    "anger",
    "angry",
    "offended",
    "temper",
    "rage",
    "frustrated",
    "mad",
  ],
  health: [
    "health",
    "healing",
    "body",
    "bones",
    "strength",
    "life",
    "energy",
    "wellness",
  ],
  success: [
    "success",
    "prosper",
    "prosperity",
    "favor",
    "promotion",
    "victory",
    "fruitful",
    "increase",
  ],
  protection: [
    "protection",
    "safety",
    "secure",
    "guard",
    "shield",
    "refuge",
    "deliverance",
    "covering",
  ],
  trust: [
    "trust",
    "faith",
    "depend on god",
    "lean not",
    "submit",
    "surrender",
  ],
  peace: [
    "peace",
    "calm",
    "rest",
    "quiet",
    "stillness",
    "settled",
  ],
  encouragement: [
    "encouragement",
    "hope",
    "strength",
    "weary",
    "tired",
    "discouraged",
    "giving up",
  ],
};

function detectIntent(query: string): string[] {
  const q = normalize(query);
  const matched = new Set<string>();

  for (const [intent, synonyms] of Object.entries(INTENT_MAP)) {
    for (const synonym of synonyms) {
      if (q.includes(normalize(synonym))) {
        matched.add(intent);
      }
    }
  }

  return Array.from(matched);
}

function expandQuery(query: string): string[] {
  const q = normalize(query);
  const tokens = new Set<string>(tokenize(q));

  for (const detected of detectIntent(q)) {
    tokens.add(detected);

    for (const synonym of INTENT_MAP[detected] || []) {
      tokens.add(normalize(synonym));
    }
  }

  return Array.from(tokens);
}

function scoreItem(item: ProverbEntry, query: string): number {
  const expanded = expandQuery(query);
  if (expanded.length === 0) return 0;

  let score = 0;

  const refText = normalize(item.ref);
  const titleText = normalize(item.title);
  const bodyText = normalize(item.body);
  const topicsText = (item.topics || []).map(normalize);
  const keywordsText = (item.keywords || []).map(normalize);
  const intentTagsText = (item.intentTags || []).map(normalize);
  const moodTagsText = (item.moodTags || []).map(normalize);

  const haystack = [
    refText,
    titleText,
    bodyText,
    ...topicsText,
    ...keywordsText,
    ...intentTagsText,
    ...moodTagsText,
  ].join(" ");

  for (const token of expanded) {
    if (!token) continue;

    if (refText.includes(token)) score += 10;
    if (titleText.includes(token)) score += 9;
    if (bodyText.includes(token)) score += 6;
    if (topicsText.some((t) => t.includes(token))) score += 8;
    if (keywordsText.some((k) => k.includes(token))) score += 7;
   if (intentTagsText.some((i) => i.includes(token))) score += 14;
    if (moodTagsText.some((m) => m.includes(token))) score += 12;
    if (haystack.includes(token)) score += 1;
  }

  const detectedTopics = detectIntent(query);

  for (const topic of detectedTopics) {
    if (topicsText.includes(topic)) score += 12;
    if (intentTagsText.includes(topic)) score += 14;
    if (keywordsText.includes(topic)) score += 8;
    if (moodTagsText.includes(topic)) score += 7;
  }

  return score;
}
type IntentResult = {
  tags: string[];
  moods: string[];
};

export function detectIntent(query: string): IntentResult {
  const q = query.toLowerCase();

  const tags: string[] = [];
  const moods: string[] = [];

  if (
    q.includes("overwhelmed") ||
    q.includes("too much") ||
    q.includes("stress") ||
    q.includes("pressure") ||
    q.includes("anxious")
  ) {
    tags.push("peace", "guidance", "trust");
    moods.push("overwhelmed", "anxious", "afraid");
  }

  if (
    q.includes("direction") ||
    q.includes("what should i do") ||
    q.includes("decision")
  ) {
    tags.push("guidance", "wisdom");
    moods.push("seeking", "uncertain");
  }

  if (
    q.includes("money") ||
    q.includes("finances") ||
    q.includes("debt")
  ) {
    tags.push("money", "wisdom", "discipline");
    moods.push("worried", "uncertain");
  }

  if (
    q.includes("relationship") ||
    q.includes("marriage") ||
    q.includes("conflict")
  ) {
    tags.push("relationships", "wisdom", "peace");
    moods.push("hurt", "frustrated");
  }

  if (
    q.includes("discouraged") ||
    q.includes("tired") ||
    q.includes("hopeless")
  ) {
    tags.push("hope", "strength");
    moods.push("discouraged", "weary");
  }

  return { tags, moods };
}
export function searchProverbs(query: string, limit = 12): ProverbEntry[] {
  const q = query.toLowerCase().trim();

  if (!q) return PROVERBS.slice(0, limit);

  const intent = detectIntent(q);

  const scored = PROVERBS.map((item) => {
    let score = 0;

    const text = item.text.toLowerCase();
    const title = item.title.toLowerCase();

    // direct query match
    if (text.includes(q)) score += 5;
    if (title.includes(q)) score += 4;

    // word-level matching
    const words = q.split(/\s+/).filter(Boolean);
    for (const word of words) {
      if (text.includes(word)) score += 2;
      if (title.includes(word)) score += 2;

      for (const kw of item.keywords || []) {
        if (kw.toLowerCase().includes(word) || word.includes(kw.toLowerCase())) {
          score += 3;
        }
      }

      for (const topic of item.topics || []) {
        if (
          topic.toLowerCase().includes(word) ||
          word.includes(topic.toLowerCase())
        ) {
          score += 3;
        }
      }
    }

    // intent tag boosts
    for (const tag of intent.tags) {
      if ((item.intentTags || []).includes(tag)) score += 5;
      if ((item.topics || []).includes(tag)) score += 4;
      if ((item.keywords || []).includes(tag)) score += 4;
    }

    // mood boosts
    for (const mood of intent.moods) {
      if ((item.moodTags || []).includes(mood)) score += 4;
      if ((item.keywords || []).includes(mood)) score += 3;
    }

    return { item, score };
  });

  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.item);
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
        if ((item.topics || []).includes(topic)) score += 3;
      }

      for (const tag of source.intentTags || []) {
        if ((item.intentTags || []).includes(tag)) score += 2;
      }

      for (const mood of source.moodTags || []) {
        if ((item.moodTags || []).includes(mood)) score += 1;
      }

      return { item, score };
    });

  return related
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

export const PROVERBS: ProverbEntry[] = [
  createProverb(
    "Proverbs 1:33",
    "Live in Safety",
    "Whoever listens to me will live in safety and be at ease, without fear of harm.",
    ["safety", "peace", "protection"],
    ["safety", "ease", "fear", "harm", "peace"],
    ["protection", "fear", "guidance"],
    ["afraid", "anxious", "overwhelmed"]
  ),

  createProverb(
    "Proverbs 2:6",
    "Wisdom Comes from God",
    "For the Lord gives wisdom; from his mouth come knowledge and understanding.",
    ["wisdom", "knowledge", "understanding"],
    ["wisdom", "understanding", "knowledge", "God gives"],
    ["wisdom", "guidance"],
    ["uncertain", "seeking"]
  ),

  createProverb(
    "Proverbs 3:5-6",
    "Trust and Direction",
    "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    ["trust", "guidance", "direction", "faith"],
    ["trust", "direction", "clarity", "paths", "understanding"],
    ["guidance", "wisdom"],
    ["uncertain", "overwhelmed", "seeking"]
  ), 

createProverb(
    "Proverbs 3:7-8",
    "Humility Brings Health",
    "Do not be wise in your own eyes; fear the Lord and shun evil. This will bring health to your body and nourishment to your bones.",
       ["humility", "wisdom", "health"],
    ["humble", "correction", "healing", "instruction"],
    ["guidance", "wisdom"],
    ["uncertain", "teachable"]
  ),

  createProverb(
    "Proverbs 3:9-10",
    "Honor Brings Provision",
    "Honour the Lord with thy substance, and with the firstfruits of all thine increase: So shall thy barns be filled with plenty, and thy presses shall burst out with new wine.",
    ["honor", "stewardship", "provision", "wealth"],
    ["giving", "firstfruits", "prosperity", "faithfulness"],
    ["finances", "discipline"],
    ["seeking", "uncertain"]
  ),

  createProverb(
    "Proverbs 3:11-12",
    "Correction Is Love",
    "My son, despise not the chastening of the Lord; neither be weary of his correction: For whom the Lord loveth he correcteth; even as a father the son in whom he delighteth.",
    ["discipline", "growth", "correction"],
    ["rebuke", "training", "character", "instruction"],
    ["wisdom", "guidance"],
    ["frustrated", "confused"]
  ),

  createProverb(
    "Proverbs 3:13-15",
    "Wisdom Is Greater Than Wealth",
    "Happy is the man that findeth wisdom, and the man that getteth understanding. For the merchandise of it is better than the merchandise of silver, and the gain thereof than fine gold. She is more precious than rubies: and all the things thou canst desire are not to be compared unto her.",
    ["wisdom", "understanding", "value"],
    ["riches", "gold", "silver", "precious", "gain"],
    ["wisdom", "finances"],
    ["seeking", "ambitious"]
  ),

  createProverb(
    "Proverbs 3:16-18",
    "Wisdom Brings Life and Peace",
    "Length of days is in her right hand; and in her left hand riches and honour. Her ways are ways of pleasantness, and all her paths are peace. She is a tree of life to them that lay hold upon her: and happy is every one that retaineth her.",
    ["peace", "wisdom", "life", "blessing"],
    ["riches", "honor", "pleasantness", "paths", "joy"],
    ["guidance", "encouragement"],
    ["anxious", "weary"]
  ),

  createProverb(
    "Proverbs 3:19-20",
    "God Built the World With Wisdom",
    "The Lord by wisdom hath founded the earth; by understanding hath he established the heavens. By his knowledge the depths are broken up, and the clouds drop down the dew.",
    ["wisdom", "creation", "understanding"],
    ["founded", "knowledge", "earth", "heavens"],
    ["wisdom", "awe"],
    ["uncertain", "reflective"]
  ), 
    createProverb(
    "Proverbs 3:21-22",
    "Guard Wisdom and Discretion",
    "My son, let not them depart from thine eyes: keep sound wisdom and discretion: So shall they be life unto thy soul, and grace to thy neck.",
    ["wisdom", "discernment", "guidance"],
    ["discretion", "understanding", "clarity"],
    ["wisdom", "guidance"],
    ["uncertain", "seeking"]
  ),

  createProverb(
    "Proverbs 3:23-24",
    "Security and Rest",
    "Then shalt thou walk in thy way safely, and thy foot shall not stumble. When thou liest down, thou shalt not be afraid: yea, thou shalt lie down, and thy sleep shall be sweet.",
    ["peace", "security", "rest"],
    ["safety", "sleep", "confidence"],
    ["encouragement", "guidance"],
    ["anxious", "afraid"]
  ),

  createProverb(
    "Proverbs 3:25-26",
    "Confidence in the Lord",
    "Be not afraid of sudden fear, neither of the desolation of the wicked, when it cometh. For the Lord shall be thy confidence, and shall keep thy foot from being taken.",
    ["confidence", "faith", "protection"],
    ["fear", "trust", "security"],
    ["encouragement", "faith"],
    ["afraid", "worried"]
  ),

  createProverb(
    "Proverbs 3:27-28",
    "Do Good Without Delay",
    "Withhold not good from them to whom it is due, when it is in the power of thine hand to do it. Say not unto thy neighbour, Go, and come again, and tomorrow I will give; when thou hast it by thee.",
    ["generosity", "integrity", "kindness"],
    ["giving", "helping", "neighbor"],
    ["service", "character"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 3:29-30",
    "Avoid Harm and Conflict",
    "Devise not evil against thy neighbour, seeing he dwelleth securely by thee. Strive not with a man without cause, if he have done thee no harm.",
    ["peace", "integrity", "relationships"],
    ["conflict", "anger", "neighbor"],
    ["relationships", "wisdom"],
    ["angry", "frustrated"]
  ), 
    createProverb(
    "Proverbs 3:31-32",
    "Do Not Envy the Violent",
    "Envy thou not the oppressor, and choose none of his ways. For the froward is abomination to the Lord: but his secret is with the righteous.",
    ["integrity", "righteousness", "character"],
    ["envy", "oppression", "justice"],
    ["wisdom", "guidance"],
    ["tempted", "conflicted"]
  ),

  createProverb(
    "Proverbs 3:33-34",
    "God Favors the Humble",
    "The curse of the Lord is in the house of the wicked: but he blesseth the habitation of the just. Surely he scorneth the scorners: but he giveth grace unto the lowly.",
    ["humility", "justice", "blessing"],
    ["grace", "wickedness", "character"],
    ["wisdom", "faith"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 3:35",
    "Wisdom Brings Honor",
    "The wise shall inherit glory: but shame shall be the promotion of fools.",
    ["wisdom", "honor", "legacy"],
    ["glory", "shame", "character"],
    ["wisdom"],
    ["motivated", "reflective"]
  ),
    createProverb(
    "Proverbs 4:1-4",
    "Hold Fast to Wise Instruction",
    "Hear, ye children, the instruction of a father, and attend to know understanding. For I give you good doctrine, forsake ye not my law. For I was my father's son, tender and only beloved in the sight of my mother. He taught me also, and said unto me, Let thine heart retain my words: keep my commandments, and live.",
    ["instruction", "wisdom", "teaching"],
    ["father", "understanding", "commandments", "live"],
    ["wisdom", "guidance"],
    ["teachable", "seeking"]
  ),

  createProverb(
    "Proverbs 4:5-6",
    "Get Wisdom",
    "Get wisdom, get understanding: forget it not; neither decline from the words of my mouth. Forsake her not, and she shall preserve thee: love her, and she shall keep thee.",
    ["wisdom", "understanding", "guidance"],
    ["learn", "preserve", "keep", "direction"],
    ["wisdom", "guidance"],
    ["uncertain", "seeking"]
  ),

  createProverb(
    "Proverbs 4:7",
    "Wisdom Is the Principal Thing",
    "Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.",
    ["wisdom", "priority", "understanding"],
    ["principal", "focus", "clarity", "discernment"],
    ["wisdom", "direction"],
    ["ambitious", "seeking"]
  ),

  createProverb(
    "Proverbs 4:8-9",
    "Exalt Wisdom and She Will Honor You",
    "Exalt her, and she shall promote thee: she shall bring thee to honour, when thou dost embrace her. She shall give to thine head an ornament of grace: a crown of glory shall she deliver to thee.",
    ["wisdom", "honor", "promotion"],
    ["grace", "glory", "embrace", "elevation"],
    ["wisdom", "success"],
    ["motivated", "hopeful"]
  ),

  createProverb(
    "Proverbs 4:10-13",
    "Stay on the Path of Life",
    "Hear, O my son, and receive my sayings; and the years of thy life shall be many. I have taught thee in the way of wisdom; I have led thee in right paths. When thou goest, thy steps shall not be straitened; and when thou runnest, thou shalt not stumble. Take fast hold of instruction; let her not go: keep her; for she is thy life.",
    ["guidance", "wisdom", "life", "direction"],
    ["paths", "instruction", "steps", "stumble"],
    ["guidance", "encouragement"],
    ["uncertain", "determined"]
  ),
    createProverb(
    "Proverbs 4:14-17",
    "Avoid the Path of the Wicked",
    "Enter not into the path of the wicked, and go not in the way of evil men. Avoid it, pass not by it, turn from it, and pass away. For they sleep not, except they have done mischief; and their sleep is taken away, unless they cause some to fall. For they eat the bread of wickedness, and drink the wine of violence.",
    ["integrity", "discernment", "character"],
    ["avoid evil", "temptation", "wickedness", "violence"],
    ["guidance", "wisdom"],
    ["tempted", "conflicted"]
  ),

  createProverb(
    "Proverbs 4:18-19",
    "The Path of the Righteous",
    "But the path of the just is as the shining light, that shineth more and more unto the perfect day. The way of the wicked is as darkness: they know not at what they stumble.",
    ["righteousness", "growth", "direction"],
    ["light", "darkness", "progress", "clarity"],
    ["encouragement", "wisdom"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 4:20-22",
    "Wisdom Brings Life and Health",
    "My son, attend to my words; incline thine ear unto my sayings. Let them not depart from thine eyes; keep them in the midst of thine heart. For they are life unto those that find them, and health to all their flesh.",
    ["wisdom", "health", "life"],
    ["healing", "heart", "words", "instruction"],
    ["encouragement", "guidance"],
    ["weary", "seeking"]
  ),
    createProverb(
    "Proverbs 4:23",
    "Guard Your Heart",
    "Keep thy heart with all diligence; for out of it are the issues of life.",
    ["heart", "character", "self-control"],
    ["guard", "mindset", "inner life", "discipline"],
    ["guidance", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 4:24-27",
    "Stay Focused on the Right Path",
    "Put away from thee a froward mouth, and perverse lips put far from thee. Let thine eyes look right on, and let thine eyelids look straight before thee. Ponder the path of thy feet, and let all thy ways be established. Turn not to the right hand nor to the left: remove thy foot from evil.",
    ["focus", "discipline", "integrity"],
    ["speech", "direction", "decisions", "path"],
    ["guidance", "wisdom"],
    ["determined", "seeking"]
  ),
    createProverb(
    "Proverbs 5:1-2",
    "Pay Attention to Wisdom",
    "My son, attend unto my wisdom, and bow thine ear to my understanding: That thou mayest regard discretion, and that thy lips may keep knowledge.",
    ["wisdom", "attention", "discernment"],
    ["listen", "learning", "knowledge", "understanding"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 5:3-6",
    "The Danger of Seduction",
    "For the lips of a strange woman drop as an honeycomb, and her mouth is smoother than oil: But her end is bitter as wormwood, sharp as a two-edged sword. Her feet go down to death; her steps take hold on hell. Lest thou shouldest ponder the path of life, her ways are moveable, that thou canst not know them.",
    ["temptation", "discernment", "consequences"],
    ["seduction", "deception", "danger", "warning"],
    ["wisdom", "guidance"],
    ["tempted", "uncertain"]
  ),

  createProverb(
    "Proverbs 5:7-8",
    "Stay Far From Temptation",
    "Hear me now therefore, O ye children, and depart not from the words of my mouth. Remove thy way far from her, and come not nigh the door of her house.",
    ["discipline", "self-control", "boundaries"],
    ["avoid", "temptation", "distance", "wisdom"],
    ["guidance", "wisdom"],
    ["tempted", "struggling"]
  ),

  createProverb(
    "Proverbs 5:9-11",
    "The Cost of Poor Choices",
    "Lest thou give thine honour unto others, and thy years unto the cruel: Lest strangers be filled with thy wealth; and thy labours be in the house of a stranger; And thou mourn at the last, when thy flesh and thy body are consumed.",
    ["consequences", "integrity", "discipline"],
    ["regret", "loss", "honor", "choices"],
    ["wisdom", "guidance"],
    ["regretful", "convicted"]
  ),
  
    createProverb(
    "Proverbs 5:12-14",
    "The Regret of Ignoring Wisdom",
    "And say, How have I hated instruction, and my heart despised reproof; And have not obeyed the voice of my teachers, nor inclined mine ear to them that instructed me! I was almost in all evil in the midst of the congregation and assembly.",
    ["regret", "correction", "learning"],
    ["instruction", "teachers", "reproof", "mistakes"],
    ["wisdom", "guidance"],
    ["regretful", "reflective"]
  ),

  createProverb(
    "Proverbs 5:15-18",
    "Rejoice in Faithfulness",
    "Drink waters out of thine own cistern, and running waters out of thine own well. Let thy fountains be dispersed abroad, and rivers of waters in the streets. Let them be only thine own, and not strangers' with thee. Let thy fountain be blessed: and rejoice with the wife of thy youth.",
    ["faithfulness", "relationships", "commitment"],
    ["marriage", "loyalty", "joy", "blessing"],
    ["relationships", "wisdom"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 5:19-20",
    "Value Your Marriage",
    "Let her be as the loving hind and pleasant roe; let her breasts satisfy thee at all times; and be thou ravished always with her love. And why wilt thou, my son, be ravished with a strange woman, and embrace the bosom of a stranger?",
    ["love", "commitment", "relationships"],
    ["marriage", "loyalty", "devotion"],
    ["relationships", "guidance"],
    ["tempted", "reflective"]
  ),

  createProverb(
    "Proverbs 5:21-23",
    "God Sees Every Path",
    "For the ways of man are before the eyes of the Lord, and he pondereth all his goings. His own iniquities shall take the wicked himself, and he shall be holden with the cords of his sins. He shall die without instruction; and in the greatness of his folly he shall go astray.",
    ["accountability", "choices", "consequences"],
    ["God sees", "paths", "sin", "direction"],
    ["wisdom", "guidance"],
    ["convicted", "reflective"]
  ), 

    createProverb(
    "Proverbs 6:1-5",
    "Free Yourself From Bad Agreements",
    "My son, if thou be surety for thy friend, if thou hast stricken thy hand with a stranger, Thou art snared with the words of thy mouth, thou art taken with the words of thy mouth. Do this now, my son, and deliver thyself… go, humble thyself, and make sure thy friend. Give not sleep to thine eyes, nor slumber to thine eyelids. Deliver thyself as a roe from the hand of the hunter.",
    ["wisdom", "responsibility", "financial caution"],
    ["agreements", "debt", "commitment", "prudence"],
    ["guidance", "wisdom"],
    ["worried", "uncertain"]
  ),

  createProverb(
    "Proverbs 6:6-8",
    "Learn From the Ant",
    "Go to the ant, thou sluggard; consider her ways, and be wise: Which having no guide, overseer, or ruler, Provideth her meat in the summer, and gathereth her food in the harvest.",
    ["diligence", "work", "preparation"],
    ["discipline", "planning", "effort"],
    ["motivation", "wisdom"],
    ["lazy", "unmotivated"]
  ),

  createProverb(
    "Proverbs 6:9-11",
    "Laziness Brings Poverty",
    "How long wilt thou sleep, O sluggard? when wilt thou arise out of thy sleep? Yet a little sleep, a little slumber, a little folding of the hands to sleep: So shall thy poverty come as one that travelleth, and thy want as an armed man.",
    ["discipline", "work", "responsibility"],
    ["laziness", "poverty", "effort", "wake up"],
    ["motivation", "wisdom"],
    ["lazy", "unmotivated"]
  ),

    createProverb(
    "Proverbs 6:12-15",
    "The Trouble Maker",
    "A naughty person, a wicked man, walketh with a froward mouth. He winketh with his eyes, he speaketh with his feet, he teacheth with his fingers; Frowardness is in his heart, he deviseth mischief continually; he soweth discord. Therefore shall his calamity come suddenly; suddenly shall he be broken without remedy.",
    ["character", "integrity", "warning"],
    ["troublemaker", "deceit", "discord", "mischief"],
    ["wisdom", "discernment"],
    ["conflicted", "reflective"]
  ),

  createProverb(
    "Proverbs 6:16-19",
    "Seven Things God Hates",
    "These six things doth the Lord hate: yea, seven are an abomination unto him: A proud look, a lying tongue, and hands that shed innocent blood, An heart that deviseth wicked imaginations, feet that be swift in running to mischief, A false witness that speaketh lies, and he that soweth discord among brethren.",
    ["character", "integrity", "justice"],
    ["pride", "lying", "violence", "discord"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 6:20-23",
    "Keep Wisdom Close",
    "My son, keep thy father's commandment, and forsake not the law of thy mother: Bind them continually upon thine heart, and tie them about thy neck. When thou goest, it shall lead thee; when thou sleepest, it shall keep thee; and when thou awakest, it shall talk with thee. For the commandment is a lamp; and the law is light.",
    ["guidance", "wisdom", "instruction"],
    ["light", "direction", "teaching", "commandment"],
    ["guidance", "encouragement"],
    ["seeking", "uncertain"]
  ),

    createProverb(
    "Proverbs 6:24-26",
    "Guard Yourself From Seduction",
    "To keep thee from the evil woman, from the flattery of the tongue of a strange woman. Lust not after her beauty in thine heart; neither let her take thee with her eyelids. For by means of a whorish woman a man is brought to a piece of bread.",
    ["temptation", "self-control", "wisdom"],
    ["seduction", "lust", "flattery", "warning"],
    ["guidance", "wisdom"],
    ["tempted", "struggling"]
  ),

  createProverb(
    "Proverbs 6:27-29",
    "Sin Brings Consequences",
    "Can a man take fire in his bosom, and his clothes not be burned? Can one go upon hot coals, and his feet not be burned? So he that goeth in to his neighbour's wife; whosoever toucheth her shall not be innocent.",
    ["consequences", "choices", "integrity"],
    ["fire", "temptation", "warning", "discipline"],
    ["wisdom", "guidance"],
    ["tempted", "conflicted"]
  ),

  createProverb(
    "Proverbs 6:30-31",
    "Understanding Yet Accountability",
    "Men do not despise a thief, if he steal to satisfy his soul when he is hungry; But if he be found, he shall restore sevenfold; he shall give all the substance of his house.",
    ["justice", "accountability", "choices"],
    ["theft", "restitution", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 6:32-35",
    "Adultery Destroys Lives",
    "But whoso committeth adultery with a woman lacketh understanding: he that doeth it destroyeth his own soul. A wound and dishonour shall he get; and his reproach shall not be wiped away. For jealousy is the rage of a man: therefore he will not spare in the day of vengeance.",
    ["consequences", "integrity", "relationships"],
    ["adultery", "dishonor", "jealousy", "warning"],
    ["wisdom", "guidance"],
    ["tempted", "reflective"]
  ),

    createProverb(
    "Proverbs 7:1-3",
    "Treasure Wisdom",
    "My son, keep my words, and lay up my commandments with thee. Keep my commandments, and live; and my law as the apple of thine eye. Bind them upon thy fingers, write them upon the table of thine heart.",
    ["wisdom", "instruction", "guidance"],
    ["remember", "commandments", "heart", "focus"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 7:4-5",
    "Make Wisdom Your Companion",
    "Say unto wisdom, Thou art my sister; and call understanding thy kinswoman: That they may keep thee from the strange woman, from the stranger which flattereth with her words.",
    ["wisdom", "discernment", "protection"],
    ["temptation", "flattery", "guidance"],
    ["wisdom", "guidance"],
    ["tempted", "uncertain"]
  ),

  createProverb(
    "Proverbs 7:6-9",
    "The Simple Walk Into Trouble",
    "For at the window of my house I looked through my casement, And beheld among the simple ones, I discerned among the youths, a young man void of understanding, Passing through the street near her corner; and he went the way to her house, In the twilight, in the evening, in the black and dark night.",
    ["discernment", "choices", "warning"],
    ["naive", "danger", "temptation"],
    ["wisdom", "guidance"],
    ["uncertain", "tempted"]
  ),

    createProverb(
    "Proverbs 7:10-13",
    "The Face of Temptation",
    "And, behold, there met him a woman with the attire of an harlot, and subtil of heart. (She is loud and stubborn; her feet abide not in her house: Now is she without, now in the streets, and lieth in wait at every corner.) So she caught him, and kissed him, and with an impudent face said unto him,",
    ["temptation", "discernment", "warning"],
    ["seduction", "deception", "danger"],
    ["wisdom", "guidance"],
    ["tempted", "uncertain"]
  ),

  createProverb(
    "Proverbs 7:14-18",
    "The Lure of Pleasure",
    "I have peace offerings with me; this day have I payed my vows. Therefore came I forth to meet thee, diligently to seek thy face, and I have found thee. I have decked my bed with coverings of tapestry, with carved works, with fine linen of Egypt. I have perfumed my bed with myrrh, aloes, and cinnamon. Come, let us take our fill of love until the morning.",
    ["temptation", "desire", "discernment"],
    ["seduction", "flattery", "pleasure"],
    ["wisdom", "guidance"],
    ["tempted", "conflicted"]
  ),

  createProverb(
    "Proverbs 7:19-20",
    "False Security",
    "For the goodman is not at home, he is gone a long journey: He hath taken a bag of money with him, and will come home at the day appointed.",
    ["deception", "temptation", "warning"],
    ["secrecy", "hidden sin", "false security"],
    ["wisdom", "guidance"],
    ["tempted", "uncertain"]
  ),

    createProverb(
    "Proverbs 7:21-23",
    "The Trap Is Set",
    "With her much fair speech she caused him to yield, with the flattering of her lips she forced him. He goeth after her straightway, as an ox goeth to the slaughter, or as a fool to the correction of the stocks; Till a dart strike through his liver; as a bird hasteth to the snare, and knoweth not that it is for his life.",
    ["temptation", "discernment", "consequences"],
    ["flattery", "deception", "trap", "warning"],
    ["wisdom", "guidance"],
    ["tempted", "conflicted"]
  ),

  createProverb(
    "Proverbs 7:24-27",
    "The Final Warning",
    "Hearken unto me now therefore, O ye children, and attend to the words of my mouth. Let not thine heart decline to her ways, go not astray in her paths. For she hath cast down many wounded: yea, many strong men have been slain by her. Her house is the way to hell, going down to the chambers of death.",
    ["warning", "discernment", "wisdom"],
    ["temptation", "danger", "choices"],
    ["guidance", "wisdom"],
    ["tempted", "reflective"]
  ),

    createProverb(
    "Proverbs 8:1-4",
    "Wisdom Calls Out",
    "Doth not wisdom cry? and understanding put forth her voice? She standeth in the top of high places, by the way in the places of the paths. She crieth at the gates, at the entry of the city, at the coming in at the doors. Unto you, O men, I call; and my voice is to the sons of man.",
    ["wisdom", "guidance", "calling"],
    ["voice", "direction", "understanding"],
    ["guidance", "wisdom"],
    ["seeking", "uncertain"]
  ),

  createProverb(
    "Proverbs 8:5-7",
    "Learn Understanding",
    "O ye simple, understand wisdom: and, ye fools, be ye of an understanding heart. Hear; for I will speak of excellent things; and the opening of my lips shall be right things. For my mouth shall speak truth; and wickedness is an abomination to my lips.",
    ["wisdom", "truth", "learning"],
    ["understanding", "instruction", "truth"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 8:8-11",
    "Wisdom Is More Valuable Than Wealth",
    "All the words of my mouth are in righteousness; there is nothing froward or perverse in them. They are all plain to him that understandeth, and right to them that find knowledge. Receive my instruction, and not silver; and knowledge rather than choice gold. For wisdom is better than rubies; and all the things that may be desired are not to be compared to it.",
    ["wisdom", "value", "understanding"],
    ["knowledge", "gold", "riches", "instruction"],
    ["wisdom", "finances"],
    ["ambitious", "seeking"]
  ),

    createProverb(
    "Proverbs 8:12-14",
    "Wisdom and Sound Judgment",
    "I wisdom dwell with prudence, and find out knowledge of witty inventions. The fear of the Lord is to hate evil: pride, and arrogancy, and the evil way, and the froward mouth, do I hate. Counsel is mine, and sound wisdom: I am understanding; I have strength.",
    ["wisdom", "discernment", "character"],
    ["prudence", "judgment", "counsel", "understanding"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 8:15-16",
    "Wisdom Guides Leaders",
    "By me kings reign, and princes decree justice. By me princes rule, and nobles, even all the judges of the earth.",
    ["leadership", "justice", "authority"],
    ["governance", "decision-making", "righteousness"],
    ["leadership", "wisdom"],
    ["responsible", "seeking"]
  ),

  createProverb(
    "Proverbs 8:17",
    "Wisdom Responds to Those Who Seek",
    "I love them that love me; and those that seek me early shall find me.",
    ["wisdom", "seeking", "relationship"],
    ["search", "devotion", "guidance"],
    ["encouragement", "faith"],
    ["hopeful", "seeking"]
  ),

  createProverb(
    "Proverbs 8:18-21",
    "Wisdom Brings Lasting Riches",
    "Riches and honour are with me; yea, durable riches and righteousness. My fruit is better than gold, yea, than fine gold; and my revenue than choice silver. I lead in the way of righteousness, in the midst of the paths of judgment: That I may cause those that love me to inherit substance; and I will fill their treasures.",
    ["wisdom", "prosperity", "righteousness"],
    ["wealth", "honor", "treasure", "justice"],
    ["wisdom", "finances"],
    ["ambitious", "hopeful"]
  ),

    createProverb(
    "Proverbs 8:22-26",
    "Wisdom Before Creation",
    "The Lord possessed me in the beginning of his way, before his works of old. I was set up from everlasting, from the beginning, or ever the earth was. When there were no depths, I was brought forth; when there were no fountains abounding with water. Before the mountains were settled, before the hills was I brought forth: While as yet he had not made the earth, nor the fields, nor the highest part of the dust of the world.",
    ["wisdom", "creation", "eternal truth"],
    ["beginning", "everlasting", "foundations"],
    ["wisdom", "reflection"],
    ["awe", "reflective"]
  ),

  createProverb(
    "Proverbs 8:27-31",
    "Wisdom at the Foundation of the World",
    "When he prepared the heavens, I was there: when he set a compass upon the face of the depth: When he established the clouds above: when he strengthened the fountains of the deep: When he gave to the sea his decree, that the waters should not pass his commandment: when he appointed the foundations of the earth: Then I was by him, as one brought up with him: and I was daily his delight, rejoicing always before him; Rejoicing in the habitable part of his earth; and my delights were with the sons of men.",
    ["wisdom", "creation", "order"],
    ["foundations", "design", "joy"],
    ["wisdom", "reflection"],
    ["curious", "reflective"]
  ),

  createProverb(
    "Proverbs 8:32-34",
    "Blessed Are Those Who Listen",
    "Now therefore hearken unto me, O ye children: for blessed are they that keep my ways. Hear instruction, and be wise, and refuse it not. Blessed is the man that heareth me, watching daily at my gates, waiting at the posts of my doors.",
    ["wisdom", "discipline", "guidance"],
    ["listen", "instruction", "blessing"],
    ["guidance", "encouragement"],
    ["seeking", "hopeful"]
  ),

  createProverb(
    "Proverbs 8:35-36",
    "Choose Life Through Wisdom",
    "For whoso findeth me findeth life, and shall obtain favour of the Lord. But he that sinneth against me wrongeth his own soul: all they that hate me love death.",
    ["wisdom", "life", "choices"],
    ["favor", "consequences", "direction"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

    createProverb(
    "Proverbs 9:1-6",
    "Wisdom Prepares a Feast",
    "Wisdom hath builded her house, she hath hewn out her seven pillars: She hath killed her beasts; she hath mingled her wine; she hath also furnished her table. She hath sent forth her maidens: she crieth upon the highest places of the city, Whoso is simple, let him turn in hither: as for him that wanteth understanding, she saith to him, Come, eat of my bread, and drink of the wine which I have mingled. Forsake the foolish, and live; and go in the way of understanding.",
    ["wisdom", "invitation", "guidance"],
    ["understanding", "learning", "instruction"],
    ["guidance", "wisdom"],
    ["seeking", "uncertain"]
  ),

  createProverb(
    "Proverbs 9:7-9",
    "Correction Reveals Character",
    "He that reproveth a scorner getteth to himself shame: and he that rebuketh a wicked man getteth himself a blot. Reprove not a scorner, lest he hate thee: rebuke a wise man, and he will love thee. Give instruction to a wise man, and he will be yet wiser: teach a just man, and he will increase in learning.",
    ["correction", "character", "learning"],
    ["rebuke", "instruction", "growth"],
    ["wisdom", "guidance"],
    ["reflective", "teachable"]
  ),

  createProverb(
    "Proverbs 9:10-12",
    "The Beginning of Wisdom",
    "The fear of the Lord is the beginning of wisdom: and the knowledge of the holy is understanding. For by me thy days shall be multiplied, and the years of thy life shall be increased. If thou be wise, thou shalt be wise for thyself: but if thou scornest, thou alone shalt bear it.",
    ["wisdom", "reverence", "understanding"],
    ["fear of the Lord", "knowledge", "life"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

    createProverb(
    "Proverbs 9:13-15",
    "The Call of Folly",
    "A foolish woman is clamorous: she is simple, and knoweth nothing. For she sitteth at the door of her house, on a seat in the high places of the city, To call passengers who go right on their ways:",
    ["folly", "temptation", "discernment"],
    ["deception", "foolishness", "warning"],
    ["wisdom", "guidance"],
    ["uncertain", "tempted"]
  ),

  createProverb(
    "Proverbs 9:16-18",
    "The Hidden Cost of Folly",
    "Whoso is simple, let him turn in hither: and as for him that wanteth understanding, she saith to him, Stolen waters are sweet, and bread eaten in secret is pleasant. But he knoweth not that the dead are there; and that her guests are in the depths of hell.",
    ["choices", "discernment", "consequences"],
    ["temptation", "secret sin", "warning"],
    ["wisdom", "guidance"],
    ["tempted", "reflective"]
  ),

    createProverb(
    "Proverbs 10:1",
    "A Wise Child Brings Joy",
    "The proverbs of Solomon. A wise son maketh a glad father: but a foolish son is the heaviness of his mother.",
    ["wisdom", "family", "character"],
    ["parents", "joy", "foolishness", "choices"],
    ["wisdom", "relationships"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 10:2",
    "Righteousness Matters More Than Gain",
    "Treasures of wickedness profit nothing: but righteousness delivereth from death.",
    ["righteousness", "integrity", "wealth"],
    ["gain", "character", "deliverance", "values"],
    ["wisdom", "finances"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 10:3",
    "God Sustains the Righteous",
    "The Lord will not suffer the soul of the righteous to famish: but he casteth away the substance of the wicked.",
    ["provision", "righteousness", "trust"],
    ["God provides", "sustain", "wickedness", "faith"],
    ["faith", "encouragement"],
    ["worried", "hopeful"]
  ),

  createProverb(
    "Proverbs 10:4",
    "Diligence Brings Increase",
    "He becometh poor that dealeth with a slack hand: but the hand of the diligent maketh rich.",
    ["diligence", "work", "prosperity"],
    ["lazy", "effort", "discipline", "success"],
    ["motivation", "finances"],
    ["unmotivated", "determined"]
  ),

  createProverb(
    "Proverbs 10:5",
    "Work in the Right Season",
    "He that gathereth in summer is a wise son: but he that sleepeth in harvest is a son that causeth shame.",
    ["timing", "diligence", "wisdom"],
    ["harvest", "preparation", "work ethic", "opportunity"],
    ["motivation", "wisdom"],
    ["determined", "reflective"]
  ),

    createProverb(
    "Proverbs 10:6",
    "Blessings Crown the Righteous",
    "Blessings are upon the head of the just: but violence covereth the mouth of the wicked.",
    ["righteousness", "blessing", "character"],
    ["justice", "violence", "integrity"],
    ["wisdom", "guidance"],
    ["reflective", "hopeful"]
  ),

  createProverb(
    "Proverbs 10:7",
    "A Good Name Endures",
    "The memory of the just is blessed: but the name of the wicked shall rot.",
    ["legacy", "character", "reputation"],
    ["memory", "honor", "name"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 10:8",
    "Wisdom Accepts Instruction",
    "The wise in heart will receive commandments: but a prating fool shall fall.",
    ["wisdom", "teachability", "instruction"],
    ["learning", "commandments", "humility"],
    ["wisdom", "guidance"],
    ["teachable", "reflective"]
  ),

  createProverb(
    "Proverbs 10:9",
    "Integrity Brings Security",
    "He that walketh uprightly walketh surely: but he that perverteth his ways shall be known.",
    ["integrity", "character", "security"],
    ["upright", "honesty", "truth"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 10:10",
    "Dishonesty Creates Trouble",
    "He that winketh with the eye causeth sorrow: but a prating fool shall fall.",
    ["honesty", "character", "warning"],
    ["deception", "trouble", "foolishness"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

   createProverb(
    "Proverbs 10:11",
    "Words That Give Life",
    "The mouth of a righteous man is a well of life: but violence covereth the mouth of the wicked.",
    ["speech", "wisdom", "life"],
    ["words", "righteousness", "influence"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 10:12",
    "Love Covers Offenses",
    "Hatred stirreth up strifes: but love covereth all sins.",
    ["love", "peace", "relationships"],
    ["forgiveness", "conflict", "kindness"],
    ["relationships", "wisdom"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 10:13",
    "Wisdom Speaks Clearly",
    "In the lips of him that hath understanding wisdom is found: but a rod is for the back of him that is void of understanding.",
    ["wisdom", "understanding", "speech"],
    ["discipline", "learning", "instruction"],
    ["wisdom", "guidance"],
    ["teachable", "reflective"]
  ),

  createProverb(
    "Proverbs 10:14",
    "The Wise Store Knowledge",
    "Wise men lay up knowledge: but the mouth of the foolish is near destruction.",
    ["wisdom", "learning", "knowledge"],
    ["speech", "understanding", "discipline"],
    ["wisdom", "guidance"],
    ["curious", "reflective"]
  ),

  createProverb(
    "Proverbs 10:15",
    "Wealth and Poverty",
    "The rich man's wealth is his strong city: the destruction of the poor is their poverty.",
    ["wealth", "poverty", "security"],
    ["finances", "resources", "risk"],
    ["finances", "wisdom"],
    ["concerned", "reflective"]
  ),

    createProverb(
    "Proverbs 10:16",
    "Righteous Work Leads to Life",
    "The labour of the righteous tendeth to life: the fruit of the wicked to sin.",
    ["righteousness", "work", "life"],
    ["labor", "fruit", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 10:17",
    "Heed Instruction",
    "He is in the way of life that keepeth instruction: but he that refuseth reproof erreth.",
    ["instruction", "wisdom", "growth"],
    ["correction", "learning", "guidance"],
    ["wisdom", "guidance"],
    ["teachable", "reflective"]
  ),

  createProverb(
    "Proverbs 10:18",
    "Hidden Hatred and Lies",
    "He that hideth hatred with lying lips, and he that uttereth a slander, is a fool.",
    ["honesty", "character", "relationships"],
    ["lies", "slander", "hatred"],
    ["wisdom", "guidance"],
    ["convicted", "reflective"]
  ),

  createProverb(
    "Proverbs 10:19",
    "Choose Words Carefully",
    "In the multitude of words there wanteth not sin: but he that refraineth his lips is wise.",
    ["speech", "self-control", "wisdom"],
    ["words", "discipline", "restraint"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 10:20",
    "The Value of a Righteous Tongue",
    "The tongue of the just is as choice silver: the heart of the wicked is little worth.",
    ["speech", "character", "value"],
    ["words", "righteousness", "integrity"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

   createProverb(
    "Proverbs 10:21",
    "Words That Nourish",
    "The lips of the righteous feed many: but fools die for want of wisdom.",
    ["speech", "wisdom", "influence"],
    ["teaching", "guidance", "words"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 10:22",
    "The Blessing of the Lord",
    "The blessing of the Lord, it maketh rich, and he addeth no sorrow with it.",
    ["blessing", "prosperity", "faith"],
    ["wealth", "favor", "provision"],
    ["faith", "encouragement"],
    ["hopeful", "seeking"]
  ),

  createProverb(
    "Proverbs 10:23",
    "Fools Delight in Wrong",
    "It is as sport to a fool to do mischief: but a man of understanding hath wisdom.",
    ["wisdom", "discernment", "character"],
    ["mischief", "choices", "understanding"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 10:24",
    "Fear and Hope",
    "The fear of the wicked, it shall come upon him: but the desire of the righteous shall be granted.",
    ["hope", "justice", "faith"],
    ["fear", "desire", "outcomes"],
    ["faith", "encouragement"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 10:25",
    "The Righteous Stand Firm",
    "As the whirlwind passeth, so is the wicked no more: but the righteous is an everlasting foundation.",
    ["stability", "righteousness", "strength"],
    ["foundation", "endurance", "character"],
    ["encouragement", "wisdom"],
    ["seeking", "hopeful"]
  ),

    createProverb(
    "Proverbs 10:26",
    "Laziness Frustrates Others",
    "As vinegar to the teeth, and as smoke to the eyes, so is the sluggard to them that send him.",
    ["diligence", "work", "responsibility"],
    ["lazy", "reliability", "frustration"],
    ["motivation", "wisdom"],
    ["unmotivated", "reflective"]
  ),

  createProverb(
    "Proverbs 10:27",
    "Reverence Lengthens Life",
    "The fear of the Lord prolongeth days: but the years of the wicked shall be shortened.",
    ["reverence", "wisdom", "life"],
    ["fear of the Lord", "longevity", "choices"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 10:28",
    "Hope for the Righteous",
    "The hope of the righteous shall be gladness: but the expectation of the wicked shall perish.",
    ["hope", "righteousness", "joy"],
    ["gladness", "expectation", "faith"],
    ["encouragement", "faith"],
    ["hopeful", "weary"]
  ),

  createProverb(
    "Proverbs 10:29",
    "God Is Strength to the Upright",
    "The way of the Lord is strength to the upright: but destruction shall be to the workers of iniquity.",
    ["strength", "righteousness", "guidance"],
    ["upright", "way", "destruction"],
    ["encouragement", "wisdom"],
    ["seeking", "hopeful"]
  ),

  createProverb(
    "Proverbs 10:30",
    "The Righteous Are Established",
    "The righteous shall never be removed: but the wicked shall not inhabit the earth.",
    ["stability", "righteousness", "security"],
    ["established", "endurance", "justice"],
    ["encouragement", "wisdom"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 10:31",
    "The Mouth of the Just Brings Wisdom",
    "The mouth of the just bringeth forth wisdom: but the froward tongue shall be cut out.",
    ["speech", "wisdom", "character"],
    ["words", "tongue", "justice"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 10:32",
    "Speak What Is Fitting",
    "The lips of the righteous know what is acceptable: but the mouth of the wicked speaketh frowardness.",
    ["speech", "discernment", "righteousness"],
    ["words", "acceptable", "integrity"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 11:1",
    "Honest Scales",
    "A false balance is abomination to the Lord: but a just weight is his delight.",
    ["integrity", "honesty", "justice"],
    ["fairness", "business", "truth"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 11:2",
    "Humility Brings Wisdom",
    "When pride cometh, then cometh shame: but with the lowly is wisdom.",
    ["humility", "wisdom", "character"],
    ["pride", "shame", "learning"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 11:3",
    "Integrity Guides the Upright",
    "The integrity of the upright shall guide them: but the perverseness of transgressors shall destroy them.",
    ["integrity", "guidance", "character"],
    ["honesty", "direction", "choices"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 11:4",
    "Riches Cannot Save",
    "Riches profit not in the day of wrath: but righteousness delivereth from death.",
    ["righteousness", "values", "eternity"],
    ["wealth", "judgment", "deliverance"],
    ["wisdom", "faith"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 11:5",
    "Righteousness Makes the Path Straight",
    "The righteousness of the perfect shall direct his way: but the wicked shall fall by his own wickedness.",
    ["righteousness", "direction", "character"],
    ["guidance", "path", "choices"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

    createProverb(
    "Proverbs 11:6",
    "Integrity Rescues the Upright",
    "The righteousness of the upright shall deliver them: but transgressors shall be taken in their own naughtiness.",
    ["integrity", "righteousness", "deliverance"],
    ["choices", "consequences", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 11:7",
    "False Hope Fails",
    "When a wicked man dieth, his expectation shall perish: and the hope of unjust men perisheth.",
    ["hope", "justice", "truth"],
    ["expectation", "wickedness", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 11:8",
    "The Righteous Are Delivered",
    "The righteous is delivered out of trouble, and the wicked cometh in his stead.",
    ["deliverance", "justice", "faith"],
    ["rescue", "trouble", "protection"],
    ["encouragement", "faith"],
    ["worried", "hopeful"]
  ),

  createProverb(
    "Proverbs 11:9",
    "Words Can Destroy or Save",
    "An hypocrite with his mouth destroyeth his neighbour: but through knowledge shall the just be delivered.",
    ["speech", "integrity", "wisdom"],
    ["words", "hypocrisy", "truth"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 11:10",
    "A Community Rejoices in Righteousness",
    "When it goeth well with the righteous, the city rejoiceth: and when the wicked perish, there is shouting.",
    ["community", "justice", "righteousness"],
    ["society", "joy", "victory"],
    ["wisdom", "guidance"],
    ["hopeful", "reflective"]
  ),

    createProverb(
    "Proverbs 11:11",
    "Integrity Builds a City",
    "By the blessing of the upright the city is exalted: but it is overthrown by the mouth of the wicked.",
    ["leadership", "community", "integrity"],
    ["influence", "society", "speech"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 11:12",
    "Wisdom Shows Restraint",
    "He that is void of wisdom despiseth his neighbour: but a man of understanding holdeth his peace.",
    ["wisdom", "relationships", "self-control"],
    ["respect", "speech", "restraint"],
    ["wisdom", "guidance"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 11:13",
    "Guarding Confidence",
    "A talebearer revealeth secrets: but he that is of a faithful spirit concealeth the matter.",
    ["trust", "integrity", "relationships"],
    ["gossip", "loyalty", "confidentiality"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 11:14",
    "Safety in Wise Counsel",
    "Where no counsel is, the people fall: but in the multitude of counsellors there is safety.",
    ["guidance", "leadership", "wisdom"],
    ["advice", "mentors", "decision-making"],
    ["leadership", "wisdom"],
    ["uncertain", "seeking"]
  ),

  createProverb(
    "Proverbs 11:15",
    "The Risk of Reckless Guarantees",
    "He that is surety for a stranger shall smart for it: and he that hateth suretiship is sure.",
    ["financial wisdom", "prudence", "responsibility"],
    ["debt", "guarantee", "risk"],
    ["finances", "wisdom"],
    ["worried", "reflective"]
  ),

    createProverb(
    "Proverbs 11:16",
    "Grace Brings Honor",
    "A gracious woman retaineth honour: and strong men retain riches.",
    ["character", "honor", "virtue"],
    ["grace", "respect", "strength"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 11:17",
    "Kindness Rewards the Soul",
    "The merciful man doeth good to his own soul: but he that is cruel troubleth his own flesh.",
    ["kindness", "mercy", "character"],
    ["compassion", "cruelty", "choices"],
    ["wisdom", "relationships"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 11:18",
    "Righteousness Brings True Reward",
    "The wicked worketh a deceitful work: but to him that soweth righteousness shall be a sure reward.",
    ["righteousness", "reward", "integrity"],
    ["choices", "justice", "outcomes"],
    ["wisdom", "guidance"],
    ["reflective", "hopeful"]
  ),

  createProverb(
    "Proverbs 11:19",
    "Righteousness Leads to Life",
    "As righteousness tendeth to life: so he that pursueth evil pursueth it to his own death.",
    ["righteousness", "life", "choices"],
    ["direction", "consequences", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 11:20",
    "Integrity Pleases the Lord",
    "They that are of a froward heart are abomination to the Lord: but such as are upright in their way are his delight.",
    ["integrity", "character", "faith"],
    ["upright", "heart", "choices"],
    ["faith", "wisdom"],
    ["reflective", "convicted"]
  ),

    createProverb(
    "Proverbs 11:21",
    "The Wicked Will Not Go Unpunished",
    "Though hand join in hand, the wicked shall not be unpunished: but the seed of the righteous shall be delivered.",
    ["justice", "righteousness", "deliverance"],
    ["judgment", "offspring", "protection"],
    ["faith", "wisdom"],
    ["worried", "hopeful"]
  ),

  createProverb(
    "Proverbs 11:22",
    "Beauty Without Discretion",
    "As a jewel of gold in a swine's snout, so is a fair woman which is without discretion.",
    ["discernment", "character", "wisdom"],
    ["beauty", "judgment", "inner life"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 11:23",
    "The Desire of the Righteous",
    "The desire of the righteous is only good: but the expectation of the wicked is wrath.",
    ["righteousness", "desire", "hope"],
    ["expectation", "goodness", "outcomes"],
    ["faith", "wisdom"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 11:24",
    "Generosity Leads to Increase",
    "There is that scattereth, and yet increaseth; and there is that withholdeth more than is meet, but it tendeth to poverty.",
    ["generosity", "prosperity", "stewardship"],
    ["giving", "increase", "poverty"],
    ["finances", "wisdom"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 11:25",
    "The Generous Soul Will Be Refreshed",
    "The liberal soul shall be made fat: and he that watereth shall be watered also himself.",
    ["generosity", "refreshing", "blessing"],
    ["giving", "abundance", "kindness"],
    ["encouragement", "finances"],
    ["hopeful", "motivated"]
  ),

    createProverb(
    "Proverbs 11:26",
    "Generosity Wins Favor",
    "He that withholdeth corn, the people shall curse him: but blessing shall be upon the head of him that selleth it.",
    ["generosity", "leadership", "community"],
    ["sharing", "provision", "favor"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 11:27",
    "Seek Good",
    "He that diligently seeketh good procureth favour: but he that seeketh mischief, it shall come unto him.",
    ["character", "integrity", "choices"],
    ["favor", "intentions", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 11:28",
    "Trusting in Wealth vs Righteousness",
    "He that trusteth in his riches shall fall: but the righteous shall flourish as a branch.",
    ["wealth", "faith", "righteousness"],
    ["trust", "prosperity", "security"],
    ["wisdom", "faith"],
    ["concerned", "reflective"]
  ),

  createProverb(
    "Proverbs 11:29",
    "Trouble Comes From Folly",
    "He that troubleth his own house shall inherit the wind: and the fool shall be servant to the wise of heart.",
    ["wisdom", "family", "consequences"],
    ["foolishness", "household", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 11:30",
    "Winning Souls",
    "The fruit of the righteous is a tree of life; and he that winneth souls is wise.",
    ["influence", "wisdom", "life"],
    ["impact", "leadership", "fruit"],
    ["leadership", "wisdom"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 11:31",
    "Justice Prevails",
    "Behold, the righteous shall be recompensed in the earth: much more the wicked and the sinner.",
    ["justice", "righteousness", "accountability"],
    ["judgment", "consequences", "truth"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 12:1",
    "Loving Correction",
    "Whoso loveth instruction loveth knowledge: but he that hateth reproof is brutish.",
    ["instruction", "growth", "wisdom"],
    ["correction", "learning", "reproof", "knowledge"],
    ["wisdom", "guidance"],
    ["teachable", "reflective"]
  ),

  createProverb(
    "Proverbs 12:2",
    "God Favors the Good",
    "A good man obtaineth favour of the Lord: but a man of wicked devices will he condemn.",
    ["character", "favor", "integrity"],
    ["goodness", "wickedness", "judgment"],
    ["faith", "wisdom"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 12:3",
    "Wickedness Cannot Establish You",
    "A man shall not be established by wickedness: but the root of the righteous shall not be moved.",
    ["stability", "righteousness", "character"],
    ["foundation", "wickedness", "endurance"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 12:4",
    "A Virtuous Life Brings Honor",
    "A virtuous woman is a crown to her husband: but she that maketh ashamed is as rottenness in his bones.",
    ["virtue", "relationships", "honor"],
    ["character", "marriage", "shame"],
    ["relationships", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 12:5",
    "Righteous Thoughts Lead Rightly",
    "The thoughts of the righteous are right: but the counsels of the wicked are deceit.",
    ["thoughts", "righteousness", "discernment"],
    ["mindset", "counsel", "deception"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 12:6",
    "Words Can Destroy or Deliver",
    "The words of the wicked are to lie in wait for blood: but the mouth of the upright shall deliver them.",
    ["speech", "justice", "integrity"],
    ["words", "violence", "deliverance"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 12:7",
    "The Wicked Fall, the Righteous Stand",
    "The wicked are overthrown, and are not: but the house of the righteous shall stand.",
    ["stability", "righteousness", "justice"],
    ["endurance", "foundation", "character"],
    ["encouragement", "wisdom"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 12:8",
    "Wisdom Earns Respect",
    "A man shall be commended according to his wisdom: but he that is of a perverse heart shall be despised.",
    ["wisdom", "reputation", "character"],
    ["respect", "heart", "integrity"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 12:9",
    "Humility Over Pretension",
    "He that is despised, and hath a servant, is better than he that honoureth himself, and lacketh bread.",
    ["humility", "wisdom", "perspective"],
    ["status", "honor", "contentment"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 12:10",
    "The Compassion of the Righteous",
    "A righteous man regardeth the life of his beast: but the tender mercies of the wicked are cruel.",
    ["compassion", "righteousness", "character"],
    ["kindness", "care", "mercy"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ), 

    createProverb(
    "Proverbs 12:11",
    "Diligence Provides",
    "He that tilleth his land shall be satisfied with bread: but he that followeth vain persons is void of understanding.",
    ["diligence", "work", "provision"],
    ["discipline", "focus", "effort"],
    ["motivation", "wisdom"],
    ["determined", "reflective"]
  ),

  createProverb(
    "Proverbs 12:12",
    "The Root of the Righteous",
    "The wicked desireth the net of evil men: but the root of the righteous yieldeth fruit.",
    ["righteousness", "character", "fruitfulness"],
    ["choices", "desire", "outcomes"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 12:13",
    "Speech Can Trap or Deliver",
    "The wicked is snared by the transgression of his lips: but the just shall come out of trouble.",
    ["speech", "wisdom", "consequences"],
    ["words", "trap", "deliverance"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 12:14",
    "Good Words Bear Fruit",
    "A man shall be satisfied with good by the fruit of his mouth: and the recompence of a man's hands shall be rendered unto him.",
    ["speech", "work", "reward"],
    ["fruit", "effort", "outcomes"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 12:15",
    "The Wise Accept Counsel",
    "The way of a fool is right in his own eyes: but he that hearkeneth unto counsel is wise.",
    ["wisdom", "humility", "guidance"],
    ["advice", "learning", "counsel"],
    ["wisdom", "leadership"],
    ["uncertain", "seeking"]
  ),

    createProverb(
    "Proverbs 12:16",
    "Self-Control Over Anger",
    "A fool's wrath is presently known: but a prudent man covereth shame.",
    ["self-control", "wisdom", "character"],
    ["anger", "restraint", "prudence"],
    ["wisdom", "guidance"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 12:17",
    "Truth Speaks Clearly",
    "He that speaketh truth sheweth forth righteousness: but a false witness deceit.",
    ["truth", "speech", "integrity"],
    ["honesty", "justice", "deception"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 12:18",
    "Words Can Wound or Heal",
    "There is that speaketh like the piercings of a sword: but the tongue of the wise is health.",
    ["speech", "healing", "wisdom"],
    ["words", "hurt", "encouragement"],
    ["relationships", "wisdom"],
    ["hurt", "reflective"]
  ),

  createProverb(
    "Proverbs 12:19",
    "Truth Endures",
    "The lip of truth shall be established for ever: but a lying tongue is but for a moment.",
    ["truth", "integrity", "character"],
    ["honesty", "lies", "lasting"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 12:20",
    "Peace Belongs to the Good",
    "Deceit is in the heart of them that imagine evil: but to the counsellors of peace is joy.",
    ["peace", "character", "wisdom"],
    ["joy", "goodness", "intentions"],
    ["wisdom", "guidance"],
    ["hopeful", "reflective"]
  ),

    createProverb(
    "Proverbs 12:21",
    "The Righteous Are Protected",
    "There shall no evil happen to the just: but the wicked shall be filled with mischief.",
    ["protection", "righteousness", "faith"],
    ["justice", "safety", "evil"],
    ["faith", "encouragement"],
    ["worried", "hopeful"]
  ),

  createProverb(
    "Proverbs 12:22",
    "God Delights in Truth",
    "Lying lips are abomination to the Lord: but they that deal truly are his delight.",
    ["truth", "integrity", "character"],
    ["honesty", "lies", "faithfulness"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 12:23",
    "The Wise Use Knowledge Carefully",
    "A prudent man concealeth knowledge: but the heart of fools proclaimeth foolishness.",
    ["wisdom", "discernment", "speech"],
    ["prudence", "knowledge", "self-control"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 12:24",
    "Diligence Leads to Leadership",
    "The hand of the diligent shall bear rule: but the slothful shall be under tribute.",
    ["diligence", "leadership", "discipline"],
    ["work ethic", "responsibility", "success"],
    ["motivation", "leadership"],
    ["unmotivated", "determined"]
  ),

  createProverb(
    "Proverbs 12:25",
    "Encouragement Lifts the Heart",
    "Heaviness in the heart of man maketh it stoop: but a good word maketh it glad.",
    ["encouragement", "speech", "hope"],
    ["anxiety", "kindness", "uplifting words"],
    ["encouragement", "relationships"],
    ["anxious", "weary"]
  ),

  createProverb(
    "Proverbs 12:26",
    "Choose Your Friends Wisely",
    "The righteous is more excellent than his neighbour: but the way of the wicked seduceth them.",
    ["relationships", "wisdom", "character"],
    ["influence", "choices", "direction"],
    ["wisdom", "guidance"],
    ["uncertain", "reflective"]
  ),

  createProverb(
    "Proverbs 12:27",
    "Value What You Have",
    "The slothful man roasteth not that which he took in hunting: but the substance of a diligent man is precious.",
    ["diligence", "stewardship", "discipline"],
    ["effort", "resources", "value"],
    ["motivation", "wisdom"],
    ["reflective", "determined"]
  ),

  createProverb(
    "Proverbs 12:28",
    "The Path of Life",
    "In the way of righteousness is life; and in the pathway thereof there is no death.",
    ["righteousness", "life", "direction"],
    ["path", "choices", "hope"],
    ["faith", "encouragement"],
    ["hopeful", "seeking"]
  ),

   createProverb(
    "Proverbs 13:1",
    "A Wise Person Listens",
    "A wise son heareth his father's instruction: but a scorner heareth not rebuke.",
    ["wisdom", "instruction", "teachability"],
    ["learning", "correction", "rebuke"],
    ["wisdom", "guidance"],
    ["teachable", "reflective"]
  ),

  createProverb(
    "Proverbs 13:2",
    "The Fruit of Words",
    "A man shall eat good by the fruit of his mouth: but the soul of the transgressors shall eat violence.",
    ["speech", "wisdom", "consequences"],
    ["words", "fruit", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 13:3",
    "Guard Your Words",
    "He that keepeth his mouth keepeth his life: but he that openeth wide his lips shall have destruction.",
    ["speech", "self-control", "wisdom"],
    ["words", "discipline", "restraint"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 13:4",
    "Desire Without Effort",
    "The soul of the sluggard desireth, and hath nothing: but the soul of the diligent shall be made fat.",
    ["diligence", "discipline", "work"],
    ["effort", "desire", "success"],
    ["motivation", "wisdom"],
    ["unmotivated", "determined"]
  ),

  createProverb(
    "Proverbs 13:5",
    "Truth Over Lies",
    "A righteous man hateth lying: but a wicked man is loathsome, and cometh to shame.",
    ["truth", "integrity", "character"],
    ["honesty", "lies", "reputation"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ), 

   createProverb(
    "Proverbs 13:6",
    "Righteousness Protects",
    "Righteousness keepeth him that is upright in the way: but wickedness overthroweth the sinner.",
    ["righteousness", "protection", "character"],
    ["integrity", "choices", "direction"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 13:7",
    "The Illusion of Wealth",
    "There is that maketh himself rich, yet hath nothing: there is that maketh himself poor, yet hath great riches.",
    ["wealth", "wisdom", "perspective"],
    ["appearance", "true riches", "humility"],
    ["finances", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 13:8",
    "Wealth Can Bring Trouble",
    "The ransom of a man's life are his riches: but the poor heareth not rebuke.",
    ["wealth", "wisdom", "perspective"],
    ["money", "security", "risk"],
    ["finances", "wisdom"],
    ["concerned", "reflective"]
  ),

  createProverb(
    "Proverbs 13:9",
    "Light of the Righteous",
    "The light of the righteous rejoiceth: but the lamp of the wicked shall be put out.",
    ["righteousness", "hope", "life"],
    ["light", "joy", "justice"],
    ["encouragement", "faith"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 13:10",
    "Pride Causes Conflict",
    "Only by pride cometh contention: but with the well advised is wisdom.",
    ["humility", "wisdom", "relationships"],
    ["pride", "conflict", "advice"],
    ["wisdom", "guidance"],
    ["angry", "reflective"]
  ),

    createProverb(
    "Proverbs 13:11",
    "Wealth Built Slowly",
    "Wealth gotten by vanity shall be diminished: but he that gathereth by labour shall increase.",
    ["wealth", "discipline", "stewardship"],
    ["money", "work", "growth"],
    ["finances", "wisdom"],
    ["reflective", "determined"]
  ),

  createProverb(
    "Proverbs 13:12",
    "Hope Deferred",
    "Hope deferred maketh the heart sick: but when the desire cometh, it is a tree of life.",
    ["hope", "encouragement", "desire"],
    ["waiting", "longing", "joy"],
    ["encouragement", "wisdom"],
    ["weary", "hopeful"]
  ),

  createProverb(
    "Proverbs 13:13",
    "Respect Wisdom",
    "Whoso despiseth the word shall be destroyed: but he that feareth the commandment shall be rewarded.",
    ["wisdom", "instruction", "obedience"],
    ["respect", "learning", "reward"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 13:14",
    "The Fountain of Life",
    "The law of the wise is a fountain of life, to depart from the snares of death.",
    ["wisdom", "guidance", "life"],
    ["instruction", "protection", "direction"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 13:15",
    "Good Understanding Brings Favor",
    "Good understanding giveth favour: but the way of transgressors is hard.",
    ["wisdom", "understanding", "favor"],
    ["choices", "paths", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 13:16",
    "Act With Knowledge",
    "Every prudent man dealeth with knowledge: but a fool layeth open his folly.",
    ["wisdom", "discernment", "prudence"],
    ["knowledge", "judgment", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 13:17",
    "Faithful Messengers Bring Healing",
    "A wicked messenger falleth into mischief: but a faithful ambassador is health.",
    ["faithfulness", "integrity", "service"],
    ["trust", "messenger", "reliability"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 13:18",
    "Correction Leads to Honor",
    "Poverty and shame shall be to him that refuseth instruction: but he that regardeth reproof shall be honoured.",
    ["instruction", "discipline", "growth"],
    ["correction", "learning", "honor"],
    ["wisdom", "guidance"],
    ["teachable", "reflective"]
  ),

  createProverb(
    "Proverbs 13:19",
    "Fulfilled Desire",
    "The desire accomplished is sweet to the soul: but it is abomination to fools to depart from evil.",
    ["desire", "wisdom", "choices"],
    ["fulfillment", "discipline", "growth"],
    ["encouragement", "wisdom"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 13:20",
    "Choose Your Company Wisely",
    "He that walketh with wise men shall be wise: but a companion of fools shall be destroyed.",
    ["relationships", "wisdom", "influence"],
    ["friends", "mentors", "choices"],
    ["wisdom", "guidance"],
    ["uncertain", "reflective"]
  ),

    createProverb(
    "Proverbs 13:21",
    "Trouble Pursues Sin",
    "Evil pursueth sinners: but to the righteous good shall be repayed.",
    ["justice", "righteousness", "consequences"],
    ["evil", "reward", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 13:22",
    "A Good Legacy",
    "A good man leaveth an inheritance to his children's children: and the wealth of the sinner is laid up for the just.",
    ["legacy", "stewardship", "family"],
    ["inheritance", "generosity", "wealth"],
    ["finances", "wisdom"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 13:23",
    "Poverty Is Not Always Laziness",
    "Much food is in the tillage of the poor: but there is that is destroyed for want of judgment.",
    ["justice", "wisdom", "discernment"],
    ["poverty", "judgment", "provision"],
    ["wisdom", "finances"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 13:24",
    "Loving Discipline",
    "He that spareth his rod hateth his son: but he that loveth him chasteneth him betimes.",
    ["discipline", "love", "training"],
    ["correction", "parenting", "instruction"],
    ["wisdom", "guidance"],
    ["reflective", "teachable"]
  ),

  createProverb(
    "Proverbs 13:25",
    "God Provides for the Righteous",
    "The righteous eateth to the satisfying of his soul: but the belly of the wicked shall want.",
    ["provision", "righteousness", "contentment"],
    ["satisfaction", "need", "trust"],
    ["faith", "encouragement"],
    ["worried", "hopeful"]
  ),

    createProverb(
    "Proverbs 14:1",
    "Wisdom Builds a Home",
    "Every wise woman buildeth her house: but the foolish plucketh it down with her hands.",
    ["wisdom", "family", "stewardship"],
    ["home", "building", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 14:2",
    "Reverence Shapes Character",
    "He that walketh in his uprightness feareth the Lord: but he that is perverse in his ways despiseth him.",
    ["integrity", "reverence", "character"],
    ["fear of the Lord", "uprightness", "choices"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 14:3",
    "Foolish Words Bring Trouble",
    "In the mouth of the foolish is a rod of pride: but the lips of the wise shall preserve them.",
    ["speech", "wisdom", "humility"],
    ["words", "pride", "self-control"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 14:4",
    "Work Brings Increase",
    "Where no oxen are, the crib is clean: but much increase is by the strength of the ox.",
    ["work", "productivity", "growth"],
    ["effort", "results", "increase"],
    ["motivation", "wisdom"],
    ["reflective", "determined"]
  ),

  createProverb(
    "Proverbs 14:5",
    "Truthful Witness",
    "A faithful witness will not lie: but a false witness will utter lies.",
    ["truth", "integrity", "justice"],
    ["honesty", "witness", "character"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

    createProverb(
    "Proverbs 14:6",
    "The Humble Find Wisdom",
    "A scorner seeketh wisdom, and findeth it not: but knowledge is easy unto him that understandeth.",
    ["wisdom", "humility", "learning"],
    ["knowledge", "attitude", "understanding"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 14:7",
    "Avoid Foolish Company",
    "Go from the presence of a foolish man, when thou perceivest not in him the lips of knowledge.",
    ["relationships", "discernment", "wisdom"],
    ["friends", "influence", "choices"],
    ["wisdom", "guidance"],
    ["uncertain", "reflective"]
  ),

  createProverb(
    "Proverbs 14:8",
    "The Wise Understand Their Path",
    "The wisdom of the prudent is to understand his way: but the folly of fools is deceit.",
    ["wisdom", "discernment", "direction"],
    ["choices", "path", "clarity"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 14:9",
    "Fools Mock Sin",
    "Fools make a mock at sin: but among the righteous there is favour.",
    ["righteousness", "character", "integrity"],
    ["sin", "mockery", "favor"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 14:10",
    "The Heart Knows Its Own Pain",
    "The heart knoweth his own bitterness; and a stranger doth not intermeddle with his joy.",
    ["heart", "emotion", "understanding"],
    ["pain", "joy", "experience"],
    ["encouragement", "wisdom"],
    ["hurt", "reflective"]
  ),

   createProverb(
    "Proverbs 14:11",
    "The Righteous House Stands",
    "The house of the wicked shall be overthrown: but the tabernacle of the upright shall flourish.",
    ["righteousness", "stability", "blessing"],
    ["house", "foundation", "flourish"],
    ["encouragement", "wisdom"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 14:12",
    "The Way That Seems Right",
    "There is a way which seemeth right unto a man, but the end thereof are the ways of death.",
    ["discernment", "direction", "wisdom"],
    ["choices", "path", "judgment"],
    ["wisdom", "guidance"],
    ["uncertain", "reflective"]
  ),

  createProverb(
    "Proverbs 14:13",
    "Hidden Sorrow",
    "Even in laughter the heart is sorrowful; and the end of that mirth is heaviness.",
    ["emotion", "heart", "understanding"],
    ["sorrow", "hidden pain", "life"],
    ["encouragement", "wisdom"],
    ["hurt", "reflective"]
  ),

  createProverb(
    "Proverbs 14:14",
    "The Backslider and the Good Man",
    "The backslider in heart shall be filled with his own ways: and a good man shall be satisfied from himself.",
    ["choices", "character", "integrity"],
    ["direction", "heart", "satisfaction"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 14:15",
    "The Prudent Consider Their Steps",
    "The simple believeth every word: but the prudent man looketh well to his going.",
    ["discernment", "wisdom", "prudence"],
    ["judgment", "choices", "understanding"],
    ["wisdom", "guidance"],
    ["uncertain", "seeking"]
  ),

    createProverb(
    "Proverbs 14:16",
    "Wisdom Avoids Danger",
    "A wise man feareth, and departeth from evil: but the fool rageth, and is confident.",
    ["wisdom", "discernment", "self-control"],
    ["danger", "choices", "prudence"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 14:17",
    "Quick Anger Brings Folly",
    "He that is soon angry dealeth foolishly: and a man of wicked devices is hated.",
    ["anger", "self-control", "character"],
    ["temper", "foolishness", "relationships"],
    ["wisdom", "guidance"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 14:18",
    "The Crown of Knowledge",
    "The simple inherit folly: but the prudent are crowned with knowledge.",
    ["wisdom", "knowledge", "growth"],
    ["learning", "prudence", "understanding"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 14:19",
    "Evil Will Bow to Good",
    "The evil bow before the good; and the wicked at the gates of the righteous.",
    ["justice", "righteousness", "truth"],
    ["victory", "integrity", "honor"],
    ["faith", "wisdom"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 14:20",
    "Wealth Affects Relationships",
    "The poor is hated even of his own neighbour: but the rich hath many friends.",
    ["relationships", "wisdom", "perspective"],
    ["wealth", "society", "reality"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

   createProverb(
    "Proverbs 14:21",
    "Kindness to the Poor",
    "He that despiseth his neighbour sinneth: but he that hath mercy on the poor, happy is he.",
    ["compassion", "kindness", "relationships"],
    ["mercy", "generosity", "neighbor"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 14:22",
    "Those Who Plan Good Find Mercy",
    "Do they not err that devise evil? but mercy and truth shall be to them that devise good.",
    ["goodness", "integrity", "planning"],
    ["truth", "mercy", "intentions"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 14:23",
    "Work Produces Results",
    "In all labour there is profit: but the talk of the lips tendeth only to penury.",
    ["work", "diligence", "discipline"],
    ["effort", "results", "action"],
    ["motivation", "wisdom"],
    ["determined", "reflective"]
  ),

  createProverb(
    "Proverbs 14:24",
    "Wisdom Is a Crown",
    "The crown of the wise is their riches: but the foolishness of fools is folly.",
    ["wisdom", "wealth", "honor"],
    ["success", "understanding", "character"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 14:25",
    "Truth Saves Lives",
    "A true witness delivereth souls: but a deceitful witness speaketh lies.",
    ["truth", "integrity", "justice"],
    ["witness", "honesty", "speech"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

    createProverb(
    "Proverbs 14:26",
    "Confidence in Reverence",
    "In the fear of the Lord is strong confidence: and his children shall have a place of refuge.",
    ["faith", "confidence", "security"],
    ["reverence", "refuge", "trust"],
    ["faith", "encouragement"],
    ["worried", "hopeful"]
  ),

  createProverb(
    "Proverbs 14:27",
    "The Fountain of Life",
    "The fear of the Lord is a fountain of life, to depart from the snares of death.",
    ["faith", "wisdom", "life"],
    ["guidance", "protection", "direction"],
    ["faith", "wisdom"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 14:28",
    "Strength in Numbers",
    "In the multitude of people is the king's honour: but in the want of people is the destruction of the prince.",
    ["leadership", "community", "influence"],
    ["authority", "people", "society"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 14:29",
    "Patience Shows Understanding",
    "He that is slow to wrath is of great understanding: but he that is hasty of spirit exalteth folly.",
    ["patience", "self-control", "wisdom"],
    ["anger", "temper", "understanding"],
    ["wisdom", "guidance"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 14:30",
    "Peace Brings Health",
    "A sound heart is the life of the flesh: but envy the rottenness of the bones.",
    ["peace", "health", "contentment"],
    ["envy", "heart", "well-being"],
    ["encouragement", "wisdom"],
    ["anxious", "reflective"]
  ),

  createProverb(
    "Proverbs 14:31",
    "Kindness Honors God",
    "He that oppresseth the poor reproacheth his Maker: but he that honoureth him hath mercy on the poor.",
    ["compassion", "justice", "faith"],
    ["mercy", "generosity", "character"],
    ["faith", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 14:32",
    "Hope in Death",
    "The wicked is driven away in his wickedness: but the righteous hath hope in his death.",
    ["hope", "faith", "righteousness"],
    ["eternity", "trust", "life"],
    ["faith", "encouragement"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 14:33",
    "Wisdom Rests in the Heart",
    "Wisdom resteth in the heart of him that hath understanding: but that which is in the midst of fools is made known.",
    ["wisdom", "understanding", "discernment"],
    ["heart", "knowledge", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 14:34",
    "Righteousness Exalts a Nation",
    "Righteousness exalteth a nation: but sin is a reproach to any people.",
    ["justice", "righteousness", "society"],
    ["nation", "integrity", "morality"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 14:35",
    "A Wise Servant Finds Favor",
    "The king's favour is toward a wise servant: but his wrath is against him that causeth shame.",
    ["wisdom", "leadership", "favor"],
    ["service", "honor", "responsibility"],
    ["leadership", "wisdom"],
    ["motivated", "reflective"]
  ),

    createProverb(
    "Proverbs 15:1",
    "A Gentle Answer",
    "A soft answer turneth away wrath: but grievous words stir up anger.",
    ["speech", "peace", "wisdom"],
    ["anger", "conflict", "communication"],
    ["relationships", "wisdom"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 15:2",
    "Wise Words Share Knowledge",
    "The tongue of the wise useth knowledge aright: but the mouth of fools poureth out foolishness.",
    ["speech", "wisdom", "knowledge"],
    ["words", "understanding", "communication"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 15:3",
    "God Sees Everything",
    "The eyes of the Lord are in every place, beholding the evil and the good.",
    ["faith", "awareness", "accountability"],
    ["God sees", "choices", "integrity"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 15:4",
    "Healing Words",
    "A wholesome tongue is a tree of life: but perverseness therein is a breach in the spirit.",
    ["speech", "healing", "wisdom"],
    ["words", "encouragement", "harm"],
    ["relationships", "wisdom"],
    ["hurt", "reflective"]
  ),

  createProverb(
    "Proverbs 15:5",
    "Respect Correction",
    "A fool despiseth his father's instruction: but he that regardeth reproof is prudent.",
    ["instruction", "wisdom", "discipline"],
    ["correction", "learning", "growth"],
    ["wisdom", "guidance"],
    ["teachable", "reflective"]
  ),

    createProverb(
    "Proverbs 15:6",
    "The House of the Righteous",
    "In the house of the righteous is much treasure: but in the revenues of the wicked is trouble.",
    ["righteousness", "wealth", "stability"],
    ["treasure", "integrity", "blessing"],
    ["wisdom", "guidance"],
    ["reflective", "hopeful"]
  ),

  createProverb(
    "Proverbs 15:7",
    "Spreading Knowledge",
    "The lips of the wise disperse knowledge: but the heart of the foolish doeth not so.",
    ["speech", "wisdom", "teaching"],
    ["knowledge", "understanding", "influence"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 15:8",
    "God Values the Heart",
    "The sacrifice of the wicked is an abomination to the Lord: but the prayer of the upright is his delight.",
    ["faith", "integrity", "prayer"],
    ["heart", "worship", "righteousness"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 15:9",
    "God Loves Righteous Pursuits",
    "The way of the wicked is an abomination unto the Lord: but he loveth him that followeth after righteousness.",
    ["righteousness", "faith", "direction"],
    ["choices", "path", "devotion"],
    ["faith", "wisdom"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 15:10",
    "Correction Leads to Life",
    "Correction is grievous unto him that forsaketh the way: and he that hateth reproof shall die.",
    ["correction", "discipline", "wisdom"],
    ["instruction", "learning", "growth"],
    ["wisdom", "guidance"],
    ["teachable", "reflective"]
  ),

    createProverb(
    "Proverbs 15:11",
    "Nothing Is Hidden From God",
    "Hell and destruction are before the Lord: how much more then the hearts of the children of men?",
    ["faith", "awareness", "accountability"],
    ["God sees", "heart", "truth"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 15:12",
    "Pride Rejects Correction",
    "A scorner loveth not one that reproveth him: neither will he go unto the wise.",
    ["humility", "instruction", "wisdom"],
    ["correction", "pride", "learning"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 15:13",
    "A Cheerful Heart",
    "A merry heart maketh a cheerful countenance: but by sorrow of the heart the spirit is broken.",
    ["joy", "emotion", "heart"],
    ["encouragement", "spirit", "life"],
    ["encouragement", "wisdom"],
    ["sad", "reflective"]
  ),

  createProverb(
    "Proverbs 15:14",
    "Seek Knowledge",
    "The heart of him that hath understanding seeketh knowledge: but the mouth of fools feedeth on foolishness.",
    ["wisdom", "learning", "discernment"],
    ["knowledge", "growth", "understanding"],
    ["wisdom", "guidance"],
    ["seeking", "curious"]
  ),

  createProverb(
    "Proverbs 15:15",
    "A Joyful Heart Brings Peace",
    "All the days of the afflicted are evil: but he that is of a merry heart hath a continual feast.",
    ["joy", "contentment", "peace"],
    ["attitude", "hope", "perspective"],
    ["encouragement", "wisdom"],
    ["weary", "hopeful"]
  ),

    createProverb(
    "Proverbs 15:16",
    "Better With Reverence",
    "Better is little with the fear of the Lord than great treasure and trouble therewith.",
    ["contentment", "faith", "wisdom"],
    ["wealth", "peace", "priorities"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 15:17",
    "Love Over Luxury",
    "Better is a dinner of herbs where love is, than a stalled ox and hatred therewith.",
    ["love", "relationships", "contentment"],
    ["peace", "family", "priorities"],
    ["relationships", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 15:18",
    "Patience Prevents Conflict",
    "A wrathful man stirreth up strife: but he that is slow to anger appeaseth strife.",
    ["patience", "self-control", "peace"],
    ["anger", "conflict", "restraint"],
    ["wisdom", "guidance"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 15:19",
    "Diligence Clears the Path",
    "The way of the slothful man is as an hedge of thorns: but the way of the righteous is made plain.",
    ["diligence", "discipline", "direction"],
    ["work", "effort", "progress"],
    ["motivation", "wisdom"],
    ["determined", "reflective"]
  ),

  createProverb(
    "Proverbs 15:20",
    "Wisdom Brings Joy to Parents",
    "A wise son maketh a glad father: but a foolish man despiseth his mother.",
    ["wisdom", "family", "honor"],
    ["parents", "respect", "choices"],
    ["relationships", "wisdom"],
    ["reflective", "motivated"]
  ),

    createProverb(
    "Proverbs 15:21",
    "Fools Enjoy Folly",
    "Folly is joy to him that is destitute of wisdom: but a man of understanding walketh uprightly.",
    ["wisdom", "discernment", "character"],
    ["folly", "choices", "direction"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 15:22",
    "Plans Need Counsel",
    "Without counsel purposes are disappointed: but in the multitude of counsellors they are established.",
    ["planning", "wisdom", "guidance"],
    ["advice", "mentors", "decisions"],
    ["leadership", "wisdom"],
    ["uncertain", "seeking"]
  ),

  createProverb(
    "Proverbs 15:23",
    "Timely Words Bring Joy",
    "A man hath joy by the answer of his mouth: and a word spoken in due season, how good is it!",
    ["speech", "encouragement", "wisdom"],
    ["timing", "communication", "joy"],
    ["relationships", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 15:24",
    "The Path of Life",
    "The way of life is above to the wise, that he may depart from hell beneath.",
    ["wisdom", "direction", "life"],
    ["choices", "path", "guidance"],
    ["wisdom", "faith"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 15:25",
    "God Protects the Humble",
    "The Lord will destroy the house of the proud: but he will establish the border of the widow.",
    ["justice", "humility", "faith"],
    ["pride", "protection", "compassion"],
    ["faith", "wisdom"],
    ["reflective", "convicted"]
  ),

    createProverb(
    "Proverbs 15:26",
    "God Delights in Pure Thoughts",
    "The thoughts of the wicked are an abomination to the Lord: but the words of the pure are pleasant words.",
    ["thoughts", "purity", "speech"],
    ["mindset", "integrity", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 15:27",
    "Greed Brings Trouble",
    "He that is greedy of gain troubleth his own house; but he that hateth gifts shall live.",
    ["integrity", "contentment", "family"],
    ["greed", "money", "choices"],
    ["finances", "wisdom"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 15:28",
    "The Wise Think Before Speaking",
    "The heart of the righteous studieth to answer: but the mouth of the wicked poureth out evil things.",
    ["speech", "wisdom", "self-control"],
    ["words", "thinking", "communication"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 15:29",
    "God Hears the Righteous",
    "The Lord is far from the wicked: but he heareth the prayer of the righteous.",
    ["faith", "prayer", "righteousness"],
    ["relationship with God", "trust", "hope"],
    ["faith", "encouragement"],
    ["hopeful", "seeking"]
  ),

  createProverb(
    "Proverbs 15:30",
    "Good News Revives the Soul",
    "The light of the eyes rejoiceth the heart: and a good report maketh the bones fat.",
    ["encouragement", "joy", "hope"],
    ["good news", "life", "uplift"],
    ["encouragement", "relationships"],
    ["weary", "hopeful"]
  ),

  createProverb(
    "Proverbs 15:31",
    "Listening to Correction",
    "The ear that heareth the reproof of life abideth among the wise.",
    ["instruction", "wisdom", "growth"],
    ["correction", "learning", "discipline"],
    ["wisdom", "guidance"],
    ["teachable", "reflective"]
  ),

  createProverb(
    "Proverbs 15:32",
    "Rejecting Correction Harms Yourself",
    "He that refuseth instruction despiseth his own soul: but he that heareth reproof getteth understanding.",
    ["instruction", "wisdom", "growth"],
    ["learning", "understanding", "discipline"],
    ["wisdom", "guidance"],
    ["reflective", "teachable"]
  ),

  createProverb(
    "Proverbs 15:33",
    "Humility Leads to Honor",
    "The fear of the Lord is the instruction of wisdom; and before honour is humility.",
    ["humility", "wisdom", "honor"],
    ["reverence", "character", "growth"],
    ["wisdom", "faith"],
    ["reflective", "motivated"]
  ),

   createProverb(
    "Proverbs 16:1",
    "God Directs the Answer",
    "The preparations of the heart in man, and the answer of the tongue, is from the Lord.",
    ["guidance", "planning", "faith"],
    ["decisions", "direction", "speech"],
    ["faith", "wisdom"],
    ["uncertain", "seeking"]
  ),

  createProverb(
    "Proverbs 16:2",
    "God Weighs Motives",
    "All the ways of a man are clean in his own eyes; but the Lord weigheth the spirits.",
    ["discernment", "self-awareness", "faith"],
    ["motives", "judgment", "heart"],
    ["wisdom", "faith"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 16:3",
    "Commit Your Work to God",
    "Commit thy works unto the Lord, and thy thoughts shall be established.",
    ["faith", "planning", "trust"],
    ["commitment", "direction", "purpose"],
    ["faith", "guidance"],
    ["uncertain", "hopeful"]
  ),

  createProverb(
    "Proverbs 16:4",
    "God’s Purposes Stand",
    "The Lord hath made all things for himself: yea, even the wicked for the day of evil.",
    ["faith", "sovereignty", "purpose"],
    ["God's plan", "justice", "creation"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 16:5",
    "Pride Brings Judgment",
    "Every one that is proud in heart is an abomination to the Lord: though hand join in hand, he shall not be unpunished.",
    ["humility", "character", "justice"],
    ["pride", "judgment", "integrity"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

    createProverb(
    "Proverbs 16:6",
    "Mercy and Truth",
    "By mercy and truth iniquity is purged: and by the fear of the Lord men depart from evil.",
    ["mercy", "truth", "repentance"],
    ["forgiveness", "reverence", "change"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 16:7",
    "Peace With Others",
    "When a man's ways please the Lord, he maketh even his enemies to be at peace with him.",
    ["peace", "faith", "relationships"],
    ["favor", "enemies", "harmony"],
    ["faith", "encouragement"],
    ["hopeful", "seeking"]
  ),

  createProverb(
    "Proverbs 16:8",
    "Better Than Great Wealth",
    "Better is a little with righteousness than great revenues without right.",
    ["contentment", "integrity", "wealth"],
    ["priorities", "values", "money"],
    ["wisdom", "finances"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 16:9",
    "God Directs Our Steps",
    "A man's heart deviseth his way: but the Lord directeth his steps.",
    ["guidance", "faith", "direction"],
    ["planning", "decisions", "path"],
    ["faith", "wisdom"],
    ["uncertain", "hopeful"]
  ),

  createProverb(
    "Proverbs 16:10",
    "Righteous Leadership",
    "A divine sentence is in the lips of the king: his mouth transgresseth not in judgment.",
    ["leadership", "justice", "authority"],
    ["decisions", "governance", "judgment"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

   createProverb(
    "Proverbs 16:11",
    "Honest Scales",
    "A just weight and balance are the Lord's: all the weights of the bag are his work.",
    ["integrity", "justice", "honesty"],
    ["fairness", "business", "truth"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 16:12",
    "Righteous Leadership",
    "It is an abomination to kings to commit wickedness: for the throne is established by righteousness.",
    ["leadership", "justice", "righteousness"],
    ["authority", "integrity", "governance"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 16:13",
    "Leaders Value Truth",
    "Righteous lips are the delight of kings; and they love him that speaketh right.",
    ["speech", "truth", "leadership"],
    ["honesty", "communication", "integrity"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 16:14",
    "The Power of Authority",
    "The wrath of a king is as messengers of death: but a wise man will pacify it.",
    ["wisdom", "leadership", "discernment"],
    ["authority", "conflict", "peace"],
    ["leadership", "wisdom"],
    ["uncertain", "reflective"]
  ),

  createProverb(
    "Proverbs 16:15",
    "Favor Brings Life",
    "In the light of the king's countenance is life; and his favour is as a cloud of the latter rain.",
    ["favor", "leadership", "blessing"],
    ["authority", "life", "influence"],
    ["leadership", "wisdom"],
    ["hopeful", "reflective"]
  ),

    createProverb(
    "Proverbs 16:16",
    "Wisdom Is Better Than Gold",
    "How much better is it to get wisdom than gold! and to get understanding rather to be chosen than silver!",
    ["wisdom", "value", "priorities"],
    ["understanding", "wealth", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 16:17",
    "Avoid the Path of Evil",
    "The highway of the upright is to depart from evil: he that keepeth his way preserveth his soul.",
    ["integrity", "direction", "wisdom"],
    ["choices", "path", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 16:18",
    "Pride Leads to Destruction",
    "Pride goeth before destruction, and an haughty spirit before a fall.",
    ["humility", "character", "warning"],
    ["pride", "fall", "discipline"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 16:19",
    "Humility Over Pride",
    "Better it is to be of an humble spirit with the lowly, than to divide the spoil with the proud.",
    ["humility", "wisdom", "character"],
    ["pride", "choices", "values"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 16:20",
    "Trust Brings Blessing",
    "He that handleth a matter wisely shall find good: and whoso trusteth in the Lord, happy is he.",
    ["faith", "wisdom", "blessing"],
    ["trust", "decisions", "good"],
    ["faith", "wisdom"],
    ["hopeful", "seeking"]
  ),

    createProverb(
    "Proverbs 16:21",
    "The Wise Are Known for Understanding",
    "The wise in heart shall be called prudent: and the sweetness of the lips increaseth learning.",
    ["wisdom", "understanding", "speech"],
    ["prudence", "communication", "learning"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 16:22",
    "Wisdom Is a Fountain of Life",
    "Understanding is a wellspring of life unto him that hath it: but the instruction of fools is folly.",
    ["wisdom", "life", "understanding"],
    ["knowledge", "learning", "growth"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 16:23",
    "The Wise Think Before Speaking",
    "The heart of the wise teacheth his mouth, and addeth learning to his lips.",
    ["speech", "wisdom", "self-control"],
    ["communication", "thoughtfulness", "learning"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 16:24",
    "Kind Words Bring Healing",
    "Pleasant words are as an honeycomb, sweet to the soul, and health to the bones.",
    ["speech", "encouragement", "healing"],
    ["kindness", "words", "comfort"],
    ["relationships", "wisdom"],
    ["hurt", "hopeful"]
  ),

  createProverb(
    "Proverbs 16:25",
    "The Way That Seems Right",
    "There is a way that seemeth right unto a man, but the end thereof are the ways of death.",
    ["discernment", "direction", "wisdom"],
    ["choices", "path", "judgment"],
    ["wisdom", "guidance"],
    ["uncertain", "reflective"]
  ),

    createProverb(
    "Proverbs 16:26",
    "Hunger Motivates Work",
    "He that laboureth laboureth for himself; for his mouth craveth it of him.",
    ["work", "diligence", "motivation"],
    ["effort", "discipline", "labor"],
    ["motivation", "wisdom"],
    ["determined", "reflective"]
  ),

  createProverb(
    "Proverbs 16:27",
    "The Destructive Plotter",
    "An ungodly man diggeth up evil: and in his lips there is as a burning fire.",
    ["character", "warning", "speech"],
    ["evil", "destruction", "words"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 16:28",
    "Sowing Discord",
    "A froward man soweth strife: and a whisperer separateth chief friends.",
    ["relationships", "speech", "peace"],
    ["gossip", "conflict", "division"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 16:29",
    "Influence Toward Evil",
    "A violent man enticeth his neighbour, and leadeth him into the way that is not good.",
    ["influence", "discernment", "choices"],
    ["peer pressure", "direction", "character"],
    ["wisdom", "guidance"],
    ["uncertain", "reflective"]
  ),

  createProverb(
    "Proverbs 16:30",
    "Plotting Evil",
    "He shutteth his eyes to devise froward things: moving his lips he bringeth evil to pass.",
    ["character", "warning", "intentions"],
    ["evil plans", "deception", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 16:31",
    "Honor in a Righteous Life",
    "The hoary head is a crown of glory, if it be found in the way of righteousness.",
    ["honor", "wisdom", "legacy"],
    ["age", "character", "righteousness"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 16:32",
    "Self-Control Is Greater Than Power",
    "He that is slow to anger is better than the mighty; and he that ruleth his spirit than he that taketh a city.",
    ["self-control", "wisdom", "strength"],
    ["patience", "discipline", "character"],
    ["wisdom", "guidance"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 16:33",
    "God Controls the Outcome",
    "The lot is cast into the lap; but the whole disposing thereof is of the Lord.",
    ["faith", "sovereignty", "trust"],
    ["chance", "control", "God's will"],
    ["faith", "wisdom"],
    ["uncertain", "hopeful"]
  ),

   createProverb(
    "Proverbs 17:1",
    "Peace Is Better Than Plenty With Strife",
    "Better is a dry morsel, and quietness therewith, than an house full of sacrifices with strife.",
    ["peace", "contentment", "relationships"],
    ["conflict", "home", "priorities"],
    ["relationships", "wisdom"],
    ["stressed", "reflective"]
  ),

  createProverb(
    "Proverbs 17:2",
    "Wisdom Rises Above Status",
    "A wise servant shall have rule over a son that causeth shame, and shall have part of the inheritance among the brethren.",
    ["wisdom", "honor", "leadership"],
    ["character", "responsibility", "favor"],
    ["leadership", "wisdom"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 17:3",
    "God Tests the Heart",
    "The fining pot is for silver, and the furnace for gold: but the Lord trieth the hearts.",
    ["faith", "character", "testing"],
    ["heart", "refinement", "growth"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 17:4",
    "Wrong Hearts Listen to Wrong Words",
    "A wicked doer giveth heed to false lips; and a liar giveth ear to a naughty tongue.",
    ["discernment", "truth", "character"],
    ["lies", "deception", "influence"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 17:5",
    "Mocking the Poor Dishonors God",
    "Whoso mocketh the poor reproacheth his Maker: and he that is glad at calamities shall not be unpunished.",
    ["compassion", "justice", "faith"],
    ["poor", "mercy", "judgment"],
    ["faith", "wisdom"],
    ["reflective", "convicted"]
  ),

   createProverb(
    "Proverbs 17:6",
    "Honor Across Generations",
    "Children's children are the crown of old men; and the glory of children are their fathers.",
    ["family", "legacy", "honor"],
    ["generations", "heritage", "relationships"],
    ["relationships", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 17:7",
    "Integrity in Speech",
    "Excellent speech becometh not a fool: much less do lying lips a prince.",
    ["speech", "integrity", "character"],
    ["honesty", "leadership", "words"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 17:8",
    "Influence of Gifts",
    "A gift is as a precious stone in the eyes of him that hath it: whithersoever it turneth, it prospereth.",
    ["influence", "favor", "wisdom"],
    ["gifts", "relationships", "opportunity"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 17:9",
    "Love Covers Offenses",
    "He that covereth a transgression seeketh love; but he that repeateth a matter separateth very friends.",
    ["forgiveness", "relationships", "love"],
    ["gossip", "peace", "conflict"],
    ["relationships", "wisdom"],
    ["hurt", "reflective"]
  ),

  createProverb(
    "Proverbs 17:10",
    "Correction Reaches the Wise",
    "A reproof entereth more into a wise man than an hundred stripes into a fool.",
    ["instruction", "wisdom", "discipline"],
    ["correction", "learning", "growth"],
    ["wisdom", "guidance"],
    ["teachable", "reflective"]
  ),

    createProverb(
    "Proverbs 17:11",
    "Rebellion Brings Consequences",
    "An evil man seeketh only rebellion: therefore a cruel messenger shall be sent against him.",
    ["rebellion", "justice", "warning"],
    ["consequences", "authority", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 17:12",
    "Folly Is Dangerous",
    "Let a bear robbed of her whelps meet a man, rather than a fool in his folly.",
    ["wisdom", "warning", "discernment"],
    ["danger", "folly", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 17:13",
    "Evil for Good",
    "Whoso rewardeth evil for good, evil shall not depart from his house.",
    ["justice", "integrity", "character"],
    ["gratitude", "consequences", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 17:14",
    "Stop Conflict Early",
    "The beginning of strife is as when one letteth out water: therefore leave off contention, before it be meddled with.",
    ["peace", "conflict", "wisdom"],
    ["arguments", "restraint", "relationships"],
    ["relationships", "wisdom"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 17:15",
    "Justice Matters",
    "He that justifieth the wicked, and he that condemneth the just, even they both are abomination to the Lord.",
    ["justice", "integrity", "truth"],
    ["judgment", "fairness", "character"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

    createProverb(
    "Proverbs 17:16",
    "Wisdom Cannot Be Bought by Fools",
    "Wherefore is there a price in the hand of a fool to get wisdom, seeing he hath no heart to it?",
    ["wisdom", "discernment", "character"],
    ["learning", "attitude", "understanding"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 17:17",
    "True Friendship",
    "A friend loveth at all times, and a brother is born for adversity.",
    ["friendship", "loyalty", "relationships"],
    ["support", "love", "community"],
    ["relationships", "encouragement"],
    ["hurt", "hopeful"]
  ),

  createProverb(
    "Proverbs 17:18",
    "Reckless Guarantees",
    "A man void of understanding striketh hands, and becometh surety in the presence of his friend.",
    ["financial wisdom", "prudence", "discernment"],
    ["debt", "guarantee", "responsibility"],
    ["finances", "wisdom"],
    ["uncertain", "reflective"]
  ),

  createProverb(
    "Proverbs 17:19",
    "Love Peace",
    "He loveth transgression that loveth strife: and he that exalteth his gate seeketh destruction.",
    ["peace", "character", "wisdom"],
    ["conflict", "pride", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 17:20",
    "Crooked Hearts Find Trouble",
    "He that hath a froward heart findeth no good: and he that hath a perverse tongue falleth into mischief.",
    ["speech", "character", "integrity"],
    ["heart", "words", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ), 

    createProverb(
    "Proverbs 17:21",
    "Foolishness Brings Grief",
    "He that begetteth a fool doeth it to his sorrow: and the father of a fool hath no joy.",
    ["wisdom", "family", "consequences"],
    ["parenting", "choices", "sorrow"],
    ["relationships", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 17:22",
    "A Joyful Heart Heals",
    "A merry heart doeth good like a medicine: but a broken spirit drieth the bones.",
    ["joy", "healing", "encouragement"],
    ["heart", "health", "spirit"],
    ["encouragement", "wisdom"],
    ["sad", "hopeful"]
  ),

  createProverb(
    "Proverbs 17:23",
    "Corruption in Justice",
    "A wicked man taketh a gift out of the bosom to pervert the ways of judgment.",
    ["justice", "integrity", "warning"],
    ["bribery", "corruption", "judgment"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 17:24",
    "Focus on Wisdom",
    "Wisdom is before him that hath understanding; but the eyes of a fool are in the ends of the earth.",
    ["wisdom", "focus", "discernment"],
    ["attention", "understanding", "direction"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 17:25",
    "Foolishness Brings Grief to Parents",
    "A foolish son is a grief to his father, and bitterness to her that bare him.",
    ["family", "wisdom", "choices"],
    ["parents", "consequences", "character"],
    ["relationships", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 17:26",
    "Punishing the Innocent Is Wrong",
    "Also to punish the just is not good, nor to strike princes for equity.",
    ["justice", "fairness", "integrity"],
    ["leadership", "judgment", "truth"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 17:27",
    "Wisdom Uses Few Words",
    "He that hath knowledge spareth his words: and a man of understanding is of an excellent spirit.",
    ["speech", "wisdom", "self-control"],
    ["restraint", "knowledge", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 17:28",
    "Silence Can Be Wise",
    "Even a fool, when he holdeth his peace, is counted wise: and he that shutteth his lips is esteemed a man of understanding.",
    ["speech", "wisdom", "restraint"],
    ["silence", "self-control", "discernment"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

   createProverb(
    "Proverbs 18:1",
    "Isolation Breeds Self-Will",
    "Through desire a man, having separated himself, seeketh and intermeddleth with all wisdom.",
    ["relationships", "discernment", "wisdom"],
    ["isolation", "self-will", "understanding"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 18:2",
    "Fools Prefer Their Own Opinions",
    "A fool hath no delight in understanding, but that his heart may discover itself.",
    ["wisdom", "discernment", "character"],
    ["understanding", "self-expression", "pride"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 18:3",
    "Wickedness Brings Shame",
    "When the wicked cometh, then cometh also contempt, and with ignominy reproach.",
    ["character", "consequences", "warning"],
    ["wickedness", "shame", "reputation"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 18:4",
    "Words of Wisdom",
    "The words of a man's mouth are as deep waters, and the wellspring of wisdom as a flowing brook.",
    ["speech", "wisdom", "understanding"],
    ["words", "depth", "insight"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 18:5",
    "Justice Must Be Fair",
    "It is not good to accept the person of the wicked, to overthrow the righteous in judgment.",
    ["justice", "integrity", "fairness"],
    ["judgment", "truth", "character"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

    createProverb(
    "Proverbs 18:6",
    "Foolish Words Cause Conflict",
    "A fool's lips enter into contention, and his mouth calleth for strokes.",
    ["speech", "conflict", "wisdom"],
    ["arguments", "words", "discipline"],
    ["wisdom", "guidance"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 18:7",
    "Words Can Destroy",
    "A fool's mouth is his destruction, and his lips are the snare of his soul.",
    ["speech", "self-control", "character"],
    ["words", "consequences", "wisdom"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 18:8",
    "The Danger of Gossip",
    "The words of a talebearer are as wounds, and they go down into the innermost parts of the belly.",
    ["speech", "relationships", "warning"],
    ["gossip", "hurt", "conflict"],
    ["relationships", "wisdom"],
    ["hurt", "reflective"]
  ),

  createProverb(
    "Proverbs 18:9",
    "Laziness Destroys",
    "He also that is slothful in his work is brother to him that is a great waster.",
    ["diligence", "discipline", "work"],
    ["laziness", "waste", "responsibility"],
    ["motivation", "wisdom"],
    ["reflective", "determined"]
  ),

  createProverb(
    "Proverbs 18:10",
    "God Is Our Refuge",
    "The name of the Lord is a strong tower: the righteous runneth into it, and is safe.",
    ["faith", "security", "trust"],
    ["protection", "refuge", "God"],
    ["faith", "encouragement"],
    ["afraid", "hopeful"]
  ),

   createProverb(
    "Proverbs 18:11",
    "False Security of Wealth",
    "The rich man's wealth is his strong city, and as an high wall in his own conceit.",
    ["wealth", "perspective", "wisdom"],
    ["money", "security", "illusion"],
    ["finances", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 18:12",
    "Humility Before Honor",
    "Before destruction the heart of man is haughty, and before honour is humility.",
    ["humility", "character", "wisdom"],
    ["pride", "honor", "growth"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 18:13",
    "Listen Before Answering",
    "He that answereth a matter before he heareth it, it is folly and shame unto him.",
    ["communication", "wisdom", "discernment"],
    ["listening", "judgment", "speech"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 18:14",
    "Strength of Spirit",
    "The spirit of a man will sustain his infirmity; but a wounded spirit who can bear?",
    ["strength", "emotion", "encouragement"],
    ["spirit", "pain", "resilience"],
    ["encouragement", "wisdom"],
    ["hurt", "reflective"]
  ),

  createProverb(
    "Proverbs 18:15",
    "Seek Knowledge",
    "The heart of the prudent getteth knowledge; and the ear of the wise seeketh knowledge.",
    ["wisdom", "learning", "growth"],
    ["knowledge", "curiosity", "understanding"],
    ["wisdom", "guidance"],
    ["seeking", "curious"]
  ),

   createProverb(
    "Proverbs 18:16",
    "Gifts Open Doors",
    "A man's gift maketh room for him, and bringeth him before great men.",
    ["opportunity", "favor", "wisdom"],
    ["gifts", "influence", "advancement"],
    ["leadership", "wisdom"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 18:17",
    "Hear Both Sides",
    "He that is first in his own cause seemeth just; but his neighbour cometh and searcheth him.",
    ["discernment", "justice", "wisdom"],
    ["judgment", "evidence", "fairness"],
    ["wisdom", "guidance"],
    ["uncertain", "reflective"]
  ),

  createProverb(
    "Proverbs 18:18",
    "Resolving Disputes",
    "The lot causeth contentions to cease, and parteth between the mighty.",
    ["conflict", "resolution", "wisdom"],
    ["decisions", "disputes", "peace"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 18:19",
    "Broken Relationships",
    "A brother offended is harder to be won than a strong city: and their contentions are like the bars of a castle.",
    ["relationships", "conflict", "forgiveness"],
    ["offense", "family", "reconciliation"],
    ["relationships", "wisdom"],
    ["hurt", "reflective"]
  ),

  createProverb(
    "Proverbs 18:20",
    "The Fruit of Words",
    "A man's belly shall be satisfied with the fruit of his mouth; and with the increase of his lips shall he be filled.",
    ["speech", "wisdom", "consequences"],
    ["words", "results", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

   createProverb(
    "Proverbs 18:21",
    "Power of Words",
    "Death and life are in the power of the tongue: and they that love it shall eat the fruit thereof.",
    ["speech", "wisdom", "consequences"],
    ["words", "life", "death"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 18:22",
    "A Good Spouse Is a Blessing",
    "Whoso findeth a wife findeth a good thing, and obtaineth favour of the Lord.",
    ["marriage", "relationships", "blessing"],
    ["family", "favor", "love"],
    ["relationships", "faith"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 18:23",
    "Wealth and Speech",
    "The poor useth intreaties; but the rich answereth roughly.",
    ["speech", "relationships", "wisdom"],
    ["wealth", "communication", "attitude"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 18:24",
    "A True Friend",
    "A man that hath friends must shew himself friendly: and there is a friend that sticketh closer than a brother.",
    ["friendship", "relationships", "loyalty"],
    ["community", "support", "love"],
    ["relationships", "encouragement"],
    ["hurt", "hopeful"]
  ),

    createProverb(
    "Proverbs 19:1",
    "Integrity Over Wealth",
    "Better is the poor that walketh in his integrity, than he that is perverse in his lips, and is a fool.",
    ["integrity", "character", "wisdom"],
    ["honesty", "speech", "values"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 19:2",
    "Zeal Without Knowledge",
    "Also, that the soul be without knowledge, it is not good; and he that hasteth with his feet sinneth.",
    ["wisdom", "discernment", "decisions"],
    ["knowledge", "patience", "judgment"],
    ["wisdom", "guidance"],
    ["uncertain", "reflective"]
  ),

  createProverb(
    "Proverbs 19:3",
    "Blaming God for Our Choices",
    "The foolishness of man perverteth his way: and his heart fretteth against the Lord.",
    ["responsibility", "character", "wisdom"],
    ["choices", "blame", "accountability"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 19:4",
    "Wealth Attracts Friends",
    "Wealth maketh many friends; but the poor is separated from his neighbour.",
    ["wealth", "relationships", "perspective"],
    ["money", "society", "reality"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 19:5",
    "False Witness Will Be Judged",
    "A false witness shall not be unpunished, and he that speaketh lies shall not escape.",
    ["truth", "justice", "integrity"],
    ["lies", "judgment", "character"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ), 

    createProverb(
    "Proverbs 19:6",
    "Influence of Generosity",
    "Many will intreat the favour of the prince: and every man is a friend to him that giveth gifts.",
    ["relationships", "influence", "wisdom"],
    ["favor", "generosity", "social dynamics"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 19:7",
    "The Loneliness of Poverty",
    "All the brethren of the poor do hate him: how much more do his friends go far from him? he pursueth them with words, yet they are wanting to him.",
    ["relationships", "poverty", "perspective"],
    ["loneliness", "society", "reality"],
    ["wisdom", "guidance"],
    ["hurt", "reflective"]
  ),

  createProverb(
    "Proverbs 19:8",
    "Loving Wisdom Benefits You",
    "He that getteth wisdom loveth his own soul: he that keepeth understanding shall find good.",
    ["wisdom", "self-improvement", "growth"],
    ["understanding", "learning", "benefit"],
    ["wisdom", "guidance"],
    ["motivated", "seeking"]
  ),

  createProverb(
    "Proverbs 19:9",
    "Lies Bring Judgment",
    "A false witness shall not be unpunished, and he that speaketh lies shall perish.",
    ["truth", "justice", "integrity"],
    ["lies", "judgment", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 19:10",
    "Fools and Power",
    "Delight is not seemly for a fool; much less for a servant to have rule over princes.",
    ["leadership", "wisdom", "character"],
    ["authority", "responsibility", "discernment"],
    ["leadership", "wisdom"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 19:11",
    "Patience Brings Honor",
    "The discretion of a man deferreth his anger; and it is his glory to pass over a transgression.",
    ["patience", "forgiveness", "wisdom"],
    ["anger", "restraint", "relationships"],
    ["wisdom", "guidance"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 19:12",
    "Authority and Favor",
    "The king's wrath is as the roaring of a lion; but his favour is as dew upon the grass.",
    ["leadership", "authority", "favor"],
    ["power", "influence", "justice"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 19:13",
    "Family Strife",
    "A foolish son is the calamity of his father: and the contentions of a wife are a continual dropping.",
    ["family", "relationships", "wisdom"],
    ["conflict", "home", "choices"],
    ["relationships", "wisdom"],
    ["stressed", "reflective"]
  ),

  createProverb(
    "Proverbs 19:14",
    "A Wise Spouse Is a Blessing",
    "House and riches are the inheritance of fathers: and a prudent wife is from the Lord.",
    ["marriage", "family", "blessing"],
    ["wisdom", "relationships", "favor"],
    ["faith", "relationships"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 19:15",
    "Laziness Brings Poverty",
    "Slothfulness casteth into a deep sleep; and an idle soul shall suffer hunger.",
    ["discipline", "work", "diligence"],
    ["laziness", "effort", "responsibility"],
    ["motivation", "wisdom"],
    ["unmotivated", "determined"]
  ),

    createProverb(
    "Proverbs 19:16",
    "Obedience Protects Life",
    "He that keepeth the commandment keepeth his own soul; but he that despiseth his ways shall die.",
    ["obedience", "wisdom", "discipline"],
    ["commands", "choices", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 19:17",
    "Kindness to the Poor",
    "He that hath pity upon the poor lendeth unto the Lord; and that which he hath given will he pay him again.",
    ["compassion", "generosity", "faith"],
    ["charity", "kindness", "blessing"],
    ["faith", "wisdom"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 19:18",
    "Discipline While There Is Hope",
    "Chasten thy son while there is hope, and let not thy soul spare for his crying.",
    ["discipline", "parenting", "wisdom"],
    ["correction", "training", "family"],
    ["wisdom", "guidance"],
    ["reflective", "teachable"]
  ),

  createProverb(
    "Proverbs 19:19",
    "Uncontrolled Anger",
    "A man of great wrath shall suffer punishment: for if thou deliver him, yet thou must do it again.",
    ["anger", "self-control", "wisdom"],
    ["temper", "discipline", "consequences"],
    ["wisdom", "guidance"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 19:20",
    "Seek Advice",
    "Hear counsel, and receive instruction, that thou mayest be wise in thy latter end.",
    ["wisdom", "guidance", "learning"],
    ["advice", "instruction", "growth"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

    createProverb(
    "Proverbs 19:21",
    "God’s Plan Prevails",
    "There are many devices in a man's heart; nevertheless the counsel of the Lord, that shall stand.",
    ["guidance", "faith", "planning"],
    ["purpose", "God's will", "direction"],
    ["faith", "wisdom"],
    ["uncertain", "seeking"]
  ),

  createProverb(
    "Proverbs 19:22",
    "Kindness Is Valuable",
    "The desire of a man is his kindness: and a poor man is better than a liar.",
    ["kindness", "integrity", "character"],
    ["truth", "compassion", "values"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 19:23",
    "Reverence Brings Life",
    "The fear of the Lord tendeth to life: and he that hath it shall abide satisfied; he shall not be visited with evil.",
    ["faith", "peace", "security"],
    ["reverence", "life", "satisfaction"],
    ["faith", "encouragement"],
    ["worried", "hopeful"]
  ),

  createProverb(
    "Proverbs 19:24",
    "Extreme Laziness",
    "A slothful man hideth his hand in his bosom, and will not so much as bring it to his mouth again.",
    ["laziness", "discipline", "work"],
    ["effort", "motivation", "responsibility"],
    ["motivation", "wisdom"],
    ["unmotivated", "reflective"]
  ),

  createProverb(
    "Proverbs 19:25",
    "Correction Teaches Wisdom",
    "Smite a scorner, and the simple will beware: and reprove one that hath understanding, and he will understand knowledge.",
    ["instruction", "wisdom", "learning"],
    ["correction", "growth", "discipline"],
    ["wisdom", "guidance"],
    ["teachable", "reflective"]
  ), 

    createProverb(
    "Proverbs 19:26",
    "Dishonoring Parents",
    "He that wasteth his father, and chaseth away his mother, is a son that causeth shame, and bringeth reproach.",
    ["family", "honor", "character"],
    ["parents", "responsibility", "choices"],
    ["relationships", "wisdom"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 19:27",
    "Stay Open to Instruction",
    "Cease, my son, to hear the instruction that causeth to err from the words of knowledge.",
    ["instruction", "discernment", "wisdom"],
    ["teaching", "truth", "guidance"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 19:28",
    "False Witness Mocks Justice",
    "An ungodly witness scorneth judgment: and the mouth of the wicked devoureth iniquity.",
    ["justice", "truth", "integrity"],
    ["lies", "corruption", "judgment"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 19:29",
    "Consequences for the Foolish",
    "Judgments are prepared for scorners, and stripes for the back of fools.",
    ["justice", "consequences", "warning"],
    ["discipline", "folly", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

   createProverb(
    "Proverbs 20:1",
    "Alcohol and Self-Control",
    "Wine is a mocker, strong drink is raging: and whosoever is deceived thereby is not wise.",
    ["self-control", "discipline", "wisdom"],
    ["alcohol", "temptation", "judgment"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 20:2",
    "Respect Authority",
    "The fear of a king is as the roaring of a lion: whoso provoketh him to anger sinneth against his own soul.",
    ["authority", "leadership", "wisdom"],
    ["respect", "power", "judgment"],
    ["leadership", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 20:3",
    "Avoiding Conflict Is Wise",
    "It is an honour for a man to cease from strife: but every fool will be meddling.",
    ["peace", "conflict", "wisdom"],
    ["arguments", "restraint", "relationships"],
    ["wisdom", "guidance"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 20:4",
    "Laziness Leads to Lack",
    "The sluggard will not plow by reason of the cold; therefore shall he beg in harvest, and have nothing.",
    ["discipline", "work", "diligence"],
    ["effort", "responsibility", "results"],
    ["motivation", "wisdom"],
    ["unmotivated", "determined"]
  ),

  createProverb(
    "Proverbs 20:5",
    "Understanding Deep Motives",
    "Counsel in the heart of man is like deep water; but a man of understanding will draw it out.",
    ["discernment", "wisdom", "understanding"],
    ["insight", "motives", "guidance"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 20:6",
    "Faithful People Are Rare",
    "Most men will proclaim every one his own goodness: but a faithful man who can find?",
    ["character", "faithfulness", "integrity"],
    ["trust", "reliability", "reputation"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 20:7",
    "Integrity Blesses Future Generations",
    "The just man walketh in his integrity: his children are blessed after him.",
    ["integrity", "legacy", "family"],
    ["character", "blessing", "example"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 20:8",
    "A Leader Discerns Evil",
    "A king that sitteth in the throne of judgment scattereth away all evil with his eyes.",
    ["leadership", "justice", "discernment"],
    ["authority", "judgment", "governance"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 20:9",
    "No One Is Perfect",
    "Who can say, I have made my heart clean, I am pure from my sin?",
    ["humility", "self-awareness", "faith"],
    ["sin", "character", "reflection"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 20:10",
    "Dishonest Measures",
    "Divers weights, and divers measures, both of them are alike abomination to the Lord.",
    ["integrity", "honesty", "justice"],
    ["fairness", "business", "truth"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

    createProverb(
    "Proverbs 20:11",
    "Character Revealed by Actions",
    "Even a child is known by his doings, whether his work be pure, and whether it be right.",
    ["character", "integrity", "actions"],
    ["behavior", "reputation", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 20:12",
    "God Gives Understanding",
    "The hearing ear, and the seeing eye, the Lord hath made even both of them.",
    ["faith", "awareness", "wisdom"],
    ["perception", "understanding", "creation"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 20:13",
    "Avoid Laziness",
    "Love not sleep, lest thou come to poverty; open thine eyes, and thou shalt be satisfied with bread.",
    ["discipline", "work", "diligence"],
    ["laziness", "effort", "provision"],
    ["motivation", "wisdom"],
    ["unmotivated", "determined"]
  ),

  createProverb(
    "Proverbs 20:14",
    "Dishonest Bargaining",
    "It is naught, it is naught, saith the buyer: but when he is gone his way, then he boasteth.",
    ["integrity", "honesty", "business"],
    ["deception", "money", "character"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 20:15",
    "Wisdom Is True Wealth",
    "There is gold, and a multitude of rubies: but the lips of knowledge are a precious jewel.",
    ["wisdom", "value", "knowledge"],
    ["wealth", "understanding", "speech"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 20:16",
    "Be Careful With Guarantees",
    "Take his garment that is surety for a stranger: and take a pledge of him for a strange woman.",
    ["financial wisdom", "prudence", "discernment"],
    ["debt", "guarantee", "responsibility"],
    ["finances", "wisdom"],
    ["uncertain", "reflective"]
  ),

  createProverb(
    "Proverbs 20:17",
    "Dishonest Gain",
    "Bread of deceit is sweet to a man; but afterwards his mouth shall be filled with gravel.",
    ["integrity", "warning", "consequences"],
    ["dishonesty", "temptation", "regret"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 20:18",
    "Plans Need Counsel",
    "Every purpose is established by counsel: and with good advice make war.",
    ["planning", "wisdom", "guidance"],
    ["advice", "strategy", "decisions"],
    ["leadership", "wisdom"],
    ["uncertain", "seeking"]
  ),

  createProverb(
    "Proverbs 20:19",
    "Avoid Gossip",
    "He that goeth about as a talebearer revealeth secrets: therefore meddle not with him that flattereth with his lips.",
    ["speech", "relationships", "warning"],
    ["gossip", "secrets", "trust"],
    ["relationships", "wisdom"],
    ["hurt", "reflective"]
  ),

  createProverb(
    "Proverbs 20:20",
    "Honor Your Parents",
    "Whoso curseth his father or his mother, his lamp shall be put out in obscure darkness.",
    ["family", "honor", "character"],
    ["parents", "respect", "choices"],
    ["relationships", "wisdom"],
    ["reflective", "convicted"]
  ),

    createProverb(
    "Proverbs 20:21",
    "Quick Wealth Fades",
    "An inheritance may be gotten hastily at the beginning; but the end thereof shall not be blessed.",
    ["wealth", "patience", "wisdom"],
    ["money", "inheritance", "consequences"],
    ["finances", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 20:22",
    "Trust God for Justice",
    "Say not thou, I will recompense evil; but wait on the Lord, and he shall save thee.",
    ["patience", "faith", "justice"],
    ["revenge", "trust", "waiting"],
    ["faith", "wisdom"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 20:23",
    "Dishonest Weights Again Condemned",
    "Divers weights are an abomination unto the Lord; and a false balance is not good.",
    ["integrity", "honesty", "justice"],
    ["fairness", "business", "truth"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 20:24",
    "God Directs Our Steps",
    "Man's goings are of the Lord; how can a man then understand his own way?",
    ["guidance", "faith", "direction"],
    ["purpose", "God's plan", "path"],
    ["faith", "wisdom"],
    ["uncertain", "seeking"]
  ),

  createProverb(
    "Proverbs 20:25",
    "Think Before Making Vows",
    "It is a snare to the man who devoureth that which is holy, and after vows to make enquiry.",
    ["wisdom", "discernment", "commitment"],
    ["vows", "decisions", "integrity"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 20:26",
    "A Wise Leader Judges Evil",
    "A wise king scattereth the wicked, and bringeth the wheel over them.",
    ["leadership", "justice", "wisdom"],
    ["authority", "judgment", "discernment"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 20:27",
    "The Spirit Reveals the Heart",
    "The spirit of man is the candle of the Lord, searching all the inward parts of the belly.",
    ["self-awareness", "faith", "discernment"],
    ["heart", "conscience", "truth"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 20:28",
    "Mercy Sustains Leadership",
    "Mercy and truth preserve the king: and his throne is upholden by mercy.",
    ["leadership", "mercy", "truth"],
    ["authority", "integrity", "justice"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 20:29",
    "Strength and Age",
    "The glory of young men is their strength: and the beauty of old men is the grey head.",
    ["wisdom", "generations", "honor"],
    ["strength", "age", "respect"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 20:30",
    "Correction Cleanses the Heart",
    "The blueness of a wound cleanseth away evil: so do stripes the inward parts of the belly.",
    ["discipline", "correction", "growth"],
    ["consequences", "learning", "character"],
    ["wisdom", "guidance"],
    ["reflective", "teachable"]
  ), 

    createProverb(
    "Proverbs 21:1",
    "God Directs Leaders",
    "The king's heart is in the hand of the Lord, as the rivers of water: he turneth it whithersoever he will.",
    ["leadership", "faith", "sovereignty"],
    ["authority", "guidance", "God's control"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 21:2",
    "God Judges Motives",
    "Every way of a man is right in his own eyes: but the Lord pondereth the hearts.",
    ["self-awareness", "discernment", "faith"],
    ["motives", "judgment", "heart"],
    ["wisdom", "faith"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 21:3",
    "Justice Pleases God",
    "To do justice and judgment is more acceptable to the Lord than sacrifice.",
    ["justice", "integrity", "faith"],
    ["righteousness", "actions", "character"],
    ["faith", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 21:4",
    "Pride Is Sin",
    "An high look, and a proud heart, and the plowing of the wicked, is sin.",
    ["humility", "character", "warning"],
    ["pride", "attitude", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 21:5",
    "Diligent Planning",
    "The thoughts of the diligent tend only to plenteousness; but of every one that is hasty only to want.",
    ["planning", "discipline", "diligence"],
    ["work", "effort", "results"],
    ["motivation", "wisdom"],
    ["determined", "reflective"]
  ),

    createProverb(
    "Proverbs 21:6",
    "Dishonest Wealth Is Dangerous",
    "The getting of treasures by a lying tongue is a vanity tossed to and fro of them that seek death.",
    ["integrity", "warning", "wealth"],
    ["dishonesty", "money", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 21:7",
    "Violence Brings Destruction",
    "The robbery of the wicked shall destroy them; because they refuse to do judgment.",
    ["justice", "warning", "character"],
    ["violence", "choices", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 21:8",
    "Crooked vs Upright Paths",
    "The way of man is froward and strange: but as for the pure, his work is right.",
    ["integrity", "character", "direction"],
    ["choices", "path", "righteousness"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 21:9",
    "Peace Over Conflict at Home",
    "It is better to dwell in a corner of the housetop, than with a brawling woman in a wide house.",
    ["peace", "relationships", "home"],
    ["conflict", "marriage", "contention"],
    ["relationships", "wisdom"],
    ["stressed", "reflective"]
  ),

  createProverb(
    "Proverbs 21:10",
    "The Wicked Desire Evil",
    "The soul of the wicked desireth evil: his neighbour findeth no favour in his eyes.",
    ["character", "warning", "relationships"],
    ["evil desires", "selfishness", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ), 

    createProverb(
    "Proverbs 21:11",
    "Correction Teaches the Simple",
    "When the scorner is punished, the simple is made wise: and when the wise is instructed, he receiveth knowledge.",
    ["instruction", "wisdom", "learning"],
    ["correction", "growth", "discipline"],
    ["wisdom", "guidance"],
    ["teachable", "reflective"]
  ),

  createProverb(
    "Proverbs 21:12",
    "God Observes the Wicked",
    "The righteous man wisely considereth the house of the wicked: but God overthroweth the wicked for their wickedness.",
    ["justice", "faith", "discernment"],
    ["judgment", "evil", "God's justice"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 21:13",
    "Ignoring the Poor",
    "Whoso stoppeth his ears at the cry of the poor, he also shall cry himself, but shall not be heard.",
    ["compassion", "justice", "generosity"],
    ["poor", "kindness", "mercy"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 21:14",
    "Gifts Can Calm Anger",
    "A gift in secret pacifieth anger: and a reward in the bosom strong wrath.",
    ["conflict", "wisdom", "relationships"],
    ["anger", "peace", "resolution"],
    ["wisdom", "guidance"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 21:15",
    "Justice Brings Joy",
    "It is joy to the just to do judgment: but destruction shall be to the workers of iniquity.",
    ["justice", "integrity", "character"],
    ["righteousness", "judgment", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

    createProverb(
    "Proverbs 21:16",
    "Leaving Wisdom Leads to Ruin",
    "The man that wandereth out of the way of understanding shall remain in the congregation of the dead.",
    ["wisdom", "direction", "warning"],
    ["choices", "path", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 21:17",
    "Pleasure Over Discipline",
    "He that loveth pleasure shall be a poor man: he that loveth wine and oil shall not be rich.",
    ["discipline", "self-control", "wealth"],
    ["pleasure", "choices", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 21:18",
    "The Wicked Pay the Price",
    "The wicked shall be a ransom for the righteous, and the transgressor for the upright.",
    ["justice", "righteousness", "faith"],
    ["consequences", "judgment", "evil"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 21:19",
    "Peace Over Conflict",
    "It is better to dwell in the wilderness, than with a contentious and an angry woman.",
    ["peace", "relationships", "wisdom"],
    ["conflict", "home", "anger"],
    ["relationships", "wisdom"],
    ["stressed", "reflective"]
  ),

  createProverb(
    "Proverbs 21:20",
    "Wise People Save Resources",
    "There is treasure to be desired and oil in the dwelling of the wise; but a foolish man spendeth it up.",
    ["stewardship", "wisdom", "finances"],
    ["saving", "resources", "discipline"],
    ["finances", "wisdom"],
    ["reflective", "determined"]
  ), 

   createProverb(
    "Proverbs 21:21",
    "Pursue Righteousness",
    "He that followeth after righteousness and mercy findeth life, righteousness, and honour.",
    ["righteousness", "mercy", "honor"],
    ["character", "choices", "blessing"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 21:22",
    "Wisdom Over Strength",
    "A wise man scaleth the city of the mighty, and casteth down the strength of the confidence thereof.",
    ["wisdom", "strategy", "strength"],
    ["victory", "understanding", "power"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 21:23",
    "Guard Your Words",
    "Whoso keepeth his mouth and his tongue keepeth his soul from troubles.",
    ["speech", "self-control", "wisdom"],
    ["words", "restraint", "discipline"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 21:24",
    "Prideful Behavior",
    "Proud and haughty scorner is his name, who dealeth in proud wrath.",
    ["pride", "character", "warning"],
    ["arrogance", "anger", "attitude"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 21:25",
    "Laziness Leads to Destruction",
    "The desire of the slothful killeth him; for his hands refuse to labour.",
    ["discipline", "work", "diligence"],
    ["laziness", "effort", "responsibility"],
    ["motivation", "wisdom"],
    ["unmotivated", "determined"]
  ),

    createProverb(
    "Proverbs 21:26",
    "Generosity vs Greed",
    "He coveteth greedily all the day long: but the righteous giveth and spareth not.",
    ["generosity", "character", "righteousness"],
    ["greed", "giving", "compassion"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 21:27",
    "God Rejects Hypocrisy",
    "The sacrifice of the wicked is abomination: how much more, when he bringeth it with a wicked mind?",
    ["faith", "integrity", "warning"],
    ["hypocrisy", "worship", "heart"],
    ["faith", "wisdom"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 21:28",
    "Lies Destroy Credibility",
    "A false witness shall perish: but the man that heareth speaketh constantly.",
    ["truth", "integrity", "justice"],
    ["lies", "reputation", "speech"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 21:29",
    "Bold Wickedness vs Upright Confidence",
    "A wicked man hardeneth his face: but as for the upright, he directeth his way.",
    ["character", "integrity", "direction"],
    ["choices", "confidence", "righteousness"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 21:30",
    "Human Wisdom vs God",
    "There is no wisdom nor understanding nor counsel against the Lord.",
    ["faith", "sovereignty", "wisdom"],
    ["God's authority", "truth", "guidance"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 21:31",
    "Victory Comes From God",
    "The horse is prepared against the day of battle: but safety is of the Lord.",
    ["faith", "trust", "security"],
    ["preparation", "battle", "God's protection"],
    ["faith", "encouragement"],
    ["uncertain", "hopeful"]
  ),

    createProverb(
    "Proverbs 22:1",
    "A Good Name Is Better Than Wealth",
    "A good name is rather to be chosen than great riches, and loving favour rather than silver and gold.",
    ["reputation", "character", "wisdom"],
    ["honor", "integrity", "values"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 22:2",
    "Rich and Poor Are Alike Before God",
    "The rich and poor meet together: the Lord is the maker of them all.",
    ["faith", "humility", "perspective"],
    ["wealth", "equality", "creation"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 22:3",
    "The Wise Avoid Danger",
    "A prudent man foreseeth the evil, and hideth himself: but the simple pass on, and are punished.",
    ["discernment", "wisdom", "prudence"],
    ["danger", "choices", "foresight"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 22:4",
    "Humility Brings Blessing",
    "By humility and the fear of the Lord are riches, and honour, and life.",
    ["humility", "faith", "blessing"],
    ["honor", "life", "wisdom"],
    ["faith", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 22:5",
    "Avoid Dangerous Paths",
    "Thorns and snares are in the way of the froward: he that doth keep his soul shall be far from them.",
    ["discernment", "wisdom", "protection"],
    ["danger", "choices", "path"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 22:6",
    "Train a Child Early",
    "Train up a child in the way he should go: and when he is old, he will not depart from it.",
    ["parenting", "discipline", "wisdom"],
    ["children", "training", "guidance"],
    ["family", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 22:7",
    "Debt Brings Bondage",
    "The rich ruleth over the poor, and the borrower is servant to the lender.",
    ["finances", "wisdom", "responsibility"],
    ["debt", "money", "stewardship"],
    ["finances", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 22:8",
    "Sowing Evil Brings Trouble",
    "He that soweth iniquity shall reap vanity: and the rod of his anger shall fail.",
    ["justice", "consequences", "character"],
    ["choices", "harvest", "anger"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 22:9",
    "Generosity Brings Blessing",
    "He that hath a bountiful eye shall be blessed; for he giveth of his bread to the poor.",
    ["generosity", "compassion", "blessing"],
    ["charity", "kindness", "giving"],
    ["faith", "wisdom"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 22:10",
    "Removing Trouble",
    "Cast out the scorner, and contention shall go out; yea, strife and reproach shall cease.",
    ["conflict", "wisdom", "relationships"],
    ["peace", "boundaries", "discernment"],
    ["relationships", "wisdom"],
    ["stressed", "reflective"]
  ),

    createProverb(
    "Proverbs 22:11",
    "Purity Wins Favor",
    "He that loveth pureness of heart, for the grace of his lips the king shall be his friend.",
    ["character", "integrity", "speech"],
    ["purity", "favor", "leadership"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 22:12",
    "God Protects Knowledge",
    "The eyes of the Lord preserve knowledge, and he overthroweth the words of the transgressor.",
    ["faith", "truth", "wisdom"],
    ["knowledge", "protection", "judgment"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 22:13",
    "Excuses of Laziness",
    "The slothful man saith, There is a lion without, I shall be slain in the streets.",
    ["discipline", "work", "motivation"],
    ["laziness", "excuses", "fear"],
    ["motivation", "wisdom"],
    ["unmotivated", "reflective"]
  ),

  createProverb(
    "Proverbs 22:14",
    "The Danger of Seduction",
    "The mouth of strange women is a deep pit: he that is abhorred of the Lord shall fall therein.",
    ["temptation", "warning", "wisdom"],
    ["seduction", "choices", "danger"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 22:15",
    "Discipline Corrects Folly",
    "Foolishness is bound in the heart of a child; but the rod of correction shall drive it far from him.",
    ["discipline", "parenting", "wisdom"],
    ["correction", "children", "training"],
    ["family", "wisdom"],
    ["reflective", "teachable"]
  ),

    createProverb(
    "Proverbs 22:16",
    "Oppression Brings Loss",
    "He that oppresseth the poor to increase his riches, and he that giveth to the rich, shall surely come to want.",
    ["justice", "compassion", "warning"],
    ["wealth", "oppression", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 22:17",
    "Listen to Wisdom",
    "Bow down thine ear, and hear the words of the wise, and apply thine heart unto my knowledge.",
    ["wisdom", "learning", "instruction"],
    ["listening", "guidance", "growth"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 22:18",
    "Keep Wisdom in Your Heart",
    "For it is a pleasant thing if thou keep them within thee; they shall withal be fitted in thy lips.",
    ["wisdom", "speech", "understanding"],
    ["knowledge", "heart", "learning"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 22:19",
    "Trust in the Lord",
    "That thy trust may be in the Lord, I have made known to thee this day, even to thee.",
    ["faith", "trust", "guidance"],
    ["confidence", "God", "direction"],
    ["faith", "wisdom"],
    ["uncertain", "hopeful"]
  ),

  createProverb(
    "Proverbs 22:20",
    "Written Wisdom",
    "Have not I written to thee excellent things in counsels and knowledge,",
    ["wisdom", "instruction", "knowledge"],
    ["guidance", "learning", "truth"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 22:21",
    "Truthful Words",
    "That I might make thee know the certainty of the words of truth; that thou mightest answer the words of truth to them that send unto thee?",
    ["truth", "wisdom", "communication"],
    ["certainty", "knowledge", "speech"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 22:22",
    "Do Not Exploit the Poor",
    "Rob not the poor, because he is poor: neither oppress the afflicted in the gate:",
    ["justice", "compassion", "integrity"],
    ["poverty", "oppression", "fairness"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 22:23",
    "God Defends the Poor",
    "For the Lord will plead their cause, and spoil the soul of those that spoiled them.",
    ["faith", "justice", "protection"],
    ["God's defense", "judgment", "mercy"],
    ["faith", "wisdom"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 22:24",
    "Avoid Angry People",
    "Make no friendship with an angry man; and with a furious man thou shalt not go:",
    ["relationships", "discernment", "wisdom"],
    ["anger", "influence", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 22:25",
    "Anger Is Contagious",
    "Lest thou learn his ways, and get a snare to thy soul.",
    ["influence", "character", "warning"],
    ["anger", "habits", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 22:26",
    "Avoid Reckless Financial Promises",
    "Be not thou one of them that strike hands, or of them that are sureties for debts.",
    ["financial wisdom", "prudence", "responsibility"],
    ["debt", "guarantee", "money"],
    ["finances", "wisdom"],
    ["uncertain", "reflective"]
  ),

  createProverb(
    "Proverbs 22:27",
    "Debt Risks What You Own",
    "If thou hast nothing to pay, why should he take away thy bed from under thee?",
    ["finances", "wisdom", "responsibility"],
    ["debt", "money", "consequences"],
    ["finances", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 22:28",
    "Respect Boundaries and Traditions",
    "Remove not the ancient landmark, which thy fathers have set.",
    ["wisdom", "tradition", "integrity"],
    ["boundaries", "heritage", "respect"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 22:29",
    "Skill Leads to Opportunity",
    "Seest thou a man diligent in his business? he shall stand before kings; he shall not stand before mean men.",
    ["diligence", "excellence", "work"],
    ["skill", "opportunity", "success"],
    ["motivation", "wisdom"],
    ["motivated", "determined"]
  ),

    createProverb(
    "Proverbs 23:1",
    "Be Careful Around Power",
    "When thou sittest to eat with a ruler, consider diligently what is before thee:",
    ["wisdom", "discernment", "leadership"],
    ["authority", "awareness", "self-control"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:2",
    "Control Your Appetite",
    "And put a knife to thy throat, if thou be a man given to appetite.",
    ["self-control", "discipline", "wisdom"],
    ["temptation", "appetite", "restraint"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:3",
    "Beware of Deceptive Luxury",
    "Be not desirous of his dainties: for they are deceitful meat.",
    ["discernment", "temptation", "wisdom"],
    ["luxury", "deception", "desire"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:4",
    "Do Not Exhaust Yourself for Wealth",
    "Labour not to be rich: cease from thine own wisdom.",
    ["contentment", "wealth", "wisdom"],
    ["money", "priorities", "balance"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:5",
    "Wealth Is Temporary",
    "Wilt thou set thine eyes upon that which is not? for riches certainly make themselves wings; they fly away as an eagle toward heaven.",
    ["wealth", "perspective", "wisdom"],
    ["money", "temporary", "priorities"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 23:6",
    "Beware of the Stingy Host",
    "Eat thou not the bread of him that hath an evil eye, neither desire thou his dainty meats:",
    ["discernment", "relationships", "wisdom"],
    ["generosity", "selfishness", "motives"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:7",
    "Hidden Motives",
    "For as he thinketh in his heart, so is he: Eat and drink, saith he to thee; but his heart is not with thee.",
    ["discernment", "character", "wisdom"],
    ["motives", "heart", "deception"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:8",
    "False Hospitality",
    "The morsel which thou hast eaten shalt thou vomit up, and lose thy sweet words.",
    ["discernment", "warning", "relationships"],
    ["deception", "regret", "motives"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:9",
    "Do Not Waste Wisdom on Fools",
    "Speak not in the ears of a fool: for he will despise the wisdom of thy words.",
    ["discernment", "wisdom", "communication"],
    ["teaching", "understanding", "fools"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:10",
    "Respect Boundaries",
    "Remove not the old landmark; and enter not into the fields of the fatherless:",
    ["justice", "integrity", "wisdom"],
    ["boundaries", "property", "fairness"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 23:11",
    "God Defends the Vulnerable",
    "For their redeemer is mighty; he shall plead their cause with thee.",
    ["justice", "faith", "protection"],
    ["defense", "God's power", "mercy"],
    ["faith", "wisdom"],
    ["hopeful", "reflective"]
  ),

  createProverb(
    "Proverbs 23:12",
    "Apply Your Heart to Learning",
    "Apply thine heart unto instruction, and thine ears to the words of knowledge.",
    ["wisdom", "learning", "discipline"],
    ["instruction", "growth", "knowledge"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 23:13",
    "Do Not Withhold Discipline",
    "Withhold not correction from the child: for if thou beatest him with the rod, he shall not die.",
    ["discipline", "parenting", "wisdom"],
    ["correction", "training", "children"],
    ["family", "wisdom"],
    ["reflective", "teachable"]
  ),

  createProverb(
    "Proverbs 23:14",
    "Discipline Saves the Soul",
    "Thou shalt beat him with the rod, and shalt deliver his soul from hell.",
    ["discipline", "parenting", "guidance"],
    ["correction", "protection", "training"],
    ["family", "wisdom"],
    ["reflective", "teachable"]
  ),

  createProverb(
    "Proverbs 23:15",
    "Parents Rejoice in Wisdom",
    "My son, if thine heart be wise, my heart shall rejoice, even mine.",
    ["family", "wisdom", "joy"],
    ["parents", "character", "growth"],
    ["relationships", "wisdom"],
    ["reflective", "motivated"]
  ),

    createProverb(
    "Proverbs 23:16",
    "Truth Brings Joy",
    "Yea, my reins shall rejoice, when thy lips speak right things.",
    ["truth", "speech", "wisdom"],
    ["integrity", "words", "character"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 23:17",
    "Do Not Envy Sinners",
    "Let not thine heart envy sinners: but be thou in the fear of the Lord all the day long.",
    ["faith", "contentment", "wisdom"],
    ["envy", "reverence", "choices"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:18",
    "Hope for the Future",
    "For surely there is an end; and thine expectation shall not be cut off.",
    ["hope", "faith", "encouragement"],
    ["future", "promise", "trust"],
    ["faith", "encouragement"],
    ["weary", "hopeful"]
  ),

  createProverb(
    "Proverbs 23:19",
    "Guide Your Heart",
    "Hear thou, my son, and be wise, and guide thine heart in the way.",
    ["wisdom", "direction", "discipline"],
    ["choices", "heart", "guidance"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 23:20",
    "Avoid Excess",
    "Be not among winebibbers; among riotous eaters of flesh:",
    ["self-control", "discipline", "wisdom"],
    ["excess", "alcohol", "temptation"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 23:21",
    "Excess Leads to Poverty",
    "For the drunkard and the glutton shall come to poverty: and drowsiness shall clothe a man with rags.",
    ["self-control", "discipline", "warning"],
    ["alcohol", "gluttony", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:22",
    "Honor Your Parents",
    "Hearken unto thy father that begat thee, and despise not thy mother when she is old.",
    ["family", "honor", "wisdom"],
    ["parents", "respect", "guidance"],
    ["relationships", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 23:23",
    "Value Truth and Wisdom",
    "Buy the truth, and sell it not; also wisdom, and instruction, and understanding.",
    ["truth", "wisdom", "learning"],
    ["knowledge", "instruction", "growth"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 23:24",
    "A Wise Child Brings Joy",
    "The father of the righteous shall greatly rejoice: and he that begetteth a wise child shall have joy of him.",
    ["family", "wisdom", "joy"],
    ["parents", "character", "blessing"],
    ["relationships", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 23:25",
    "Parents Rejoice in Wisdom",
    "Thy father and thy mother shall be glad, and she that bare thee shall rejoice.",
    ["family", "honor", "wisdom"],
    ["parents", "joy", "character"],
    ["relationships", "wisdom"],
    ["reflective", "motivated"]
  ),

    createProverb(
    "Proverbs 23:26",
    "Give Your Heart to Wisdom",
    "My son, give me thine heart, and let thine eyes observe my ways.",
    ["wisdom", "guidance", "discipleship"],
    ["heart", "attention", "learning"],
    ["wisdom", "guidance"],
    ["seeking", "reflective"]
  ),

  createProverb(
    "Proverbs 23:27",
    "The Danger of Seduction",
    "For a whore is a deep ditch; and a strange woman is a narrow pit.",
    ["temptation", "warning", "wisdom"],
    ["seduction", "danger", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:28",
    "Hidden Traps",
    "She also lieth in wait as for a prey, and increaseth the transgressors among men.",
    ["temptation", "warning", "discernment"],
    ["deception", "danger", "sin"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:29",
    "The Consequences of Drunkenness",
    "Who hath woe? who hath sorrow? who hath contentions? who hath babbling? who hath wounds without cause? who hath redness of eyes?",
    ["self-control", "warning", "wisdom"],
    ["alcohol", "sorrow", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 23:30",
    "Lingering Over Wine",
    "They that tarry long at the wine; they that go to seek mixed wine.",
    ["self-control", "discipline", "warning"],
    ["alcohol", "temptation", "habits"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:31",
    "Deceptive Pleasure",
    "Look not thou upon the wine when it is red, when it giveth his colour in the cup, when it moveth itself aright.",
    ["temptation", "discernment", "warning"],
    ["alcohol", "appearance", "deception"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:32",
    "Hidden Harm",
    "At the last it biteth like a serpent, and stingeth like an adder.",
    ["warning", "consequences", "wisdom"],
    ["alcohol", "harm", "temptation"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 23:33",
    "Distorted Perception",
    "Thine eyes shall behold strange women, and thine heart shall utter perverse things.",
    ["self-control", "warning", "discernment"],
    ["temptation", "speech", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 23:34",
    "Instability of Intoxication",
    "Yea, thou shalt be as he that lieth down in the midst of the sea, or as he that lieth upon the top of a mast.",
    ["warning", "instability", "self-control"],
    ["alcohol", "confusion", "danger"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 23:35",
    "Addiction's Cycle",
    "They have stricken me, shalt thou say, and I was not sick; they have beaten me, and I felt it not: when shall I awake? I will seek it yet again.",
    ["warning", "addiction", "self-control"],
    ["alcohol", "cycle", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

    createProverb(
    "Proverbs 24:1",
    "Do Not Envy Evil People",
    "Be not thou envious against evil men, neither desire to be with them.",
    ["contentment", "discernment", "wisdom"],
    ["envy", "influence", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 24:2",
    "Evil Plans Begin in the Heart",
    "For their heart studieth destruction, and their lips talk of mischief.",
    ["discernment", "warning", "character"],
    ["destruction", "speech", "evil intentions"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 24:3",
    "Wisdom Builds a House",
    "Through wisdom is an house builded; and by understanding it is established:",
    ["wisdom", "building", "stability"],
    ["understanding", "foundation", "growth"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 24:4",
    "Knowledge Fills the House",
    "And by knowledge shall the chambers be filled with all precious and pleasant riches.",
    ["wisdom", "knowledge", "stewardship"],
    ["riches", "understanding", "blessing"],
    ["wisdom", "guidance"],
    ["reflective", "hopeful"]
  ),

  createProverb(
    "Proverbs 24:5",
    "Wisdom Is Strength",
    "A wise man is strong; yea, a man of knowledge increaseth strength.",
    ["wisdom", "strength", "growth"],
    ["knowledge", "power", "resilience"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ),

   createProverb(
    "Proverbs 24:6",
    "Victory Through Wise Counsel",
    "For by wise counsel thou shalt make thy war: and in multitude of counsellors there is safety.",
    ["wisdom", "planning", "guidance"],
    ["strategy", "advice", "decisions"],
    ["leadership", "wisdom"],
    ["uncertain", "seeking"]
  ),

  createProverb(
    "Proverbs 24:7",
    "Wisdom Is Too High for Fools",
    "Wisdom is too high for a fool: he openeth not his mouth in the gate.",
    ["wisdom", "discernment", "character"],
    ["understanding", "judgment", "fools"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 24:8",
    "Scheming Evil",
    "He that deviseth to do evil shall be called a mischievous person.",
    ["warning", "character", "justice"],
    ["scheming", "evil", "reputation"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 24:9",
    "Foolish Thinking Is Sin",
    "The thought of foolishness is sin: and the scorner is an abomination to men.",
    ["character", "warning", "wisdom"],
    ["thoughts", "sin", "attitude"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 24:10",
    "Strength in Difficult Times",
    "If thou faint in the day of adversity, thy strength is small.",
    ["resilience", "strength", "perseverance"],
    ["adversity", "endurance", "character"],
    ["encouragement", "wisdom"],
    ["weary", "motivated"]
  ),

    createProverb(
    "Proverbs 24:11",
    "Rescue the Perishing",
    "If thou forbear to deliver them that are drawn unto death, and those that are ready to be slain;",
    ["compassion", "justice", "responsibility"],
    ["rescue", "mercy", "courage"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 24:12",
    "God Knows the Heart",
    "If thou sayest, Behold, we knew it not; doth not he that pondereth the heart consider it? and he that keepeth thy soul, doth not he know it?",
    ["faith", "accountability", "discernment"],
    ["heart", "truth", "responsibility"],
    ["faith", "wisdom"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 24:13",
    "Wisdom Is Sweet",
    "My son, eat thou honey, because it is good; and the honeycomb, which is sweet to thy taste:",
    ["wisdom", "encouragement", "learning"],
    ["sweetness", "value", "goodness"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 24:14",
    "Wisdom Brings Hope",
    "So shall the knowledge of wisdom be unto thy soul: when thou hast found it, then there shall be a reward, and thy expectation shall not be cut off.",
    ["wisdom", "hope", "reward"],
    ["knowledge", "future", "promise"],
    ["wisdom", "encouragement"],
    ["hopeful", "seeking"]
  ),

  createProverb(
    "Proverbs 24:15",
    "Do Not Attack the Righteous",
    "Lay not wait, O wicked man, against the dwelling of the righteous; spoil not his resting place:",
    ["justice", "righteousness", "warning"],
    ["evil plans", "attack", "character"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

    createProverb(
    "Proverbs 24:16",
    "The Righteous Rise Again",
    "For a just man falleth seven times, and riseth up again: but the wicked shall fall into mischief.",
    ["resilience", "perseverance", "righteousness"],
    ["failure", "recovery", "strength"],
    ["encouragement", "wisdom"],
    ["weary", "hopeful"]
  ),

  createProverb(
    "Proverbs 24:17",
    "Do Not Rejoice at an Enemy's Fall",
    "Rejoice not when thine enemy falleth, and let not thine heart be glad when he stumbleth:",
    ["character", "humility", "wisdom"],
    ["enemies", "attitude", "integrity"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 24:18",
    "God Sees the Heart",
    "Lest the Lord see it, and it displease him, and he turn away his wrath from him.",
    ["faith", "discernment", "humility"],
    ["God's judgment", "attitude", "heart"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 24:19",
    "Do Not Fret Over Evil People",
    "Fret not thyself because of evil men, neither be thou envious at the wicked;",
    ["contentment", "faith", "wisdom"],
    ["envy", "evil", "perspective"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 24:20",
    "The Wicked Have No Future",
    "For there shall be no reward to the evil man; the candle of the wicked shall be put out.",
    ["justice", "warning", "faith"],
    ["evil", "judgment", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

    createProverb(
    "Proverbs 24:21",
    "Respect Authority",
    "My son, fear thou the Lord and the king: and meddle not with them that are given to change:",
    ["authority", "faith", "wisdom"],
    ["respect", "leadership", "stability"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 24:22",
    "Sudden Destruction for Rebels",
    "For their calamity shall rise suddenly; and who knoweth the ruin of them both?",
    ["warning", "justice", "wisdom"],
    ["rebellion", "consequences", "judgment"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 24:23",
    "Impartial Judgment",
    "These things also belong to the wise. It is not good to have respect of persons in judgment.",
    ["justice", "integrity", "wisdom"],
    ["fairness", "judgment", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 24:24",
    "Calling Evil Good",
    "He that saith unto the wicked, Thou art righteous; him shall the people curse, nations shall abhor him:",
    ["truth", "justice", "integrity"],
    ["deception", "judgment", "character"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 24:25",
    "Reward for Rebuking Evil",
    "But to them that rebuke him shall be delight, and a good blessing shall come upon them.",
    ["courage", "truth", "justice"],
    ["rebuke", "integrity", "blessing"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

    createProverb(
    "Proverbs 24:26",
    "Honest Words",
    "Every man shall kiss his lips that giveth a right answer.",
    ["truth", "speech", "wisdom"],
    ["honesty", "communication", "integrity"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 24:27",
    "Prepare Before Building",
    "Prepare thy work without, and make it fit for thyself in the field; and afterwards build thine house.",
    ["planning", "wisdom", "discipline"],
    ["preparation", "strategy", "work"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 24:28",
    "Do Not Bear False Witness",
    "Be not a witness against thy neighbour without cause; and deceive not with thy lips.",
    ["truth", "integrity", "justice"],
    ["lies", "speech", "character"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 24:29",
    "Do Not Seek Revenge",
    "Say not, I will do so to him as he hath done to me: I will render to the man according to his work.",
    ["forgiveness", "justice", "wisdom"],
    ["revenge", "patience", "character"],
    ["wisdom", "guidance"],
    ["angry", "reflective"]
  ),

  createProverb(
    "Proverbs 24:30",
    "Lesson From the Sluggard",
    "I went by the field of the slothful, and by the vineyard of the man void of understanding;",
    ["discipline", "work", "wisdom"],
    ["laziness", "observation", "learning"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 24:31",
    "Neglect Leads to Decay",
    "And, lo, it was all grown over with thorns, and nettles had covered the face thereof, and the stone wall thereof was broken down.",
    ["warning", "discipline", "responsibility"],
    ["neglect", "consequences", "work"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 24:32",
    "Learn From What You See",
    "Then I saw, and considered it well: I looked upon it, and received instruction.",
    ["learning", "wisdom", "reflection"],
    ["observation", "understanding", "growth"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 24:33",
    "The Danger of Delay",
    "Yet a little sleep, a little slumber, a little folding of the hands to sleep:",
    ["discipline", "warning", "motivation"],
    ["laziness", "delay", "habits"],
    ["motivation", "wisdom"],
    ["unmotivated", "reflective"]
  ),

  createProverb(
    "Proverbs 24:34",
    "Poverty From Laziness",
    "So shall thy poverty come as one that travelleth; and thy want as an armed man.",
    ["discipline", "work", "consequences"],
    ["poverty", "effort", "responsibility"],
    ["motivation", "wisdom"],
    ["reflective", "determined"]
  ),

  createProverb(
    "Proverbs 25:1",
    "Wisdom Preserved for Future Generations",
    "These are also proverbs of Solomon, which the men of Hezekiah king of Judah copied out.",
    ["wisdom", "legacy", "leadership"],
    ["preservation", "teaching", "history"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 25:2",
    "God Conceals and Leaders Search Out",
    "It is the glory of God to conceal a thing: but the honour of kings is to search out a matter.",
    ["wisdom", "leadership", "discernment"],
    ["investigation", "truth", "understanding"],
    ["leadership", "wisdom"],
    ["curious", "reflective"]
  ),

  createProverb(
    "Proverbs 25:3",
    "The Depth of Leadership",
    "The heaven for height, and the earth for depth, and the heart of kings is unsearchable.",
    ["leadership", "discernment", "wisdom"],
    ["authority", "depth", "judgment"],
    ["leadership", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 25:4",
    "Remove Impurities",
    "Take away the dross from the silver, and there shall come forth a vessel for the finer.",
    ["growth", "refinement", "wisdom"],
    ["purity", "character", "process"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 25:5",
    "Remove Wicked Influence",
    "Take away the wicked from before the king, and his throne shall be established in righteousness.",
    ["leadership", "justice", "righteousness"],
    ["influence", "authority", "integrity"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

    createProverb(
    "Proverbs 25:6",
    "Do Not Promote Yourself",
    "Put not forth thyself in the presence of the king, and stand not in the place of great men:",
    ["humility", "wisdom", "leadership"],
    ["pride", "status", "self-promotion"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 25:7",
    "Let Others Promote You",
    "For better it is that it be said unto thee, Come up hither; than that thou shouldest be put lower in the presence of the prince whom thine eyes have seen.",
    ["humility", "honor", "wisdom"],
    ["promotion", "respect", "leadership"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 25:8",
    "Avoid Rushing Into Disputes",
    "Go not forth hastily to strive, lest thou know not what to do in the end thereof, when thy neighbour hath put thee to shame.",
    ["discernment", "conflict", "wisdom"],
    ["arguments", "restraint", "judgment"],
    ["wisdom", "guidance"],
    ["stressed", "reflective"]
  ),

  createProverb(
    "Proverbs 25:9",
    "Resolve Conflict Privately",
    "Debate thy cause with thy neighbour himself; and discover not a secret to another:",
    ["relationships", "wisdom", "integrity"],
    ["conflict resolution", "confidentiality", "trust"],
    ["relationships", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 25:10",
    "Protect Your Reputation",
    "Lest he that heareth it put thee to shame, and thine infamy turn not away.",
    ["reputation", "wisdom", "speech"],
    ["gossip", "trust", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 25:11",
    "Timely Words Are Precious",
    "A word fitly spoken is like apples of gold in pictures of silver.",
    ["wisdom", "speech", "communication"],
    ["timing", "encouragement", "value"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 25:12",
    "Wise Correction Is Valuable",
    "As an earring of gold, and an ornament of fine gold, so is a wise reprover upon an obedient ear.",
    ["instruction", "wisdom", "growth"],
    ["correction", "learning", "character"],
    ["wisdom", "guidance"],
    ["teachable", "reflective"]
  ),

  createProverb(
    "Proverbs 25:13",
    "Faithful Messengers Refresh",
    "As the cold of snow in the time of harvest, so is a faithful messenger to them that send him: for he refresheth the soul of his masters.",
    ["faithfulness", "trust", "service"],
    ["reliability", "communication", "responsibility"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 25:14",
    "Empty Promises",
    "Whoso boasteth himself of a false gift is like clouds and wind without rain.",
    ["integrity", "warning", "character"],
    ["promises", "deception", "trust"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 25:15",
    "Patience Persuades",
    "By long forbearing is a prince persuaded, and a soft tongue breaketh the bone.",
    ["patience", "communication", "wisdom"],
    ["persuasion", "gentleness", "influence"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ), 

    createProverb(
    "Proverbs 25:16",
    "Moderation Is Wisdom",
    "Hast thou found honey? eat so much as is sufficient for thee, lest thou be filled therewith, and vomit it.",
    ["self-control", "moderation", "wisdom"],
    ["excess", "discipline", "balance"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 25:17",
    "Respect Personal Boundaries",
    "Withdraw thy foot from thy neighbour's house; lest he be weary of thee, and so hate thee.",
    ["relationships", "wisdom", "discernment"],
    ["boundaries", "respect", "friendship"],
    ["relationships", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 25:18",
    "The Damage of False Testimony",
    "A man that beareth false witness against his neighbour is a maul, and a sword, and a sharp arrow.",
    ["truth", "integrity", "justice"],
    ["lies", "harm", "reputation"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 25:19",
    "Unreliable People Bring Trouble",
    "Confidence in an unfaithful man in time of trouble is like a broken tooth, and a foot out of joint.",
    ["discernment", "trust", "wisdom"],
    ["reliability", "character", "relationships"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 25:20",
    "Insensitive Words Hurt",
    "As he that taketh away a garment in cold weather, and as vinegar upon nitre, so is he that singeth songs to an heavy heart.",
    ["compassion", "discernment", "wisdom"],
    ["empathy", "timing", "relationships"],
    ["wisdom", "guidance"],
    ["sad", "reflective"]
  ),

    createProverb(
    "Proverbs 25:16",
    "Moderation Is Wisdom",
    "Hast thou found honey? eat so much as is sufficient for thee, lest thou be filled therewith, and vomit it.",
    ["self-control", "moderation", "wisdom"],
    ["excess", "discipline", "balance"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 25:17",
    "Respect Personal Boundaries",
    "Withdraw thy foot from thy neighbour's house; lest he be weary of thee, and so hate thee.",
    ["relationships", "wisdom", "discernment"],
    ["boundaries", "respect", "friendship"],
    ["relationships", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 25:18",
    "The Damage of False Testimony",
    "A man that beareth false witness against his neighbour is a maul, and a sword, and a sharp arrow.",
    ["truth", "integrity", "justice"],
    ["lies", "harm", "reputation"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 25:19",
    "Unreliable People Bring Trouble",
    "Confidence in an unfaithful man in time of trouble is like a broken tooth, and a foot out of joint.",
    ["discernment", "trust", "wisdom"],
    ["reliability", "character", "relationships"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 25:20",
    "Insensitive Words Hurt",
    "As he that taketh away a garment in cold weather, and as vinegar upon nitre, so is he that singeth songs to an heavy heart.",
    ["compassion", "discernment", "wisdom"],
    ["empathy", "timing", "relationships"],
    ["wisdom", "guidance"],
    ["sad", "reflective"]
  ),

    createProverb(
    "Proverbs 25:21",
    "Kindness to Enemies",
    "If thine enemy be hungry, give him bread to eat; and if he be thirsty, give him water to drink:",
    ["compassion", "kindness", "character"],
    ["enemies", "mercy", "generosity"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 25:22",
    "Kindness Convicts the Heart",
    "For thou shalt heap coals of fire upon his head, and the Lord shall reward thee.",
    ["kindness", "faith", "justice"],
    ["mercy", "reward", "character"],
    ["faith", "wisdom"],
    ["reflective", "hopeful"]
  ),

  createProverb(
    "Proverbs 25:23",
    "Gossip Causes Conflict",
    "The north wind driveth away rain: so doth an angry countenance a backbiting tongue.",
    ["speech", "discernment", "relationships"],
    ["gossip", "conflict", "boundaries"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 25:24",
    "Peace Over Constant Conflict",
    "It is better to dwell in the corner of the housetop, than with a brawling woman and in a wide house.",
    ["peace", "relationships", "wisdom"],
    ["conflict", "home", "contention"],
    ["relationships", "wisdom"],
    ["stressed", "reflective"]
  ),

  createProverb(
    "Proverbs 25:25",
    "Good News Refreshes",
    "As cold waters to a thirsty soul, so is good news from a far country.",
    ["encouragement", "hope", "joy"],
    ["refreshment", "news", "relief"],
    ["encouragement", "wisdom"],
    ["hopeful", "weary"]
  ),

    createProverb(
    "Proverbs 25:26",
    "Corrupted Integrity",
    "A righteous man falling down before the wicked is as a troubled fountain, and a corrupt spring.",
    ["integrity", "character", "warning"],
    ["compromise", "influence", "corruption"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 25:27",
    "Moderation in Praise",
    "It is not good to eat much honey: so for men to search their own glory is not glory.",
    ["humility", "moderation", "wisdom"],
    ["pride", "self-praise", "balance"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 25:28",
    "Self-Control Protects You",
    "He that hath no rule over his own spirit is like a city that is broken down, and without walls.",
    ["self-control", "discipline", "wisdom"],
    ["anger", "emotions", "character"],
    ["wisdom", "guidance"],
    ["reflective", "determined"]
  ), 

    createProverb(
    "Proverbs 26:1",
    "Honor Does Not Suit a Fool",
    "As snow in summer, and as rain in harvest, so honour is not seemly for a fool.",
    ["wisdom", "discernment", "character"],
    ["honor", "fools", "judgment"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 26:2",
    "Curses Without Cause",
    "As the bird by wandering, as the swallow by flying, so the curse causeless shall not come.",
    ["justice", "wisdom", "faith"],
    ["accusations", "truth", "consequences"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 26:3",
    "Correction for the Foolish",
    "A whip for the horse, a bridle for the ass, and a rod for the fool's back.",
    ["discipline", "wisdom", "correction"],
    ["instruction", "consequences", "character"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 26:4",
    "Do Not Lower Yourself to Foolishness",
    "Answer not a fool according to his folly, lest thou also be like unto him.",
    ["discernment", "communication", "wisdom"],
    ["arguments", "restraint", "fools"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 26:5",
    "Correct Foolish Thinking",
    "Answer a fool according to his folly, lest he be wise in his own conceit.",
    ["discernment", "instruction", "wisdom"],
    ["correction", "understanding", "communication"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 26:6",
    "Sending a Fool on a Task",
    "He that sendeth a message by the hand of a fool cutteth off the feet, and drinketh damage.",
    ["discernment", "leadership", "wisdom"],
    ["delegation", "trust", "responsibility"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 26:7",
    "Wisdom Misused by Fools",
    "The legs of the lame are not equal: so is a parable in the mouth of fools.",
    ["wisdom", "discernment", "communication"],
    ["understanding", "fools", "speech"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 26:8",
    "Giving Honor to a Fool",
    "As he that bindeth a stone in a sling, so is he that giveth honour to a fool.",
    ["discernment", "wisdom", "character"],
    ["honor", "judgment", "fools"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 26:9",
    "Wisdom Misapplied",
    "As a thorn goeth up into the hand of a drunkard, so is a parable in the mouth of fools.",
    ["wisdom", "discernment", "warning"],
    ["misuse", "understanding", "speech"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 26:10",
    "Poor Judgment in Hiring",
    "The great God that formed all things both rewardeth the fool, and rewardeth transgressors.",
    ["justice", "wisdom", "judgment"],
    ["accountability", "choices", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ), 

    createProverb(
    "Proverbs 26:11",
    "Returning to Foolishness",
    "As a dog returneth to his vomit, so a fool returneth to his folly.",
    ["warning", "character", "wisdom"],
    ["habits", "foolishness", "repetition"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 26:12",
    "Pride Blocks Wisdom",
    "Seest thou a man wise in his own conceit? there is more hope of a fool than of him.",
    ["humility", "wisdom", "warning"],
    ["pride", "arrogance", "self-deception"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

   createProverb(
    "Proverbs 26:13",
    "Excuses Keep You Stuck",
    "The slothful man saith, There is a lion in the way; a lion is in the streets.",
    ["discipline", "warning", "work"],
    ["laziness", "excuses", "fear"],
    ["motivation", "wisdom"],
    ["unmotivated", "reflective"]
  ),

  createProverb(
    "Proverbs 26:14",
    "The Sluggard Stays in Bed",
    "As the door turneth upon his hinges, so doth the slothful upon his bed.",
    ["discipline", "warning", "work"],
    ["laziness", "habits", "comfort"],
    ["motivation", "wisdom"],
    ["unmotivated", "reflective"]
  ),

  createProverb(
    "Proverbs 26:15",
    "Extreme Laziness",
    "The slothful hideth his hand in his bosom; it grieveth him to bring it again to his mouth.",
    ["discipline", "warning", "work"],
    ["laziness", "effort", "habits"],
    ["motivation", "wisdom"],
    ["unmotivated", "reflective"]
  ),

  createProverb(
    "Proverbs 26:16",
    "Pride in Foolishness",
    "The sluggard is wiser in his own conceit than seven men that can render a reason.",
    ["humility", "warning", "wisdom"],
    ["pride", "self-deception", "foolishness"],
    ["correction", "wisdom"],
    ["stubborn", "reflective"]
  ),

  createProverb(
    "Proverbs 26:17",
    "Avoid Unnecessary Conflict",
    "He that passeth by, and meddleth with strife belonging not to him, is like one that taketh a dog by the ears.",
    ["discernment", "conflict", "wisdom"],
    ["arguments", "boundaries", "trouble"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 26:18",
    "Dangerous Deception",
    "As a mad man who casteth firebrands, arrows, and death,",
    ["warning", "deception", "wisdom"],
    ["harm", "danger", "recklessness"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 26:19",
    "Joking That Hurts",
    "So is the man that deceiveth his neighbour, and saith, Am not I in sport?",
    ["integrity", "relationships", "wisdom"],
    ["deception", "speech", "harm"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 26:20",
    "Gossip Fuels Conflict",
    "Where no wood is, there the fire goeth out: so where there is no talebearer, the strife ceaseth.",
    ["speech", "conflict", "wisdom"],
    ["gossip", "peace", "relationships"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 26:21",
    "Contentious People Fuel Conflict",
    "As coals are to burning coals, and wood to fire; so is a contentious man to kindle strife.",
    ["conflict", "relationships", "wisdom"],
    ["arguments", "contention", "strife"],
    ["wisdom", "guidance"],
    ["stressed", "reflective"]
  ),

  createProverb(
    "Proverbs 26:22",
    "The Power of Gossip",
    "The words of a talebearer are as wounds, and they go down into the innermost parts of the belly.",
    ["speech", "relationships", "warning"],
    ["gossip", "harm", "words"],
    ["wisdom", "guidance"],
    ["hurt", "reflective"]
  ),

  createProverb(
    "Proverbs 26:23",
    "Smooth Words, Wicked Heart",
    "Burning lips and a wicked heart are like a potsherd covered with silver dross.",
    ["discernment", "integrity", "wisdom"],
    ["deception", "appearance", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 26:24",
    "Hatred Hidden by Words",
    "He that hateth dissembleth with his lips, and layeth up deceit within him;",
    ["discernment", "warning", "relationships"],
    ["hatred", "deception", "speech"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 26:25",
    "Beware of Flattering Words",
    "When he speaketh fair, believe him not: for there are seven abominations in his heart.",
    ["discernment", "warning", "wisdom"],
    ["flattery", "deception", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 26:26",
    "Hidden Hatred Will Be Exposed",
    "Whose hatred is covered by deceit, his wickedness shall be shewed before the whole congregation.",
    ["justice", "truth", "warning"],
    ["deception", "exposure", "character"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 26:27",
    "You Reap What You Dig",
    "Whoso diggeth a pit shall fall therein: and he that rolleth a stone, it will return upon him.",
    ["justice", "consequences", "wisdom"],
    ["karma", "choices", "actions"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 26:28",
    "Flattery Leads to Ruin",
    "A lying tongue hateth those that are afflicted by it; and a flattering mouth worketh ruin.",
    ["speech", "truth", "warning"],
    ["lies", "flattery", "relationships"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

    createProverb(
    "Proverbs 27:1",
    "Do Not Boast About Tomorrow",
    "Boast not thyself of to morrow; for thou knowest not what a day may bring forth.",
    ["humility", "wisdom", "perspective"],
    ["future", "planning", "uncertainty"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 27:2",
    "Let Others Praise You",
    "Let another man praise thee, and not thine own mouth; a stranger, and not thine own lips.",
    ["humility", "character", "wisdom"],
    ["reputation", "praise", "integrity"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 27:3",
    "The Weight of Anger",
    "A stone is heavy, and the sand weighty; but a fool's wrath is heavier than them both.",
    ["anger", "wisdom", "warning"],
    ["emotions", "conflict", "character"],
    ["wisdom", "guidance"],
    ["stressed", "reflective"]
  ),

  createProverb(
    "Proverbs 27:4",
    "Jealousy Is Dangerous",
    "Wrath is cruel, and anger is outrageous; but who is able to stand before envy?",
    ["warning", "emotions", "wisdom"],
    ["jealousy", "anger", "relationships"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 27:5",
    "Open Correction Is Better",
    "Open rebuke is better than secret love.",
    ["correction", "relationships", "wisdom"],
    ["honesty", "truth", "growth"],
    ["wisdom", "guidance"],
    ["reflective", "teachable"]
  ),

    createProverb(
    "Proverbs 27:6",
    "Faithful Wounds of a Friend",
    "Faithful are the wounds of a friend; but the kisses of an enemy are deceitful.",
    ["friendship", "truth", "wisdom"],
    ["correction", "loyalty", "discernment"],
    ["relationships", "wisdom"],
    ["reflective", "teachable"]
  ),

  createProverb(
    "Proverbs 27:7",
    "Hunger Changes Perspective",
    "The full soul loatheth an honeycomb; but to the hungry soul every bitter thing is sweet.",
    ["perspective", "contentment", "wisdom"],
    ["gratitude", "needs", "attitude"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 27:8",
    "Wandering From Home",
    "As a bird that wandereth from her nest, so is a man that wandereth from his place.",
    ["stability", "wisdom", "warning"],
    ["purpose", "home", "direction"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 27:9",
    "The Sweetness of True Friendship",
    "Ointment and perfume rejoice the heart: so doth the sweetness of a man's friend by hearty counsel.",
    ["friendship", "counsel", "wisdom"],
    ["advice", "relationships", "encouragement"],
    ["relationships", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 27:10",
    "Value Loyal Friends",
    "Thine own friend, and thy father's friend, forsake not; neither go into thy brother's house in the day of thy calamity: for better is a neighbour that is near than a brother far off.",
    ["friendship", "loyalty", "wisdom"],
    ["support", "relationships", "community"],
    ["relationships", "wisdom"],
    ["reflective", "seeking"]
  ), 

    createProverb(
    "Proverbs 27:11",
    "Wise Children Bring Joy",
    "My son, be wise, and make my heart glad, that I may answer him that reproacheth me.",
    ["wisdom", "family", "honor"],
    ["character", "reputation", "choices"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 27:12",
    "The Prudent Avoid Danger",
    "A prudent man foreseeth the evil, and hideth himself; but the simple pass on, and are punished.",
    ["discernment", "wisdom", "prudence"],
    ["danger", "foresight", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 27:13",
    "Be Careful With Financial Guarantees",
    "Take his garment that is surety for a stranger, and take a pledge of him for a strange woman.",
    ["financial wisdom", "prudence", "responsibility"],
    ["debt", "guarantee", "risk"],
    ["finances", "wisdom"],
    ["uncertain", "reflective"]
  ),

  createProverb(
    "Proverbs 27:14",
    "Insensitive Blessings",
    "He that blesseth his friend with a loud voice, rising early in the morning, it shall be counted a curse to him.",
    ["discernment", "relationships", "wisdom"],
    ["timing", "speech", "consideration"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 27:15",
    "Constant Conflict",
    "A continual dropping in a very rainy day and a contentious woman are alike.",
    ["conflict", "relationships", "wisdom"],
    ["contention", "home", "peace"],
    ["relationships", "wisdom"],
    ["stressed", "reflective"]
  ), 

    createProverb(
    "Proverbs 27:16",
    "Trying to Restrain Conflict",
    "Whosoever hideth her hideth the wind, and the ointment of his right hand, which bewrayeth itself.",
    ["conflict", "wisdom", "relationships"],
    ["contention", "difficulty", "discernment"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 27:17",
    "People Sharpen Each Other",
    "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.",
    ["friendship", "growth", "wisdom"],
    ["mentorship", "encouragement", "improvement"],
    ["relationships", "wisdom"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 27:18",
    "Faithful Work Brings Reward",
    "Whoso keepeth the fig tree shall eat the fruit thereof: so he that waiteth on his master shall be honoured.",
    ["faithfulness", "work", "wisdom"],
    ["reward", "service", "diligence"],
    ["motivation", "wisdom"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 27:19",
    "The Heart Reflects the Person",
    "As in water face answereth to face, so the heart of man to man.",
    ["self-awareness", "character", "wisdom"],
    ["reflection", "heart", "identity"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 27:20",
    "Human Desire Is Never Satisfied",
    "Hell and destruction are never full; so the eyes of man are never satisfied.",
    ["warning", "contentment", "wisdom"],
    ["desire", "greed", "perspective"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 27:21",
    "Character Is Revealed by Praise",
    "As the fining pot for silver, and the furnace for gold; so is a man to his praise.",
    ["character", "testing", "wisdom"],
    ["reputation", "praise", "refinement"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 27:22",
    "Foolishness Is Hard to Remove",
    "Though thou shouldest bray a fool in a mortar among wheat with a pestle, yet will not his foolishness depart from him.",
    ["warning", "character", "wisdom"],
    ["foolishness", "habits", "stubbornness"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 27:23",
    "Know the State of Your Flock",
    "Be thou diligent to know the state of thy flocks, and look well to thy herds.",
    ["leadership", "stewardship", "wisdom"],
    ["responsibility", "management", "care"],
    ["leadership", "wisdom"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 27:24",
    "Riches Do Not Last Forever",
    "For riches are not for ever: and doth the crown endure to every generation?",
    ["wisdom", "perspective", "stewardship"],
    ["wealth", "legacy", "planning"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 27:25",
    "Provision Through Careful Work",
    "The hay appeareth, and the tender grass sheweth itself, and herbs of the mountains are gathered.",
    ["provision", "work", "wisdom"],
    ["harvest", "preparation", "stewardship"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

    createProverb(
    "Proverbs 27:26",
    "Provision Through Stewardship",
    "The lambs are for thy clothing, and the goats are the price of the field.",
    ["stewardship", "provision", "wisdom"],
    ["resources", "work", "planning"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 27:27",
    "Faithful Care Provides Security",
    "And thou shalt have goats' milk enough for thy food, for the food of thy household, and for the maintenance for thy maidens.",
    ["provision", "responsibility", "wisdom"],
    ["family", "stewardship", "security"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

    createProverb(
    "Proverbs 28:1",
    "The Courage of the Righteous",
    "The wicked flee when no man pursueth: but the righteous are bold as a lion.",
    ["courage", "righteousness", "confidence"],
    ["fear", "integrity", "character"],
    ["encouragement", "wisdom"],
    ["motivated", "hopeful"]
  ),

  createProverb(
    "Proverbs 28:2",
    "Leadership Brings Stability",
    "For the transgression of a land many are the princes thereof: but by a man of understanding and knowledge the state thereof shall be prolonged.",
    ["leadership", "wisdom", "stability"],
    ["government", "order", "understanding"],
    ["leadership", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 28:3",
    "Oppression From the Poor",
    "A poor man that oppresseth the poor is like a sweeping rain which leaveth no food.",
    ["justice", "compassion", "warning"],
    ["oppression", "poverty", "character"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 28:4",
    "Rejecting the Law Encourages Evil",
    "They that forsake the law praise the wicked: but such as keep the law contend with them.",
    ["justice", "integrity", "wisdom"],
    ["law", "righteousness", "character"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 28:5",
    "Understanding Justice",
    "Evil men understand not judgment: but they that seek the Lord understand all things.",
    ["faith", "discernment", "wisdom"],
    ["justice", "understanding", "guidance"],
    ["faith", "wisdom"],
    ["seeking", "reflective"]
  ), 

    createProverb(
    "Proverbs 28:6",
    "Integrity Over Wealth",
    "Better is the poor that walketh in his uprightness, than he that is perverse in his ways, though he be rich.",
    ["integrity", "character", "wisdom"],
    ["wealth", "values", "righteousness"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 28:7",
    "Wise Children Honor Their Parents",
    "Whoso keepeth the law is a wise son: but he that is a companion of riotous men shameth his father.",
    ["family", "wisdom", "character"],
    ["choices", "influence", "honor"],
    ["relationships", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 28:8",
    "Unjust Gain Will Not Last",
    "He that by usury and unjust gain increaseth his substance, he shall gather it for him that will pity the poor.",
    ["justice", "wealth", "warning"],
    ["money", "greed", "fairness"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 28:9",
    "Ignoring God's Word",
    "He that turneth away his ear from hearing the law, even his prayer shall be abomination.",
    ["faith", "obedience", "wisdom"],
    ["prayer", "law", "relationship with God"],
    ["faith", "wisdom"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 28:10",
    "Leading Others Into Evil",
    "Whoso causeth the righteous to go astray in an evil way, he shall fall himself into his own pit: but the upright shall have good things in possession.",
    ["justice", "integrity", "warning"],
    ["influence", "choices", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ), 

    createProverb(
    "Proverbs 28:11",
    "True Insight Sees Through Wealth",
    "The rich man is wise in his own conceit; but the poor that hath understanding searcheth him out.",
    ["discernment", "wisdom", "humility"],
    ["wealth", "perception", "understanding"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 28:12",
    "Righteous Leadership Brings Joy",
    "When righteous men do rejoice, there is great glory: but when the wicked rise, a man is hidden.",
    ["leadership", "justice", "wisdom"],
    ["righteousness", "influence", "society"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 28:13",
    "Confession Brings Mercy",
    "He that covereth his sins shall not prosper: but whoso confesseth and forsaketh them shall have mercy.",
    ["repentance", "faith", "wisdom"],
    ["confession", "mercy", "growth"],
    ["faith", "wisdom"],
    ["reflective", "hopeful"]
  ),

  createProverb(
    "Proverbs 28:14",
    "Healthy Reverence Brings Blessing",
    "Happy is the man that feareth alway: but he that hardeneth his heart shall fall into mischief.",
    ["humility", "wisdom", "faith"],
    ["reverence", "heart", "character"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 28:15",
    "Dangerous Wicked Leadership",
    "As a roaring lion, and a ranging bear; so is a wicked ruler over the poor people.",
    ["leadership", "justice", "warning"],
    ["power", "oppression", "authority"],
    ["leadership", "wisdom"],
    ["reflective", "seeking"]
  ), 

    createProverb(
    "Proverbs 28:16",
    "Understanding Strengthens Leadership",
    "The prince that wanteth understanding is also a great oppressor: but he that hateth covetousness shall prolong his days.",
    ["leadership", "wisdom", "justice"],
    ["greed", "authority", "character"],
    ["leadership", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 28:17",
    "The Weight of Guilt",
    "A man that doeth violence to the blood of any person shall flee to the pit; let no man stay him.",
    ["justice", "warning", "consequences"],
    ["violence", "guilt", "judgment"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 28:18",
    "Integrity Brings Safety",
    "Whoso walketh uprightly shall be saved: but he that is perverse in his ways shall fall at once.",
    ["integrity", "character", "wisdom"],
    ["choices", "safety", "righteousness"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 28:19",
    "Diligent Work Brings Provision",
    "He that tilleth his land shall have plenty of bread: but he that followeth after vain persons shall have poverty enough.",
    ["discipline", "work", "wisdom"],
    ["effort", "provision", "influence"],
    ["motivation", "wisdom"],
    ["determined", "reflective"]
  ),

  createProverb(
    "Proverbs 28:20",
    "Faithfulness Brings Blessing",
    "A faithful man shall abound with blessings: but he that maketh haste to be rich shall not be innocent.",
    ["faithfulness", "integrity", "wisdom"],
    ["wealth", "character", "patience"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ), 

    createProverb(
    "Proverbs 28:21",
    "Partiality Is Wrong",
    "To have respect of persons is not good: for for a piece of bread that man will transgress.",
    ["justice", "integrity", "wisdom"],
    ["favoritism", "judgment", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 28:22",
    "Greed Brings Poverty",
    "He that hasteth to be rich hath an evil eye, and considereth not that poverty shall come upon him.",
    ["warning", "wealth", "wisdom"],
    ["greed", "money", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 28:23",
    "Truthful Correction Is Valued",
    "He that rebuketh a man afterwards shall find more favour than he that flattereth with the tongue.",
    ["truth", "correction", "wisdom"],
    ["honesty", "relationships", "growth"],
    ["wisdom", "guidance"],
    ["reflective", "teachable"]
  ),

  createProverb(
    "Proverbs 28:24",
    "Stealing From Parents Is Wrong",
    "Whoso robbeth his father or his mother, and saith, It is no transgression; the same is the companion of a destroyer.",
    ["family", "integrity", "warning"],
    ["theft", "character", "choices"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 28:25",
    "Greed Creates Conflict",
    "He that is of a proud heart stirreth up strife: but he that putteth his trust in the Lord shall be made fat.",
    ["faith", "humility", "wisdom"],
    ["pride", "conflict", "trust"],
    ["faith", "wisdom"],
    ["reflective", "hopeful"]
  ), 

   createProverb(
    "Proverbs 28:26",
    "Trusting Your Own Heart",
    "He that trusteth in his own heart is a fool: but whoso walketh wisely, he shall be delivered.",
    ["wisdom", "discernment", "guidance"],
    ["self-reliance", "choices", "understanding"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 28:27",
    "Generosity to the Poor",
    "He that giveth unto the poor shall not lack: but he that hideth his eyes shall have many a curse.",
    ["generosity", "compassion", "wisdom"],
    ["charity", "poor", "blessing"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 28:28",
    "Wicked Leaders Cause Fear",
    "When the wicked rise, men hide themselves: but when they perish, the righteous increase.",
    ["leadership", "justice", "wisdom"],
    ["authority", "righteousness", "society"],
    ["leadership", "wisdom"],
    ["reflective", "seeking"]
  ), 

    createProverb(
    "Proverbs 29:1",
    "Stubbornness Leads to Ruin",
    "He, that being often reproved hardeneth his neck, shall suddenly be destroyed, and that without remedy.",
    ["warning", "correction", "wisdom"],
    ["stubbornness", "discipline", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 29:2",
    "Righteous Leadership Brings Joy",
    "When the righteous are in authority, the people rejoice: but when the wicked beareth rule, the people mourn.",
    ["leadership", "justice", "wisdom"],
    ["authority", "society", "righteousness"],
    ["leadership", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 29:3",
    "Wisdom Honors Parents",
    "Whoso loveth wisdom rejoiceth his father: but he that keepeth company with harlots spendeth his substance.",
    ["wisdom", "family", "character"],
    ["choices", "influence", "discipline"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 29:4",
    "Justice Strengthens a Nation",
    "The king by judgment establisheth the land: but he that receiveth gifts overthroweth it.",
    ["leadership", "justice", "integrity"],
    ["corruption", "authority", "government"],
    ["leadership", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 29:5",
    "Flattery Is a Trap",
    "A man that flattereth his neighbour spreadeth a net for his feet.",
    ["discernment", "relationships", "wisdom"],
    ["flattery", "deception", "speech"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ), 

    createProverb(
    "Proverbs 29:6",
    "Sin Traps the Wicked",
    "In the transgression of an evil man there is a snare: but the righteous doth sing and rejoice.",
    ["justice", "character", "wisdom"],
    ["sin", "consequences", "freedom"],
    ["wisdom", "guidance"],
    ["reflective", "hopeful"]
  ),

  createProverb(
    "Proverbs 29:7",
    "The Righteous Care About Justice",
    "The righteous considereth the cause of the poor: but the wicked regardeth not to know it.",
    ["justice", "compassion", "wisdom"],
    ["poor", "empathy", "character"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 29:8",
    "Mockers Stir Up Conflict",
    "Scornful men bring a city into a snare: but wise men turn away wrath.",
    ["wisdom", "leadership", "peace"],
    ["conflict", "anger", "influence"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 29:9",
    "Arguing With a Fool",
    "If a wise man contendeth with a foolish man, whether he rage or laugh, there is no rest.",
    ["discernment", "communication", "wisdom"],
    ["arguments", "foolishness", "conflict"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 29:10",
    "The Righteous Seek Justice",
    "The bloodthirsty hate the upright: but the just seek his soul.",
    ["justice", "character", "wisdom"],
    ["violence", "integrity", "righteousness"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 29:11",
    "Fools Express All Their Anger",
    "A fool uttereth all his mind: but a wise man keepeth it in till afterwards.",
    ["self-control", "wisdom", "communication"],
    ["anger", "speech", "discipline"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 29:12",
    "Corrupt Leadership",
    "If a ruler hearken to lies, all his servants are wicked.",
    ["leadership", "integrity", "wisdom"],
    ["authority", "truth", "influence"],
    ["leadership", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 29:13",
    "God Gives Light to All",
    "The poor and the deceitful man meet together: the Lord lighteneth both their eyes.",
    ["faith", "perspective", "wisdom"],
    ["rich", "poor", "God's provision"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 29:14",
    "Justice Establishes a Throne",
    "The king that faithfully judgeth the poor, his throne shall be established for ever.",
    ["leadership", "justice", "integrity"],
    ["authority", "fairness", "legacy"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 29:15",
    "Discipline Brings Wisdom",
    "The rod and reproof give wisdom: but a child left to himself bringeth his mother to shame.",
    ["discipline", "parenting", "wisdom"],
    ["correction", "children", "guidance"],
    ["family", "wisdom"],
    ["reflective", "teachable"]
  ), 

    createProverb(
    "Proverbs 29:16",
    "Wicked Leaders Multiply Trouble",
    "When the wicked are multiplied, transgression increaseth: but the righteous shall see their fall.",
    ["leadership", "justice", "wisdom"],
    ["authority", "sin", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 29:17",
    "Discipline Brings Peace",
    "Correct thy son, and he shall give thee rest; yea, he shall give delight unto thy soul.",
    ["discipline", "parenting", "wisdom"],
    ["correction", "family", "guidance"],
    ["family", "wisdom"],
    ["reflective", "teachable"]
  ),

  createProverb(
    "Proverbs 29:18",
    "Vision Guides People",
    "Where there is no vision, the people perish: but he that keepeth the law, happy is he.",
    ["leadership", "vision", "wisdom"],
    ["direction", "guidance", "purpose"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 29:19",
    "Words Alone Do Not Correct",
    "A servant will not be corrected by words: for though he understand he will not answer.",
    ["discipline", "wisdom", "leadership"],
    ["instruction", "correction", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 29:20",
    "Quick Words Reveal Folly",
    "Seest thou a man that is hasty in his words? there is more hope of a fool than of him.",
    ["speech", "self-control", "wisdom"],
    ["impulsiveness", "communication", "character"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 29:21",
    "Spoiling Servants",
    "He that delicately bringeth up his servant from a child shall have him become his son at the length.",
    ["leadership", "discipline", "wisdom"],
    ["training", "authority", "responsibility"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 29:22",
    "Anger Creates Trouble",
    "An angry man stirreth up strife, and a furious man aboundeth in transgression.",
    ["anger", "conflict", "wisdom"],
    ["temper", "sin", "relationships"],
    ["wisdom", "guidance"],
    ["stressed", "reflective"]
  ),

  createProverb(
    "Proverbs 29:23",
    "Humility Brings Honor",
    "A man's pride shall bring him low: but honour shall uphold the humble in spirit.",
    ["humility", "character", "wisdom"],
    ["pride", "honor", "integrity"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 29:24",
    "Sharing in Theft",
    "Whoso is partner with a thief hateth his own soul: he heareth cursing, and bewrayeth it not.",
    ["integrity", "justice", "wisdom"],
    ["theft", "complicity", "character"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 29:25",
    "Fear of Man vs Trust in God",
    "The fear of man bringeth a snare: but whoso putteth his trust in the Lord shall be safe.",
    ["faith", "courage", "wisdom"],
    ["fear", "trust", "security"],
    ["faith", "encouragement"],
    ["uncertain", "hopeful"]
  ),

  createProverb(
    "Proverbs 29:26",
    "God Determines Justice",
    "Many seek the ruler's favour; but every man's judgment cometh from the Lord.",
    ["faith", "justice", "wisdom"],
    ["authority", "judgment", "truth"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 29:27",
    "Opposing Values",
    "An unjust man is an abomination to the just: and he that is upright in the way is abomination to the wicked.",
    ["justice", "integrity", "wisdom"],
    ["values", "righteousness", "conflict"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

    createProverb(
    "Proverbs 30:1",
    "Words of Agur",
    "The words of Agur the son of Jakeh, even the prophecy: the man spake unto Ithiel, even unto Ithiel and Ucal,",
    ["wisdom", "instruction", "humility"],
    ["teaching", "prophecy", "reflection"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 30:2",
    "Human Understanding Is Limited",
    "Surely I am more brutish than any man, and have not the understanding of a man.",
    ["humility", "wisdom", "self-awareness"],
    ["limits", "understanding", "learning"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 30:3",
    "Learning Comes From God",
    "I neither learned wisdom, nor have the knowledge of the holy.",
    ["humility", "learning", "wisdom"],
    ["knowledge", "understanding", "growth"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 30:4",
    "God Alone Knows All Things",
    "Who hath ascended up into heaven, or descended? who hath gathered the wind in his fists? who hath bound the waters in a garment?",
    ["faith", "awe", "wisdom"],
    ["creation", "power", "God"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 30:5",
    "God's Word Is Pure",
    "Every word of God is pure: he is a shield unto them that put their trust in him.",
    ["faith", "truth", "protection"],
    ["God's word", "trust", "security"],
    ["faith", "encouragement"],
    ["hopeful", "seeking"]
  ), 

    createProverb(
    "Proverbs 30:6",
    "Do Not Add to God's Word",
    "Add thou not unto his words, lest he reprove thee, and thou be found a liar.",
    ["faith", "truth", "wisdom"],
    ["scripture", "integrity", "warning"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 30:7",
    "A Prayer for Wisdom",
    "Two things have I required of thee; deny me them not before I die:",
    ["prayer", "faith", "wisdom"],
    ["requests", "humility", "dependence"],
    ["faith", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 30:8",
    "Give Me Honest Provision",
    "Remove far from me vanity and lies: give me neither poverty nor riches; feed me with food convenient for me:",
    ["contentment", "wisdom", "faith"],
    ["balance", "provision", "truth"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 30:9",
    "Guarding the Heart From Extremes",
    "Lest I be full, and deny thee, and say, Who is the Lord? or lest I be poor, and steal, and take the name of my God in vain.",
    ["faith", "contentment", "wisdom"],
    ["temptation", "balance", "integrity"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 30:10",
    "Do Not Slander a Servant",
    "Accuse not a servant unto his master, lest he curse thee, and thou be found guilty.",
    ["speech", "justice", "wisdom"],
    ["slander", "relationships", "integrity"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ), 

    createProverb(
    "Proverbs 30:11",
    "A Disrespectful Generation",
    "There is a generation that curseth their father, and doth not bless their mother.",
    ["family", "warning", "character"],
    ["disrespect", "parents", "values"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 30:12",
    "Self-Righteous People",
    "There is a generation that are pure in their own eyes, and yet is not washed from their filthiness.",
    ["warning", "self-awareness", "wisdom"],
    ["hypocrisy", "self-righteousness", "character"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 30:13",
    "The Prideful Generation",
    "There is a generation, O how lofty are their eyes! and their eyelids are lifted up.",
    ["warning", "pride", "character"],
    ["arrogance", "attitude", "humility"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ),

  createProverb(
    "Proverbs 30:14",
    "Oppressors of the Poor",
    "There is a generation, whose teeth are as swords, and their jaw teeth as knives, to devour the poor from off the earth, and the needy from among men.",
    ["justice", "compassion", "warning"],
    ["oppression", "violence", "greed"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ), 

    createProverb(
    "Proverbs 30:15",
    "Greed Is Never Satisfied",
    "The horseleach hath two daughters, crying, Give, give. There are three things that are never satisfied, yea, four things say not, It is enough:",
    ["warning", "greed", "wisdom"],
    ["desire", "insatiable", "contentment"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 30:16",
    "Things Never Satisfied",
    "The grave; and the barren womb; the earth that is not filled with water; and the fire that saith not, It is enough.",
    ["wisdom", "observation", "warning"],
    ["desire", "nature", "limits"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 30:17",
    "Dishonoring Parents Brings Consequences",
    "The eye that mocketh at his father, and despiseth to obey his mother, the ravens of the valley shall pick it out, and the young eagles shall eat it.",
    ["family", "warning", "discipline"],
    ["parents", "respect", "consequences"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ), 

    createProverb(
    "Proverbs 30:18",
    "Things Too Wonderful to Understand",
    "There be three things which are too wonderful for me, yea, four which I know not:",
    ["wisdom", "wonder", "observation"],
    ["mystery", "understanding", "creation"],
    ["wisdom", "guidance"],
    ["reflective", "curious"]
  ),

  createProverb(
    "Proverbs 30:19",
    "Four Mysterious Ways",
    "The way of an eagle in the air; the way of a serpent upon a rock; the way of a ship in the midst of the sea; and the way of a man with a maid.",
    ["wisdom", "observation", "life"],
    ["mystery", "nature", "relationships"],
    ["wisdom", "guidance"],
    ["reflective", "curious"]
  ),

  createProverb(
    "Proverbs 30:20",
    "The Way of the Adulterous Woman",
    "Such is the way of an adulterous woman; she eateth, and wipeth her mouth, and saith, I have done no wickedness.",
    ["warning", "integrity", "wisdom"],
    ["deception", "sin", "accountability"],
    ["wisdom", "guidance"],
    ["reflective", "convicted"]
  ), 

    createProverb(
    "Proverbs 30:21",
    "Things That Trouble the Earth",
    "For three things the earth is disquieted, and for four which it cannot bear:",
    ["wisdom", "observation", "discernment"],
    ["order", "society", "balance"],
    ["wisdom", "guidance"],
    ["reflective", "curious"]
  ),

  createProverb(
    "Proverbs 30:22",
    "Unfit Leadership",
    "For a servant when he reigneth; and a fool when he is filled with meat;",
    ["leadership", "warning", "wisdom"],
    ["authority", "character", "foolishness"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 30:23",
    "Disordered Relationships",
    "For an odious woman when she is married; and an handmaid that is heir to her mistress.",
    ["relationships", "warning", "wisdom"],
    ["order", "authority", "conflict"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ), 

    createProverb(
    "Proverbs 30:24",
    "Small Creatures With Great Wisdom",
    "There be four things which are little upon the earth, but they are exceeding wise:",
    ["wisdom", "observation", "learning"],
    ["nature", "insight", "humility"],
    ["wisdom", "guidance"],
    ["reflective", "curious"]
  ),

  createProverb(
    "Proverbs 30:25",
    "Ants Prepare for the Future",
    "The ants are a people not strong, yet they prepare their meat in the summer;",
    ["discipline", "planning", "wisdom"],
    ["preparation", "diligence", "foresight"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 30:26",
    "Rock Badgers Seek Security",
    "The conies are but a feeble folk, yet make they their houses in the rocks;",
    ["wisdom", "security", "discernment"],
    ["protection", "safety", "strategy"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 30:27",
    "Locusts Move in Unity",
    "The locusts have no king, yet go they forth all of them by bands;",
    ["unity", "organization", "wisdom"],
    ["teamwork", "order", "cooperation"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 30:28",
    "Small Creatures Can Reach Great Places",
    "The spider taketh hold with her hands, and is in kings' palaces.",
    ["perseverance", "wisdom", "opportunity"],
    ["persistence", "access", "success"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ), 

   createProverb(
    "Proverbs 30:29",
    "Four Creatures With Majesty",
    "There be three things which go well, yea, four are comely in going:",
    ["wisdom", "observation", "leadership"],
    ["strength", "movement", "nature"],
    ["wisdom", "guidance"],
    ["reflective", "curious"]
  ),

  createProverb(
    "Proverbs 30:30",
    "The Lion Walks With Confidence",
    "A lion which is strongest among beasts, and turneth not away for any;",
    ["courage", "strength", "leadership"],
    ["confidence", "power", "boldness"],
    ["encouragement", "wisdom"],
    ["motivated", "confident"]
  ),

  createProverb(
    "Proverbs 30:31",
    "Graceful Authority",
    "A greyhound; an he goat also; and a king, against whom there is no rising up.",
    ["leadership", "authority", "wisdom"],
    ["strength", "order", "confidence"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 30:32",
    "Control Your Pride and Anger",
    "If thou hast done foolishly in lifting up thyself, or if thou hast thought evil, lay thine hand upon thy mouth.",
    ["self-control", "humility", "wisdom"],
    ["speech", "pride", "restraint"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 30:33",
    "Strife Comes From Stirring Anger",
    "Surely the churning of milk bringeth forth butter, and the wringing of the nose bringeth forth blood: so the forcing of wrath bringeth forth strife.",
    ["anger", "conflict", "wisdom"],
    ["provocation", "consequences", "relationships"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ), 

    createProverb(
    "Proverbs 31:1",
    "The Words of King Lemuel",
    "The words of king Lemuel, the prophecy that his mother taught him.",
    ["wisdom", "leadership", "instruction"],
    ["teaching", "legacy", "mother"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 31:2",
    "A Mother’s Loving Appeal",
    "What, my son? and what, the son of my womb? and what, the son of my vows?",
    ["family", "instruction", "love"],
    ["mother", "identity", "calling"],
    ["relationships", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 31:3",
    "Do Not Waste Strength",
    "Give not thy strength unto women, nor thy ways to that which destroyeth kings.",
    ["discipline", "leadership", "warning"],
    ["temptation", "strength", "self-control"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 31:4",
    "Leaders Need Clear Judgment",
    "It is not for kings, O Lemuel, it is not for kings to drink wine; nor for princes strong drink:",
    ["leadership", "self-control", "wisdom"],
    ["alcohol", "judgment", "discipline"],
    ["leadership", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 31:5",
    "Avoid Anything That Distorts Judgment",
    "Lest they drink, and forget the law, and pervert the judgment of any of the afflicted.",
    ["justice", "leadership", "self-control"],
    ["judgment", "clarity", "responsibility"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 31:6",
    "Mercy for the Perishing",
    "Give strong drink unto him that is ready to perish, and wine unto those that be of heavy hearts.",
    ["mercy", "compassion", "wisdom"],
    ["suffering", "comfort", "grief"],
    ["encouragement", "wisdom"],
    ["sad", "weary"]
  ),

  createProverb(
    "Proverbs 31:7",
    "Relief From Misery",
    "Let him drink, and forget his poverty, and remember his misery no more.",
    ["compassion", "suffering", "mercy"],
    ["poverty", "pain", "relief"],
    ["encouragement", "wisdom"],
    ["sad", "weary"]
  ),

  createProverb(
    "Proverbs 31:8",
    "Speak for the Voiceless",
    "Open thy mouth for the dumb in the cause of all such as are appointed to destruction.",
    ["justice", "courage", "leadership"],
    ["advocacy", "mercy", "responsibility"],
    ["leadership", "wisdom"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 31:9",
    "Defend the Poor and Needy",
    "Open thy mouth, judge righteously, and plead the cause of the poor and needy.",
    ["justice", "leadership", "compassion"],
    ["poor", "advocacy", "righteousness"],
    ["leadership", "wisdom"],
    ["motivated", "reflective"]
  ), 

   createProverb(
    "Proverbs 31:10",
    "A Virtuous Woman Is Rare",
    "Who can find a virtuous woman? for her price is far above rubies.",
    ["character", "wisdom", "value"],
    ["virtue", "worth", "excellence"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 31:11",
    "Trustworthy Character",
    "The heart of her husband doth safely trust in her, so that he shall have no need of spoil.",
    ["trust", "relationships", "character"],
    ["faithfulness", "marriage", "integrity"],
    ["relationships", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 31:12",
    "Consistent Goodness",
    "She will do him good and not evil all the days of her life.",
    ["faithfulness", "character", "relationships"],
    ["kindness", "loyalty", "commitment"],
    ["relationships", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 31:13",
    "Diligent Work",
    "She seeketh wool, and flax, and worketh willingly with her hands.",
    ["diligence", "work", "wisdom"],
    ["effort", "industry", "responsibility"],
    ["motivation", "wisdom"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 31:14",
    "Provision for the Household",
    "She is like the merchants' ships; she bringeth her food from afar.",
    ["provision", "wisdom", "stewardship"],
    ["planning", "resources", "care"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 31:15",
    "Early Rising and Leadership",
    "She riseth also while it is yet night, and giveth meat to her household, and a portion to her maidens.",
    ["leadership", "discipline", "care"],
    ["responsibility", "service", "diligence"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ), 

    createProverb(
    "Proverbs 31:16",
    "Wise Stewardship",
    "She considereth a field, and buyeth it: with the fruit of her hands she planteth a vineyard.",
    ["stewardship", "wisdom", "initiative"],
    ["planning", "investment", "responsibility"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 31:17",
    "Strength and Determination",
    "She girdeth her loins with strength, and strengtheneth her arms.",
    ["strength", "discipline", "wisdom"],
    ["determination", "effort", "character"],
    ["encouragement", "wisdom"],
    ["motivated", "confident"]
  ),

  createProverb(
    "Proverbs 31:18",
    "Diligent Productivity",
    "She perceiveth that her merchandise is good: her candle goeth not out by night.",
    ["diligence", "work", "wisdom"],
    ["productivity", "perseverance", "commitment"],
    ["motivation", "wisdom"],
    ["motivated", "determined"]
  ),

  createProverb(
    "Proverbs 31:19",
    "Skillful Work",
    "She layeth her hands to the spindle, and her hands hold the distaff.",
    ["skill", "work", "wisdom"],
    ["craftsmanship", "effort", "industry"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 31:20",
    "Compassion for the Poor",
    "She stretcheth out her hand to the poor; yea, she reacheth forth her hands to the needy.",
    ["compassion", "generosity", "wisdom"],
    ["charity", "kindness", "service"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ),

    createProverb(
    "Proverbs 31:21",
    "Prepared for the Future",
    "She is not afraid of the snow for her household: for all her household are clothed with scarlet.",
    ["preparedness", "wisdom", "care"],
    ["provision", "planning", "security"],
    ["wisdom", "guidance"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 31:22",
    "Excellence in Work",
    "She maketh herself coverings of tapestry; her clothing is silk and purple.",
    ["excellence", "wisdom", "diligence"],
    ["craftsmanship", "quality", "character"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 31:23",
    "Honored Leadership",
    "Her husband is known in the gates, when he sitteth among the elders of the land.",
    ["leadership", "honor", "reputation"],
    ["influence", "respect", "community"],
    ["leadership", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 31:24",
    "Entrepreneurial Spirit",
    "She maketh fine linen, and selleth it; and delivereth girdles unto the merchant.",
    ["enterprise", "work", "wisdom"],
    ["business", "productivity", "initiative"],
    ["motivation", "wisdom"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 31:25",
    "Strength and Confidence",
    "Strength and honour are her clothing; and she shall rejoice in time to come.",
    ["strength", "confidence", "wisdom"],
    ["future", "honor", "character"],
    ["encouragement", "wisdom"],
    ["hopeful", "confident"]
  ), 

   createProverb(
    "Proverbs 31:26",
    "Wisdom in Speech",
    "She openeth her mouth with wisdom; and in her tongue is the law of kindness.",
    ["speech", "wisdom", "kindness"],
    ["communication", "character", "teaching"],
    ["wisdom", "guidance"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 31:27",
    "Faithful Oversight",
    "She looketh well to the ways of her household, and eateth not the bread of idleness.",
    ["discipline", "responsibility", "wisdom"],
    ["leadership", "care", "diligence"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 31:28",
    "Honor From Family",
    "Her children arise up, and call her blessed; her husband also, and he praiseth her.",
    ["family", "honor", "relationships"],
    ["respect", "blessing", "gratitude"],
    ["relationships", "wisdom"],
    ["reflective", "motivated"]
  ),

  createProverb(
    "Proverbs 31:29",
    "Excellence Recognized",
    "Many daughters have done virtuously, but thou excellest them all.",
    ["character", "excellence", "wisdom"],
    ["virtue", "honor", "distinction"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  ),

  createProverb(
    "Proverbs 31:30",
    "True Beauty",
    "Favour is deceitful, and beauty is vain: but a woman that feareth the Lord, she shall be praised.",
    ["faith", "character", "wisdom"],
    ["beauty", "reverence", "values"],
    ["faith", "wisdom"],
    ["reflective", "seeking"]
  ),

  createProverb(
    "Proverbs 31:31",
    "Honor the Work of the Faithful",
    "Give her of the fruit of her hands; and let her own works praise her in the gates.",
    ["honor", "work", "wisdom"],
    ["recognition", "legacy", "character"],
    ["wisdom", "guidance"],
    ["motivated", "reflective"]
  )
];
