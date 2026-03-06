export type ProverbEntry = {
  ref: string;
  text: string;
  topics: string[];
};

export const PROVERBS: ProverbEntry[] = [
  {
    ref: "Proverbs 11:14",
    text: "Where there is no guidance, a people falls, but in an abundance of counselors there is safety.",
    topics: ["counsel", "guidance", "leadership", "decision"],
  },
  {
    ref: "Proverbs 12:25",
    text: "Anxiety in a man's heart weighs him down, but a good word makes him glad.",
    topics: ["anxiety", "peace", "encouragement", "fear"],
  },
  {
    ref: "Proverbs 13:20",
    text: "Whoever walks with the wise becomes wise, but the companion of fools will suffer harm.",
    topics: ["wisdom", "relationships", "friendship", "mentorship"],
  },
  {
    ref: "Proverbs 14:29",
    text: "Whoever is slow to anger has great understanding, but he who has a hasty temper exalts folly.",
    topics: ["anger", "patience", "self-control", "wisdom"],
  },
  {
    ref: "Proverbs 15:1",
    text: "A soft answer turns away wrath, but a harsh word stirs up anger.",
    topics: ["speech", "anger", "relationships", "conflict"],
  },
  {
    ref: "Proverbs 15:22",
    text: "Without counsel plans fail, but with many advisers they succeed.",
    topics: ["counsel", "planning", "leadership", "decision"],
  },
  {
    ref: "Proverbs 16:3",
    text: "Commit your work to the Lord, and your plans will be established.",
    topics: ["work", "planning", "purpose", "faith"],
  },
  {
    ref: "Proverbs 16:18",
    text: "Pride goes before destruction, and a haughty spirit before a fall.",
    topics: ["pride", "humility", "character", "wisdom"],
  },
  {
    ref: "Proverbs 16:32",
    text: "Whoever is slow to anger is better than the mighty, and he who rules his spirit than he who takes a city.",
    topics: ["anger", "discipline", "self-control", "leadership"],
  },
  {
    ref: "Proverbs 18:13",
    text: "If one gives an answer before he hears, it is his folly and shame.",
    topics: ["listening", "wisdom", "speech", "leadership"],
  },
  {
    ref: "Proverbs 18:21",
    text: "Death and life are in the power of the tongue, and those who love it will eat its fruits.",
    topics: ["speech", "words", "communication", "relationships"],
  },
  {
    ref: "Proverbs 19:11",
    text: "Good sense makes one slow to anger, and it is his glory to overlook an offense.",
    topics: ["anger", "patience", "conflict", "wisdom"],
  },
  {
    ref: "Proverbs 21:5",
    text: "The plans of the diligent lead surely to abundance, but everyone who is hasty comes only to poverty.",
    topics: ["diligence", "planning", "money", "work"],
  },
  {
    ref: "Proverbs 22:1",
    text: "A good name is to be chosen rather than great riches, and favor is better than silver or gold.",
    topics: ["integrity", "reputation", "character", "wealth"],
  },
  {
    ref: "Proverbs 22:29",
    text: "Do you see a man skillful in his work? He will stand before kings; he will not stand before obscure men.",
    topics: ["work", "excellence", "skill", "success"],
  },
  {
    ref: "Proverbs 27:17",
    text: "Iron sharpens iron, and one man sharpens another.",
    topics: ["relationships", "friendship", "mentorship", "growth"],
  },
  {
    ref: "Proverbs 27:23",
    text: "Know well the condition of your flocks, and give attention to your herds.",
    topics: ["stewardship", "leadership", "management", "responsibility"],
  },
];

export function searchProverbs(query: string): ProverbEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return PROVERBS.filter((p) => {
    const haystack = `${p.ref} ${p.text} ${p.topics.join(" ")}`.toLowerCase();
    return haystack.includes(q);
  }).slice(0, 12);
}
