export function getWisdomForMoment(query: string) {
  const q = query.toLowerCase();

  if (q.includes("behind") || q.includes("falling behind")) {
    return {
      insight: "You feel like you’re falling behind and unsure of your direction.",
      guidance: "This is a moment to refocus your path, not measure your worth by pace."
    };
  }

  if (q.includes("confused") || q.includes("direction")) {
    return {
      insight: "You’re trying to figure out the right move and need clarity.",
      guidance: "This is a moment to move with wisdom, not pressure."
    };
  }

  if (q.includes("stuck") || q.includes("discouraged")) {
    return {
      insight: "You’re feeling stuck and struggling to move forward.",
      guidance: "This is a moment to take one clear step, not stay in frustration."
    };
  }

  if (q.includes("money") || q.includes("bills")) {
    return {
      insight: "The pressure around money is weighing on you.",
      guidance: "This is a moment to act with discipline and clarity, not fear."
    };
  }

  if (q.includes("confidence") || q.includes("insecure")) {
    return {
      insight: "You’re wrestling with confidence and how you see yourself.",
      guidance: "This is a moment to stand firm, not shrink back."
    };
  }

  if (q.includes("tired") || q.includes("burned out") || q.includes("exhausted")) {
    return {
      insight: "You’ve been carrying a lot and it’s starting to wear on you.",
      guidance: "This is a moment to recover strength and move wisely, not just push harder."
    };
  }

  return {
    insight: "You’re looking for wisdom for what you’re facing right now.",
    guidance: "Take a steady step forward with clarity and purpose."
  };
}
