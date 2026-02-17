"use client";

import { useMemo, useState } from "react";

type Verse = {
  ref: string;
  text: string;
  tags: Array<"encouragement" | "finances" | "wisdom">;
};

const VERSES: Verse[] = [
  {
    ref: "Proverbs 3:5–6",
    text:
      "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways acknowledge Him, and He will make your paths straight.",
    tags: ["encouragement"],
  },
  {
    ref: "Proverbs 18:10",
    text:
      "The name of the LORD is a strong tower; the righteous run to it and are safe.",
    tags: ["encouragement"],
  },
  {
    ref: "Proverbs 16:24",
    text:
      "Gracious words are a honeycomb, sweet to the soul and healing to the bones.",
    tags: ["encouragement"],
  },
  {
    ref: "Proverbs 12:25",
    text:
      "Anxiety weighs down the heart, but a kind word cheers it up.",
    tags: ["encouragement"],
  },
  {
    ref: "Proverbs 4:23",
    text:
      "Above all else, guard your heart, for everything you do flows from it.",
    tags: ["encouragement"],
  },

  {
    ref: "Proverbs 21:5",
    text:
      "The plans of the diligent lead surely to profit, but everyone who is hasty comes only to poverty.",
    tags: ["finances"],
  },
  {
    ref: "Proverbs 10:4",
    text:
      "Lazy hands make for poverty, but diligent hands bring wealth.",
    tags: ["finances"],
  },

  {
    ref: "Proverbs 15:1",
    text:
      "A gentle answer turns away wrath, but a harsh word stirs up anger.",
    tags: ["wisdom"],
  },
];
