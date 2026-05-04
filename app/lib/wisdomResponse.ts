// app/lib/wisdomResponse.ts

export type WisdomResponse = {
  emotionalState: string;
  deeperMeaning: string;
  searchLanes: string[];
  headline: string;
  insight: string;
  reflection: string;
  nextStep: string;
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

  if (
    includesAny(q, [
      "behind in life",
      "falling behind",
      "feel behind",
      "i am behind",
      "too late",
      "missed my chance",
      "second guessing",
      "not enough",
    ])
  ) {
    return {
      emotionalState: "discouraged, delayed, and comparing yourself",
      deeperMeaning:
        "You may not only be asking about progress. You may be asking whether delay means failure.",
      searchLanes: ["comparison", "discouraged", "purpose", "hope", "progress"],
      headline: "This may speak to you",
      insight:
        "Wisdom does not measure your life by someone else’s timeline. It points you back to steady steps, patience, and the kind of growth that happens beneath the surface before it becomes visible.",
      reflection:
        "Where are you judging yourself by speed instead of faithfulness?",
      nextStep:
        "Take one small faithful step today instead of trying to solve your whole future at once.",
    };
  }

  if (
    includesAny(q, [
      "discouraged",
      "hopeless",
      "giving up",
      "defeated",
      "worn out",
      "burned out",
      "tired",
      "weary",
      "heavy",
    ])
  ) {
    return {
      emotionalState: "weary, discouraged, and emotionally heavy",
      deeperMeaning:
        "You may not only need an answer. You may need strength to keep moving.",
      searchLanes: ["hope", "strength", "healing", "encouragement"],
      headline: "This may speak to you",
      insight:
        "Wisdom meets discouragement by reminding you that a low moment is not the same thing as a final outcome. You may be tired, but you are not finished.",
      reflection:
        "What burden are you carrying today that wisdom is asking you to release or face differently?",
      nextStep:
        "Pause, breathe, and do the next right thing without demanding that you feel strong first.",
    };
  }

  if (
    includesAny(q, [
      "purpose",
      "calling",
      "why am i here",
      "what am i here for",
      "meaning",
      "lost in life",
      "direction in life",
    ])
  ) {
    return {
      emotionalState: "searching, uncertain, and hungry for meaning",
      deeperMeaning:
        "You may not only be asking what to do. You may be asking who you are becoming.",
      searchLanes: ["purpose", "direction", "identity", "wisdom"],
      headline: "This may speak to you",
      insight:
        "Wisdom often reveals purpose through obedience, character, and the next faithful step—not always through a full map. Clarity usually grows as you walk.",
      reflection:
        "What responsibility, gift, or burden keeps returning to your heart?",
      nextStep:
        "Write down one small action that aligns with the person you believe God is shaping you to become.",
    };
  }

  if (
    includesAny(q, [
      "need direction",
      "need guidance",
      "what should i do",
      "decision",
      "decide",
      "confused",
      "clarity",
      "lost",
      "next step",
    ])
  ) {
    return {
      emotionalState: "uncertain and looking for clarity",
      deeperMeaning:
        "You may not only need options. You may need wisdom to choose the right path.",
      searchLanes: ["direction", "wisdom", "discernment", "counsel"],
      headline: "This may speak to you",
      insight:
        "Wisdom does not always give every detail at once. It often begins by separating fear, pressure, and pride from what is true.",
      reflection:
        "Which choice gives you peace because it is right, not merely because it is easy?",
      nextStep:
        "Name the decision clearly, remove the noise around it, and seek the wisest next step—not the perfect final answer.",
    };
  }

  if (
    includesAny(q, [
      "hope",
      "need hope",
      "hopeless",
      "no hope",
      "future",
      "will it get better",
      "keep going",
      "better days",
    ])
  ) {
    return {
      emotionalState: "longing for hope and reassurance",
      deeperMeaning:
        "You may be asking whether your future can still be good.",
      searchLanes: ["hope", "future", "strength", "healing"],
      headline: "This may speak to you",
      insight:
        "Wisdom does not deny hardship, but it refuses to let hardship have the final word. Hope begins when you stop treating today’s pain as tomorrow’s prophecy.",
      reflection:
        "What would change if you believed this season was not the end of your story?",
      nextStep:
        "Choose one life-giving action today that agrees with hope instead of despair.",
    };
  }

  if (
    includesAny(q, [
      "identity",
      "who am i",
      "self worth",
      "worthless",
      "not enough",
      "invisible",
      "rejected",
      "overlooked",
      "unwanted",
    ])
  ) {
    return {
      emotionalState: "questioning your worth and identity",
      deeperMeaning:
        "You may not only be asking for confidence. You may be asking whether you still matter.",
      searchLanes: ["identity", "confidence", "healing", "purpose"],
      headline: "This may speak to you",
      insight:
        "Wisdom reminds you that your value is not created by applause, attention, or approval. Being overlooked by people does not mean you are unseen by God.",
      reflection:
        "Where have you allowed someone else’s response to define your worth?",
      nextStep:
        "Act today from dignity, not desperation. Let your next move agree with who you are becoming.",
    };
  }

  if (
    includesAny(q, [
      "waiting",
      "still waiting",
      "taking too long",
      "not making progress",
      "stuck",
      "delayed",
      "slow",
      "nothing is happening",
    ])
  ) {
    return {
      emotionalState: "restless, delayed, and frustrated with slow progress",
      deeperMeaning:
        "You may be asking whether waiting means nothing is happening.",
      searchLanes: ["progress", "patience", "diligence", "hope"],
      headline: "This may speak to you",
      insight:
        "Wisdom treats waiting as preparation, not punishment. Some growth is hidden before it becomes visible.",
      reflection:
        "What is this waiting season forming in you that speed could not?",
      nextStep:
        "Do the faithful work that is in your hands today, even if the outcome is not visible yet.",
    };
  }

  return {
    emotionalState: "seeking wisdom for the moment",
    deeperMeaning:
      "You may be asking for more than information. You may be looking for a wiser way to see what you are facing.",
    searchLanes: ["wisdom", "direction", "strength", "hope"],
    headline: "This may speak to you",
    insight:
      "Wisdom starts by slowing the moment down, naming what is really happening, and choosing the next right step with a steady heart.",
    reflection:
      "What is the deeper issue underneath the question you typed?",
    nextStep:
      "Take one honest step toward wisdom today, even if the whole path is not clear yet.",
  };
}
