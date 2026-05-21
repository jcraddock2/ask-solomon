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
        "Betrayal does not just hurt Ã¢ÂÂ it rewires how you see people. Wisdom understands this wound and does not rush you past it.",
      searchLanes: ["trust", "relationships", "healing", "wisdom", "discernment"],
      headline: "Wisdom guards you without hardening you",
      insight:
        "Solomon wrote more about the danger of untrustworthy companions than almost any other topic. He knew that discernment Ã¢ÂÂ not suspicion Ã¢ÂÂ is what protects you. The goal is not to close your heart. It is to learn to read people more wisely.",
      reflection:
        "What did this betrayal teach you about what you need in a true friend Ã¢ÂÂ and what red flags you may have overlooked?",
      nextStep:
        "Name one boundary this situation has shown you that you need to hold in the future. Write it down as a decision, not a reaction.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Relationships (pp. 130-134) and Integrity (pp. 66-70)",
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
        "Few things carry more weight than a marriage in crisis. Wisdom does not minimize that Ã¢ÂÂ it meets you in the complexity of it.",
      searchLanes: ["relationships", "healing", "wisdom", "conflict", "forgiveness"],
      headline: "Wisdom holds both the pain and the hope",
      insight:
        "Solomon wrote more about the quality of character in relationships than about romantic feelings. His framework for covenant relationships centers on Agreement — spiritual, directional, and character alignment. The foundation of any lasting relationship is not chemistry — it is covenant and consistent character. Trust, honesty, and consistency hold people together. Whatever is happening right now, wisdom begins not with what the other person needs to change, but with honest self-examination. God is able to restore what seems broken — but it requires both people to walk toward wisdom.",
      reflection:
        "What does wisdom ask of you in this relationship — not of the other person, but of you? And is there genuine Agreement — spiritual, directional, character agreement — at the foundation?",
      nextStep:
        "Seek counsel from someone wise and trusted who has no stake in the outcome. Do not make major decisions alone or from a place of raw emotion. Write down what you believe God is asking of you in this season.",
      bookConnection:
        "Success Secrets of Solomon — Relationships (pp. 130-134), The Virtuous Partner (pp. 236-240), and Conflict (pp. 138-140)",
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
        "Financial pressure does not just drain your bank account Ã¢ÂÂ it drains your confidence and your peace. Wisdom understands money deeply and speaks to the shame as much as the strategy.",
      searchLanes: ["money", "wisdom", "discipline", "stewardship", "hope"],
      headline: "Wisdom starts with what is true",
      insight:
        "Solomon built extraordinary wealth, but he also wrote extensively about the danger of debt and the trap of chasing money as an end. He understood that financial freedom begins in the mind and character before it shows up in the bank account.",
      reflection:
        "What financial habit or belief brought you here Ã¢ÂÂ and what would a wise, disciplined version of you do differently starting today?",
      nextStep:
        "Write down your full financial picture, honestly. You cannot steward what you will not face. Wisdom begins with truth.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Money and Wealth (pp. 88-92) and Discipline (pp. 54-58)",
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
        "You are not just asking about progress. You are asking whether delay means failure Ã¢ÂÂ and whether you still have a chance.",
      searchLanes: ["comparison", "discouraged", "purpose", "hope", "progress"],
      headline: "Wisdom has something to say about this",
      insight:
        "Your life is not measured by someone else's timeline. Wisdom does not reward the fastest Ã¢ÂÂ it rewards the faithful. The growth happening beneath the surface right now is real, even when it is not yet visible.",
      reflection:
        "Where are you judging yourself by speed instead of faithfulness?",
      nextStep:
        "Take one small, honest step today. Stop trying to solve your whole future at once.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Confidence (pp. 80Ã¢ÂÂ82) and Discipline (pp. 54Ã¢ÂÂ58)",
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
        "A low moment is not the same thing as a final outcome. You may be tired, but you are not finished. Wisdom does not ask you to feel strong before you move Ã¢ÂÂ it asks you to move anyway.",
      reflection:
        "What burden are you carrying today that wisdom is asking you to release or face differently?",
      nextStep:
        "Pause, breathe, and do the next right thing Ã¢ÂÂ without demanding that you feel strong first.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Diligence (pp. 72Ã¢ÂÂ76) and Patience (pp. 140Ã¢ÂÂ142)",
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
        "You are not just lacking a career plan. You are longing for a reason Ã¢ÂÂ something that makes the sacrifice feel worth it.",
      searchLanes: ["purpose", "direction", "wisdom", "calling", "guidance"],
      headline: "Wisdom was made for this question",
      insight:
        "Purpose is not found by thinking harder Ã¢ÂÂ it is revealed by walking faithfully in the direction you already sense. Wisdom lights the next step, not the whole staircase.",
      reflection: "What do you already know you should do that you have been avoiding?",
      nextStep:
        "Ask wisdom to show you one step, not the whole path. Then take it.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Purpose (pp. 146Ã¢ÂÂ150) and Wisdom (pp. 1Ã¢ÂÂ10)",
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
        "Wisdom does not guarantee a risk-free path Ã¢ÂÂ it gives you the clarity to move forward anyway. Courage is not the absence of fear; it is moving despite it.",
      reflection: "What specific fear is costing you right now — and what would you attempt if you truly believed God was walking with you through it?",
      nextStep:
        "Name the fear out loud. Then identify one small act of courage you can take this week in the direction you have been afraid to move. Wisdom is not passive — it moves.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Overcoming Fear (pp. 77Ã¢ÂÂ80) and Confidence (pp. 80Ã¢ÂÂ82)",
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
        "Anger often signals that something you value Ã¢ÂÂ fairness, respect, safety Ã¢ÂÂ has been threatened. The question wisdom asks is not whether you feel it, but what you do with it.",
      searchLanes: ["anger", "self-control", "wisdom", "peace", "patience"],
      headline: "Wisdom speaks directly to anger",
      insight:
        "Solomon wrote more about anger than almost any other emotion — and he identified it as one of the most dangerous forces in a person's life. A slow response to anger is one of the clearest marks of wisdom. The fool who gives free rein to their anger creates enemies, breaks trust, and says things they can never take back — there is no rewind button. God is your vindicator; you do not have to be. The wise person defers their anger, steps back, and lets God work. That is not weakness. It is the highest form of self-mastery.",
      reflection:
        "Is your anger pointing at a real injustice — or at unmet expectations you never clearly communicated? Wisdom asks both questions.",
      nextStep:
        "Before you respond to whatever angered you, write down the worst possible outcome of reacting from anger right now. Then write the best possible outcome of deferring. Let wisdom choose the response.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Managing Anger (pp. 126Ã¢ÂÂ128) and Patience (pp. 140Ã¢ÂÂ142)",
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
        "Relationship pain cuts deeply because connection matters deeply. You were made for meaningful relationships Ã¢ÂÂ and when they fracture, the wound is real.",
      searchLanes: ["relationships", "speech", "wisdom", "peace"],
      headline: "Wisdom gives you power in conflict",
      insight:
        "Wisdom does not ask you to absorb every wound in silence. But it does ask you to respond with discernment rather than reaction. Some relationships need boundaries, some need forgiveness, some need both.",
      reflection: "Are you trying to change this person Ã¢ÂÂ or to respond wisely regardless of what they do?",
      nextStep:
        "Decide what a wise, not just a hurt, response looks like. Then act from that place.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Relationships (pp. 130Ã¢ÂÂ134) and Conflict Resolution (pp. 138Ã¢ÂÂ140)",
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
        "Money pressure rarely stays in the bank account. It seeps into your sleep, your relationships, and your sense of worth. Wisdom does not ignore the practical Ã¢ÂÂ it speaks to it directly.",
      searchLanes: ["money", "stewardship", "diligence", "wisdom", "planning"],
      headline: "Solomon had a lot to say about money",
      insight:
        "Financial wisdom is not about having more Ã¢ÂÂ it is about managing what you have with intention. Diligence and stewardship are the foundations of financial stability, not luck or income alone.",
      reflection:
        "Write down your actual financial picture — income, outgoing, debt — without minimizing or exaggerating. Which of Solomon's patterns is most active right now: slack-hand poverty, debt bondage, hasty wealth-seeking, or neglecting the firstfruits principle?",
      nextStep:
        "Choose one concrete action this week: stop one unnecessary expense, make one extra debt payment, give something away intentionally, or set up one savings habit. The ant stores in summer. Start storing.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Money & Wealth (pp. 88Ã¢ÂÂ92) and Stewardship (pp. 92Ã¢ÂÂ96)",
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
        "Wisdom is the principle thing Ã¢ÂÂ and getting it is the beginning of all good outcomes. Solomon says wisdom is available to anyone who sincerely seeks it. The question is not whether wisdom is accessible, but whether you are willing to follow it.",
      reflection: "What decision have you been delaying? What is wisdom already telling you?",
      nextStep:
        "Seek counsel from someone wiser than you. Then compare what they say against what wisdom confirms internally.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Wisdom (pp. 1Ã¢ÂÂ10) and Seeking Counsel (pp. 42Ã¢ÂÂ46)",
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
        "Solomon is direct: pride goes before a fall, and a haughty spirit before destruction. Humility is not weakness Ã¢ÂÂ it is the posture that allows wisdom to enter and favor to flow.",
      reflection: "Where is pride currently costing you a relationship, an opportunity, or peace?",
      nextStep:
        "Do the humble thing you have been avoiding. The relief on the other side is real.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Pride vs Humility (pp. 106Ã¢ÂÂ114)",
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
        "Not every burden on your plate was given to you by God. Some were volunteered. Wisdom helps you discern the difference between responsibility and overload Ã¢ÂÂ and gives you permission to set some things down.",
      reflection: "What on your list could be removed, delegated, or delayed without real consequence?",
      nextStep:
        "Write everything you are carrying. Circle the top three that matter most. Let wisdom guide the rest.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Focus (pp. 144Ã¢ÂÂ146) and Patience (pp. 140Ã¢ÂÂ142)",
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
        "Leadership is not a title Ã¢ÂÂ it is the responsibility of influence. And influence multiplies whatever wisdom or foolishness lives in the leader.",
      searchLanes: ["leadership", "wisdom", "influence", "integrity", "counsel"],
      headline: "Solomon was the greatest leadership teacher of his era",
      insight:
        "True leadership starts from the inside out. Before you can lead people effectively, wisdom must govern your own decisions. Those who lead with integrity attract trust; those who lead with ego eventually lose it.",
      reflection: "Are you leading from strength and wisdom Ã¢ÂÂ or from insecurity and control?",
      nextStep:
        "Identify the one area of your leadership that needs the most honesty. Address it first.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Leadership (pp. 42Ã¢ÂÂ46) and Integrity (pp. 66Ã¢ÂÂ70)",
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
        "Solomon writes with intensity about the sluggard Ã¢ÂÂ the person who wants the harvest but avoids the work. Discipline is not punishment; it is the structure that allows your potential to become reality.",
      reflection: "What one habit, if built consistently, would change the most about your life?",
      nextStep:
        "Start smaller than you think you need to. Consistency with something small beats intensity with something unsustainable.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Discipline (pp. 54Ã¢ÂÂ58) and Work Ethic (pp. 96Ã¢ÂÂ100)",
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
        "Ambition is not the enemy of wisdom Ã¢ÂÂ but ambition without wisdom is a fast car with no steering wheel.",
      searchLanes: ["success", "diligence", "wisdom", "planning", "integrity"],
      headline: "Solomon built an empire Ã¢ÂÂ here is what he learned",
      insight:
        "Success built on wisdom lasts. Success built on shortcuts, ego, or compromise eventually collapses. Solomon's secrets are not about working harder Ã¢ÂÂ they are about working with clarity, integrity, and divine alignment.",
      reflection: "Is your pursuit of success built on wisdom Ã¢ÂÂ or are you cutting corners you hope no one notices?",
      nextStep:
        "Define what real success looks like for you Ã¢ÂÂ not society's version. Then evaluate your current path against it.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Success Principles (pp. 170Ã¢ÂÂ176) and Diligence (pp. 72Ã¢ÂÂ76)",
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
        "Solomon devoted more of Proverbs to speech than to almost any other topic. Words are not neutral Ã¢ÂÂ they build lives or erode them.",
      searchLanes: ["speech", "wisdom", "relationships", "character"],
      headline: "Life and death are in the power of the tongue",
      insight:
        "Wisdom teaches that the person who guards their mouth guards their life. You cannot unsay a word Ã¢ÂÂ but you can choose the next word wisely. The tongue reveals what the heart contains.",
      reflection: "What would change in your relationships if you spoke more intentionally for 30 days?",
      nextStep:
        "Before your next difficult conversation, pause and ask: is this true, is this kind, is this necessary?",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Power of Words (pp. 120Ã¢ÂÂ124)",
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
        "Solomon is clear: integrity protects you. It may cost you short-term Ã¢ÂÂ a deal, a friendship, a shortcut Ã¢ÂÂ but it builds something no one can take from you. Character is the foundation everything else rests on.",
      reflection: "Is there anywhere in your life where your private choices contradict your public values?",
      nextStep:
        "Close the gap between who you are privately and who you want to be publicly. Start with one honest act today.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Integrity (pp. 66Ã¢ÂÂ70) and Character (pp. 162Ã¢ÂÂ166)",
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
        "Self-doubt is rarely about facts Ã¢ÂÂ it is about the story running beneath the facts. Wisdom challenges that story with a different truth.",
      searchLanes: ["confidence", "wisdom", "identity", "courage", "strength"],
      headline: "Confidence begins internally Ã¢ÂÂ Solomon knew this",
      insight:
        "Confidence is not something you wait to receive from the world. It grows from wisdom, from repeated faithful action, and from knowing who made you and why. You do not need to feel confident before you act Ã¢ÂÂ you act, and confidence follows.",
      reflection: "Whose voice are you believing about yourself Ã¢ÂÂ and is that voice aligned with wisdom?",
      nextStep:
        "Do one thing today that the confident version of you would do. Act from who you are becoming, not who you fear you are.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Confidence (pp. 80Ã¢ÂÂ82) and Character (pp. 162Ã¢ÂÂ166)",
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
        "Solomon describes hope as a tree of life. Waiting with wisdom is not passive Ã¢ÂÂ it is purposeful. It is preparation meeting patience. The breakthrough you are waiting for is being preceded by the growth you are currently in.",
      reflection: "What is this waiting season developing in you that success alone could not?",
      nextStep:
        "Trust the process by continuing the last thing wisdom told you to do Ã¢ÂÂ before you saw results.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Patience (pp. 140Ã¢ÂÂ142) and Purpose (pp. 146Ã¢ÂÂ150)",
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
        "Work is not just how you earn money Ã¢ÂÂ it is how you exercise the gifts and capacities you were built with. When work is broken, something deeper feels broken too.",
      searchLanes: ["work", "diligence", "wisdom", "purpose", "planning"],
      headline: "Solomon understood the dignity of work",
      insight:
        "Wisdom says that diligent work leads to abundance, but scattered effort produces nothing. Whether you are losing a job, grinding in one you hate, or trying to find your path Ã¢ÂÂ wisdom calls you to show up with excellence in this moment, not just the next one.",
      reflection: "Are you giving your current work your best Ã¢ÂÂ or are you saving your best for something that isn't here yet?",
      nextStep:
        "Do excellent work today, regardless of whether you plan to stay. Wisdom seen in small things opens the door to greater things.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Work Ethic (pp. 96Ã¢ÂÂ100) and Diligence (pp. 72Ã¢ÂÂ76)",
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
        "Planning is an act of faith Ã¢ÂÂ it says you believe your future is worth preparing for. Wisdom gives planning both direction and humility.",
      searchLanes: ["planning", "wisdom", "counsel", "diligence", "purpose"],
      headline: "Wisdom plans. Foolishness drifts.",
      insight:
        "Solomon says plans succeed when they are bathed in wise counsel and aligned with truth. A good plan does not eliminate uncertainty Ã¢ÂÂ it gives you a framework to respond to uncertainty wisely.",
      reflection: "What area of your life has been running on reaction rather than intention?",
      nextStep:
        "Write a clear, one-paragraph description of what you want in 12 months. Then work backward to today.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Planning (pp. 102Ã¢ÂÂ104) and Seeking Counsel (pp. 42Ã¢ÂÂ46)",
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
        "Unforgiveness is one of the heaviest weights a person can carry. It rarely hurts the other person Ã¢ÂÂ it mostly poisons the one holding it.",
      searchLanes: ["forgiveness", "peace", "healing", "wisdom", "relationships"],
      headline: "Wisdom knows the cost of bitterness",
      insight:
        "Forgiveness is not saying what happened was okay. It is releasing yourself from the prison of carrying it forever. Solomon understood that a wise person overlooks offenses Ã¢ÂÂ not out of weakness, but because peace is more valuable than being right.",
      reflection: "Who or what are you carrying that is costing you more than it costs them?",
      nextStep:
        "Forgiveness starts as a decision, not a feeling. Make the decision. The feelings will follow.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Conflict Resolution (pp. 138Ã¢ÂÂ140) and Character (pp. 162Ã¢ÂÂ166)",
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
        "Identity confusion is rarely a philosophical problem Ã¢ÂÂ it is usually the result of living too long for other people's expectations.",
      searchLanes: ["identity", "wisdom", "character", "purpose", "confidence"],
      headline: "Wisdom knows who made you Ã¢ÂÂ and why",
      insight:
        "Your identity is not found in your achievements, your roles, or other people's opinions of you. Solomon anchored identity in the fear of the Lord Ã¢ÂÂ a deep reverence that aligns you with truth and frees you from performance.",
      reflection: "Which parts of your current life reflect who you truly are Ã¢ÂÂ and which parts are for someone else's approval?",
      nextStep:
        "Do one thing today that comes from your truest self, not from what you think is expected of you.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Character (pp. 162Ã¢ÂÂ166) and Confidence (pp. 80Ã¢ÂÂ82)",
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
        "The search for God is never a detour from real life Ã¢ÂÂ it is the most direct path through it. Wisdom begins where the fear of the Lord begins.",
      searchLanes: ["faith", "wisdom", "trust", "guidance", "hope"],
      headline: "The fear of the Lord is the beginning of wisdom",
      insight:
        "Solomon, with all his wealth, wisdom, and power, concluded that a life without reverence for God is empty. Not because God needs your attention Ã¢ÂÂ but because you were designed to operate best in alignment with Him.",
      reflection: "What would your life look like if you genuinely invited wisdom into every decision?",
      nextStep:
        "Spend five minutes in silence today. Ask for wisdom Ã¢ÂÂ Solomon says God gives it generously to those who ask.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Wisdom (pp. 1Ã¢ÂÂ10) and Purpose (pp. 146Ã¢ÂÂ150)",
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
        "You didn\'t see this coming Ã¢ÂÂ and right now the ground feels unsteady. That is a completely honest response to sudden loss.",
      searchLanes: ["work", "purpose", "provision", "hope", "identity"],
      headline: "Wisdom Meets You in the Blindside",
      insight:
        "Proverbs does not define your identity by your employment. Your worth precedes your work. Sudden loss can become sudden clarity about what you were meant for next.",
      reflection:
        "What does this loss reveal about what you truly want Ã¢ÂÂ and what you were tolerating?",
      nextStep:
        "Give yourself 24 hours before making any major decisions. Then take one practical step: update a resume, call one trusted person, or sit quietly and ask what is next.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Work Ethic (pp. 96Ã¢ÂÂ100) and Purpose (pp. 146Ã¢ÂÂ150)",
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
        "You\'re not lazy Ã¢ÂÂ you\'re misaligned. Something in you knows you were made for more than this.",
      searchLanes: ["purpose", "work", "diligence", "calling", "direction"],
      headline: "Wisdom Speaks to the Stuck Place",
      insight:
        "Proverbs connects diligence to meaning, not just output. When your work stops feeding your soul, it may be calling you toward something God is preparing. Wisdom does not say stay stuck Ã¢ÂÂ it says use this season to build and discern.",
      reflection:
        "If fear were not a factor, what kind of work would you pursue? What gifts are you leaving unused right now?",
      nextStep:
        "Do not quit in frustration Ã¢ÂÂ plan in wisdom. Spend 15 minutes this week writing down what you are actually good at and what work feels alive to you.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Purpose (pp. 146Ã¢ÂÂ150) and Diligence (pp. 72Ã¢ÂÂ76)",
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
        "Losing a job is not just about money Ã¢ÂÂ it can strip your identity, your routine, and your sense of worth all at once. Wisdom addresses that deeper wound.",
      searchLanes: ["work", "purpose", "provision", "diligence", "hope"],
      headline: "Your value was never your job title",
      insight:
        "Solomon understood that diligence opens doors, but no door that closes is your final answer. The hand of the diligent rises again. Your circumstances changed Ã¢ÂÂ your character and your calling did not.",
      reflection:
        "What have you learned about yourself through this disruption that you could not have learned any other way?",
      nextStep:
        "Tend to your integrity and your effort today. Provision does not always come from where you expect Ã¢ÂÂ but it follows those who remain faithful.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Work Ethic (pp. 96Ã¢ÂÂ100) and Diligence (pp. 72Ã¢ÂÂ76)",
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
        "Betrayal does not just break a relationship Ã¢ÂÂ it challenges your ability to be open again. Wisdom speaks directly into the tension between protecting yourself and remaining whole.",
      searchLanes: ["trust", "relationships", "integrity", "forgiveness", "healing"],
      headline: "Wisdom guards the heart without hardening it",
      insight:
        "Solomon knew that a person of poor character eventually reveals themselves. Your trust was not foolish Ã¢ÂÂ it was good. The failure belonged to the one who broke it. Wisdom now asks you to guard your heart without closing it entirely.",
      reflection:
        "Is there a difference between healthy discernment and fear-based isolation in how you are responding to this?",
      nextStep:
        "Give yourself permission to grieve the loss of that trust. Then ask wisdom to show you what healthy boundaries Ã¢ÂÂ not walls Ã¢ÂÂ look like moving forward.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Relationships (pp. 130Ã¢ÂÂ134) and Character (pp. 162Ã¢ÂÂ166)",
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
        "Grief is not a problem to solve. It is love with nowhere to go. Wisdom does not rush you through it Ã¢ÂÂ it sits with you inside it.",
      searchLanes: ["healing", "hope", "patience", "comfort", "purpose"],
      headline: "There is a wisdom that holds you when words fail",
      insight:
        "Solomon wrote about the mystery of sorrow and joy coexisting. He knew that grief is one of the most honest human experiences Ã¢ÂÂ it proves that love was real. Mourning is not weakness. It is the soul honoring what mattered.",
      reflection:
        "What do you most want to remember or honor about the person or season you have lost?",
      nextStep:
        "Do not run from the grief. Let yourself feel it fully today Ã¢ÂÂ even if for just a few minutes. Healing does not skip over loss. It moves through it.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Patience (pp. 140Ã¢ÂÂ142) and Purpose (pp. 146Ã¢ÂÂ150)",
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
        "Parenting tests everything Ã¢ÂÂ your patience, your identity, your faith, and your love. Wisdom honors the weight of that responsibility and speaks directly into it.",
      searchLanes: ["discipline", "wisdom", "guidance", "patience", "relationships"],
      headline: "Train up a child in the way he should go",
      insight:
        "Solomon's most important parenting principle is often missed: he said to train up a child in the way HE should go — not the way you want them to go, but the way uniquely fitted to who that child was made to be. Every child has a divine design and a unique giftedness. Your job as a parent is to discover it and develop it — not force them into a mold that fits someone else's dream. Character is caught more than taught. Your presence and example matter far more than your perfection. The wise parent studies their child to bring out what God already placed there.",
      reflection:
        "Are you parenting the child you have — with their unique wiring — or the child you imagined? What is one gift in this child that deserves more space and development?",
      nextStep:
        "This week, identify one specific quality or gift unique to your child. Find one way to honor and develop it — not redirect it. Then choose one moment today to listen more than you speak.",
      bookConnection:
        "Success Secrets of Solomon — Discipline and Training (pp. 54-58), Train in Their Way (Prov 22:6), and Wisdom (pp. 1-10)",
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
        "A marriage in crisis touches every part of who you are. Wisdom does not offer quick fixes Ã¢ÂÂ but it speaks profound truth about covenant, character, and the courage required for any real restoration.",
      searchLanes: ["relationships", "conflict", "patience", "integrity", "healing"],
      headline: "Wisdom speaks into the hardest relationship questions",
      insight:
        "Solomon wrote more about the quality of character in relationships than about romantic feelings. He understood that trust, honesty, and consistency are what hold people together Ã¢ÂÂ and that their absence is what pulls them apart. Whatever you are facing, wisdom begins with honest self-reflection.",
      reflection:
        "What does wisdom ask of you in this relationship Ã¢ÂÂ not of the other person, but of you?",
      nextStep:
        "Before making any major decisions, seek counsel from someone wise and trusted. Do not navigate this alone.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Relationships (pp. 130Ã¢ÂÂ134) and Conflict (pp. 138Ã¢ÂÂ140)",
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
        "Financial pressure does not just drain your bank account Ã¢ÂÂ it drains your confidence and your peace. Wisdom understands money deeply and speaks truth into both the practical and the emotional weight of debt.",
      searchLanes: ["money", "stewardship", "discipline", "planning", "wisdom"],
      headline: "Wisdom is the most underused financial tool",
      insight:
        "Solomon spoke more about money than almost any other topic in Proverbs. He understood that debt is a form of bondage and that financial freedom is built through patient, disciplined decisions Ã¢ÂÂ not desperation. Shame will paralyze you. Wisdom will move you forward.",
      reflection:
        "What financial habit or belief brought you here Ã¢ÂÂ and what would a wise, disciplined version of you do differently starting today?",
      nextStep:
        "Write down your full financial picture, honestly. You cannot steward what you will not face. Wisdom begins with truth.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Money & Wealth (pp. 88Ã¢ÂÂ92) and Stewardship (pp. 92Ã¢ÂÂ96)",
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
        "Addiction is not a character flaw Ã¢ÂÂ it is a wound seeking relief in the wrong place. Wisdom speaks to the deep need beneath the behavior and points toward real freedom, not just willpower.",
      searchLanes: ["discipline", "wisdom", "healing", "self-control", "freedom"],
      headline: "The path to freedom begins with honest sight",
      insight:
        "Solomon warned that what looks like pleasure often leads to chains Ã¢ÂÂ and that the wise person sees the end of a path before walking it. But wisdom is also deeply merciful. It does not mock the person who is caught. It offers a way out through discipline, community, and truth.",
      reflection:
        "What is the real need Ã¢ÂÂ the pain, loneliness, or fear Ã¢ÂÂ that this habit has been trying to meet?",
      nextStep:
        "Reach out to one trustworthy person today. Shame thrives in silence. Real healing almost always requires another person walking with you.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Discipline (pp. 54Ã¢ÂÂ58) and Confidence (pp. 80Ã¢ÂÂ82)",
    };
  }

  
  // LONELINESS / ISOLATION
  if (
    includesAny(q, [
      "i feel alone",
      "so alone",
      "feel lonely",
      "feeling lonely",
      "i am lonely",
      "no one cares",
      "nobody cares",
      "no one understands",
      "nobody understands",
      "isolated",
      "i feel invisible",
      "feel invisible",
      "no friends",
      "i have no friends",
      "forgotten by everyone",
      "feel forgotten",
      "i feel forgotten",
      "no one sees me",
      "nobody sees me",
      "disconnected from everyone",
      "left out",
      "always alone",
    ])
  ) {
    return {
      emotionalState: "alone, unseen, and aching for connection",
      deeperMeaning:
        "Loneliness is one of the loudest lies. It tells you that your current season of isolation defines your worth and your future. Neither is true.",
      searchLanes: ["loneliness", "identity", "hope", "peace", "community"],
      headline: "Loneliness Does Not Mean You Are Forgotten",
      insight:
        "Solomon wrote that two are better than one Ã¢ÂÂ not because aloneness is weakness, but because we were built for witness. The season you are in right now is not your permanent address. Wisdom reminds you that the God who sees you is also the God who moves.",
      reflection:
        "Is your loneliness about circumstances Ã¢ÂÂ or about a story you are telling yourself about your worth?",
      nextStep:
        "Do one thing today that places you in proximity to people Ã¢ÂÂ even small proximity counts. A walk, a call, a chair at a coffee shop. Connection rarely comes all at once.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Loneliness (pp. 105-118) and Identity (pp. 118-132)",
    };
  }

  // CHRONIC ILLNESS / HEALTH FEAR
  if (
    includesAny(q, [
      "chronic illness",
      "chronic pain",
      "sick all the time",
      "always sick",
      "health scare",
      "i am sick",
      "scared about my health",
      "afraid of dying",
      "fear of death",
      "terminal",
      "diagnosis",
      "i was diagnosed",
      "fighting illness",
      "fighting disease",
      "my body is failing",
      "health is failing",
      "i feel broken physically",
      "living with pain",
      "dealing with pain every day",
      "suffering physically",
      "my health is scaring me",
    ])
  ) {
    return {
      emotionalState: "physically weary, afraid, and wrestling with things beyond your control",
      deeperMeaning:
        "When your body becomes the battleground, everything else feels secondary. This is one of the rawest forms of vulnerability Ã¢ÂÂ and it deserves honesty, not platitudes.",
      searchLanes: ["fear", "hope", "peace", "trust", "suffering"],
      headline: "Wisdom Does Not Look Away From Suffering",
      insight:
        "Solomon wrote about the human condition with unflinching clarity. He understood that strength is not the absence of pain Ã¢ÂÂ it is what you choose to anchor to when pain is present. Proverbs does not promise easy lives. It promises a wisdom that outlasts what we face.",
      reflection:
        "What does this season of physical struggle reveal about what you are truly leaning on?",
      nextStep:
        "Give yourself permission to grieve what your body is going through Ã¢ÂÂ without guilt. Then ask: what is one thing still within my control today that I can do with intention?",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Resilience (pp. 159-171) and Fear (pp. 37-51)",
    };
  }

  // SHAME / FEELING DIRTY / PAST MISTAKES HAUNTING
  if (
    includesAny(q, [
      "i feel ashamed",
      "so ashamed",
      "i am ashamed",
      "feel like a bad person",
      "i am a bad person",
      "past mistakes",
      "my past haunts me",
      "haunted by my past",
      "i cannot forgive myself",
      "cant forgive myself",
      "what i did",
      "guilty about my past",
      "feel worthless because of what i did",
      "i ruined everything",
      "too broken to be fixed",
      "too far gone",
      "i am too damaged",
      "damaged goods",
      "feel dirty",
      "disgusted with myself",
      "cannot move past what i did",
    ])
  ) {
    return {
      emotionalState: "weighed down by shame, convinced that your past defines your future",
      deeperMeaning:
        "Shame tells you that what you did IS who you are. That is the lie at the center of it. What you did is real. But it is not your permanent identity Ã¢ÂÂ unless you let shame write the last chapter.",
      searchLanes: ["identity", "forgiveness", "hope", "grace", "renewal"],
      headline: "Wisdom Knows the Difference Between Guilt and Shame",
      insight:
        "Proverbs distinguishes between the fool who covers his sins and the wise person who confesses and finds mercy. Shame says hide. Wisdom says face it, name it, and move. A righteous person falls seven times and rises again Ã¢ÂÂ that is not an exception. That is the pattern.",
      reflection:
        "What would it look like to accept what happened without letting it become the story you tell about who you are?",
      nextStep:
        "Write down one true thing about who you are that exists independently of your worst moment. It does not need to be big. It just needs to be real.",
      bookConnection:
        "Success Secrets of Solomon Ã¢ÂÂ Integrity (pp. 66-70) and Starting Over (pp. 183-196)",
    };
  }

  // PROCRASTINATION / LAZINESS
  if (includesAny(q, [
    "procrastinat", "keep putting off", "cant seem to start", "always delay",
    "lazy", "slothful", "sluggard", "no motivation to work", "i know what to do but",
    "i put things off", "never finish what i start", "lack discipline",
    "lack self discipline", "no self control", "too comfortable", "stuck doing nothing"
  ])) {
    return {
      emotionalState: "stuck in a cycle of avoidance",
      deeperMeaning: "You know what needs to be done. Something deeper is keeping you from doing it.",
      searchLanes: ["wisdom", "growth", "purpose"],
      headline: "Solomon Studied the Ant So You Would Not Have To",
      insight: "Solomon watched the ant and saw everything we avoid. No manager. No overseer. No ruler. The ant simply does what it was made to do. The sluggard waits for the right feeling, the right moment, the right conditions. Those never come. Activity is the answer, not rest. The ant does not wait to feel motivated. It moves, and the motivation follows.",
      reflection: "What one thing could you do today that your future self would thank you for? Start there. Just one thing.",
      nextStep: "Name the one task you have been avoiding longest. Set a timer for 10 minutes and start only that task right now. The ant does not wait to feel motivated — it moves, and motivation follows.",
      bookConnection: "Success Secrets of Solomon Ã¢ÂÂ The Ant (pp. 85-89) and The Sluggard (pp. 89-104)",
    };
  }

  // DILIGENCE / HARD WORK / WANTING TO SUCCEED
  if (includesAny(q, [
    "diligent", "work harder", "want to succeed", "want to be excellent",
    "how do i get ahead", "want to stand before kings", "want to be noticed",
    "nobody sees my work", "giving my best", "i work hard but nothing changes",
    "how do i get promoted", "want to be recognized", "dream but nothing happens",
    "desire without action", "desire without results"
  ])) {
    return {
      emotionalState: "hungry for more but unsure if effort is enough",
      deeperMeaning: "You have the desire. Solomon says desire without diligence is just daydreaming.",
      searchLanes: ["wisdom", "purpose", "growth"],
      headline: "The Diligent Will Stand Before Kings",
      insight: "Solomon was clear: the diligent person will eventually be recognized and rewarded. Not overnight. Not always on your timeline. But diligence creates an unstoppable momentum. The sluggard has desires too, and gets nothing. The difference is not the dream. It is the daily discipline behind the dream. Give your best at whatever is in front of you right now. That is how Joseph went from a prison to a palace.",
      reflection: "Are you giving your best at your current level, or waiting until things improve before you do?",
      nextStep: "Identify your current level of diligence on a scale of 1-10. Name one habit you could add this week that would raise it by one point. Diligence starts now, where you are.",
      bookConnection: "Success Secrets of Solomon Ã¢ÂÂ Diligence (pp. 108-113)",
    };
  }

  // FEAR / ANXIETY / SCARED OF THE FUTURE
  if (includesAny(q, [
    "i am afraid", "i am scared", "living in fear", "fear of the future",
    "fear of failure", "what if it goes wrong", "terrified", "paralyzed by fear",
    "fear holds me back", "afraid to try", "fear of man", "what people think",
    "too scared to", "anxiety about", "worried about what will happen",
    "i keep worrying", "cant stop worrying"
  ])) {
    return {
      emotionalState: "paralyzed by fear of what might happen",
      deeperMeaning: "Fear is a creative force. It builds the very trap it warns you about.",
      searchLanes: ["peace", "faith", "wisdom"],
      headline: "The Fear of Man Is a Snare",
      insight: "Solomon was direct: the fear of man brings a snare. Fear does not just warn you. It creates. What you continuously fear, you move toward. It limits your potential, shrinks your world, and keeps you from what God has for you. But there is a different force available. Trust. Solomon said the one who trusts in the Lord is safe. Not fearless. Safe. The boldness of the righteous is not the absence of fear. It is the presence of God.",
      reflection: "What would you attempt if you truly believed God was working on your behalf right now?",
      nextStep: "Write down the specific fear. Ask: what is the worst realistic outcome? Then ask: if that happened, could God still redeem it? The answer is almost always yes. Move forward from that answer.",
      bookConnection: "Success Secrets of Solomon Ã¢ÂÂ Fear vs. Faith (pp. 224-226)",
    };
  }

  // TOXIC FRIENDSHIPS / BAD RELATIONSHIPS / PEOPLE DRAGGING YOU DOWN
  if (includesAny(q, [
    "toxic friend", "toxic relationship", "bad influence", "people dragging me down",
    "friends are negative", "surrounded by negative people", "my friends are bad for me",
    "wrong crowd", "people i hang around", "nobody supports me",
    "my friends dont push me", "dull people", "iron sharpens iron",
    "bad company", "friends pull me back", "people i trust hurt me"
  ])) {
    return {
      emotionalState: "worn down by the people around you",
      deeperMeaning: "The people closest to you are either sharpening you or dulling you. There is no neutral.",
      searchLanes: ["relationships", "wisdom", "growth"],
      headline: "Iron Sharpens Iron",
      insight: "Solomon said it plainly. A friend should sharpen you, not dull you. The friction is the same, but the result is entirely different depending on who is doing the sharpening. Some friendships grind you down. They drain your energy, lower your faith, and make everything harder. You have to work harder to stay positive around them. That is the dull-axe effect. A true friend makes life better. They see the better version of you even on your worst day, and they call you toward it.",
      reflection: "If you are honest, do the people closest to you make you better or worse? What is one relationship you need to invest more in, and one you need to step back from?",
      nextStep: "Make a list of the three people you spend the most time with. Next to each name write one word: sharpening or dulling. Be honest. Invest more in one relationship and create distance from one this month.",
      bookConnection: "Success Secrets of Solomon Ã¢ÂÂ Friendship (pp. 166-170)",
    };
  }

  // REPUTATION / INTEGRITY / PEOPLE JUDGING ME
  if (includesAny(q, [
    "my reputation", "what people think of me", "people judge me", "bad reputation",
    "want people to respect me", "nobody trusts me", "i want to be trusted",
    "integrity", "walking the talk", "say one thing do another",
    "i want to be known as", "want a good name", "my name", "what am i known for"
  ])) {
    return {
      emotionalState: "concerned about how you are perceived and whether it matches who you are",
      deeperMeaning: "Solomon valued a good name above silver and gold. Your reputation is built one day at a time.",
      searchLanes: ["wisdom", "growth", "purpose"],
      headline: "A Good Name Is Worth More Than Great Riches",
      insight: "Solomon ranked a good reputation and loving favor above silver and gold. Not because wealth does not matter. But because reputation is what opens doors that money cannot. And integrity is what keeps them open. The person with integrity does not have to manage their image. Their walk manages it for them. Solomon watched people and said we all create our reputation whether we are conscious of it or not. The question is: is it working for you or against you?",
      reflection: "What are you actually known for by the people who see you every day? Does that match who you want to be?",
      nextStep: "Ask someone you trust to tell you one thing you are known for — and one thing they wish you were known for. Use that gap as your growth target.",
      bookConnection: "Success Secrets of Solomon Ã¢ÂÂ Reputation and Favor (pp. 199-200)",
    };
  }

  // RECEIVING CORRECTION / HARD-HEADED / NOT GROWING
  if (includesAny(q, [
    "i dont take criticism well", "hard time receiving feedback", "hard headed",
    "people say im stubborn", "i know best", "wont listen", "cant take advice",
    "defensive when corrected", "hard to change", "i resist correction",
    "i keep making the same mistake", "same mistake over and over",
    "wont admit i am wrong", "dont like being told what to do",
    "i never learn from mistakes"
  ])) {
    return {
      emotionalState: "stuck in a pattern you recognize but cannot seem to break",
      deeperMeaning: "The fool thinks he is right even when seven wise men disagree. The wise person goes looking for correction on purpose.",
      searchLanes: ["wisdom", "growth", "relationships"],
      headline: "The Wound of a Friend Is Better Than the Kiss of an Enemy",
      insight: "Solomon said a wise person values the rebuke of someone who cares more than the flattery of someone who does not. The sting is real. But it is not destructive. It is productive. The person who refuses correction hardens their neck, and Solomon warned that path leads to sudden destruction. The wise person invites the discomfort because they know it produces growth. You can go through life or grow through life. The only variable is whether you are willing to be corrected.",
      reflection: "Is there a correction you have been given repeatedly that you have been dismissing? What would change if you took it seriously?",
      nextStep: "Identify one person whose correction you have been resisting. Reach out this week and genuinely ask: what am I missing? Then listen without defending.",
      bookConnection: "Success Secrets of Solomon Ã¢ÂÂ Receiving Correction (pp. 114-117) and Hard-Headedness (pp. 91)",
    };
  }

  // CONFLICT / STRIFE / ARGUING
  if (includesAny(q, [
    "always arguing", "constant conflict", "fighting with", "strife", "contention",
    "i keep getting in arguments", "anger gets me in trouble",
    "i say things i regret when angry", "speak without thinking",
    "mouth gets me in trouble", "i blow up", "i say hurtful things",
    "react before i think", "lose my temper and say things",
    "hot tempered", "cant control my anger in conversations"
  ])) {
    return {
      emotionalState: "frustrated by the damage your words cause in the heat of the moment",
      deeperMeaning: "Solomon said a fool utters all of his mind. A wise person keeps it in until afterwards.",
      searchLanes: ["relationships", "peace", "wisdom"],
      headline: "You Can Hit Pause But You Cannot Hit Rewind",
      insight: "Solomon watched people destroy relationships with their mouths in a moment of anger. He said the wise person bridles themselves. They hit pause before they hit the accelerator. Once words are out, they are sown. They will grow something. Wise people are not people who have no reaction. They are people who know the pause button exists and use it on purpose. There is no rewind. There is only the choice, in this moment, to keep the fire small before it spreads.",
      reflection: "What triggers you to speak before you think? What would it look like to practice the pause in that specific situation?",
      nextStep: "Recall the last thing you said that you regret. Write it down. Then write what you should have said instead. Practice the better response so you are ready next time — wisdom is preparation, not reaction.",
      bookConnection: "Success Secrets of Solomon Ã¢ÂÂ Managing the Mouth (pp. 66-84) and Conflict (pp. 182-186)",
    };
  }

  // DESIRE MORE FROM LIFE / FEELING LIKE YOU WERE MADE FOR MORE
  if (includesAny(q, [
    "made for more", "feeling like there is more", "something is missing",
    "want to find my purpose", "dont know my purpose", "living without purpose",
    "feel like i have potential i am not using", "gifts going to waste",
    "i have a gift but", "what am i here for", "why am i here",
    "want to live on purpose", "life by design", "default life",
    "want to be more than i am", "feel wasted", "feel like i am wasting my life"
  ])) {
    return {
      emotionalState: "sensing that your life has not caught up with who you were created to be",
      deeperMeaning: "Solomon said we are not random accidents. We are divine products made with deliberate design and specific purpose.",
      searchLanes: ["purpose", "wisdom", "growth"],
      headline: "You Were Made With Deliberate Divine Design",
      insight: "Solomon wrote that every person is created for God and by God, with a unique purpose built in. Not assigned later. Built in. Your gifts are not an accident. Your passions are not a coincidence. Solomon also said a person who is diligent in their gifts will stand before kings. The world does not need another copy of someone else. It needs you operating in what God actually designed you for. Living by default is choosing someone else's story. Living by design starts with a single question: What did God put in me that I have been ignoring?",
      reflection: "What gift or ability do you have that you have been underinvesting in? What would it look like to take it seriously for 90 days?",
      nextStep: "Write your answer to this: if money were not a factor, what would you spend your days doing? That answer is not a fantasy — it is a clue. Write one step you could take this week to move toward it.",
      bookConnection: "Success Secrets of Solomon Ã¢ÂÂ Divine Design and Purpose (pp. 156-158) and Giftedness (pp. 178)",
    };
  }

  // VISION / NO CLEAR VISION / LIVING WITHOUT A PICTURE OF THE FUTURE
  if (includesAny(q, [
    "i have no vision", "no vision for my life", "cant see my future",
    "i dont know where i am going", "no clear direction", "living day to day",
    "just surviving", "no goals", "no plan for my life", "drifting",
    "i drift from thing to thing", "unfocused life", "no focus",
    "what is my vision", "how do i get a vision", "need a vision",
    "living without a vision", "cant picture my future", "future feels blank",
    "i have no idea what i want", "wandering", "going in circles"
  ])) {
    return {
      emotionalState: "drifting without a clear picture of where you are going",
      deeperMeaning: "Solomon wrote that where there is no vision the people perish. Not eventually. The drift starts immediately.",
      searchLanes: ["purpose", "wisdom", "growth"],
      headline: "Where There Is No Vision, the People Perish",
      insight: "Solomon was precise: without a vision, people do not just stagnate. They perish. They lose ground. They give their days to whatever pulls hardest. A vision is not wishful thinking. It is a deliberate mental picture of the future you are building toward. People who live by design see that picture clearly and make daily decisions toward it. People who live by default wake up one day and realize life happened to them instead of through them. The vision does not have to be grand. It has to be real. It has to be yours. It has to be specific enough to pull you toward it on a hard day.",
      reflection: "If you had to describe your life five years from now in three sentences, what would you say? If you cannot say it clearly, that is where to start.",
      nextStep: "Write three sentences describing your life five years from now as if it has already happened. Make them specific. Then identify one decision you are facing today that your vision informs.",
      bookConnection: "Success Secrets of Solomon Ã¢ÂÂ Living by Design vs. Default (pp. 62-65) and Divine Purpose (pp. 156-158)",
    };
  }

  // WHY PEOPLE FAIL / WHY AM I NOT SUCCEEDING / REPEATED FAILURE
  if (includesAny(q, [
    "why do i keep failing", "why do people fail", "why cant i succeed",
    "i try but nothing works", "keep failing", "pattern of failure",
    "why does success elude me", "i do everything right but still fail",
    "why is my life not working", "what am i doing wrong",
    "cycle of failure", "stuck in failure", "fail at everything",
    "nothing ever works out for me", "why does life not work for me",
    "i start things but never finish", "i sabotage myself",
    "why do i self-sabotage", "why do i keep getting in my own way"
  ])) {
    return {
      emotionalState: "exhausted by a pattern you cannot seem to break",
      deeperMeaning: "Solomon identified the root causes of failure with surgical precision. Most of them are internal, not external.",
      searchLanes: ["wisdom", "growth", "purpose"],
      headline: "Solomon Identified Why People Fail Ã¢ÂÂ and Most of It Is Fixable",
      insight: "Solomon watched people fail across every area of life and he identified the patterns. People fail because they lack a vision and drift. They fail because they have desire without diligence Ã¢ÂÂ they want the outcome but avoid the work. They fail because they refuse counsel and correction, insisting they already know best. They fail because they neglect small things until the neglect becomes overwhelming. They fail because their mouth keeps creating problems their life cannot absorb. They fail because fear keeps them from attempting what they were designed to do. The remarkable thing is that Solomon said every single one of these is correctable. Not easy. Correctable. The question is not whether failure can be reversed. The question is whether you are willing to hear which of these is yours.",
      reflection: "Which of these is most true for you right now: no clear vision, desire without action, refusing correction, neglecting important things, or fear of attempting?",
      nextStep: "Be honest with Solomon about the pattern. He has seen it before and he has the specific wisdom for it.",
      bookConnection: "Success Secrets of Solomon Ã¢ÂÂ The Sluggard (pp. 89-104), Receiving Correction (pp. 114-117), and Managing the Mouth (pp. 66-84)",
    };
  }

  // LACK / FEELING LIKE I NEVER HAVE ENOUGH / SCARCITY MINDSET
  if (includesAny(q, [
    "i never have enough", "always lacking", "feeling of lack", "scarcity",
    "why do i always feel like i dont have enough", "living in lack",
    "why am i always broke", "why do i always feel poor",
    "never enough money", "never enough time", "never enough energy",
    "why do i feel empty", "feel empty inside", "inner emptiness",
    "i have things but still feel empty", "something is always missing",
    "fill the emptiness", "void inside", "nothing satisfies",
    "i get what i want and still feel empty", "why am i never satisfied"
  ])) {
    return {
      emotionalState: "carrying a persistent sense that something is always missing",
      deeperMeaning: "Solomon said the eyes of man are never satisfied. But he also said contentment is a choice that comes from the inside out.",
      searchLanes: ["peace", "wisdom", "purpose"],
      headline: "Solomon Said the Eyes Are Never Satisfied Ã¢ÂÂ But That Is Not the Whole Story",
      insight: "Solomon was honest. He said the eye is never satisfied with seeing. The ear never full with hearing. He had more than anyone in history and described it as vanity. Not because having things is wrong. But because things alone cannot fill what only God and purpose were designed to fill. He also said a person who has learned contentment has found something that wealth cannot purchase. The emptiness you feel is not a flaw in you. It is a signal. It is pointing to something that possessions, achievement, and approval were never designed to provide. The question is not how to get more. The question is what the emptiness is actually pointing toward.",
      reflection: "What have you been trying to fill the emptiness with? What is the one thing that, if you had it, you believe the emptiness would stop?",
      nextStep: "Identify what you have been trying to fill the emptiness with. Ask: was this designed by God to satisfy this need — or is it a substitute? Write down what the emptiness is actually pointing toward.",
      bookConnection: "Success Secrets of Solomon Ã¢ÂÂ Contentment and Balance (pp. 227-229) and Purpose (pp. 156-158)",
    };
  }

  // NEEDS / UNMET NEEDS / WHAT DO I ACTUALLY NEED
  if (includesAny(q, [
    "what do i need", "i have unmet needs", "my needs are not being met",
    "nobody meets my needs", "i need love", "i need acceptance",
    "hungry for something", "hungry soul", "starving for",
    "i need to be seen", "i need to be heard", "i need to be valued",
    "desperate for connection", "desperate for approval",
    "why do i need so much from people", "emotionally needy",
    "why do i feel so needy", "my needs drive my bad decisions",
    "i lower my standards when i need something", "need kills my discernment"
  ])) {
    return {
      emotionalState: "driven by a need so strong it is affecting your judgment and decisions",
      deeperMeaning: "Solomon said to the hungry soul every bitter thing is sweet. Unmet needs destroy discernment.",
      searchLanes: ["peace", "relationships", "wisdom"],
      headline: "A Hungry Soul Loses Its Discernment",
      insight: "Solomon wrote one of the most psychologically precise verses in all of Proverbs: to the hungry soul, even bitter things taste sweet. When a person is starving for love, acceptance, or belonging, they will lower every standard to fill the hunger. They will accept what they know is wrong because the need is louder than the wisdom. Solomon is not condemning the need. He is warning about the danger of letting unmet need make the decisions. The need for love is real. The need to be seen and valued is real. Those needs are meant to be filled. But filled by the right source at the right time. Not by desperation.",
      reflection: "What need is currently loudest in you right now? Is that need driving you toward something you know is not right for you?",
      nextStep: "Name the need that is loudest in you right now. Ask: am I trying to meet a legitimate need through an illegitimate source? What is the God-designed way this need was meant to be met? Start there.",
      bookConnection: "Success Secrets of Solomon Ã¢ÂÂ The Hungry Soul (pp. 214-215) and Friendship and Counsel (pp. 114-118)",
    };
  }

  // SUCCESS / HOW TO SUCCEED / SECRETS OF SUCCESS
  if (includesAny(q, [
    "how do i succeed", "how to be successful", "secrets of success", "what makes people successful",
    "want to be successful", "how do i become successful", "success principles",
    "path to success", "why are some people successful", "what is success",
    "how do i achieve success", "i want to succeed", "keys to success",
    "success mindset", "how do successful people think", "success habits",
    "achieve my goals", "how to reach my goals", "want to win in life",
    "how do i get ahead in life", "how to build a successful life",
    "what does the bible say about success", "biblical success",
    "solomon success", "success secrets", "success secrets of solomon"
  ])) {
    return {
      emotionalState: "hungry for success and looking for the principles that actually produce it",
      deeperMeaning: "Solomon was the most successful person who ever lived — and he wrote down exactly why. His answer surprises most people.",
      searchLanes: ["wisdom", "purpose", "work", "diligence", "growth"],
      headline: "Solomon Was the Original Success Secret",
      insight: "Solomon did not chase success. He asked God for wisdom — and success chased him. That is not a metaphor. He received wealth, honor, peace, and influence that the world had never seen, and he traced every bit of it back to one decision: seeking wisdom first. He identified the principles in Proverbs with surgical precision. The successful person has a vision and lives by design, not default. They are diligent — the diligent hand makes rich while the slack hand brings poverty. They guard their mind, because as a person thinks in their heart, so they become. They choose the right people, because iron sharpens iron and the wrong companions dull you. They honor God with their substance, and their barns overflow. They manage their mouth, because life and death are in the power of the tongue. Success in Solomon's framework is not an accident. It is the predictable result of applied wisdom.",
      reflection: "Which of Solomon's success principles is most absent from your life right now — and what would change if you applied it this week?",
      nextStep: "Pick one principle: diligence, vision, right relationships, or guarding your mind. Commit to one specific action in that area today. Solomon said desire without diligence is just daydreaming.",
      bookConnection: "Success Secrets of Solomon — Living by Design vs. Default (pp. 62-65), Diligence (pp. 108-113), and Vision (pp. 156-158)",
    };
  }

  // WEALTH / PROSPERITY / FINANCIAL SUCCESS / ABUNDANCE
  if (includesAny(q, [
    "how do i build wealth", "how to become wealthy", "how to get rich",
    "want to be wealthy", "wealth building", "wealth principles",
    "biblical wealth", "what does the bible say about wealth", "wealth and prosperity",
    "prosperity", "how to prosper", "prosperity principles", "financial abundance",
    "abundance mindset", "how to attract abundance", "abundance",
    "how do i create wealth", "path to wealth", "wealth mindset",
    "generational wealth", "how to be prosperous", "what is prosperity",
    "wealth creation", "build financial wealth", "money and wealth",
    "solomon wealth", "solomon prosperity", "proverbs about wealth",
    "proverbs about prosperity", "financial freedom", "financial independence"
  ])) {
    return {
      emotionalState: "hungry for financial increase and looking for principles that actually produce lasting wealth",
      deeperMeaning: "Solomon was the wealthiest person in the ancient world — and his wealth was a byproduct of wisdom, not the goal. That distinction changes everything.",
      searchLanes: ["wisdom", "work", "diligence", "giving", "purpose"],
      headline: "Solomon Built Generational Wealth — and He Left the Blueprint",
      insight: "Solomon had more wealth than any ruler in recorded history. And in Proverbs he explains exactly how it works — not as a self-help formula, but as divine law. The diligent hand makes rich; the slack hand makes poor. That is not motivational language. It is cause and effect. He said to honor God with your firstfruits — the first portion — and your barns would overflow. He warned that the borrower is servant to the lender, and that debt is a form of bondage. He taught that the contributor builds wealth while the hoarder loses it — true wealth flows through generosity, not hoarding. He identified that desire without knowledge leads to failure, which is why lottery winners go broke and athletes lose fortunes. Wealth without wisdom cannot hold. And he made clear that a good name and loving favor are worth more than silver and gold — because reputation opens doors that money alone cannot. Wealth in Solomon's world is the result of applied wisdom over time. It is not given to the hasty or the lazy. It grows in the hands of the diligent, the generous, and the faithful.",
      reflection: "Are you building wealth with wisdom — or just working hard and hoping? What is one financial principle from Proverbs you are not currently living by?",
      nextStep: "Identify one area: diligence, debt, generosity, or how you honor God with your income. Take one concrete step this week. Solomon said the ant stores in summer what it will need in winter — start storing.",
      bookConnection: "Success Secrets of Solomon — Wealth Principles (pp. 96-100), Giving and Generosity (pp. 210-215), and Diligence (pp. 108-113)",
    };
  }


  // LIVING BY DESIGN vs DEFAULT / DRIFTING / SURVIVAL MODE
  if (includesAny(q, [
    "just reacting to life", "living by default", "living by design", "life by design",
    "survival mode", "just surviving", "going through the motions", "life is happening to me",
    "on autopilot", "want to be more intentional", "want to design my life",
    "life feels like a routine i didnt choose", "stuck in a routine", "life on repeat",
    "i have no plan", "no plan for my life", "drifting through life"
  ])) {
    return {
      emotionalState: "drifting on autopilot through a life you did not consciously choose",
      deeperMeaning: "Solomon said where there is no vision the people perish — not eventually, but immediately. The drift starts the moment the design stops.",
      searchLanes: ["vision", "purpose", "wisdom", "growth", "direction"],
      headline: "Living by Design Starts With a Decision",
      insight: "Solomon drew a sharp line between two kinds of people: those who live by design and those who live by default. The person living by design has a clear picture of who they are becoming and makes daily decisions toward it. The person living by default wakes up one day and realizes life happened to them instead of through them. Default is not neutral — it means something else is choosing your direction. The phone, the algorithm, the pressure of the moment, the expectations of others — all of these are designing your life if you are not. Proverbs 29:18 is not a suggestion: without a vision, things deteriorate. God gave vision exclusively to human beings — it is one of the most uniquely human acts to look forward and build toward what does not yet exist. The design does not have to be grand. It has to be real, specific, and yours.",
      reflection: "If you described your life five years from now in three sentences, what would you say? If you cannot answer that clearly, the drift has already started. What would a life by design look like for you?",
      nextStep: "Write down the three most important areas of your life: personal, professional, and spiritual. For each one, write one sentence describing what you want it to look like in three years. That is your design. Now make one decision today that aligns with it.",
      bookConnection: "Success Secrets of Solomon — Living by Design vs. Default (pp. 62-65) and Vision (pp. 156-158)",
    };
  }

  // PRODUCTION vs PLEASURE / WASTING TIME / BAD HABITS / PROCRASTINATION
  if (includesAny(q, [
    "i waste time", "wasting time", "too much time on social media", "my habits are hurting me",
    "bad habits", "i procrastinate too much", "cant focus", "addicted to my phone",
    "i know what i should do but i dont do it", "pleasure before work",
    "i choose comfort over growth", "i avoid hard things", "i take the easy road",
    "my days feel unproductive", "end of the day feel like i did nothing",
    "entertainment over productivity", "my time doesnt match my goals",
    "i say i want things but dont act", "i choose short term over long term"
  ])) {
    return {
      emotionalState: "aware that your time and your priorities are out of alignment — and frustrated with yourself about it",
      deeperMeaning: "Solomon identified two quadrants every person operates in: Production — activities with long-term value — and Pleasure — activities with only immediate reward. Most people know which quadrant they are living in. The question is whether they will change it.",
      searchLanes: ["wisdom", "diligence", "growth", "purpose", "discipline"],
      headline: "Now or Later — You Always Choose One",
      insight: "Solomon said the one who tills their land will be satisfied, but the one who follows vanity is void of understanding. He divided life into production and pleasure and made clear that most success is simply the result of spending more time in one than the other. The ant does not wait for the right mood — it works in season because it understands that pleasure later requires production now. This is not about eliminating enjoyment. It is about sequence. The more you invest in production, the more you can genuinely enjoy pleasure — without guilt. The reverse is equally true: the more you default to pleasure today, the less you have to enjoy tomorrow. The fool lives only for this moment. The wise person lives for both — in the right order.",
      reflection: "If you tracked your time honestly for one week, what percentage would be in production versus pleasure? Does that ratio match what you say your goals are?",
      nextStep: "For the next three days, decide your one production priority for each morning before you look at your phone. Do that one thing first. Then enjoy whatever you choose — because you earned it. Sequence is everything.",
      bookConnection: "Success Secrets of Solomon — Production vs. Pleasure Quadrant (pp. 108-110) and Diligence (pp. 108-113)",
    };
  }


return null;
}
