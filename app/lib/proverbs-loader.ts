// app/lib/proverbs-loader.ts

import { PROVERBS_FULL, type RawProverbVerse } from "./proverbs-full";

export type LoadedProverb = {
  ref: string;
  title: string;
  body: string;
  topics: string[];
  keywords: string[];
};

function normalize(input: string): string {
  return input.toLowerCase().trim();
}

function includesAny(text: string, words: string[]): boolean {
  const t = normalize(text);
  return words.some((w) => t.includes(normalize(w)));
}

function detectTopics(text: string): string[] {
  const topics = new Set<string>();
  const t = normalize(text);

  if (
    includesAny(t, [
      "wisdom",
      "understanding",
      "knowledge",
      "instruction",
      "discernment",
      "counsel",
    ])
  ) {
    topics.add("wisdom");
  }

  if (
    includesAny(t, [
      "fear",
      "afraid",
      "trouble",
      "refuge",
      "secure",
      "safe",
      "anxiety",
      "worry",
    ])
  ) {
    topics.add("peace");
    topics.add("encouragement");
  }

  if (
    includesAny(t, [
      "money",
      "wealth",
      "rich",
      "poor",
      "poverty",
      "gain",
      "profit",
      "treasure",
      "inheritance",
      "diligent",
      "sluggard",
      "lazy",
      "work",
      "labor",
    ])
  ) {
    topics.add("money");
    topics.add("work");
    topics.add("discipline");
  }

  if (
    includesAny(t, [
      "answer",
      "speech",
      "mouth",
      "tongue",
      "words",
      "lips",
      "gentle",
      "harsh",
    ])
  ) {
    topics.add("speech");
    topics.add("relationships");
    topics.add("leadership");
  }

  if (
    includesAny(t, [
      "friend",
      "neighbor",
      "wife",
      "husband",
      "love",
      "hatred",
      "offense",
      "forgive",
      "quarrel",
      "strife",
      "anger",
    ])
  ) {
    topics.add("relationships");
  }

  if (
    includesAny(t, [
      "path",
      "way",
      "steps",
      "direction",
      "understanding",
      "trust",
      "straight",
      "guide",
    ])
  ) {
    topics.add("guidance");
  }

  if (
    includesAny(t, [
      "strength",
      "courage",
      "steadfast",
      "hope",
      "joy",
      "heart",
      "life",
      "healing",
    ])
  ) {
    topics.add("strength");
    topics.add("hope");
    topics.add("encouragement");
  }

  if (
    includesAny(t, [
      "king",
      "ruler",
      "justice",
      "judgment",
      "counsel",
      "authority",
      "servant",
    ])
  ) {
    topics.add("leadership");
    topics.add("wisdom");
  }

  if (topics.size === 0) {
    topics.add("wisdom");
  }

  return Array.from(topics);
}

function detectKeywords(text: string): string[] {
  const seedWords = [
    "wisdom",
    "understanding",
    "knowledge",
    "instruction",
    "fear",
    "peace",
    "trust",
    "path",
    "direction",
    "heart",
    "hope",
    "strength",
    "money",
    "wealth",
    "poverty",
    "profit",
    "work",
    "discipline",
    "lazy",
    "diligent",
    "friend",
    "neighbor",
    "love",
    "anger",
    "strife",
    "gentle",
    "speech",
    "tongue",
    "words",
    "justice",
    "king",
    "counsel",
    "leadership",
    "integrity",
    "healing",
    "life",
    "joy",
  ];

  const t = normalize(text);
  return seedWords.filter((word) => t.includes(word));
}

function buildTitle(ref: string, text: string, topics: string[]): string {
  if (topics.includes("guidance")) return "Guidance";
  if (topics.includes("money")) return "Money Wisdom";
  if (topics.includes("relationships")) return "Relationship Wisdom";
  if (topics.includes("leadership")) return "Leadership Wisdom";
  if (topics.includes("peace")) return "Peace in Trouble";
  if (topics.includes("discipline")) return "Discipline and Diligence";
  if (topics.includes("hope")) return "Hope and Strength";
  if (topics.includes("speech")) return "Wise Speech";
  if (topics.includes("wisdom")) return "Wisdom";
  return ref;
}

export function loadFullProverbs(): LoadedProverb[] {
  return PROVERBS_FULL.map((verse: RawProverbVerse) => {
    const topics = detectTopics(verse.text);
    const keywords = detectKeywords(verse.text);

    return {
      ref: verse.ref,
      title: buildTitle(verse.ref, verse.text, topics),
      body: verse.text,
      topics,
      keywords,
    };
  });
}
