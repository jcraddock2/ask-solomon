// app/lib/bookIndex.ts

export type BookEntry = {
  id: string;
  chapter: string;
  title: string;
  excerpt: string;
  tags: string[];
  keywords: string[];
};

export const BOOK_INDEX: BookEntry[] = [
  {
    id: "confidence-1",
    chapter: "Chapter 1",
    title: "Confidence Begins Internally",
    excerpt:
      "Confidence is not something you wait to receive from the world. It begins when you agree internally with who you are becoming.",
    tags: ["confidence", "identity", "belief"],
    keywords: [
      "confidence",
      "self doubt",
      "identity",
      "belief",
      "fear",
      "insecurity",
    ],
  },

  {
    id: "purpose-1",
    chapter: "Chapter 2",
    title: "Purpose Creates Direction",
    excerpt:
      "People drift when they lack direction. Purpose gives meaning to struggle and creates forward movement.",
    tags: ["purpose", "direction", "clarity"],
    keywords: [
      "purpose",
      "direction",
      "clarity",
      "lost",
      "confused",
      "future",
    ],
  },

  {
    id: "fear-1",
    chapter: "Chapter 3",
    title: "Fear Shrinks Potential",
    excerpt:
      "Fear rarely announces itself loudly. Often it disguises itself as hesitation, delay, or second guessing.",
    tags: ["fear", "confidence", "growth"],
    keywords: [
      "fear",
      "hesitation",
      "second guessing",
      "afraid",
      "confidence",
      "risk",
    ],
  },

  {
    id: "success-1",
    chapter: "Chapter 4",
    title: "Success Is Built Slowly",
    excerpt:
      "Most success is not dramatic. It comes through repeated discipline and small consistent choices.",
    tags: ["success", "discipline", "growth"],
    keywords: [
      "success",
      "discipline",
      "growth",
      "progress",
      "consistency",
      "goals",
    ],
  },

  {
    id: "leadership-1",
    chapter: "Chapter 5",
    title: "Leadership Starts Within",
    excerpt:
      "Leadership is not title first. It is influence, responsibility, and internal alignment.",
    tags: ["leadership", "influence", "responsibility"],
    keywords: [
      "leadership",
      "leader",
      "influence",
      "responsibility",
      "boss",
      "respect",
    ],
  },

  {
    id: "overwhelmed-1",
    chapter: "Chapter 6",
    title: "Overwhelm Comes From Compression",
    excerpt:
      "Overwhelm often comes from carrying too much mentally without releasing pressure.",
    tags: ["stress", "overwhelmed", "peace"],
    keywords: [
      "overwhelmed",
      "stress",
      "pressure",
      "burned out",
      "anxiety",
      "peace",
    ],
  },

  {
    id: "respect-1",
    chapter: "Chapter 7",
    title: "Respect Is Earned Through Consistency",
    excerpt:
      "Respect grows when words, actions, and identity align over time.",
    tags: ["respect", "identity", "leadership"],
    keywords: [
      "respect",
      "overlooked",
      "ignored",
      "leader",
      "identity",
      "value",
    ],
  },

  {
    id: "lonely-1",
    chapter: "Chapter 8",
    title: "Loneliness Does Not Mean You Are Forgotten",
    excerpt:
      "Loneliness is not proof of abandonment. Often it is a season of preparation and internal rebuilding.",
    tags: ["lonely", "hope", "identity"],
    keywords: [
      "lonely",
      "forgotten",
      "alone",
      "rejected",
      "hope",
      "identity",
    ],
  },
];
