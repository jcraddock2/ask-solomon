// app/lib/proverbs/index.ts

import { CORE_PROVERBS } from "./core";
import { PROVERBS_1_9 } from "./proverbs_1_9";
import type { ProverbEntry } from "./shared";

export const PROVERBS: ProverbEntry[] = [
  ...CORE_PROVERBS,
  ...PROVERBS_1_9,
];
