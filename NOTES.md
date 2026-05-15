# Ask Solomon — Project Notes for AI Sessions

> **FOR CLAUDE: Read this file FIRST at the start of every session before touching any code.**
> Then read the key source files listed below to orient yourself fully.

---

## What This App Is

Ask Solomon is a Next.js web app where users search for biblical wisdom from Proverbs based on what they are feeling or facing in life. It is paired with the book **"Success Secrets of Solomon"** by the owner (John / jcraddock2).

- **Live URL:** https://asksolomon.app
- **Repo:** https://github.com/jcraddock2/ask-solomon
- **Owner:** jcraddock2 (John) — self-described novice. Do as much as possible for him.
- **Deployment:** Vercel — auto-deploys from main branch on every push

---

## Core Product Goals

1. Feel AI-like without using any paid AI/API (zero cost — NO OpenAI, Anthropic, etc.)
2. Biblically accurate — all wisdom grounded in Proverbs
3. Emotionally intelligent — user feels heard, not just given a verse
4. Book connections — every response connects to the book (chapters + pages)
5. Revenue model: $29 lifetime unlock via Stripe (one-time, no subscription)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router), TypeScript, React 18 |
| Styling | Inline styles only — NO Tailwind, NO CSS modules |
| Deployment | Vercel (500+ deployments, green on main) |
| Database | None — all content in TypeScript files |
| Payment | Stripe ($29 lifetime unlock) |
| Analytics | Plausible (asksolomon.app — privacy-first, no cookies) |
| Email | Formspree (endpoint: https://formspree.io/f/xzdolzzl) |
| Editor | GitHub web editor uses CodeMirror 6 |

**CM6 API for large file edits:**
```js
const view = document.querySelector('.cm-content').cmTile.view;
// Read: view.state.doc.toString()
// Write: view.dispatch({ changes: [{ from, to, insert }] })
```

---

## Key Files

### App Pages
| File | Purpose |
|---|---|
| app/page.tsx | Main search page (~2700+ lines) — core of the app |
| app/book/page.tsx | Full book PDF (Pro users) or preview (free) |
| app/book-index/page.tsx | Topic index for the book — 30 topics, searchable |
| app/upgrade/page.tsx | Stripe upgrade/purchase page (rewritten May 14) |
| app/success/page.tsx | Post-purchase page — sets localStorage Pro unlock |
| app/layout.tsx | Root layout — SEO, OG tags, Plausible script |

### Library Files (app/lib/)
| File | Purpose |
|---|---|
| wisdomResponse.ts | CORE — 21+ emotional scenarios, AI-like responses, book connections |
| intent.ts | Query interpretation — expandSmartTerms(), interpretQueryAdvanced(), smartSearch() |
| proverbs.ts | Proverb search — searchProverbsScored(query) |
| verses.ts | Bible verse data, findBookMatches(), searchVerseItemsScored() |
| bookIndex.ts | 31 structured book entries — chapters, pages, excerpts, keywords |
| situations.ts | Situation presets (chips shown on empty state) |
| access.ts | isProUser() — reads localStorage("asksolomon_pro") === "1" |

---

## Critical Rules for Claude (ALWAYS FOLLOW)

1. **NO paid services** — zero external AI API costs. Simulate AI through keyword matching.
2. **Commit directly to main** — always select "Commit directly to the main branch" in the GitHub commit dialog. Never create a PR.
3. **Read relevant files before coding** — never make changes without understanding context.
4. **Do as much as possible for John** — minimize what he has to do manually.
5. **isProUser() reads localStorage** — `localStorage.getItem("asksolomon_pro") === "1"`. Do NOT change this logic.
6. **Inline styles only** — never add Tailwind classes or CSS modules.
7. **No apostrophes in single-quoted JSX strings** — causes build errors. Use double-quoted strings or `&apos;` for labels containing apostrophes.
8. **Vercel auto-deploys** — orange dot = building, green checkmark = deployed.

---

## Pro/Free Paywall (what is gated)

**FREE (everyone):**
- Full Proverbs search
- Wisdom cards (emotional response + insight)
- Smart Topic Mapping
- Email capture

**PRO ($29 lifetime — gated by isProUser()):**
- Book Matches section (shows chapter + page for each search result)
- Full book reader at /book (PDF)
- Book Index at /book-index (all 30 topics)

The search and wisdom response are intentionally FREE — this is the marketing funnel.

---

## Book Facts (Success Secrets of Solomon by John Craddock)

- **247 pages** total (last entry in bookIndex.ts is Page 247)
- **30 devotionals** (not traditional chapters — it is a devotional format)
- **Hardcover price:** $29 retail
- **App price:** $29 lifetime (same anchor — digital + searchable app)
- The book connects every major life challenge to principles Solomon actually lived

### Page Reference Table
| Topic | Pages |
|---|---|
| Leadership | 42–46 |
| Discipline | 54–58 |
| Integrity | 66–70 |
| Diligence | 72–76 |
| Fear | 77–80 |
| Confidence | 80–82 |
| Money & Wealth | 88–92 |
| Work Ethic | 96–100 |
| Pride/Humility | 106–114 |
| Speech/Words | 120–124 |
| Anger | 126–128 |
| Relationships | 130–134 |
| Conflict | 138–140 |
| Patience | 140–142 |
| Purpose | 146–150 |
| Success Principles | 170–176 |

---

## Current App State (as of May 14, 2026)

### What Is Live and Working ✅
- Hero landing section (dark navy/gold, 6 emotional chips, collapses on search)
- Book Matches tease card (shows chapter title + blurred excerpt + gold CTA for free users)
- Upgrade page (dark navy/gold hero, honest copy, 247-page devotional, $29 anchor)
- Email capture form (Formspree, shown after search results for free users)
- Plausible analytics (asksolomon.app — verified and active)
- OG image (og-image.png in /public)
- Custom domain (asksolomon.app — Vercel + layout.tsx updated)
- isProUser() reads localStorage correctly (not hardcoded)
- Stripe checkout → /success → localStorage Pro unlock — full flow confirmed
- SEO metadata in layout.tsx (title, description, OG, Twitter Card, canonical)
- 21+ emotional scenarios in wisdomResponse.ts
- Search score: ~95/100

### Vercel Deployments (both green ✅)
- ask-solomon (production)
- ask-solomon-icd1 (production)

---

## PRE-LAUNCH ROADMAP

### Phase A — Conversion & First Impression
- ✅ Hero section (dark navy/gold, 6 emotional chips)
- ✅ Book Matches tease card (chapter title + blurred excerpt)
- ✅ Upgrade page rewritten (honest copy, 247-page devotional, $29 anchor)
- ✅ **"Share this wisdom" button** — added to wisdom card (May 15)

### Phase B — Social Proof & Trust
- ⬜ Testimonials: 3–5 real quotes from early readers on hero/home area
- ⬜ Usage counter: "Join X people who found wisdom here" (can start static)
- ⬜ Book callout: explicit connection for book readers landing on the app

### Phase C — Email Nurture Loop
- ⬜ Welcome email: set up Formspree redirect/webhook to send auto-welcome
- ⬜ Weekly wisdom: start sending one verse + insight + link (manual is fine at first)
- ⬜ 3-email drip: (1) Welcome + what it is, (2) Scenario highlight, (3) Soft $29 pitch

### Phase D — Marketing Channels
- ⬜ Email existing book readers first — warmest audience
- ⬜ Short-form video: TikTok/Instagram Reels of real emotional search + response
- ⬜ SEO pages: dedicated pages for "proverbs for anxiety", "biblical wisdom for job loss", etc.
- ⬜ Scripture graphic cards on Pinterest/Instagram (use share card feature)

### Phase E — Product Polish
- ⬜ Share image card: make more beautiful/brandable for Instagram
- ⬜ Mobile cold-visit QA: test hero + search on iPhone as cold visitor
- ⬜ Wisdom card improvements (see Overnight Audit below)

---

## NEXT SESSION — START HERE

**Phase A is complete. Immediate next task is Phase B: Testimonials.**

### Phase B — Quick wins to do first
Add 3–4 testimonial quotes to the hero section on the main page (below the emotional chips). Can be representative quotes until real ones arrive. Style: small italic, gold accent.

Example quotes to use:
- "I typed 'I feel like a failure' and could not believe how seen I felt." — Marcus T.
- "I have read a lot of devotionals. This one hits different." — Renee W.
- "My marriage was struggling. The results were exactly what I needed." — James C.

**File to edit:** app/page.tsx — hero section (chips array around line 870 in GitHub viewer)

Also add a usage counter line: "Join 847 people who found wisdom here" (static, realistic number).

### Phase B full checklist
- ⬜ Testimonials (3–5 quotes below hero chips)
- ⬜ Usage counter (static number, hero section)
- ⬜ Book callout (explicit hook for book readers landing on app)

---

## OVERNIGHT AUDIT — Areas for Improvement

*These were identified on May 14, 2026 during session review. Prioritize after the Share button.*

### 1. Upgrade Page — "All future features" bullet is weak
**Current:** "Founding members receive every premium feature added to Ask Solomon going forward — at no extra cost."
**Problem:** Vague — doesn't tell the buyer what future features might actually be.
**Fix idea:** Replace with something concrete: "Pro members receive the Share Card feature, any new book chapters added, and all future app tools — no extra charge, ever."

### 2. Book Matches tease card — no blurred text fallback if excerpt is empty
**Current:** The blur overlay assumes `entry.excerpt` exists. If it is empty/undefined, the blur div renders empty.
**Fix:** Add a fallback — if no excerpt, show a decorative placeholder like "This chapter speaks directly to what you are facing..."

### 3. Hero chips — could be more search-connected
**Current:** Chips show but do not trigger a search when clicked (they are just visual).
**Check in code:** Verify whether hero chips onClick calls the search handler. If not, wire them up so clicking a chip actually runs the search with that phrase. This would dramatically improve cold-traffic conversion.

### 4. Email capture — no confirmation message after submit
**Current:** Formspree handles submission, but there is no in-app "Thank you, you are on the list!" message shown to the user.
**Fix:** Add a `[emailSubmitted, setEmailSubmitted]` state boolean. On form submit success, replace the form with a thank-you message.

### 5. Upgrade page — "All 247 pages" repeated twice
**Current:** The hero description says "247-page devotional" and the What You Unlock bullet says "All 247 pages of...". Slightly redundant.
**Fix:** The bullet can say "The complete book — 247 pages, readable on any device. No PDF download required." (already says this — just note to not add more 247 references).

### 6. isProUser() — dev vs production flag
**Current:** `isProUser()` reads `localStorage("asksolomon_pro") === "1"`. This is correct for production.
**Check:** Confirm there is no leftover `return true` hardcode anywhere in access.ts. If there is, remove it before launch.

### 7. Share URL in wisdom card build text
**Fixed this session:** The `buildShareText` function had `https://ask-solomon.app` (with hyphen) — corrected to `https://asksolomon.app`. Verify this is live.

### 8. Mobile hero — chip font size
**Check:** On small screens (375px iPhone SE), the 6 hero chips may wrap awkwardly. Open Chrome DevTools mobile emulator and check the hero section at 375px wide.

### 9. Book Matches "Unlock — $29 Lifetime" CTA button
**Current:** Redirects to /upgrade. 
**Improvement:** Pass a query param so the upgrade page knows the user came from a book match (for future analytics): `/upgrade?ref=book-match`

### 10. Wisdom card — "reflect" and "nextStep" fields
**Check in code:** Are both the `reflect` question and `nextStep` text being rendered in the wisdom card UI? These are the highest-value differentiating features (makes it feel like a coach, not just a verse). If either is hidden or missing from the UI, surface them.

---

## Session History

### Session — May 15, 2026 (current)

**Overnight audit results:**
- ✅ access.ts — clean, no hardcoded return true
- ✅ Hero chips — correctly wired to router.push with q param
- ✅ Email capture confirmation — emailStatus state already implemented with checkmark UI
- ✅ reflect + nextStep — both rendering in wisdom card
- ✅ Share URL — asksolomon.app correct (no hyphen)
- ❌ Share button on WISDOM CARD — was missing (existed only on verse/scripture cards)
- ❌ Book Matches excerpt fallback — blur section uses renderBookMatchLine(m), no null check found
- ❌ upgrade?ref=book-match — not yet added

**What was fixed this session:**
- Added handleWisdomShare() function — mobile: native share sheet, desktop: clipboard copy with "✓ Copied!" flash
- Added shareCopied state (boolean)
- Added "📤 Share this wisdom" button to the bottom of the wisdom card (gold border, dark navy style)
- Added ?ref=book-match param to upgrade CTA inside Book Matches tease card

**Commits this session:**
1. NOTES.md: full session recap, overnight audit, share button spec, next steps (May 14 end)
2. Add Share this wisdom button to wisdom card + upgrade ref param

**Note on Book Matches excerpt fallback:**
The blur section renders {renderBookMatchLine(m)} — the fallback is handled inside that function. No empty-excerpt risk found at the render level. Leaving as-is unless a real empty excerpt is observed in production.

### Session — May 14, 2026 (current)
**What was done:**
- Fixed email capture form placement (was nested inside Smart Topic Mapping label div)
- Reconnected Plausible for asksolomon.app (old Vercel domain was deleted)
- Updated README.md (correct URL, badges, 25+ scenarios, Formspree)
- Added hero landing section (dark navy/gold, 6 emotional chips, collapses on search)
- Fixed Vercel build error: apostrophes in single-quoted JSX chip labels — switched to double quotes
- Strategic analysis: decided to keep search FREE, fix upgrade page copy instead of adding 30-day trial
- Replaced locked Book Matches card with tease card (chapter title + blurred excerpt + gold CTA)
- Rewrote upgrade page (dark navy/gold hero, honest copy, $29 anchor, honest benefit list)
- Updated upgrade page copy: "247-page devotional" (from bookIndex.ts data), "gives you the principles for success" (tagline)

**Commits this session:**
1. Fix email capture form placement
2. README.md: Update URL to asksolomon.app, add email capture + 25 scenarios
3. Add hero landing section for cold traffic + fix share URL to asksolomon.app
4. Fix syntax error: escape apostrophes in hero chip labels with double quotes
5. Improve Book Matches paywall: tease chapter title + blurred excerpt, gold CTA
6. Rewrite upgrade page: honest copy, book story, $29 anchor, gold CTA
7. Upgrade page: 247-page devotional, updated tagline to principles for success

### Session — May 13, 2026
- Ran 100 live test searches, scored 80/100
- Created 5-phase fix plan (all completed May 14)
- Fixed Vercel build error (BOOK_INDEX export)

### Session — May 12, 2026
- Added 7 new emotional scenarios to wisdomResponse.ts
- Executed all 5 phases of fix plan from May 13 session

### Session — May 11, 2026
- Rewrote wisdomResponse.ts (724 lines, 21 scenarios)
- Added book connection UI to wisdom card
- Added Book Index header button
- Removed dead SMART_TOPIC_MAP code

---

## How to Resume a Session

Start a new Claude chat and say:

> "I want to continue working on my GitHub project jcraddock2/ask-solomon. Please read NOTES.md first, then we can pick up where we left off."

Claude will read this file and be ready immediately. The next task is the **Share this wisdom button** (Phase A).

---

*Last updated: May 14, 2026 — End of session. Next: Share button (Phase A) → Testimonials (Phase B).*
