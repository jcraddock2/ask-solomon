// app/lib/bookIndex.ts
// Book entry index for "Success Secrets of Solomon"
// Keywords are matched against user search queries to surface relevant book entries.
// Keep keywords aligned with proverbs INTENT_EXPANSIONS and wisdomResponse scenario triggers.

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

export const BOOK_ENTRIES: BookEntry[] = [

  // --- CONFIDENCE / SELF-DOUBT ---
  {
    id: "confidence-1",
    chapter: "Chapter 1",
    page: "Page 12",
    title: "Confidence Begins Internally",
    excerpt: "Confidence is not something you wait to receive from the world. It begins when you agree internally with who you are becoming.",
    searchPhrase: "Where does real confidence come from?",
    tags: ["confidence", "identity", "self-worth"],
    keywords: ["confidence", "self doubt", "identity", "belief", "fear", "insecurity", "second guessing", "unsure", "approval", "hesitation", "not good enough", "imposter", "doubt myself", "trust myself"],
  },

  // --- PURPOSE / DIRECTION / CALLING ---
  {
    id: "purpose-1",
    chapter: "Chapter 2",
    page: "Page 24",
    title: "Purpose Creates Direction",
    excerpt: "Without a sense of purpose, even great effort feels directionless. Purpose is not found — it is built through faithful action.",
    searchPhrase: "How do I find my purpose?",
    tags: ["purpose", "direction", "calling"],
    keywords: ["purpose", "direction", "clarity", "lost", "confused", "future", "calling", "meaning", "what should i do", "no direction", "life purpose", "what am i supposed to do", "feel lost", "searching for meaning", "called by God", "Gods calling", "Gods plan", "called to serve", "my calling", "spiritual calling"],
  },

  // --- FEAR / COURAGE ---
  {
    id: "fear-1",
    chapter: "Chapter 3",
    page: "Page 37",
    title: "Fear Shrinks Potential",
    excerpt: "Fear does not protect you from failure. It protects failure from ever being attempted. Courage does not mean fear is absent.",
    searchPhrase: "How do I overcome fear?",
    tags: ["fear", "courage", "growth"],
    keywords: ["fear", "hesitation", "second guessing", "afraid", "confidence", "risk", "scared", "anxiety", "worried", "worry", "nervous", "what if", "afraid to try", "terrified", "anxious", "panic", "feel safe", "not safe", "unsafe", "safety", "security", "dont feel safe", "i dont feel safe"],
  },

  // --- SUCCESS / DISCIPLINE / GOALS ---
  {
    id: "success-1",
    chapter: "Chapter 4",
    page: "Page 51",
    title: "Success Is Built Slowly",
    excerpt: "Overnight success is a myth. Every lasting achievement is built through daily decisions made when no one is watching.",
    searchPhrase: "Why is success taking so long?",
    tags: ["success", "discipline", "growth"],
    keywords: ["success", "discipline", "growth", "progress", "consistency", "goals", "achievement", "slow progress", "not progressing", "hard work", "results", "habits", "effort", "ambition", "driven"],
  },

  // --- LEADERSHIP / INFLUENCE ---
  {
    id: "leadership-1",
    chapter: "Chapter 5",
    page: "Page 66",
    title: "Leadership Starts Within",
    excerpt: "Leadership is not title first. It is influence, responsibility, and internal alignment.",
    searchPhrase: "How do I become a better leader?",
    tags: ["leadership", "influence", "responsibility"],
    keywords: ["leadership", "leader", "influence", "responsibility", "boss", "respect", "manage", "manager", "team", "authority", "lead", "leading others", "supervisor", "stewardship", "example"],
  },

  // --- OVERWHELM / STRESS / ANXIETY ---
  {
    id: "overwhelmed-1",
    chapter: "Chapter 6",
    page: "Page 78",
    title: "Overwhelm Comes From Compression",
    excerpt: "Overwhelm is not a sign of weakness. It is a sign that too much has been compressed into too little space.",
    searchPhrase: "How do I deal with feeling overwhelmed?",
    tags: ["overwhelm", "stress", "peace"],
    keywords: ["overwhelmed", "stress", "pressure", "burned out", "anxiety", "peace", "too much", "cant handle", "falling apart", "breaking down", "too many things", "stretched thin", "maxed out", "no margin", "swamped"],
  },

  // --- RESPECT / BEING OVERLOOKED ---
  {
    id: "respect-1",
    chapter: "Chapter 7",
    page: "Page 92",
    title: "Respect Is Earned Through Consistency",
    excerpt: "People will not always acknowledge what they see once. They believe what they see repeatedly.",
    searchPhrase: "How do I earn respect?",
    tags: ["respect", "consistency", "identity"],
    keywords: ["respect", "overlooked", "ignored", "leader", "identity", "value", "recognition", "not respected", "disrespected", "earn respect", "not valued", "dismissed", "undervalued", "taken for granted"],
  },

  // --- LONELINESS / ISOLATION ---
  {
    id: "lonely-1",
    chapter: "Chapter 8",
    page: "Page 105",
    title: "Loneliness Does Not Mean You Are Forgotten",
    excerpt: "Loneliness is one of the loudest lies. It tells you that your current season of isolation defines your worth.",
    searchPhrase: "How do I deal with loneliness?",
    tags: ["lonely", "isolation", "hope"],
    keywords: ["lonely", "forgotten", "alone", "rejected", "hope", "isolated", "no friends", "feel alone", "no one cares", "disconnected", "unseen", "invisible to others", "nobody understands", "left out"],
  },

  // --- IDENTITY / WHO AM I ---
  {
    id: "identity-1",
    chapter: "Chapter 9",
    page: "Page 118",
    title: "Identity Shapes Decisions",
    excerpt: "What you believe about yourself determines the decisions you make. Identity is the foundation of every choice.",
    searchPhrase: "How do I know who I really am?",
    tags: ["identity", "self-worth", "decisions"],
    keywords: ["identity", "who am i", "confidence", "direction", "clarity", "self worth", "who i am", "sense of self", "lost identity", "define myself", "my value", "character", "authenticity"],
  },

  // --- REJECTION ---
  {
    id: "rejection-1",
    chapter: "Chapter 10",
    page: "Page 132",
    title: "Rejection Is Not Your Identity",
    excerpt: "Rejection hurts, but it does not define value. Many people confuse painful moments with permanent identity.",
    searchPhrase: "How do I handle rejection?",
    tags: ["rejection", "identity", "healing"],
    keywords: ["rejection", "rejected", "ignored", "not wanted", "worth", "identity", "hurt by rejection", "turned down", "not chosen", "left out", "passed over", "dismissed", "not good enough"],
  },

  // --- BURNOUT / EXHAUSTION ---
  {
    id: "burnout-1",
    chapter: "Chapter 11",
    page: "Page 145",
    title: "Burnout Comes From Internal Pressure",
    excerpt: "Burnout is rarely caused by one event. It often comes from carrying pressure too long without recovery.",
    searchPhrase: "How do I recover from burnout?",
    tags: ["burnout", "rest", "recovery"],
    keywords: ["burnout", "burned out", "stress", "pressure", "overwhelmed", "tired", "exhausted", "depleted", "running on empty", "fatigued", "drained", "no energy", "emotionally drained", "weary", "worn out", "done"],
  },

  // --- COMPARISON / FALLING BEHIND ---
  {
    id: "comparison-1",
    chapter: "Chapter 12",
    page: "Page 158",
    title: "Comparison Distorts Perspective",
    excerpt: "Comparison is a thief. It takes what you have and convinces you it is not enough by showing you someone else's highlight.",
    searchPhrase: "How do I stop comparing myself to others?",
    tags: ["comparison", "identity", "contentment"],
    keywords: ["comparison", "behind", "others", "not enough", "confidence", "jealous", "everyone else", "falling behind", "behind in life", "compare myself", "life timeline", "late bloomer", "too late", "should be further", "envy"],
  },

  // --- FAILURE / MISTAKES ---
  {
    id: "failure-1",
    chapter: "Chapter 13",
    page: "Page 171",
    title: "Failure Does Not Mean Finished",
    excerpt: "Failure is not your final chapter. It is often the turning point that wisdom uses to redirect you.",
    searchPhrase: "How do I recover from failure?",
    tags: ["failure", "resilience", "hope"],
    keywords: ["failure", "failed", "mistake", "starting over", "growth", "hope", "fell short", "messed up", "keep failing", "nothing works", "setback", "discouraged", "gave up", "try again"],
  },

  // --- STARTING OVER / SECOND CHANCES ---
  {
    id: "starting-over-1",
    chapter: "Chapter 14",
    page: "Page 183",
    title: "Starting Over Requires Courage",
    excerpt: "Starting over is not going backward. It is often the bravest forward move available to you.",
    searchPhrase: "Is it too late to start over?",
    tags: ["starting over", "courage", "new beginnings"],
    keywords: ["starting over", "restart", "begin again", "courage", "hope", "future", "new start", "fresh start", "second chance", "rebuild", "reset", "reinvent", "too late", "it is not too late", "new chapter"],
  },

  // --- TRUST / BETRAYAL / BROKEN RELATIONSHIPS ---
  {
    id: "trust-1",
    chapter: "Chapter 15",
    page: "Page 196",
    title: "Trust Builds Slowly and Breaks Quickly",
    excerpt: "Trust is one of the most fragile and essential human currencies. It cannot be rushed — and once broken, it must be rebuilt with patience.",
    searchPhrase: "How do I rebuild trust after betrayal?",
    tags: ["trust", "betrayal", "relationships"],
    keywords: ["trust", "betrayal", "betrayed", "relationships", "honesty", "integrity", "healing", "broken trust", "stabbed in the back", "lied to", "can't trust", "trust issues", "hurt by friend", "backstabbed", "gossip", "false accusation", "used by someone", "taken advantage"],
  },

  // --- PURPOSE UNDER PRESSURE ---
  {
    id: "purpose-pressure-1",
    chapter: "Chapter 16",
    page: "Page 209",
    title: "Purpose Survives Pressure",
    excerpt: "Pressure does not destroy purpose — it reveals it. The things that matter most become clearest under the hardest conditions.",
    searchPhrase: "How do I hold onto purpose when life is hard?",
    tags: ["purpose", "pressure", "perseverance"],
    keywords: ["purpose", "pressure", "stress", "meaning", "calling", "direction", "perseverance", "hold on", "keep going", "trials", "hard season", "suffering", "why is this happening", "dark season"],
  },

  // --- SELF-WORTH / APPROVAL ---
  {
    id: "self-worth-1",
    chapter: "Chapter 17",
    page: "Page 221",
    title: "Self-Worth Must Be Rooted Internally",
    excerpt: "When your worth is tied to what others think, they control your peace. Self-worth rooted in character cannot be taken.",
    searchPhrase: "How do I stop needing approval from others?",
    tags: ["self-worth", "approval", "identity"],
    keywords: ["worth", "self worth", "confidence", "approval", "identity", "value", "people pleasing", "need validation", "need approval", "what will people think", "rejection", "others opinions", "validation"],
  },

  // --- BEING OVERLOOKED / INVISIBLE ---
  {
    id: "overlooked-1",
    chapter: "Chapter 18",
    page: "Page 234",
    title: "Being Overlooked Does Not Mean Invisible",
    excerpt: "Being unseen by others is not the same as being unknown to God. What is done faithfully in quiet is never truly lost.",
    searchPhrase: "What do I do when no one notices my effort?",
    tags: ["overlooked", "recognition", "faithfulness"],
    keywords: ["overlooked", "ignored", "respect", "value", "recognition", "invisible", "not seen", "no one notices", "unappreciated", "taken for granted", "unseen", "my effort ignored"],
  },

  // --- DIFFICULT PEOPLE / CONFLICT ---
  {
    id: "difficult-people-1",
    chapter: "Chapter 19",
    page: "Page 247",
    title: "Difficult People Reveal Inner Strength",
    excerpt: "The people who frustrate you most are often revealing something you still need to grow in. Wisdom sees difficult people as teachers, not enemies.",
    searchPhrase: "How do I deal with difficult people?",
    tags: ["conflict", "relationships", "patience"],
    keywords: ["difficult people", "boss", "relationships", "anger", "patience", "boundaries", "toxic people", "frustration", "hard people", "conflict", "confrontation", "toxic boss", "narcissist", "manipulation", "hard relationship", "people pleasing"],
  },

  // --- RESILIENCE / KEEP GOING ---
  {
    id: "resilience-1",
    chapter: "Chapter 21",
    page: "Page 159",
    title: "Resilience Is Built in the Dark",
    excerpt: "You do not discover your resilience in comfortable seasons. It is built in the ones that test everything you have.",
    searchPhrase: "How do I keep going when everything is hard?",
    tags: ["resilience", "perseverance", "hope"],
    keywords: ["failure", "keep failing", "mistakes", "discouraged", "resilience", "keep going", "learning", "perseverance", "giving up", "want to quit", "ready to quit", "can't keep going", "don't want to try anymore", "losing hope"],
  },

  // --- ADDICTION / BAD HABITS / SELF-CONTROL ---
  {
    id: "addiction-1",
    chapter: "Chapter 4",
    page: "Page 54",
    title: "Discipline Is the Path to Freedom",
    excerpt: "Every habit is either building your life or draining it. Wisdom calls you to choose your chains carefully — because you will live in what you repeatedly choose.",
    searchPhrase: "How do I break a bad habit or addiction?",
    tags: ["addiction", "discipline", "freedom"],
    keywords: ["addiction", "addict", "addicted", "bad habit", "bad habits", "can't stop", "cant stop", "compulsive", "substance abuse", "drinking too much", "alcohol problem", "drug problem", "drugs", "gambling", "pornography", "porn", "self control", "no self control", "breaking habits", "freedom", "chains", "bondage", "recovery", "sober", "sobriety", "trapped"],
  },

  // --- GRIEF / LOSS ---
  {
    id: "grief-1",
    chapter: "Chapter 11",
    page: "Page 140",
    title: "Grief Is Love With Nowhere to Go",
    excerpt: "Sorrow is not a sign of weakness. It is the soul honoring what mattered. Wisdom does not rush grief — it walks through it with you.",
    searchPhrase: "How do I grieve and heal after loss?",
    tags: ["grief", "loss", "healing"],
    keywords: ["grief", "grieving", "lost someone", "someone died", "death", "passed away", "loved one died", "heartbroken", "mourning", "funeral", "loss", "miss them", "missing someone", "will it get better", "deep sadness", "sorrow", "bereavement", "lost my parent", "lost my mom", "lost my dad", "lost my child", "lost my spouse", "loss of loved one"],
  },

  // --- PARENTING / RAISING CHILDREN ---
  {
    id: "parenting-1",
    chapter: "Chapter 4",
    page: "Page 57",
    title: "Influence Outlasts Instruction",
    excerpt: "Children remember who you were more than what you said. Your presence and character are the most powerful curriculum you will ever teach.",
    searchPhrase: "How do I influence my children well?",
    tags: ["parenting", "discipline", "wisdom"],
    keywords: ["parenting", "parent", "my child", "my kids", "my teenager", "rebellious child", "rebellious teen", "prodigal", "child won't listen", "raising children", "how to raise kids", "discipline my child", "my son", "my daughter", "children struggling", "troubled teen", "exhausted as a parent", "failing as a parent", "worried about my child", "rebelling", "rebel", "bad parent", "dont know how to raise", "single parent", "raise kids", "raise children", "child wont listen"],
  },

  // --- MARRIAGE / DIVORCE / RELATIONSHIP CRISIS ---
  {
    id: "marriage-1",
    chapter: "Chapter 10",
    page: "Page 130",
    title: "Covenant Requires Character",
    excerpt: "The strength of any relationship is built not on feelings but on consistent character. Love is not just felt — it is chosen and demonstrated.",
    searchPhrase: "How do I strengthen or repair my marriage?",
    tags: ["marriage", "relationships", "conflict"],
    keywords: ["marriage", "married", "divorce", "divorcing", "separated", "separation", "spouse", "husband", "wife", "partner", "relationship falling apart", "marriage falling apart", "marriage in trouble", "considering divorce", "thinking about divorce", "marriage problems", "unhappy in marriage", "infidelity", "cheating", "affair", "broken marriage", "rebuilding marriage", "reconciliation", "relationship broken", "couples", "love"],
  },

  // --- FINANCIAL DEBT / MONEY STRESS ---
  {
    id: "debt-1",
    chapter: "Chapter 7",
    page: "Page 88",
    title: "Stewardship Starts With Honesty",
    excerpt: "You cannot manage what you will not face. Financial freedom always begins with an honest accounting of where you are.",
    searchPhrase: "How do I get free from debt and financial stress?",
    tags: ["money", "debt", "stewardship"],
    keywords: ["debt", "in debt", "drowning in debt", "can't pay bills", "bills", "bankruptcy", "financial ruin", "credit card debt", "loan payments", "owe money", "broke", "no money", "financial stress", "can't afford", "money problems", "paycheck to paycheck", "behind on payments", "debt collectors", "stewardship", "money", "wealth", "finances", "budgeting", "provision", "poverty", "savings", "save money", "no savings", "owe", "owed", "owing", "borrowed money", "financially ruined", "money stress", "stressed about money", "spending problem", "cant pay", "debt free"],
  },

  // --- JOB LOSS / UNEMPLOYMENT / CAREER ---
  {
    id: "job-loss-1",
    chapter: "Chapter 7",
    page: "Page 96",
    title: "Diligence Opens Doors That Talent Cannot",
    excerpt: "The person who shows up faithfully, even when unseen, is building something that cannot be taken away. Your next chapter is not determined by your last position.",
    searchPhrase: "How do I move forward after losing my job?",
    tags: ["work", "diligence", "provision"],
    keywords: ["lost my job", "lost job", "fired", "laid off", "layoff", "unemployed", "unemployment", "job loss", "out of work", "can't find work", "looking for work", "job hunting", "rejected from job", "no income", "terminated", "downsized", "position eliminated", "career", "work ethic", "diligence", "job search", "new job", "provision", "cant find work", "find work", "finding work", "no job", "need a job"],
  },

  // --- ANGER / TEMPER ---
  {
    id: "anger-1",
    chapter: "Chapter 10",
    page: "Page 126",
    title: "Anger Managed Becomes Authority",
    excerpt: "Uncontrolled anger destroys trust. But anger channeled through wisdom becomes a force for justice and protection rather than destruction.",
    searchPhrase: "How do I control my anger?",
    tags: ["anger", "self-control", "relationships"],
    keywords: ["anger", "angry", "rage", "furious", "temper", "can't control my anger", "anger issues", "explosive", "resentment", "bitterness", "frustrated", "mad", "irritable", "conflict", "hot headed", "temper problem"],
  },

  // --- SPEECH / WORDS / TONGUE ---
  {
    id: "speech-1",
    chapter: "Chapter 9",
    page: "Page 120",
    title: "Words Build or Destroy",
    excerpt: "Every word you speak is either adding life or removing it. Solomon understood that the tongue is the smallest member with the largest consequences.",
    searchPhrase: "How do I use my words more wisely?",
    tags: ["speech", "words", "relationships"],
    keywords: ["words", "speech", "tongue", "what i say", "gossip", "talking too much", "saying the wrong thing", "communication", "words hurt", "how i speak", "silence", "listening", "speaking truth", "honesty", "brutal honesty", "toxic words", "speak before i think", "think before speaking", "blurt out", "say things impulsively", "words hurt people", "hurt people with words"],
  },

  // --- INTEGRITY / HONESTY / CHARACTER ---
  {
    id: "integrity-1",
    chapter: "Chapter 5",
    page: "Page 66",
    title: "Integrity Is What You Do When No One Is Watching",
    excerpt: "Your character is not what you perform publicly. It is what remains when the audience disappears.",
    searchPhrase: "How do I build integrity and character?",
    tags: ["integrity", "character", "honesty"],
    keywords: ["integrity", "character", "honesty", "honest", "ethics", "doing right", "moral", "values", "authentic", "hypocrisy", "double life", "what i really am", "who i am when alone", "reputation", "trustworthy", "humble", "humility", "arrogant", "better than others", "need to be humble", "arrogance", "think i am better"],
  },

  // --- WISDOM / DECISION MAKING ---
  {
    id: "wisdom-1",
    chapter: "Chapter 1",
    page: "Page 1",
    title: "Wisdom Is the Foundation of Every Good Decision",
    excerpt: "Solomon's greatest possession was not wealth — it was the wisdom that made all other wealth meaningful. Wisdom is available to anyone who asks.",
    searchPhrase: "How do I make wiser decisions?",
    tags: ["wisdom", "decisions", "guidance"],
    keywords: ["wisdom", "wise decision", "decision making", "need guidance", "what should i do", "how to decide", "seeking wisdom", "need counsel", "confused about decision", "big decision", "life choice", "discernment", "direction", "guidance", "advice"],
  },

  // --- PATIENCE / WAITING ---
  {
    id: "patience-1",
    chapter: "Chapter 10",
    page: "Page 140",
    title: "Patience Is Not Passive",
    excerpt: "Waiting is not the same as doing nothing. The person who waits wisely is actively trusting, preparing, and staying faithful until the right time.",
    searchPhrase: "How do I practice patience when waiting is hard?",
    tags: ["patience", "waiting", "trust"],
    keywords: ["patience", "waiting", "impatient", "how long", "when will it happen", "tired of waiting", "delayed", "not yet", "slow process", "waiting on god", "trusting the timing", "season of waiting"],
  },

  {
    id: "ant-diligence-1",
    chapter: "The Lessons of the Ant",
    page: "85",
    title: "Be Industrious, Take Initiative, Invest for the Future",
    excerpt: "Solomon watched the ant and saw everything we avoid. No manager. No overseer. No ruler. The ant simply does what it was made to do. Activity creates energy, not rest. The ant invests in a future it cannot yet see.",
    searchPhrase: "How do I stop being lazy and actually do the work?",
    tags: ["diligence", "work ethic", "laziness", "motivation"],
    keywords: ["lazy", "procrastination", "work hard", "motivation", "ant", "sluggard", "discipline", "productivity", "initiative", "self-motivated"],
  },
  {
    id: "sluggard-1",
    chapter: "The Characteristics of the Sluggard",
    page: "89",
    title: "Excuses, Neglect, and the Price of Procrastination",
    excerpt: "Solomon catalogs the sluggard in vivid detail: always tired, full of excuses, closed to advice. Inactivity drains energy. Daily maintenance is always easier than rebuilding after years of neglect.",
    searchPhrase: "I keep making excuses and getting nothing done. How do I change?",
    tags: ["laziness", "excuses", "discipline", "growth"],
    keywords: ["excuses", "procrastinate", "cant get started", "always tired", "nothing to show", "neglect", "putting it off", "slothful"],
  },
  {
    id: "communication-2",
    chapter: "Managing the Mouth Part Two",
    page: "82",
    title: "Make Truth Sweet to the Hearer",
    excerpt: "Wise communicators take responsibility for how they say things, not just what they say. Talk without action leads to poverty. The wise person teaches their mouth how to speak constructively and productively.",
    searchPhrase: "How do I become a better communicator?",
    tags: ["communication", "words", "relationships", "wisdom"],
    keywords: ["communication", "communicator", "how to speak", "words", "talk", "say things", "speak wisely"],
  },
  {
    id: "friendship-1",
    chapter: "The Gift of True Friendship",
    page: "166",
    title: "Iron Sharpens Iron",
    excerpt: "A true friend stays in adversity and sharpens you like iron. The wrong friends dull you. Every friendship either sharpens or dulls you. Convenient friends disappear. Committed friends draw closer when things are hard.",
    searchPhrase: "Why do I feel alone even when I have people around me?",
    tags: ["friendship", "relationships", "loneliness", "community"],
    keywords: ["true friend", "toxic friends", "friends drag me down", "lonely", "wrong people", "iron sharpens", "who to trust", "real friends"],
  },
  {
    id: "conflict-anger-1",
    chapter: "Managing Conflict and Anger",
    page: "182",
    title: "You Can Hit Pause But You Cannot Hit Rewind",
    excerpt: "Wise people defer their anger and stop strife before it escalates. The fool utters everything they feel. The wise person holds it in until afterward. There is no rewind button. Honor comes from ceasing strife, not winning arguments.",
    searchPhrase: "I keep saying things I regret in arguments. How do I stop?",
    tags: ["anger", "conflict", "self-control", "relationships", "peace"],
    keywords: ["anger", "conflict", "argument", "say things i regret", "lose my temper", "stop fighting", "self-control", "strife", "hot tempered"],
  },
  {
    id: "virtuous-partner-1",
    chapter: "The Virtuous Partner",
    page: "236",
    title: "Proverbs 31: What to Look for in a Partner",
    excerpt: "The wise mother describes the qualities to seek in a partner: trustworthy, hardworking, business-minded, kind to the poor, emotionally strong, and governed by kindness in speech. Attraction is not enough. Character is the foundation.",
    searchPhrase: "How do I know if someone is the right person for me?",
    tags: ["relationships", "marriage", "partnership", "character", "wisdom"],
    keywords: ["right person", "virtuous", "partner", "spouse", "marriage", "relationship", "who to marry", "character", "trust in relationship"],
  },
  {
    id: "vision-1",
    chapter: "Living by Design vs. Default",
    page: "62",
    title: "Where There Is No Vision, the People Perish",
    excerpt: "A vision is a deliberate mental picture of the future you are building toward. People who live by design see that picture and make decisions toward it daily. People who live by default let life happen to them instead of through them.",
    searchPhrase: "How do I get a vision for my life?",
    tags: ["vision", "purpose", "direction", "design"],
    keywords: ["vision", "no vision", "cant see my future", "living without direction", "drifting", "no goals", "no plan", "wandering", "going in circles", "what do i want", "future feels blank", "living by design", "living by default", "life by design", "where am i going"],
  },
  {
    id: "why-people-fail-1",
    chapter: "Why People Fail",
    page: "57",
    title: "Solomon Identified Why People Fail — and Most of It Is Fixable",
    excerpt: "People fail because they drift without vision, have desire without diligence, refuse correction, neglect small things until they become overwhelming, or let fear stop them from attempting what they were made for. Every one of these is correctable.",
    searchPhrase: "Why do I keep failing no matter what I try?",
    tags: ["failure", "growth", "purpose", "wisdom"],
    keywords: ["why do i keep failing", "pattern of failure", "cant succeed", "nothing works", "self-sabotage", "getting in my own way", "cycle of failure", "why does life not work", "fail at everything", "start but never finish", "repeated failure"],
  },
  {
    id: "lack-emptiness-1",
    chapter: "Contentment and Balance",
    page: "227",
    title: "The Eye Is Never Satisfied — But Contentment Is a Choice",
    excerpt: "Solomon said the eye is never satisfied with seeing. He had more than anyone in history and called it vanity. The emptiness is not a flaw. It is a signal pointing toward what possessions and achievement were never designed to fill.",
    searchPhrase: "Why do I always feel like something is missing even when I have what I wanted?",
    tags: ["contentment", "emptiness", "purpose", "peace"],
    keywords: ["never enough", "always lacking", "emptiness", "void", "something missing", "never satisfied", "inner emptiness", "feel empty", "nothing satisfies", "scarcity", "always feel poor", "feel like i never have enough"],
  },
  {
    id: "hungry-soul-1",
    chapter: "The Hungry Soul",
    page: "214",
    title: "A Hungry Soul Loses Its Discernment",
    excerpt: "To the hungry soul, even bitter things are sweet. When a person is starving for love, acceptance, or belonging, they lower every standard to fill the hunger. The need for connection is real. But need driven decisions bypass wisdom.",
    searchPhrase: "Why do my unmet needs keep driving me toward bad decisions?",
    tags: ["needs", "discernment", "relationships", "wisdom"],
    keywords: ["unmet needs", "needy", "emotionally needy", "need love", "need acceptance", "desperate for connection", "hungry soul", "lower my standards when i need something", "need kills discernment", "why do i need so much", "my needs control me"],
  },
];

export function findBookMatchIds(query: string): string[] {
  const q = query.toLowerCase();
  return BOOK_ENTRIES
    .filter((entry) =>
      entry.keywords.some((kw) => q.includes(kw)) ||
      entry.tags.some((tag) => q.includes(tag))
    )
    .map((entry) => entry.id);
}

export const BOOK_INDEX = BOOK_ENTRIES;
