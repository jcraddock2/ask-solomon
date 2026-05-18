// app/lib/wisdomResponse.ts
// This is the emotional intelligence layer of Ask Solomon.
// It reads what the user typed, names what they are feeling,
// speaks to the deeper issue, and points them toward wisdom.
// getWisdomForMoment.ts has been absorbed into this file and is no longer needed.

export type WisdomResponse = {
  emotionalState: string;
  deeperMeaning: string;
  searchLanes: string[];
  headline: string;
  insight: string;
  reflection: string;
  nextStep: string;
  bookConnection?: string;
};

function clean(value: string): string {
  return value.toLowerCase().trim();
}

function includesAny(query: string, phrases: string[]): boolean {
  return phrases.some((phrase) => query.includes(phrase));
}

export function getWisdomResponse(query: string): WisdomResponse | null {
  const q = clean(query);

  if (!q) return null;

  // --- PRIORITY ROUTING: specific high-signal scenarios checked before broad ones ---

  // JOB LOSS - SUDDEN (fired/laid off today - must check before generic WORK)
  if (
    includesAny(q, [
      "fired today",
      "was fired",
      "got fired",
      "laid off today",
      "lost my job today",
      "they let me go",
      "i was let go",
      "just got fired",
      "just got laid off",
      "just lost my job",
      "lost my job this week",
    ])
  ) {
    return {
      emotionalState: "shocked, blindsided, and unsure what comes next",
      deeperMeaning:
        "You did not see this coming — and right now the ground feels unsteady. That is a completely honest response to sudden loss.",
      searchLanes: ["work", "purpose", "provision", "hope", "identity"],
      headline: "Wisdom Meets You in the Blindside",
      insight:
        "Proverbs does not define your identity by your employment. Your worth precedes your work. Sudden loss can become sudden clarity about what you were meant for next.",
      reflection:
        "What does this loss reveal about what you truly want — and what you were tolerating?",
      nextStep:
        "Give yourself 24 hours before making any major decisions. Then, write down three things this door closing might be making room for.",
      bookConnection:
        "Success Secrets of Solomon — Work Ethic (pp. 96-100) and Purpose (pp. 146-150)",
    };
  }

  // JOB STUCK (hate job / trapped / purposeless - must check before generic WORK)
  if (
    includesAny(q, [
      "hate my job",
      "stuck in my job",
      "feel stuck at work",
      "no purpose at work",
      "dread going to work",
      "i dread work",
      "my job drains me",
      "job drains me",
      "hate going to work",
      "miserable at work",
      "my job is killing me",
      "stuck in a dead end",
      "dead end job",
    ])
  ) {
    return {
      emotionalState: "trapped, purposeless, and wondering if this is all there is",
      deeperMeaning:
        "You are not lazy — you are misaligned. Something in you knows you were made for more than this.",
      searchLanes: ["purpose", "work", "diligence", "calling", "direction"],
      headline: "Wisdom Speaks to the Stuck Place",
      insight:
        "Proverbs connects diligence to meaning, not just output. When your work stops feeding your soul, it may be calling you toward something God is preparing. Wisdom does not say stay stuck — it says stay faithful while you move.",
      reflection:
        "What would you do with your days if money were not the question? That answer matters.",
      nextStep:
        "This week, do one thing outside your job that uses the gift you feel is being wasted. It does not have to be big. It just has to be real.",
      bookConnection:
        "Success Secrets of Solomon — Purpose (pp. 146-150) and Diligence (pp. 72-76)",
    };
  }

  // BETRAYAL (must check before generic RELATIONSHIP CONFLICT)
  if (
    includesAny(q, [
      "betrayed me",
      "betrayed by",
      "stabbed in the back",
      "lied to me",
      "trust broken",
      "broken trust",
      "cant trust anyone",
      "can't trust anyone",
      "hurt by a friend",
      "friend betrayed",
      "backstabbed",
      "false accusation",
      "falsely accused",
      "taken advantage of",
      "double crossed",
      "abandoned by friend",
      "trust issues",
      "used by someone",
      "felt used",
      "stabbed me in the back",
      "talked about behind my back",
      "gossip about me",
    ])
  ) {
    return {
      emotionalState: "wounded, guarded, and not sure who to trust anymore",
      deeperMeaning:
        "Betrayal does not just hurt — it rewires how you see people. Wisdom understands this wound and does not rush you past it.",
      searchLanes: ["trust", "relationships", "healing", "wisdom", "discernment"],
      headline: "Wisdom guards you without hardening you",
      insight:
        "Solomon wrote more about the danger of untrustworthy companions than almost any other topic. He knew that discernment — not suspicion — is what protects you. The goal is not to close your heart. It is to learn to read people more wisely.",
      reflection:
        "What did this betrayal teach you about what you need in a true friend — and what red flags you may have overlooked?",
      nextStep:
        "Name one boundary this situation has shown you that you need to hold in the future. Write it down as a decision, not a reaction.",
      bookConnection:
        "Success Secrets of Solomon — Relationships (pp. 130-134) and Integrity (pp. 66-70)",
    };
  }

  // MARRIAGE / RELATIONSHIP CRISIS (must check before generic RELATIONSHIP CONFLICT)
  if (
    includesAny(q, [
      "marriage falling apart",
      "my marriage is",
      "marriage is falling",
      "marriage is in trouble",
      "marriage problems",
      "marriage struggling",
      "divorce",
      "divorcing",
      "separated from",
      "thinking about divorce",
      "considering divorce",
      "unhappy in my marriage",
      "infidelity",
      "cheating spouse",
      "affair",
      "broken marriage",
      "rebuilding marriage",
      "reconciliation",
      "husband left",
      "wife left",
      "spouse left",
    ])
  ) {
    return {
      emotionalState: "torn between love and pain, and not sure what the right move is",
      deeperMeaning:
        "Few things carry more weight than a marriage in crisis. Wisdom does not minimize that — it meets you in the complexity of it.",
      searchLanes: ["relationships", "healing", "wisdom", "conflict", "forgiveness"],
      headline: "Wisdom holds both the pain and the hope",
      insight:
        "Solomon wrote more about the quality of character in relationships than about romantic feelings. He understood that trust, honesty, and consistency are what hold people together — and that their absence is what pulls them apart. Whatever you are facing, wisdom begins with honest self-reflection.",
      reflection:
        "What does wisdom ask of you in this relationship — not of the other person, but of you?",
      nextStep:
        "Before making any major decisions, seek counsel from someone wise and trusted. Do not navigate this alone.",
      bookConnection:
        "Success Secrets of Solomon — Relationships (pp. 130-134) and Conflict (pp. 138-140)",
    };
  }

  // FINANCIAL DEBT / BANKRUPTCY (must check before generic MONEY/FINANCIAL STRESS)
  if (
    includesAny(q, [
      "drowning in debt",
      "deep in debt",
      "buried in debt",
      "bankruptcy",
      "filing bankruptcy",
      "financial ruin",
      "financial disaster",
      "credit card debt",
      "debt collectors",
      "garnished wages",
      "overwhelmed by debt",
      "behind on payments",
      "cant pay my bills",
      "can't pay my bills",
      "bills are piling up",
      "losing my house",
      "about to lose my house",
      "foreclosure",
      "i owe money",
      "living paycheck to paycheck",
      "no savings",
      "spent all my savings",
    ])
  ) {
    return {
      emotionalState: "pressured, ashamed, and desperate to find a way out",
      deeperMeaning:
        "Financial pressure does not just drain your bank account — it drains your confidence and your peace. Wisdom understands money deeply and speaks to the shame as much as the strategy.",
      searchLanes: ["money", "wisdom", "discipline", "stewardship", "hope"],
      headline: "Wisdom starts with what is true",
      insight:
        "Solomon built extraordinary wealth, but he also wrote extensively about the danger of debt and the trap of chasing money as an end. He understood that financial freedom begins in the mind and character before it shows up in the bank account.",
      reflection:
        "What financial habit or belief brought you here — and what would a wise, disciplined version of you do differently starting today?",
      nextStep:
        "Write down your full financial picture, honestly. You cannot steward what you will not face. Wisdom begins with truth.",
      bookConnection:
        "Success Secrets of Solomon — Money and Wealth (pp. 88-92) and Discipline (pp. 54-58)",
    };
  }


  // --- FALLING BEHIND / COMPARISON / TOO LATE ---
  if (
    includesAny(q, [
      "behind in life",
      "falling behind",
      "feel behind",
      "i am behind",
      "too late",
      "missed my chance",
      "second guessing",
      "everyone else",
      "behind everyone",
      "not where i should be",
      "supposed to be further",
      "late bloomer",
      "should be further along",
      "comparing myself",
      "compare myself",
      "not enough progress",
      "wasted years",
      "wasted time",
      "starting over",
      "it's too late",
    ])
  ) {
    return {
      emotionalState: "discouraged, delayed, and comparing yourself to others",
      deeperMeaning:
        "You are not just asking about progress. You are asking whether delay means failure — and whether you still have a chance.",
      searchLanes: ["comparison", "discouraged", "purpose", "hope", "progress"],
      headline: "Wisdom has something to say about this",
      insight:
        "Your life is not measured by someone else's timeline. Wisdom does not reward the fastest — it rewards the faithful. The growth happening beneath the surface right now is real, even when it is not yet visible.",
      reflection:
        "Where are you judging yourself by speed instead of faithfulness?",
      nextStep:
        "Take one small, honest step today. Stop trying to solve your whole future at once.",
      bookConnection:
        "Success Secrets of Solomon — Confidence (pp. 80–82) and Discipline (pp. 54–58)",
    };
  }

  // --- DISCOURAGED / BURNED OUT / WEARY ---
  if (
    includesAny(q, [
      "discouraged",
      "hopeless",
      "giving up",
      "want to give up",
      "defeated",
      "worn out",
      "burned out",
      "burnt out",
      "tired of trying",
      "weary",
      "heavy heart",
      "exhausted",
      "drained",
      "running on empty",
      "can't keep going",
      "done trying",
      "no energy",
      "feel empty",
      "nothing left",
      "can't do this anymore",
      "hitting a wall",
      "emotionally drained",
      "mentally drained",
      "so tired",
      "ready to quit",
    ])
  ) {
    return {
      emotionalState: "weary, discouraged, and emotionally heavy",
      deeperMeaning:
        "You may not only need an answer. You may need permission to rest, and the strength to take one more step.",
      searchLanes: ["hope", "strength", "healing", "encouragement"],
      headline: "Wisdom meets you exactly here",
      insight:
        "A low moment is not the same thing as a final outcome. You may be tired, but you are not finished. Wisdom does not ask you to feel strong before you move — it asks you to move anyway.",
      reflection:
        "What burden are you carrying today that wisdom is asking you to release or face differently?",
      nextStep:
        "Pause, breathe, and do the next right thing — without demanding that you feel strong first.",
      bookConnection:
        "Success Secrets of Solomon — Diligence (pp. 72–76) and Patience (pp. 140–142)",
    };
  }

  // --- PURPOSE / CALLING / MEANING ---
  if (
    includesAny(q, [
      "purpose",
      "calling",
      "why am i here",
      "what am i here for",
      "meaning",
      "lost in life",
      "direction in life",
      "what is my purpose",
      "what should i do with my life",
      "feel like i have no purpose",
      "no direction",
      "feel lost",
      "don't know what i want",
      "don't know my calling",
      "searching for meaning",
      "life feels meaningless",
      "what am i doing",
      "what's the point",
      "don't know my path",
      "walking in circles",
      "called by god",
      "feel called by god",
      "i feel called",
      "called to",
      "gods plan for me",
      "gods purpose",
      "my calling",
      "spiritual calling",
      "called to serve",
    ])
  ) {
    return {
      emotionalState: "searching, uncertain, and hungry for meaning",
      deeperMeaning:
        "You are not just lacking a career plan. You are longing for a reason — something that makes the sacrifice feel worth it.",
      searchLanes: ["purpose", "direction", "wisdom", "calling", "guidance"],
      headline: "Wisdom was made for this question",
      insight:
        "Purpose is not found by thinking harder — it is revealed by walking faithfully in the direction you already sense. Wisdom lights the next step, not the whole staircase.",
      reflection: "What do you already know you should do that you have been avoiding?",
      nextStep:
        "Ask wisdom to show you one step, not the whole path. Then take it.",
      bookConnection:
        "Success Secrets of Solomon — Purpose (pp. 146–150) and Wisdom (pp. 1–10)",
    };
  }

  // --- FEAR / ANXIETY / AFRAID TO TRY ---
  if (
    includesAny(q, [
      "afraid",
      "fear",
      "scared",
      "anxiety",
      "anxious",
      "worried",
      "worry",
      "terrified",
      "panic",
      "nervous",
      "what if it goes wrong",
      "scared to fail",
      "fear of failure",
      "fear of rejection",
      "what if i fail",
      "too scared",
      "afraid to try",
      "paralyzed",
      "can't move forward",
      "afraid of the future",
      "dread",
      "overthinking",
      "what if",
      "can't stop worrying",
      "anxious all the time",
      "i dont feel safe",
      "dont feel safe",
      "i do not feel safe",
      "not safe",
      "unsafe",
      "i feel unsafe",
    ])
  ) {
    return {
      emotionalState: "fearful, anxious, and held back by what might go wrong",
      deeperMeaning:
        "Fear rarely announces itself loudly. Often it disguises itself as hesitation, over-analysis, or waiting for the perfect moment that never arrives.",
      searchLanes: ["fear", "confidence", "courage", "trust", "wisdom"],
      headline: "Fear shrinks when wisdom grows",
      insight:
        "Wisdom does not guarantee a risk-free path — it gives you the clarity to move forward anyway. Courage is not the absence of fear; it is moving despite it.",
      reflection: "What is fear costing you right now by keeping you in place?",
      nextStep:
        "Name the specific fear. Then ask: what is the wisest response to it — not the safest, the wisest.",
      bookConnection:
        "Success Secrets of Solomon — Overcoming Fear (pp. 77–80) and Confidence (pp. 80–82)",
    };
  }

  // --- ANGER / TEMPER / CONFLICT ---
  if (
    includesAny(q, [
      "angry",
      "anger",
      "furious",
      "rage",
      "mad",
      "frustrated",
      "want to explode",
      "can't control my temper",
      "losing my temper",
      "i snapped",
      "blew up",
      "blew up at someone",
      "said things i regret",
      "can't let it go",
      "bitter",
      "resentment",
      "resentful",
      "seething",
      "irritated",
      "outraged",
      "livid",
      "so angry",
      "i cant control my temper",
      "cant control my temper",
      "temper",
      "lose my temper",
      "lost my temper",
      "i want to hurt someone",
      "want to hurt someone",
      "hurt someone",
    ])
  ) {
    return {
      emotionalState: "angry, frustrated, and struggling to control your response",
      deeperMeaning:
        "Anger often signals that something you value — fairness, respect, safety — has been threatened. The question wisdom asks is not whether you feel it, but what you do with it.",
      searchLanes: ["anger", "self-control", "wisdom", "peace", "patience"],
      headline: "Wisdom speaks directly to anger",
      insight:
        "Solomon wrote more about anger than almost any other emotion. A slow response to anger is not weakness — it is one of the clearest marks of wisdom. The person who controls their temper controls their future.",
      reflection:
        "Is your anger pointing at a real injustice — or at unmet expectations?",
      nextStep:
        "Before you respond, pause. Ask yourself: will this response build or destroy?",
      bookConnection:
        "Success Secrets of Solomon — Managing Anger (pp. 126–128) and Patience (pp. 140–142)",
    };
  }

  // --- RELATIONSHIP CONFLICT / HURT BY SOMEONE ---
  if (
    includesAny(q, [
      "relationship",
      "relationship conflict",
      "conflict",
      "fight",
      "argument",
      "can't get along",
      "difficult person",
      "toxic person",
      "hurt by someone",
      "betrayed",
      "trust was broken",
      "people are draining me",
      "dealing with someone",
      "someone hurt me",
      "feeling used",
      "being taken advantage of",
      "broken friendship",
      "falling out",
      "people pleaser",
      "hard to trust",
      "hard to forgive",
      "can't forgive",
      "someone wronged me",
      "toxic relationship",
    ])
  ) {
    return {
      emotionalState: "hurt, frustrated, or drained by a difficult relationship",
      deeperMeaning:
        "Relationship pain cuts deeply because connection matters deeply. You were made for meaningful relationships — and when they fracture, the wound is real.",
      searchLanes: ["relationships", "speech", "wisdom", "peace"],
      headline: "Wisdom gives you power in conflict",
      insight:
        "Wisdom does not ask you to absorb every wound in silence. But it does ask you to respond with discernment rather than reaction. Some relationships need boundaries, some need forgiveness, some need both.",
      reflection: "Are you trying to change this person — or to respond wisely regardless of what they do?",
      nextStep:
        "Decide what a wise, not just a hurt, response looks like. Then act from that place.",
      bookConnection:
        "Success Secrets of Solomon — Relationships (pp. 130–134) and Conflict Resolution (pp. 138–140)",
    };
  }

  // --- MONEY / FINANCIAL STRESS ---
  if (
    includesAny(q, [
      "money",
      "financial",
      "finances",
      "broke",
      "debt",
      "in debt",
      "bills",
      "can't pay bills",
      "can't afford",
      "struggling financially",
      "money stress",
      "worried about money",
      "financial pressure",
      "not enough money",
      "living paycheck to paycheck",
      "poor",
      "wealth",
      "spending too much",
      "overspending",
      "need more money",
      "financial freedom",
      "get out of debt",
      "money problems",
      "financial anxiety",
    ])
  ) {
    return {
      emotionalState: "stressed, pressured, or anxious about your finances",
      deeperMeaning:
        "Money pressure rarely stays in the bank account. It seeps into your sleep, your relationships, and your sense of worth. Wisdom does not ignore the practical — it speaks to it directly.",
      searchLanes: ["money", "stewardship", "diligence", "wisdom", "planning"],
      headline: "Solomon had a lot to say about money",
      insight:
        "Financial wisdom is not about having more — it is about managing what you have with intention. Diligence and stewardship are the foundations of financial stability, not luck or income alone.",
      reflection:
        "Write down your actual situation clearly — without exaggerating or minimizing. What does wisdom say about the first honest step?",
      nextStep:
        "Address the most urgent financial issue first. Wisdom handles one thing at a time.",
      bookConnection:
        "Success Secrets of Solomon — Money & Wealth (pp. 88–92) and Stewardship (pp. 92–96)",
    };
  }

  // --- WISDOM / GUIDANCE / DECISION MAKING ---
  if (
    includesAny(q, [
      "wisdom",
      "guidance",
      "need advice",
      "what should i do",
      "don't know what to do",
      "confused",
      "need direction",
      "seeking wisdom",
      "need clarity",
      "making a decision",
      "big decision",
      "hard decision",
      "life decision",
      "which path",
      "which choice",
      "help me decide",
      "can't decide",
      "torn between",
      "not sure what to do",
      "seeking guidance",
      "need counsel",
    ])
  ) {
    return {
      emotionalState: "seeking clarity, direction, or counsel for a difficult decision",
      deeperMeaning:
        "You are not just looking for an answer. You are looking for a trustworthy voice that will tell you the truth.",
      searchLanes: ["wisdom", "guidance", "counsel", "decision", "clarity"],
      headline: "You came to the right place",
      insight:
        "Wisdom is the principle thing — and getting it is the beginning of all good outcomes. Solomon says wisdom is available to anyone who sincerely seeks it. The question is not whether wisdom is accessible, but whether you are willing to follow it.",
      reflection: "What decision have you been delaying? What is wisdom already telling you?",
      nextStep:
        "Seek counsel from someone wiser than you. Then compare what they say against what wisdom confirms internally.",
      bookConnection:
        "Success Secrets of Solomon — Wisdom (pp. 1–10) and Seeking Counsel (pp. 42–46)",
    };
  }

  // --- PRIDE / HUMILITY ---
  if (
    includesAny(q, [
      "pride",
      "prideful",
      "arrogant",
      "humble",
      "humility",
      "too proud",
      "hard to apologize",
      "hard to admit i'm wrong",
      "ego",
      "think i'm always right",
      "no one listens to me",
      "i know better",
      "stubborn",
      "won't back down",
      "i was wrong",
      "need to be humble",
      "learned humility",
      "i think i am better than others",
      "think i am better",
      "better than everyone",
      "act like i am better",
      "i am better than others",
    ])
  ) {
    return {
      emotionalState: "wrestling with pride, ego, or the difficulty of humility",
      deeperMeaning:
        "Pride rarely shows up as obvious arrogance. Often it hides in the difficulty of saying 'I was wrong,' 'I need help,' or 'you were right.'",
      searchLanes: ["humility", "pride", "wisdom", "character"],
      headline: "Wisdom and pride cannot occupy the same space",
      insight:
        "Solomon is direct: pride goes before a fall, and a haughty spirit before destruction. Humility is not weakness — it is the posture that allows wisdom to enter and favor to flow.",
      reflection: "Where is pride currently costing you a relationship, an opportunity, or peace?",
      nextStep:
        "Do the humble thing you have been avoiding. The relief on the other side is real.",
      bookConnection:
        "Success Secrets of Solomon — Pride vs Humility (pp. 106–114)",
    };
  }

  // --- STRESS / OVERWHELM ---
  if (
    includesAny(q, [
      "overwhelmed",
      "stressed",
      "stress",
      "too much",
      "too much on my plate",
      "can't handle it",
      "juggling too much",
      "overloaded",
      "pressure",
      "under pressure",
      "can't breathe",
      "drowning",
      "buried",
      "can't keep up",
      "everything at once",
      "falling apart",
      "stretched too thin",
      "maxed out",
      "no margin",
      "no rest",
      "can't sleep",
      "insomnia",
      "mind won't stop",
      "racing thoughts",
    ])
  ) {
    return {
      emotionalState: "overwhelmed, overstretched, and carrying too much at once",
      deeperMeaning:
        "Overwhelm often comes from carrying too much mentally without releasing pressure. You may be saying yes to everything and yes to nothing that truly matters.",
      searchLanes: ["peace", "rest", "wisdom", "focus", "strength"],
      headline: "Wisdom helps you carry only what is yours",
      insight:
        "Not every burden on your plate was given to you by God. Some were volunteered. Wisdom helps you discern the difference between responsibility and overload — and gives you permission to set some things down.",
      reflection: "What on your list could be removed, delegated, or delayed without real consequence?",
      nextStep:
        "Write everything you are carrying. Circle the top three that matter most. Let wisdom guide the rest.",
      bookConnection:
        "Success Secrets of Solomon — Focus (pp. 144–146) and Patience (pp. 140–142)",
    };
  }

  // --- LEADERSHIP / INFLUENCE ---
  if (
    includesAny(q, [
      "leadership",
      "leader",
      "lead",
      "leading",
      "influence",
      "how to lead",
      "management",
      "managing people",
      "team",
      "authority",
      "being in charge",
      "people don't respect me",
      "losing respect",
      "earn respect",
      "how to get respect",
      "can't lead",
      "struggling to lead",
      "leadership skills",
      "become a leader",
      "want to lead",
    ])
  ) {
    return {
      emotionalState: "carrying the weight and responsibility of leading others",
      deeperMeaning:
        "Leadership is not a title — it is the responsibility of influence. And influence multiplies whatever wisdom or foolishness lives in the leader.",
      searchLanes: ["leadership", "wisdom", "influence", "integrity", "counsel"],
      headline: "Solomon was the greatest leadership teacher of his era",
      insight:
        "True leadership starts from the inside out. Before you can lead people effectively, wisdom must govern your own decisions. Those who lead with integrity attract trust; those who lead with ego eventually lose it.",
      reflection: "Are you leading from strength and wisdom — or from insecurity and control?",
      nextStep:
        "Identify the one area of your leadership that needs the most honesty. Address it first.",
      bookConnection:
        "Success Secrets of Solomon — Leadership (pp. 42–46) and Integrity (pp. 66–70)",
    };
  }

  // --- DISCIPLINE / LAZINESS / PROCRASTINATION ---
  if (
    includesAny(q, [
      "discipline",
      "lazy",
      "laziness",
      "procrastinating",
      "procrastination",
      "can't stay focused",
      "no motivation",
      "lack of discipline",
      "unmotivated",
      "keep putting it off",
      "can't get started",
      "distracted",
      "wasting time",
      "not productive",
      "lack of consistency",
      "can't stick to it",
      "no follow through",
      "give up too easily",
      "need more self-control",
      "no willpower",
      "bad habits",
    ])
  ) {
    return {
      emotionalState: "frustrated with your own lack of discipline or follow-through",
      deeperMeaning:
        "You are not just dealing with laziness. You are dealing with the gap between who you want to be and who you are showing up as daily. That gap is painful.",
      searchLanes: ["discipline", "diligence", "work", "focus", "success"],
      headline: "Discipline is the path wisdom walks on",
      insight:
        "Solomon writes with intensity about the sluggard — the person who wants the harvest but avoids the work. Discipline is not punishment; it is the structure that allows your potential to become reality.",
      reflection: "What one habit, if built consistently, would change the most about your life?",
      nextStep:
        "Start smaller than you think you need to. Consistency with something small beats intensity with something unsustainable.",
      bookConnection:
        "Success Secrets of Solomon — Discipline (pp. 54–58) and Work Ethic (pp. 96–100)",
    };
  }

  // --- SUCCESS / AMBITION / GOALS ---
  if (
    includesAny(q, [
      "success",
      "successful",
      "want to succeed",
      "how to be successful",
      "achieve my goals",
      "reach my goals",
      "ambition",
      "ambitious",
      "level up",
      "grow",
      "get ahead",
      "make it",
      "reach my potential",
      "fulfill my potential",
      "become great",
      "be great",
      "want more",
      "bigger future",
      "build something",
      "accomplish something",
    ])
  ) {
    return {
      emotionalState: "driven, ambitious, and hungry to build something meaningful",
      deeperMeaning:
        "Ambition is not the enemy of wisdom — but ambition without wisdom is a fast car with no steering wheel.",
      searchLanes: ["success", "diligence", "wisdom", "planning", "integrity"],
      headline: "Solomon built an empire — here is what he learned",
      insight:
        "Success built on wisdom lasts. Success built on shortcuts, ego, or compromise eventually collapses. Solomon's secrets are not about working harder — they are about working with clarity, integrity, and divine alignment.",
      reflection: "Is your pursuit of success built on wisdom — or are you cutting corners you hope no one notices?",
      nextStep:
        "Define what real success looks like for you — not society's version. Then evaluate your current path against it.",
      bookConnection:
        "Success Secrets of Solomon — Success Principles (pp. 170–176) and Diligence (pp. 72–76)",
    };
  }

  // --- SPEECH / WORDS / TONGUE ---
  if (
    includesAny(q, [
      "words",
      "speech",
      "tongue",
      "said something i regret",
      "can't control my mouth",
      "gossip",
      "talk too much",
      "say the wrong thing",
      "what i say",
      "power of words",
      "speaking life",
      "negative talk",
      "negative words",
      "words hurt",
      "what i said",
      "i said something",
      "sharp tongue",
      "sarcasm",
      "critical",
      "harsh words",
      "i speak before i think",
      "speak before i think",
      "i say things without thinking",
      "blurt things out",
      "think before i speak",
    ])
  ) {
    return {
      emotionalState: "aware that your words have power and sometimes cause damage",
      deeperMeaning:
        "Solomon devoted more of Proverbs to speech than to almost any other topic. Words are not neutral — they build lives or erode them.",
      searchLanes: ["speech", "wisdom", "relationships", "character"],
      headline: "Life and death are in the power of the tongue",
      insight:
        "Wisdom teaches that the person who guards their mouth guards their life. You cannot unsay a word — but you can choose the next word wisely. The tongue reveals what the heart contains.",
      reflection: "What would change in your relationships if you spoke more intentionally for 30 days?",
      nextStep:
        "Before your next difficult conversation, pause and ask: is this true, is this kind, is this necessary?",
      bookConnection:
        "Success Secrets of Solomon — Power of Words (pp. 120–124)",
    };
  }

  // --- INTEGRITY / CHARACTER / HONESTY ---
  if (
    includesAny(q, [
      "integrity",
      "honest",
      "honesty",
      "character",
      "tempted to lie",
      "telling the truth",
      "ethical",
      "ethics",
      "doing the right thing",
      "compromise",
      "shortcuts",
      "taking shortcuts",
      "cutting corners",
      "being fake",
      "wearing a mask",
      "two-faced",
      "reputation",
      "what people think of me",
      "trust",
      "trustworthy",
      "moral",
    ])
  ) {
    return {
      emotionalState: "wrestling with the tension between who you appear to be and who you truly are",
      deeperMeaning:
        "Integrity is the alignment between your private choices and your public image. When those two things are out of sync, you carry a weight that no success can lift.",
      searchLanes: ["integrity", "character", "wisdom", "reputation"],
      headline: "A good name is more valuable than riches",
      insight:
        "Solomon is clear: integrity protects you. It may cost you short-term — a deal, a friendship, a shortcut — but it builds something no one can take from you. Character is the foundation everything else rests on.",
      reflection: "Is there anywhere in your life where your private choices contradict your public values?",
      nextStep:
        "Close the gap between who you are privately and who you want to be publicly. Start with one honest act today.",
      bookConnection:
        "Success Secrets of Solomon — Integrity (pp. 66–70) and Character (pp. 162–166)",
    };
  }

  // --- CONFIDENCE / SELF DOUBT ---
  if (
    includesAny(q, [
      "confidence",
      "self-confidence",
      "self doubt",
      "doubt myself",
      "insecure",
      "insecurity",
      "not good enough",
      "feel worthless",
      "low self esteem",
      "self esteem",
      "imposter syndrome",
      "feel like a fraud",
      "don't believe in myself",
      "can't do it",
      "not smart enough",
      "not talented enough",
      "who am i to",
      "i'm not qualified",
      "afraid of what people think",
      "need validation",
      "feel invisible",
    ])
  ) {
    return {
      emotionalState: "struggling with self-doubt and a shaky sense of your own worth",
      deeperMeaning:
        "Self-doubt is rarely about facts — it is about the story running beneath the facts. Wisdom challenges that story with a different truth.",
      searchLanes: ["confidence", "wisdom", "identity", "courage", "strength"],
      headline: "Confidence begins internally — Solomon knew this",
      insight:
        "Confidence is not something you wait to receive from the world. It grows from wisdom, from repeated faithful action, and from knowing who made you and why. You do not need to feel confident before you act — you act, and confidence follows.",
      reflection: "Whose voice are you believing about yourself — and is that voice aligned with wisdom?",
      nextStep:
        "Do one thing today that the confident version of you would do. Act from who you are becoming, not who you fear you are.",
      bookConnection:
        "Success Secrets of Solomon — Confidence (pp. 80–82) and Character (pp. 162–166)",
    };
  }

  // --- HOPE / FUTURE / WAITING ---
  if (
    includesAny(q, [
      "hope",
      "hopeful",
      "future",
      "waiting",
      "waiting on god",
      "waiting for something",
      "patience",
      "things will get better",
      "better days",
      "trust the process",
      "not giving up",
      "keep going",
      "hold on",
      "don't lose hope",
      "praying for a breakthrough",
      "breakthrough",
      "season of waiting",
      "feels like nothing is moving",
      "trust god",
    ])
  ) {
    return {
      emotionalState: "holding on to hope while things feel slow or uncertain",
      deeperMeaning:
        "Waiting is not the same as being forgotten. The season between the promise and the fulfillment is where character is built.",
      searchLanes: ["hope", "patience", "faith", "trust", "encouragement"],
      headline: "Wisdom was built for seasons of waiting",
      insight:
        "Solomon describes hope as a tree of life. Waiting with wisdom is not passive — it is purposeful. It is preparation meeting patience. The breakthrough you are waiting for is being preceded by the growth you are currently in.",
      reflection: "What is this waiting season developing in you that success alone could not?",
      nextStep:
        "Trust the process by continuing the last thing wisdom told you to do — before you saw results.",
      bookConnection:
        "Success Secrets of Solomon — Patience (pp. 140–142) and Purpose (pp. 146–150)",
    };
  }

  // --- WORK / CAREER / JOB ---
  if (
    includesAny(q, [
      "work",
      "job",
      "career",
      "workplace",
      "boss",
      "coworker",
      "fired",
      "laid off",
      "unemployed",
      "job loss",
      "lost my job",
      "looking for work",
      "job search",
      "hate my job",
      "career change",
      "new career",
      "career path",
      "work stress",
      "work life balance",
      "overworked",
      "underpaid",
      "undervalued at work",
      "promotion",
      "passed over for promotion",
    ])
  ) {
    return {
      emotionalState: "navigating challenge, frustration, or uncertainty in your work life",
      deeperMeaning:
        "Work is not just how you earn money — it is how you exercise the gifts and capacities you were built with. When work is broken, something deeper feels broken too.",
      searchLanes: ["work", "diligence", "wisdom", "purpose", "planning"],
      headline: "Solomon understood the dignity of work",
      insight:
        "Wisdom says that diligent work leads to abundance, but scattered effort produces nothing. Whether you are losing a job, grinding in one you hate, or trying to find your path — wisdom calls you to show up with excellence in this moment, not just the next one.",
      reflection: "Are you giving your current work your best — or are you saving your best for something that isn't here yet?",
      nextStep:
        "Do excellent work today, regardless of whether you plan to stay. Wisdom seen in small things opens the door to greater things.",
      bookConnection:
        "Success Secrets of Solomon — Work Ethic (pp. 96–100) and Diligence (pp. 72–76)",
    };
  }

  // --- PLANNING / DECISIONS / PREPARATION ---
  if (
    includesAny(q, [
      "planning",
      "plan",
      "prepare",
      "preparation",
      "getting ready",
      "strategy",
      "strategic",
      "think ahead",
      "future planning",
      "life plan",
      "business plan",
      "goal setting",
      "goals",
      "setting goals",
      "how to plan",
      "organize my life",
      "get organized",
      "next steps",
      "roadmap",
    ])
  ) {
    return {
      emotionalState: "wanting to be more strategic, prepared, and intentional",
      deeperMeaning:
        "Planning is an act of faith — it says you believe your future is worth preparing for. Wisdom gives planning both direction and humility.",
      searchLanes: ["planning", "wisdom", "counsel", "diligence", "purpose"],
      headline: "Wisdom plans. Foolishness drifts.",
      insight:
        "Solomon says plans succeed when they are bathed in wise counsel and aligned with truth. A good plan does not eliminate uncertainty — it gives you a framework to respond to uncertainty wisely.",
      reflection: "What area of your life has been running on reaction rather than intention?",
      nextStep:
        "Write a clear, one-paragraph description of what you want in 12 months. Then work backward to today.",
      bookConnection:
        "Success Secrets of Solomon — Planning (pp. 102–104) and Seeking Counsel (pp. 42–46)",
    };
  }

  // --- FORGIVENESS / LETTING GO ---
  if (
    includesAny(q, [
      "forgiveness",
      "forgive",
      "can't forgive",
      "won't forgive",
      "holding a grudge",
      "grudge",
      "letting go",
      "can't let it go",
      "still angry about",
      "can't move on",
      "bitterness",
      "bitter",
      "resentment",
      "resentful",
      "never forgetting",
      "they don't deserve forgiveness",
      "hurt too deep",
      "how do i forgive",
      "move past it",
    ])
  ) {
    return {
      emotionalState: "carrying a wound and wrestling with whether to forgive",
      deeperMeaning:
        "Unforgiveness is one of the heaviest weights a person can carry. It rarely hurts the other person — it mostly poisons the one holding it.",
      searchLanes: ["forgiveness", "peace", "healing", "wisdom", "relationships"],
      headline: "Wisdom knows the cost of bitterness",
      insight:
        "Forgiveness is not saying what happened was okay. It is releasing yourself from the prison of carrying it forever. Solomon understood that a wise person overlooks offenses — not out of weakness, but because peace is more valuable than being right.",
      reflection: "Who or what are you carrying that is costing you more than it costs them?",
      nextStep:
        "Forgiveness starts as a decision, not a feeling. Make the decision. The feelings will follow.",
      bookConnection:
        "Success Secrets of Solomon — Conflict Resolution (pp. 138–140) and Character (pp. 162–166)",
    };
  }

  // --- IDENTITY / WHO AM I ---
  if (
    includesAny(q, [
      "who am i",
      "identity",
      "don't know who i am",
      "lost my identity",
      "feel like a different person",
      "not myself",
      "don't recognize myself",
      "feel like i'm becoming someone i'm not",
      "who have i become",
      "define myself",
      "what defines me",
      "my true self",
      "authentic",
      "authenticity",
      "living someone else's life",
      "people pleasing",
      "pleasing everyone",
    ])
  ) {
    return {
      emotionalState: "uncertain about who you are, what defines you, or who you are becoming",
      deeperMeaning:
        "Identity confusion is rarely a philosophical problem — it is usually the result of living too long for other people's expectations.",
      searchLanes: ["identity", "wisdom", "character", "purpose", "confidence"],
      headline: "Wisdom knows who made you — and why",
      insight:
        "Your identity is not found in your achievements, your roles, or other people's opinions of you. Solomon anchored identity in the fear of the Lord — a deep reverence that aligns you with truth and frees you from performance.",
      reflection: "Which parts of your current life reflect who you truly are — and which parts are for someone else's approval?",
      nextStep:
        "Do one thing today that comes from your truest self, not from what you think is expected of you.",
      bookConnection:
        "Success Secrets of Solomon — Character (pp. 162–166) and Confidence (pp. 80–82)",
    };
  }

  // --- SPIRITUAL / FAITH / SEEKING GOD ---
  if (
    includesAny(q, [
      "faith",
      "god",
      "spiritual",
      "spirituality",
      "prayer",
      "praying",
      "seeking god",
      "feel far from god",
      "doubt my faith",
      "questioning god",
      "where is god",
      "god feels distant",
      "why did god allow",
      "trust god",
      "hear from god",
      "what does god want",
      "will of god",
      "bible",
      "scripture",
      "proverbs",
    ])
  ) {
    return {
      emotionalState: "seeking spiritual depth, clarity, or closeness with God",
      deeperMeaning:
        "The search for God is never a detour from real life — it is the most direct path through it. Wisdom begins where the fear of the Lord begins.",
      searchLanes: ["faith", "wisdom", "trust", "guidance", "hope"],
      headline: "The fear of the Lord is the beginning of wisdom",
      insight:
        "Solomon, with all his wealth, wisdom, and power, concluded that a life without reverence for God is empty. Not because God needs your attention — but because you were designed to operate best in alignment with Him.",
      reflection: "What would your life look like if you genuinely invited wisdom into every decision?",
      nextStep:
        "Spend five minutes in silence today. Ask for wisdom — Solomon says God gives it generously to those who ask.",
      bookConnection:
        "Success Secrets of Solomon — Wisdom (pp. 1–10) and Purpose (pp. 146–150)",
    };
  }


  // --- JOB LOSS SUDDEN (shock/blindside) ---
  if (
    includesAny(q, [
      "fired today",
      "was fired",
      "got fired",
      "laid off today",
      "lost my job today",
      "they let me go",
      "i was let go",
      "just got fired",
      "just got laid off",
    ])
  ) {
    return {
      emotionalState: "shocked, blindsided, and unsure what comes next",
      deeperMeaning:
        "You didn\'t see this coming — and right now the ground feels unsteady. That is a completely honest response to sudden loss.",
      searchLanes: ["work", "purpose", "provision", "hope", "identity"],
      headline: "Wisdom Meets You in the Blindside",
      insight:
        "Proverbs does not define your identity by your employment. Your worth precedes your work. Sudden loss can become sudden clarity about what you were meant for next.",
      reflection:
        "What does this loss reveal about what you truly want — and what you were tolerating?",
      nextStep:
        "Give yourself 24 hours before making any major decisions. Then take one practical step: update a resume, call one trusted person, or sit quietly and ask what is next.",
      bookConnection:
        "Success Secrets of Solomon — Work Ethic (pp. 96–100) and Purpose (pp. 146–150)",
    };
  }

  // --- JOB STUCK (trapped/purposeless at work) ---
  if (
    includesAny(q, [
      "hate my job",
      "stuck in my job",
      "feel stuck at work",
      "no purpose at work",
      "dread going to work",
      "i dread work",
      "going to work is torture",
      "my job drains me",
    ])
  ) {
    return {
      emotionalState: "trapped, purposeless, and wondering if this is all there is",
      deeperMeaning:
        "You\'re not lazy — you\'re misaligned. Something in you knows you were made for more than this.",
      searchLanes: ["purpose", "work", "diligence", "calling", "direction"],
      headline: "Wisdom Speaks to the Stuck Place",
      insight:
        "Proverbs connects diligence to meaning, not just output. When your work stops feeding your soul, it may be calling you toward something God is preparing. Wisdom does not say stay stuck — it says use this season to build and discern.",
      reflection:
        "If fear were not a factor, what kind of work would you pursue? What gifts are you leaving unused right now?",
      nextStep:
        "Do not quit in frustration — plan in wisdom. Spend 15 minutes this week writing down what you are actually good at and what work feels alive to you.",
      bookConnection:
        "Success Secrets of Solomon — Purpose (pp. 146–150) and Diligence (pp. 72–76)",
    };
  }

  // --- JOB LOSS / UNEMPLOYMENT ---
  if (
    includesAny(q, [
      "lost my job",
      "lost job",
      "got fired",
      "laid off",
      "layoff",
      "unemployed",
      "unemployment",
      "job loss",
      "no job",
      "out of work",
      "can't find work",
      "can't find a job",
      "job hunting",
      "looking for work",
      "searching for a job",
      "rejected from job",
      "application rejected",
      "job rejected",
      "no income",
      "lost income",
      "terminated",
      "position eliminated",
      "downsized",
      "company let me go",
    ])
  ) {
    return {
      emotionalState: "shaken, uncertain, and searching for ground beneath your feet",
      deeperMeaning:
        "Losing a job is not just about money — it can strip your identity, your routine, and your sense of worth all at once. Wisdom addresses that deeper wound.",
      searchLanes: ["work", "purpose", "provision", "diligence", "hope"],
      headline: "Your value was never your job title",
      insight:
        "Solomon understood that diligence opens doors, but no door that closes is your final answer. The hand of the diligent rises again. Your circumstances changed — your character and your calling did not.",
      reflection:
        "What have you learned about yourself through this disruption that you could not have learned any other way?",
      nextStep:
        "Tend to your integrity and your effort today. Provision does not always come from where you expect — but it follows those who remain faithful.",
      bookConnection:
        "Success Secrets of Solomon — Work Ethic (pp. 96–100) and Diligence (pp. 72–76)",
    };
  }

  // --- BETRAYAL / BROKEN TRUST ---
  if (
    includesAny(q, [
      "betrayed",
      "betrayal",
      "stabbed in the back",
      "lied to",
      "someone lied",
      "trust broken",
      "broken trust",
      "can't trust anyone",
      "can't trust people",
      "hurt by a friend",
      "friend betrayed me",
      "backstabbed",
      "backstab",
      "gossip about me",
      "talked about behind my back",
      "false accusation",
      "falsely accused",
      "used by someone",
      "taken advantage of",
      "felt used",
      "double crossed",
      "abandoned by friend",
      "people disappoint",
      "trust issues",
      "my best friend stabbed me in the back",
      "stabbed me in the back",
      "best friend betrayed me",
      "friend stabbed me",
      "best friend lied",
    ])
  ) {
    return {
      emotionalState: "wounded, guarded, and struggling to trust again",
      deeperMeaning:
        "Betrayal does not just break a relationship — it challenges your ability to be open again. Wisdom speaks directly into the tension between protecting yourself and remaining whole.",
      searchLanes: ["trust", "relationships", "integrity", "forgiveness", "healing"],
      headline: "Wisdom guards the heart without hardening it",
      insight:
        "Solomon knew that a person of poor character eventually reveals themselves. Your trust was not foolish — it was good. The failure belonged to the one who broke it. Wisdom now asks you to guard your heart without closing it entirely.",
      reflection:
        "Is there a difference between healthy discernment and fear-based isolation in how you are responding to this?",
      nextStep:
        "Give yourself permission to grieve the loss of that trust. Then ask wisdom to show you what healthy boundaries — not walls — look like moving forward.",
      bookConnection:
        "Success Secrets of Solomon — Relationships (pp. 130–134) and Character (pp. 162–166)",
    };
  }

  // --- GRIEF / LOSS OF A LOVED ONE ---
  if (
    includesAny(q, [
      "grief",
      "grieving",
      "lost someone",
      "someone died",
      "death of",
      "passed away",
      "my loved one",
      "loved one died",
      "can't stop crying",
      "miss them so much",
      "i miss them",
      "missing someone",
      "heartbroken",
      "heart is broken",
      "mourning",
      "funeral",
      "loss of a loved one",
      "lost my parent",
      "lost my mom",
      "lost my dad",
      "lost my spouse",
      "lost my child",
      "how do i grieve",
      "will it get better",
      "never gets easier",
      "i cant stop crying",
      "cant stop crying",
      "i keep crying",
      "i cry all the time",
      "dealing with loss",
      "i am dealing with loss",
      "trying to deal with loss",
      "dealing with grief",
      "lost and grieving",
    ])
  ) {
    return {
      emotionalState: "deep in grief, raw, and aching with loss",
      deeperMeaning:
        "Grief is not a problem to solve. It is love with nowhere to go. Wisdom does not rush you through it — it sits with you inside it.",
      searchLanes: ["healing", "hope", "patience", "comfort", "purpose"],
      headline: "There is a wisdom that holds you when words fail",
      insight:
        "Solomon wrote about the mystery of sorrow and joy coexisting. He knew that grief is one of the most honest human experiences — it proves that love was real. Mourning is not weakness. It is the soul honoring what mattered.",
      reflection:
        "What do you most want to remember or honor about the person or season you have lost?",
      nextStep:
        "Do not run from the grief. Let yourself feel it fully today — even if for just a few minutes. Healing does not skip over loss. It moves through it.",
      bookConnection:
        "Success Secrets of Solomon — Patience (pp. 140–142) and Purpose (pp. 146–150)",
    };
  }

  // --- PARENTING STRUGGLES ---
  if (
    includesAny(q, [
      "parenting",
      "struggling with my kids",
      "my child",
      "my teenager",
      "rebellious child",
      "rebellious teen",
      "prodigal son",
      "prodigal child",
      "child won't listen",
      "kid won't listen",
      "raising children",
      "how to raise kids",
      "hard to parent",
      "exhausted as a parent",
      "failing as a parent",
      "bad parent",
      "worried about my child",
      "my son",
      "my daughter",
      "children are struggling",
      "discipline my child",
      "how do i discipline",
      "my kid is out of control",
      "troubled teen",
      "i dont know how to raise my kids",
      "dont know how to raise",
      "raise my kids",
      "raising kids",
      "i am a single parent struggling",
      "single parent struggling",
      "single parent",
      "raising my kids alone",
    ])
  ) {
    return {
      emotionalState: "burdened, uncertain, and deeply invested in someone you love",
      deeperMeaning:
        "Parenting tests everything — your patience, your identity, your faith, and your love. Wisdom honors the weight of that responsibility and speaks directly into it.",
      searchLanes: ["discipline", "wisdom", "guidance", "patience", "relationships"],
      headline: "Train up a child in the way he should go",
      insight:
        "Solomon's most tender writings are about guiding the next generation. He understood that influence takes time, love takes consistency, and some lessons cannot be rushed or forced. Your presence and your character matter more than your perfection.",
      reflection:
        "Are you parenting from fear of failure, or from a vision of who this child can become?",
      nextStep:
        "Choose one moment today to listen more than you speak. Understanding your child's heart is the foundation of any real influence.",
      bookConnection:
        "Success Secrets of Solomon — Discipline (pp. 54–58) and Wisdom (pp. 1–10)",
    };
  }

  // --- MARRIAGE / DIVORCE / RELATIONSHIP CRISIS ---
  if (
    includesAny(q, [
      "marriage",
      "married",
      "divorce",
      "divorcing",
      "separated",
      "separation",
      "spouse",
      "husband",
      "wife",
      "my partner",
      "relationship falling apart",
      "marriage falling apart",
      "marriage in trouble",
      "considering divorce",
      "thinking about divorce",
      "marriage problems",
      "unhappy in my marriage",
      "infidelity",
      "cheating spouse",
      "affair",
      "broken marriage",
      "rebuilding marriage",
      "reconciliation",
      "relationship broken",
    ])
  ) {
    return {
      emotionalState: "torn between love and pain, and searching for what comes next",
      deeperMeaning:
        "A marriage in crisis touches every part of who you are. Wisdom does not offer quick fixes — but it speaks profound truth about covenant, character, and the courage required for any real restoration.",
      searchLanes: ["relationships", "conflict", "patience", "integrity", "healing"],
      headline: "Wisdom speaks into the hardest relationship questions",
      insight:
        "Solomon wrote more about the quality of character in relationships than about romantic feelings. He understood that trust, honesty, and consistency are what hold people together — and that their absence is what pulls them apart. Whatever you are facing, wisdom begins with honest self-reflection.",
      reflection:
        "What does wisdom ask of you in this relationship — not of the other person, but of you?",
      nextStep:
        "Before making any major decisions, seek counsel from someone wise and trusted. Do not navigate this alone.",
      bookConnection:
        "Success Secrets of Solomon — Relationships (pp. 130–134) and Conflict (pp. 138–140)",
    };
  }

  // --- FINANCIAL DEBT / BANKRUPTCY ---
  if (
    includesAny(q, [
      "debt",
      "in debt",
      "drowning in debt",
      "can't pay bills",
      "bills are piling up",
      "bankruptcy",
      "filing bankruptcy",
      "financial ruin",
      "financial disaster",
      "credit card debt",
      "loan payments",
      "owe money",
      "broke",
      "no money",
      "financial stress",
      "can't afford",
      "can't make ends meet",
      "living paycheck to paycheck",
      "behind on payments",
      "debt collectors",
      "garnished wages",
      "overwhelmed by debt",
      "money problems",
      "i have no savings",
      "no savings",
      "have no savings",
      "spent all my savings",
    ])
  ) {
    return {
      emotionalState: "pressured, ashamed, and desperate to find a way out",
      deeperMeaning:
        "Financial pressure does not just drain your bank account — it drains your confidence and your peace. Wisdom understands money deeply and speaks truth into both the practical and the emotional weight of debt.",
      searchLanes: ["money", "stewardship", "discipline", "planning", "wisdom"],
      headline: "Wisdom is the most underused financial tool",
      insight:
        "Solomon spoke more about money than almost any other topic in Proverbs. He understood that debt is a form of bondage and that financial freedom is built through patient, disciplined decisions — not desperation. Shame will paralyze you. Wisdom will move you forward.",
      reflection:
        "What financial habit or belief brought you here — and what would a wise, disciplined version of you do differently starting today?",
      nextStep:
        "Write down your full financial picture, honestly. You cannot steward what you will not face. Wisdom begins with truth.",
      bookConnection:
        "Success Secrets of Solomon — Money & Wealth (pp. 88–92) and Stewardship (pp. 92–96)",
    };
  }

  // --- ADDICTION / BAD HABITS ---
  if (
    includesAny(q, [
      "addiction",
      "addicted",
      "addicted to",
      "substance abuse",
      "drinking too much",
      "alcohol problem",
      "drug problem",
      "drugs",
      "can't stop",
      "can't quit",
      "bad habit",
      "bad habits",
      "stuck in a habit",
      "breaking habits",
      "pornography",
      "porn addiction",
      "gambling",
      "gambling problem",
      "overeating",
      "compulsive behavior",
      "out of control behavior",
      "self destructive",
      "self-destructive",
      "no self control",
      "lack of self control",
      "cant stop drinking",
      "i cant stop drinking",
      "drinking",
      "alcohol",
      "i drink too much",
      "i want to get sober",
      "want to get sober",
      "sober",
      "sobriety",
      "get sober",
      "bondage to sin",
      "in bondage",
      "i am in bondage",
    ])
  ) {
    return {
      emotionalState: "trapped, ashamed, and wanting freedom but struggling to find it",
      deeperMeaning:
        "Addiction is not a character flaw — it is a wound seeking relief in the wrong place. Wisdom speaks to the deep need beneath the behavior and points toward real freedom, not just willpower.",
      searchLanes: ["discipline", "wisdom", "healing", "self-control", "freedom"],
      headline: "The path to freedom begins with honest sight",
      insight:
        "Solomon warned that what looks like pleasure often leads to chains — and that the wise person sees the end of a path before walking it. But wisdom is also deeply merciful. It does not mock the person who is caught. It offers a way out through discipline, community, and truth.",
      reflection:
        "What is the real need — the pain, loneliness, or fear — that this habit has been trying to meet?",
      nextStep:
        "Reach out to one trustworthy person today. Shame thrives in silence. Real healing almost always requires another person walking with you.",
      bookConnection:
        "Success Secrets of Solomon — Discipline (pp. 54–58) and Confidence (pp. 80–82)",
    };
  }

  return null;
}
