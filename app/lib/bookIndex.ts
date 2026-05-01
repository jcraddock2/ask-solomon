// app/lib/bookIndex.ts

export type BookEntry = {
  id: string;
  chapter: string;
  page: string;
  title: string;
  excerpt: string;
  searchPhrase: string;
  tags: string[];
  keywords: string[];
};

export const BOOK_INDEX: BookEntry[] = [
  {
    id: "confidence-1",
    chapter: "Chapter 1",
    page: "Page 12",
    title: "Confidence Begins Internally",
    excerpt:
      "Confidence is not something you wait to receive from the world. It begins when you agree internally with who you are becoming.",
    searchPhrase: "Confidence Begins Internally",
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
    page: "Page 24",
    title: "Purpose Creates Direction",
    excerpt:
      "People drift when they lack direction. Purpose gives meaning to struggle and creates forward movement.",
    searchPhrase: "Purpose Creates Direction",
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
    page: "Page 37",
    title: "Fear Shrinks Potential",
    excerpt:
      "Fear rarely announces itself loudly. Often it disguises itself as hesitation, delay, or second guessing.",
    searchPhrase: "Fear Shrinks Potential",
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
    page: "Page 51",
    title: "Success Is Built Slowly",
    excerpt:
      "Most success is not dramatic. It comes through repeated discipline and small consistent choices.",
    searchPhrase: "Success Is Built Slowly",
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
    page: "Page 66",
    title: "Leadership Starts Within",
    excerpt:
      "Leadership is not title first. It is influence, responsibility, and internal alignment.",
    searchPhrase: "Leadership Starts Within",
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
    page: "Page 78",
    title: "Overwhelm Comes From Compression",
    excerpt:
      "Overwhelm often comes from carrying too much mentally without releasing pressure.",
    searchPhrase: "Overwhelm Comes From Compression",
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
    page: "Page 92",
    title: "Respect Is Earned Through Consistency",
    excerpt:
      "Respect grows when words, actions, and identity align over time.",
    searchPhrase: "Respect Is Earned Through Consistency",
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
    page: "Page 105",
    title: "Loneliness Does Not Mean You Are Forgotten",
    excerpt:
      "Loneliness is not proof of abandonment. Often it is a season of preparation and internal rebuilding.",
    searchPhrase: "Loneliness Does Not Mean You Are Forgotten",
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
  ,
{
  id: "identity-1",
  chapter: "Chapter 9",
  page: "Page 118",
  title: "Identity Shapes Decisions",
  excerpt:
    "People often struggle because they make decisions from insecurity instead of identity. Clear identity creates stable direction.",
  searchPhrase: "Identity Shapes Decisions",
  tags: ["identity", "confidence", "direction"],
  keywords: [
    "identity",
    "who am i",
    "confidence",
    "direction",
    "clarity",
    "self worth",
  ],
},

{
  id: "rejection-1",
  chapter: "Chapter 10",
  page: "Page 132",
  title: "Rejection Is Not Your Identity",
  excerpt:
    "Rejection hurts, but it does not define value. Many people confuse painful moments with permanent identity.",
  searchPhrase: "Rejection Is Not Your Identity",
  tags: ["rejection", "worth", "identity"],
  keywords: [
    "rejection",
    "rejected",
    "ignored",
    "not wanted",
    "worth",
    "identity",
  ],
},

{
  id: "burnout-1",
  chapter: "Chapter 11",
  page: "Page 145",
  title: "Burnout Comes From Internal Pressure",
  excerpt:
    "Burnout is rarely caused by one event. It often comes from carrying pressure too long without recovery.",
  searchPhrase: "Burnout Comes From Internal Pressure",
  tags: ["burnout", "stress", "pressure"],
  keywords: [
    "burnout",
    "burned out",
    "stress",
    "pressure",
    "overwhelmed",
    "tired",
  ],
},

{
  id: "comparison-1",
  chapter: "Chapter 12",
  page: "Page 158",
  title: "Comparison Distorts Perspective",
  excerpt:
    "Comparison steals peace because it shifts focus from progress to competition.",
  searchPhrase: "Comparison Distorts Perspective",
  tags: ["comparison", "confidence", "peace"],
  keywords: [
    "comparison",
    "behind",
    "others",
    "not enough",
    "confidence",
    "jealous",
  ],
},

{
  id: "failure-1",
  chapter: "Chapter 13",
  page: "Page 171",
  title: "Failure Does Not Mean Finished",
  excerpt:
    "Failure is often information, not identity. Growth begins when setbacks become lessons instead of labels.",
  searchPhrase: "Failure Does Not Mean Finished",
  tags: ["failure", "growth", "hope"],
  keywords: [
    "failure",
    "failed",
    "mistake",
    "starting over",
    "growth",
    "hope",
  ],
},

{
  id: "starting-over-1",
  chapter: "Chapter 14",
  page: "Page 183",
  title: "Starting Over Requires Courage",
  excerpt:
    "Beginning again is difficult because it asks people to trust growth before seeing results.",
  searchPhrase: "Starting Over Requires Courage",
  tags: ["courage", "growth", "hope"],
  keywords: [
    "starting over",
    "restart",
    "begin again",
    "courage",
    "hope",
    "future",
  ],
},

{
  id: "trust-1",
  chapter: "Chapter 15",
  page: "Page 196",
  title: "Trust Builds Slowly",
  excerpt:
    "Trust grows through consistency, honesty, and repeated alignment between words and actions.",
  searchPhrase: "Trust Builds Slowly",
  tags: ["trust", "relationships", "integrity"],
  keywords: [
    "trust",
    "betrayal",
    "relationships",
    "honesty",
    "integrity",
    "healing",
  ],
},

{
  id: "purpose-pressure-1",
  chapter: "Chapter 16",
  page: "Page 209",
  title: "Purpose Survives Pressure",
  excerpt:
    "Pressure does not erase purpose. It often reveals what matters most.",
  searchPhrase: "Purpose Survives Pressure",
  tags: ["purpose", "pressure", "meaning"],
  keywords: [
    "purpose",
    "pressure",
    "stress",
    "meaning",
    "calling",
    "direction",
  ],
},

{
  id: "self-worth-1",
  chapter: "Chapter 17",
  page: "Page 221",
  title: "Self-Worth Must Be Rooted Internally",
  excerpt:
    "When worth depends on approval, confidence becomes fragile.",
  searchPhrase: "Self-Worth Must Be Rooted Internally",
  tags: ["worth", "confidence", "identity"],
  keywords: [
    "worth",
    "self worth",
    "confidence",
    "approval",
    "identity",
    "value",
  ],
},

{
  id: "overlooked-1",
  chapter: "Chapter 18",
  page: "Page 234",
  title: "Being Overlooked Does Not Mean Invisible",
  excerpt:
    "Many people confuse delayed recognition with lack of value.",
  searchPhrase: "Being Overlooked Does Not Mean Invisible",
  tags: ["respect", "worth", "identity"],
  keywords: [
    "overlooked",
    "ignored",
    "respect",
    "value",
    "recognition",
    "invisible",
  ],
},

{
  id: "difficult-people-1",
  chapter: "Chapter 19",
  page: "Page 247",
  title: "Difficult People Reveal Inner Strength",
  excerpt:
    "Challenging relationships often expose patience, boundaries, and emotional maturity.",
  searchPhrase: "Difficult People Reveal Inner Strength",
  tags: ["relationships", "patience", "growth"],
  keywords: [
    "difficult people",
    "boss",
    "relationships",
    "anger",
    "patience",
    "boundaries",
  ],
},
  {
{
  id: "identity-worth-1",
  chapter: "Identity",
  page: "41",
  title: "Your value is not determined by how others treat you",
  excerpt:
    "When people overlook you, ignore you, or fail to recognize your contribution, it is easy to question your worth. But your value existed before their opinion and remains after their rejection.",
  searchPhrase: "I feel invisible or overlooked",
  tags: ["identity", "self-worth", "rejection", "value"],
  keywords: [
    "invisible",
    "overlooked",
    "not seen",
    "ignored",
    "rejected",
    "worth",
    "value",
    "identity",
  ],
},
{
  id: "comparison-1",
  chapter: "Comparison",
  page: "52",
  title: "Comparison steals peace faster than failure",
  excerpt:
    "The more you measure your life against someone else's timeline, the harder it becomes to appreciate the growth already happening inside your own story.",
  searchPhrase: "I feel behind in life",
  tags: ["comparison", "discouragement", "purpose", "identity"],
  keywords: [
    "behind",
    "comparison",
    "everyone else",
    "life timeline",
    "not enough",
    "late",
    "falling behind",
  ],
},
{
  id: "confidence-1",
  chapter: "Confidence",
  page: "67",
  title: "Confidence grows when you stop asking permission",
  excerpt:
    "Many people wait for external validation before moving forward. Confidence often begins when you decide to trust what you already know instead of waiting for approval.",
  searchPhrase: "I second guess myself",
  tags: ["confidence", "fear", "direction", "growth"],
  keywords: [
    "second guessing",
    "confidence",
    "self doubt",
    "unsure",
    "fear",
    "hesitation",
    "approval",
  ],
},
{
  id: "burnout-1",
  chapter: "Burnout",
  page: "81",
  title: "Exhaustion can disguise itself as failure",
  excerpt:
    "Sometimes you are not failing. You are simply depleted. Exhaustion changes perception and makes progress look invisible.",
  searchPhrase: "I feel burned out",
  tags: ["burnout", "stress", "pressure", "recovery"],
  keywords: [
    "burned out",
    "exhausted",
    "tired",
    "depleted",
    "overwhelmed",
    "stress",
    "fatigue",
  ],
},
{
  id: "leadership-1",
  chapter: "Leadership",
  page: "97",
  title: "Leadership becomes harder when approval becomes the goal",
  excerpt:
    "Strong leadership often requires disappointing people in the short term so you can protect the long-term mission.",
  searchPhrase: "Leadership pressure",
  tags: ["leadership", "pressure", "decision making", "responsibility"],
  keywords: [
    "leader",
    "manager",
    "pressure",
    "approval",
    "leadership",
    "team",
    "responsibility",
  ],
},
{
  id: "difficult-people-1",
  chapter: "Relationships",
  page: "108",
  title: "Difficult people often reveal what still controls your emotions",
  excerpt:
    "You cannot always change the people around you, but you can learn what their behavior is exposing inside your reactions.",
  searchPhrase: "My boss is difficult",
  tags: ["relationships", "leadership", "anger", "difficult people"],
  keywords: [
    "difficult boss",
    "toxic people",
    "frustration",
    "anger",
    "boss",
    "hard people",
    "conflict",
  ],
},
{
  id: "purpose-1",
  chapter: "Purpose",
  page: "121",
  title: "Confusion often appears before clarity",
  excerpt:
    "Many people assume uncertainty means they are lost. In reality, uncertainty often means you are standing at the edge of growth.",
  searchPhrase: "I don't know what to do",
  tags: ["purpose", "direction", "clarity", "decision"],
  keywords: [
    "direction",
    "confused",
    "lost",
    "what should i do",
    "purpose",
    "clarity",
    "decision",
  ],
},
{
  id: "rejection-1",
  chapter: "Rejection",
  page: "133",
  title: "Rejection does not mean you were wrong",
  excerpt:
    "Some doors close because they are not aligned with where you are going. Rejection may feel personal, but it is often directional.",
  searchPhrase: "I feel rejected",
  tags: ["rejection", "identity", "pain", "direction"],
  keywords: [
    "rejected",
    "hurt",
    "pain",
    "not wanted",
    "ignored",
    "left out",
    "dismissed",
  ],
},
{
  id: "fear-1",
  chapter: "Fear",
  page: "145",
  title: "Fear sounds convincing when you are about to grow",
  excerpt:
    "Fear becomes loudest when you are approaching change. Many people mistake fear as a stop sign when it is often a sign that growth is near.",
  searchPhrase: "I am afraid to move forward",
  tags: ["fear", "growth", "courage", "confidence"],
  keywords: [
    "fear",
    "afraid",
    "move forward",
    "hesitation",
    "courage",
    "uncertain",
    "stuck",
  ],
},
{
  id: "resilience-1",
  chapter: "Resilience",
  page: "159",
  title: "Failure becomes wisdom when you stay in the process",
  excerpt:
    "Setbacks are not always signs that you should stop. Sometimes they are proof that you are learning something necessary.",
  searchPhrase: "I keep failing",
  tags: ["resilience", "failure", "growth", "perseverance"],
  keywords: [
    "failure",
    "keep failing",
    "mistakes",
    "discouraged",
    "resilience",
    "keep going",
    "learning",
  ],
}, 
