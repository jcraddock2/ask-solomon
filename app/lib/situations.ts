// app/lib/situations.ts

export type SituationType =
  | "workplace_conflict"
  | "difficult_person"
  | "rejection"
  | "burnout"
  | "confusion"
  | "financial_pressure"
  | "fear_anxiety"
  | "loneliness"
  | "general";

export type SituationResult = {
  types: SituationType[];
  boostTopics: string[];
  boostIntentTags: string[];
  boostMoodTags: string[];
};

function normalize(text: string): string {
  return text.toLowerCase();
}

export function detectSituation(query: string): SituationResult {
  const q = normalize(query);

  const types: SituationType[] = [];
  const boostTopics: string[] = [];
  const boostIntentTags: string[] = [];
  const boostMoodTags: string[] = [];

  // --- WORKPLACE / DIFFICULT PEOPLE ---
  if (
    q.includes("boss") ||
    q.includes("coworker") ||
    q.includes("manager") ||
    q.includes("work") ||
    q.includes("job")
  ) {
    types.push("workplace_conflict");

    boostTopics.push("wisdom", "speech", "self-control");
    boostIntentTags.push("restraint", "conflict", "wisdom");
    boostMoodTags.push("frustrated", "angry");
  }

  if (
    q.includes("difficult") ||
    q.includes("toxic") ||
    q.includes("annoying") ||
    q.includes("rude") ||
    q.includes("disrespect")
  ) {
    types.push("difficult_person");

    boostTopics.push("patience", "self-control", "wisdom");
    boostIntentTags.push("restraint", "speech");
    boostMoodTags.push("frustrated", "hurt");
  }

  // --- REJECTION ---
  if (
    q.includes("rejected") ||
    q.includes("ignored") ||
    q.includes("left out") ||
    q.includes("not chosen")
  ) {
    types.push("rejection");

    boostTopics.push("identity", "worth", "confidence");
    boostIntentTags.push("encouragement");
    boostMoodTags.push("hurt", "insecure");
  }

  // --- BURNOUT ---
  if (
    q.includes("tired") ||
    q.includes("burned out") ||
    q.includes("exhausted") ||
    q.includes("drained")
  ) {
    types.push("burnout");

    boostTopics.push("rest", "peace", "renewal");
    boostIntentTags.push("encouragement");
    boostMoodTags.push("weary");
  }

  // --- CONFUSION / DIRECTION ---
  if (
    q.includes("confused") ||
    q.includes("direction") ||
    q.includes("what should i do") ||
    q.includes("lost")
  ) {
    types.push("confusion");

    boostTopics.push("guidance", "wisdom", "direction");
    boostIntentTags.push("guidance");
    boostMoodTags.push("uncertain");
  }

  // --- FINANCIAL ---
  if (
    q.includes("money") ||
    q.includes("bills") ||
    q.includes("debt") ||
    q.includes("financial")
  ) {
    types.push("financial_pressure");

    boostTopics.push("stewardship", "wisdom", "discipline");
    boostIntentTags.push("wisdom");
    boostMoodTags.push("stressed");
  }

  // --- FEAR / ANXIETY ---
  if (
    q.includes("afraid") ||
    q.includes("anxious") ||
    q.includes("worried") ||
    q.includes("fear")
  ) {
    types.push("fear_anxiety");

    boostTopics.push("peace", "trust", "faith");
    boostIntentTags.push("encouragement");
    boostMoodTags.push("anxious");
  }

  // --- LONELINESS ---
  if (
    q.includes("alone") ||
    q.includes("lonely") ||
    q.includes("no one") ||
    q.includes("isolated")
  ) {
    types.push("loneliness");

    boostTopics.push("presence", "comfort", "connection");
    boostIntentTags.push("encouragement");
    boostMoodTags.push("lonely");
  }

  // fallback
  if (types.length === 0) {
    types.push("general");
  }

  return {
    types,
    boostTopics,
    boostIntentTags,
    boostMoodTags,
  };
}
