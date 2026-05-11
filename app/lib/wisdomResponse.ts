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
                          "Success Secrets of Solomon — Chapter on Confidence (p. 80) and Discipline (p. 54)",
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
                "tired",
                "weary",
                "heavy",
                "exhausted",
                "drained",
                "running on empty",
                "can't keep going",
                "done trying",
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
                          "Success Secrets of Solomon — Chapter on Diligence (p. 72) and Patience (p. 140)",
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
              ])
      ) {
        return {
                emotionalState: "searching, uncertain, and hungry for meaning",
                deeperMeaning:
                          "You are not only asking what to do next. You are asking who you are becoming — and whether your life is adding up to something.",
                searchLanes: ["purpose", "direction", "identity", "wisdom"],
                headline: "Wisdom speaks to purpose",
                insight:
                          "Wisdom rarely gives you a full map. It usually gives you the next faithful step. Purpose is not discovered all at once — it is built through obedience, character, and showing up. Clarity grows as you walk.",
                reflection:
                          "What responsibility, gift, or burden keeps returning to your heart no matter how many times you push it away?",
                nextStep:
                          "Write down one small action that aligns with the person you believe God is shaping you to become.",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Purpose (p. 146) and Wisdom (p. 1)",
        };
  }

  // --- NEED DIRECTION / DECISION / CONFUSED ---
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
                "which way",
                "don't know what to do",
                "stuck on a decision",
                "crossroads",
              ])
      ) {
        return {
                emotionalState: "uncertain and looking for clarity on your next move",
                deeperMeaning:
                          "You may not only need options. You may need the kind of wisdom that cuts through noise and pressure so you can see clearly.",
                searchLanes: ["direction", "wisdom", "discernment", "counsel"],
                headline: "Wisdom is a better guide than pressure",
                insight:
                          "Wisdom does not always give every detail at once. It often begins by separating fear from truth, and noise from what actually matters. The right path usually comes with a quiet kind of peace — not the loudest voice in the room.",
                reflection:
                          "Which choice gives you peace because it is right — not merely because it is easy or popular?",
                nextStep:
                          "Name the decision clearly. Remove the emotional noise around it. Then ask: what is the wisest next step — not the perfect one?",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Decision Making (p. 60) and Seeking Counsel (p. 42)",
        };
  }

  // --- HOPE / WILL IT GET BETTER ---
  if (
        includesAny(q, [
                "need hope",
                "hopeless",
                "no hope",
                "future",
                "will it get better",
                "keep going",
                "better days",
                "is there hope",
                "can things change",
                "i don't see a way out",
                "things will never change",
              ])
      ) {
        return {
                emotionalState: "longing for hope and reassurance that your future is still good",
                deeperMeaning:
                          "You are asking whether your future can still be good — or whether this season is the whole story.",
                searchLanes: ["hope", "future", "strength", "healing"],
                headline: "Your story is not over",
                insight:
                          "Wisdom does not deny hardship — it refuses to let hardship have the final word. Hope is not a feeling you wait for. It is a decision you make to keep sowing, even when harvest feels far away.",
                reflection:
                          "What would change if you truly believed this season was not the end of your story?",
                nextStep:
                          "Choose one life-giving action today that agrees with hope — something small that points your feet forward.",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Purpose (p. 146) and Character (p. 162)",
        };
  }

  // --- IDENTITY / WORTH / REJECTED / OVERLOOKED ---
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
                "don't matter",
                "nobody sees me",
                "feel like a failure",
                "i'm a failure",
                "insignificant",
              ])
      ) {
        return {
                emotionalState: "questioning your worth, identity, and whether you matter",
                deeperMeaning:
                          "You may not only be asking for confidence. You may be asking whether you still have value after being passed over, let down, or unseen.",
                searchLanes: ["identity", "confidence", "healing", "purpose"],
                headline: "Your value is not determined by their response",
                insight:
                          "Wisdom says your worth is not created by applause, approval, or attention. Being overlooked by people does not mean you have been overlooked by God. Your value is established — it does not need to be earned again.",
                reflection:
                          "Where have you allowed someone else's response to define your worth?",
                nextStep:
                          "Act today from dignity, not desperation. Let your next move agree with who you are becoming — not who someone decided you were.",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Confidence (p. 80) and Reputation (p. 166)",
        };
  }

  // --- WAITING / STUCK / SLOW PROGRESS ---
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
                "nothing is changing",
                "when will things change",
                "feels like forever",
                "been waiting so long",
              ])
      ) {
        return {
                emotionalState: "restless, delayed, and frustrated that things are not moving",
                deeperMeaning:
                          "You are asking whether waiting means nothing is happening — or whether you have been forgotten.",
                searchLanes: ["progress", "patience", "diligence", "hope"],
                headline: "Waiting is not wasted time",
                insight:
                          "Wisdom treats waiting as preparation, not punishment. Some of the most important growth is invisible before it becomes visible. The tree forms roots long before it produces fruit. You are not behind — you may be in the most important part of the process.",
                reflection:
                          "What is this season forming in you that speed or shortcuts could not?",
                nextStep:
                          "Do the faithful work that is in your hands today — even if the outcome is not visible yet.",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Patience (p. 140) and Diligence (p. 72)",
        };
  }

  // --- ANGER / FRUSTRATION ---
  if (
        includesAny(q, [
                "angry",
                "anger",
                "furious",
                "frustrated",
                "fed up",
                "mad",
                "rage",
                "irritated",
                "can't control my anger",
                "losing my temper",
                "so angry",
                "i'm so mad",
              ])
      ) {
        return {
                emotionalState: "angry, frustrated, and fighting to hold it together",
                deeperMeaning:
                          "Anger is rarely just about the surface issue. Underneath it is usually a wound, an unmet expectation, or something important that feels threatened.",
                searchLanes: ["anger", "self-control", "peace", "wisdom"],
                headline: "Wisdom speaks directly to anger",
                insight:
                          "Wisdom does not tell you that your anger is wrong — it asks you what your anger is protecting. A slow response and a soft word have more power to change a situation than a fast reaction ever will. You cannot control what others do, but you can control what you do next.",
                reflection:
                          "What is your anger really protecting — and is the way you are expressing it getting you closer to what you actually want?",
                nextStep:
                          "Before responding, take thirty seconds. Ask yourself: what is the wisest response, not the fastest one?",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Managing Anger (p. 126) and Power of Words (p. 120)",
        };
  }

  // --- ANXIETY / FEAR / WORRY ---
  if (
        includesAny(q, [
                "anxiety",
                "anxious",
                "afraid",
                "fear",
                "scared",
                "worried",
                "worry",
                "panic",
                "overwhelming fear",
                "can't stop worrying",
                "what if",
                "terrified",
                "nervous",
              ])
      ) {
        return {
                emotionalState: "anxious, afraid, and fighting worry about what might happen",
                deeperMeaning:
                          "Fear often lives in the gap between what you know and what you cannot control. Anxiety is not weakness — it is a signal that something matters deeply to you.",
                searchLanes: ["fear", "peace", "trust", "strength"],
                headline: "Wisdom meets fear with steadiness",
                insight:
                          "Wisdom does not promise that nothing will go wrong. It promises that you do not have to face it alone, and that a steady mind is more powerful than a frightened one. Peace is not the absence of trouble — it is the presence of wisdom in the middle of it.",
                reflection:
                          "What specifically are you most afraid of — and what would it look like to act wisely in spite of it?",
                nextStep:
                          "Name the fear clearly. Then ask: what is the one next step I can take that is wise, regardless of the outcome?",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Overcoming Fear (p. 77) and Confidence (p. 80)",
        };
  }

  // --- MONEY / FINANCIAL STRESS ---
  if (
        includesAny(q, [
                "money",
                "bills",
                "debt",
                "financial",
                "broke",
                "can't pay",
                "struggling financially",
                "not enough money",
                "money stress",
                "financial pressure",
                "behind on bills",
                "in debt",
              ])
      ) {
        return {
                emotionalState: "stressed, pressured, and anxious about money",
                deeperMeaning:
                          "Financial pressure does not stay in your bank account — it bleeds into your relationships, your sleep, and your sense of worth. This is real, and wisdom takes it seriously.",
                searchLanes: ["money", "discipline", "wisdom", "stewardship"],
                headline: "Wisdom has a lot to say about money",
                insight:
                          "Wisdom does not ignore financial reality. It addresses it with discipline, clear thinking, and long-term perspective. The way out of financial pressure is almost never one big move — it is usually a series of disciplined small ones, made with a clear head instead of a panicked one.",
                reflection:
                          "Where is fear driving your financial decisions instead of wisdom?",
                nextStep:
                          "Write down your actual situation clearly — without exaggerating or minimizing. Clarity is the first tool wisdom uses.",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Money & Wealth (p. 88) and Stewardship (p. 92)",
        };
  }

  // --- RELATIONSHIP CONFLICT ---
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
              ])
      ) {
        return {
                emotionalState: "hurt, frustrated, or drained by a difficult relationship",
                deeperMeaning:
                          "Relationship pain cuts deeply because connection matters deeply. Whether it is conflict, betrayal, or just a hard person — wisdom gives you tools that force does not.",
                searchLanes: ["relationships", "speech", "wisdom", "peace"],
                headline: "Wisdom gives you power in conflict",
                insight:
                          "You cannot control the other person. But wisdom gives you something more powerful — the ability to control your own words, your own response, and your own next move. A soft answer, well-timed, can do what an argument never could.",
                reflection:
                          "In this relationship, are you responding to what is actually happening — or to what you fear might happen?",
                nextStep:
                          "Choose the wisest response, not the most satisfying one. They are rarely the same thing.",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Relationships (p. 130) and Conflict Resolution (p. 138)",
        };
  }

  // --- LONELINESS / ISOLATION ---
  if (
        includesAny(q, [
                "lonely",
                "alone",
                "isolated",
                "no one understands",
                "nobody cares",
                "feel invisible",
                "no real friends",
                "left out",
                "abandoned",
                "by myself",
                "no community",
              ])
      ) {
        return {
                emotionalState: "lonely, unseen, and longing for real connection",
                deeperMeaning:
                          "Loneliness is not just a social problem — it is a spiritual one. You were not designed to carry your life alone. The ache you feel is pointing you toward something real.",
                searchLanes: ["loneliness", "friendship", "encouragement", "community"],
                headline: "You were not meant to do this alone",
                insight:
                          "Wisdom values loyal friendship as one of the highest goods. The people near you shape your future. You may need to be the one who reaches — but reaching is not weakness. It is wisdom.",
                reflection:
                          "Is there one person in your life who could be a safe, steady presence — and have you actually let them in?",
                nextStep:
                          "Reach out to one person this week — not with a long explanation, just a genuine connection. Start there.",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Friendship (p. 134) and Mentorship (p. 158)",
        };
  }

  // --- WORKPLACE / BOSS / COWORKER ---
  if (
        includesAny(q, [
                "boss",
                "coworker",
                "manager",
                "work environment",
                "toxic workplace",
                "job",
                "fired",
                "laid off",
                "work stress",
                "difficult boss",
                "unfair at work",
                "workplace",
              ])
      ) {
        return {
                emotionalState: "frustrated, undervalued, or stressed in your work environment",
                deeperMeaning:
                          "Work is where wisdom gets tested most practically. How you respond to unfair, difficult, or toxic situations at work reveals — and builds — your actual character.",
                searchLanes: ["work", "wisdom", "self-control", "leadership"],
                headline: "Wisdom gives you an edge at work",
                insight:
                          "You may not be able to change your environment immediately. But you can control your response, your reputation, and the quality of your work. Wisdom says that consistent excellence and measured speech are more powerful over time than any reaction you could make today.",
                reflection:
                          "What response in this situation would you be proud of in six months — regardless of what the other person does?",
                nextStep:
                          "Focus on what is in your control: your work quality, your words, and your character. Those are the things no one can take from you.",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Work Ethic (p. 96) and Leadership (p. 42)",
        };
  }

  // --- CONFIDENCE / INSECURITY ---
  if (
        includesAny(q, [
                "confidence",
                "insecure",
                "self doubt",
                "don't believe in myself",
                "not confident",
                "feel weak",
                "low self esteem",
                "don't feel good enough",
                "imposter",
                "second-guessing myself",
              ])
      ) {
        return {
                emotionalState: "struggling with confidence and doubting yourself",
                deeperMeaning:
                          "Self-doubt is not the same as humility. True confidence is not arrogance — it is doing the right thing with your shoulders back, even when you are unsure of the outcome.",
                searchLanes: ["confidence", "identity", "strength", "wisdom"],
                headline: "Wisdom-based confidence does not depend on feelings",
                insight:
                          "Confidence that comes from wisdom is different from confidence that comes from hype. It is quieter, steadier, and harder to shake. You do not need to feel confident before you act wisely — you just need to act wisely. The confidence follows.",
                reflection:
                          "Where are you waiting to feel ready before you move — and what would it look like to move wisely anyway?",
                nextStep:
                          "Do one thing today that requires courage — not perfection. Start moving and let the confidence grow as you go.",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Confidence (p. 80) and Character (p. 162)",
        };
  }

  // --- GRIEF / LOSS ---
  if (
        includesAny(q, [
                "grief",
                "grieving",
                "loss",
                "lost someone",
                "someone died",
                "death",
                "mourning",
                "heartbroken",
                "heartbreak",
                "broken heart",
                "can't get over it",
                "still hurting",
              ])
      ) {
        return {
                emotionalState: "grieving, heartbroken, and carrying real pain",
                deeperMeaning:
                          "Grief is not a problem to be solved — it is love with nowhere to go. Wisdom does not rush you through it. It walks with you inside it.",
                searchLanes: ["healing", "comfort", "hope", "strength"],
                headline: "Wisdom does not dismiss your pain",
                insight:
                          "A crushed spirit is real, and it must be handled with tenderness. You do not have to perform strength right now. Wisdom makes room for honest pain — and it also holds a quiet promise that healing is still possible, even when it feels far away.",
                reflection:
                          "What do you need most right now — permission to grieve, or the courage to take one small step toward healing?",
                nextStep:
                          "Give yourself grace today. Let one trusted person in. You were not designed to carry this alone.",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Character (p. 162) and Patience (p. 140)",
        };
  }

  // --- PRIDE / HUMILITY / FAILURE ---
  if (
        includesAny(q, [
                "failure",
                "failed",
                "i failed",
                "made a mistake",
                "bad decision",
                "messed up",
                "regret",
                "ashamed",
                "embarrassed",
                "too proud",
                "humbled",
                "knocked down",
              ])
      ) {
        return {
                emotionalState: "dealing with failure, regret, or a hard lesson",
                deeperMeaning:
                          "Failure is one of wisdom's most effective teachers — but only if you let it teach you instead of define you. The question is not whether you fell. It is what you do next.",
                searchLanes: ["humility", "resilience", "wisdom", "direction"],
                headline: "Falling is not the end — staying down is",
                insight:
                          "Wisdom does not say you will never fall. It says you can rise again. The person who learns from a hard fall and moves forward with greater wisdom is stronger than someone who never fell at all. Shame wants to keep you down. Wisdom says get up.",
                reflection:
                          "What is the one honest lesson this failure or mistake is trying to teach you?",
                nextStep:
                          "Acknowledge what happened clearly, without excuses. Then ask: what does wisdom say I should do next?",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Pride vs Humility (p. 106) and Character (p. 162)",
        };
  }

  // --- SUCCESS / GOALS / AMBITION ---
  if (
        includesAny(q, [
                "success",
                "goals",
                "achieve",
                "how do i succeed",
                "want to be successful",
                "build something",
                "make it",
                "ambition",
                "reach my goals",
                "level up",
                "get to the next level",
              ])
      ) {
        return {
                emotionalState: "motivated, ambitious, and ready to build something",
                deeperMeaning:
                          "Ambition is not wrong — it is powerful. The question wisdom asks is whether your ambition is rooted in character, or just in achievement.",
                searchLanes: ["success", "discipline", "wisdom", "diligence"],
                headline: "Wisdom-built success lasts",
                insight:
                          "Most lasting success is not dramatic. It comes through repeated discipline, small consistent choices, and the kind of integrity that protects what you build. Wisdom says: do not chase success — build the person who success naturally follows.",
                reflection:
                          "Are you building success, or building the character that produces it? There is a difference.",
                nextStep:
                          "Identify the one habit or discipline that, if you practiced it consistently for six months, would change your trajectory.",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Success Principles (p. 170) and Discipline (p. 54)",
        };
  }

  // --- LEADERSHIP / INFLUENCE ---
  if (
        includesAny(q, [
                "leadership",
                "lead",
                "leading",
                "influence",
                "how to lead",
                "become a leader",
                "my team",
                "managing people",
                "lead well",
                "earn respect",
              ])
      ) {
        return {
                emotionalState: "stepping into leadership and looking for wisdom on how to lead well",
                deeperMeaning:
                          "Leadership is not about title or authority. It is about influence — and influence is built on character, wisdom, and the trust you earn over time.",
                searchLanes: ["leadership", "wisdom", "integrity", "counsel"],
                headline: "True leadership starts within",
                insight:
                          "Wisdom says that the leader who seeks counsel, speaks carefully, and acts with integrity will outlast and outperform the one who leads by force or volume. You lead best when you lead yourself first.",
                reflection:
                          "Are the people you lead growing because of your leadership — or just complying because of your position?",
                nextStep:
                          "Identify one area where your leadership needs to grow — then seek one wise voice who can speak honestly into it.",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Leadership (p. 42) and Influence (p. 154)",
        };
  }

  // --- OVERWHELMED / TOO MUCH ---
  if (
        includesAny(q, [
                "overwhelmed",
                "too much",
                "too many things",
                "can't handle it",
                "spinning plates",
                "drowning",
                "buried",
                "pressure is too much",
                "stretched too thin",
                "no margin",
              ])
      ) {
        return {
                emotionalState: "overwhelmed, stretched too thin, and carrying more than you can hold",
                deeperMeaning:
                          "Overwhelm often comes from carrying too much mentally without releasing pressure — and sometimes from saying yes to too many things without discernment.",
                searchLanes: ["peace", "wisdom", "discipline", "strength"],
                headline: "Wisdom brings order to chaos",
                insight:
                          "You cannot do everything well at once. Wisdom requires ruthless clarity about what actually matters. Peace is not the absence of activity — it is the presence of order. You may need to eliminate before you can accelerate.",
                reflection:
                          "What are you carrying right now that wisdom would tell you to put down or delegate?",
                nextStep:
                          "Write down everything you are carrying. Circle the three that matter most. Let wisdom guide what happens to the rest.",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Focus (p. 144) and Planning (p. 102)",
        };
  }

  // --- FORGIVENESS / BITTERNESS ---
  if (
        includesAny(q, [
                "forgiveness",
                "forgive",
                "can't forgive",
                "bitterness",
                "bitter",
                "resentment",
                "holding a grudge",
                "still angry at them",
                "hurt by",
                "they hurt me",
                "won't let it go",
              ])
      ) {
        return {
                emotionalState: "struggling with bitterness, hurt, or the cost of forgiveness",
                deeperMeaning:
                          "Unforgiveness feels like power, but it works against the person holding it. Wisdom does not ask you to excuse what was done — it asks you to choose freedom over bitterness.",
                searchLanes: ["forgiveness", "healing", "peace", "wisdom"],
                headline: "Forgiveness is a wisdom issue, not just an emotional one",
                insight:
                          "Bitterness is a weight that only you carry. The other person may have moved on completely — while you are still paying the price. Wisdom says: release this, not for their sake, but for yours. Forgiveness does not mean trust is restored. It means you are no longer anchored to what they did.",
                reflection:
                          "What would your life look and feel like if you were no longer carrying the weight of this?",
                nextStep:
                          "Name the offense honestly. Then make a decision — not a feeling — to release it. Feelings follow decisions over time.",
                bookConnection:
                          "Success Secrets of Solomon — Chapter on Conflict Resolution (p. 138) and Character (p. 162)",
        };
  }

  // --- DEFAULT / GENERAL WISDOM ---
  return {
        emotionalState: "seeking wisdom for what you are facing right now",
        deeperMeaning:
                "You may be asking for more than information. You may be looking for a wiser way to see what you are going through.",
        searchLanes: ["wisdom", "direction", "strength", "hope"],
        headline: "Wisdom meets you where you are",
        insight:
                "Whatever you are facing, wisdom starts by slowing the moment down, naming what is really happening, and choosing the next right action — not the fastest, not the easiest, but the wisest.",
        reflection:
                "What is the deeper issue underneath the question you just typed?",
        nextStep:
                "Take one honest step toward wisdom today, even if the whole path is not clear yet.",
        bookConnection:
                "Success Secrets of Solomon — Chapter on Wisdom (p. 1)",
  };
}
