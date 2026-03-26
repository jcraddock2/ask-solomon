// app/lib/proverbs/shared.ts

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

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function uniq(items: string[]): string[] {
  return Array.from(new Set(items.filter(Boolean)));
}

export function createProverb(
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
