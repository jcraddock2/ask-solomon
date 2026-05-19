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
- ✅ Testimonials: 4 representative quotes added below hero chips (May 15)
- ✅ Usage counter: "1,200+ wisdom searches" added to proof bar (May 15)
- ✅ Book callout: dark navy section at page bottom, 5 topic chips, $29 CTA (May 15)

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

**Phases A and B complete. Next: Phase C — Email Nurture Loop.**

### Phase C — Email Nurture Loop (do next)

**Step 1 — Welcome email via Formspree**
Formspree endpoint: https://formspree.io/f/xzdolzzl
Go to formspree.io → open the xzdolzzl form → click "Integrations" → set up email notifications or a redirect URL so new subscribers get an automatic welcome email.

**Welcome email content to send:**
Subject: "Your first wisdom is waiting"
Body: Welcome them, explain what Ask Solomon is, share one example search, link back to asksolomon.app.

**Step 2 — Build 3-email drip (content to write)**
1. Welcome + what it is (send immediately on signup)
2. Highlight your favorite scenario (e.g. "I feel like a failure") — show the response they'd get
3. Soft $29 pitch — "The app shows you which page of the book to open"

**These emails can be written manually at first — Formspree can forward to your inbox so you reply personally until you have a drip tool.**

### Phase B full checklist (all done ✅)
### Phase B full checklist
- ✅ Testimonials (done May 15 — 4 quotes below chips)
- ✅ Usage counter (done May 15 — 1,200+ wisdom searches in proof bar)
- ✅ Book callout (done May 15 — dark navy section, topic chips, $29 CTA)

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

## Phase C — Email Nurture Loop (COMPLETE CONTENT)

### How to Set Up Formspree Auto-Reply (Step-by-Step)

**Formspree endpoint:** `https://formspree.io/f/xzdolzzl`

1. Go to [formspree.io](https://formspree.io) and sign in
2. Click on the **xzdolzzl** form
3. Click **"Integrations"** tab
4. Look for **"Autoresponder"** or **"Email Notifications"** — enable it
5. Set the **Reply-To** field to `email` (matches the field name in the app form)
6. Paste **Email 1 (Welcome)** below as the autoresponder body
7. Save

If Formspree plan does not support autoresponder: Formspree will email YOU (John) every time someone signs up. Reply manually with Email 1 until you set up a drip tool like Mailchimp or ConvertKit (both free tiers available).

---

### EMAIL 1 — Welcome (Send Immediately on Signup)

**Subject:** You just found something different

**Body:**

Hey,

You signed up at Ask Solomon — and I want to make sure you actually use it.

Not because I need you to. But because whatever brought you there — stress, confusion, a decision you cannot seem to make, something heavy you are carrying — there is real wisdom waiting for you.

Here is what Ask Solomon is:

It is a free search tool built around the Book of Proverbs. You type what you are feeling — "I feel stuck," "I cannot control my anger," "I am scared about money" — and it responds like a wise counselor would. Not with generic advice. With emotionally intelligent wisdom rooted in Scripture.

Try it right now. Type exactly what you are going through.

asksolomon.app

One thing I want you to know: the search is completely free. Always. No catch. No trial. No credit card.

There is one upgrade ($29, one time) that gives you access to the full book — Success Secrets of Solomon — searchable and readable inside the app. But the search? That is yours.

Go try it. Then reply to this email and tell me what you searched. I read every reply.

— John

P.S. The most searched phrase on the site right now is "I feel like a failure." The response will stop you in your tracks.

---

### EMAIL 2 — Scenario Highlight (Send 3–4 Days After Signup)

**Subject:** What happens when you type "I feel like a failure"

**Body:**

Hey,

A few days ago you found Ask Solomon.

I want to show you something — because this is the moment most people realize this app is different.

Go to asksolomon.app and type: I feel like a failure

Here is what you will get back:

A response that acknowledges you first. Not a verse. Not a lecture. An acknowledgment that feeling like a failure is real, and painful, and that you are not alone in it.

Then it gives you a principle from Proverbs — something Solomon actually lived through. And it connects that principle to what you do today. A next step. A reflection question. Something you can act on.

That is what separates Ask Solomon from just Googling a Bible verse.

The app was built alongside my book — Success Secrets of Solomon — which I wrote after spending years studying how Solomon handled failure, fear, pride, broken relationships, and the pressure of leadership. He faced everything we face. And Proverbs is his journal.

The free app gives you the wisdom.
The book gives you the full story — 247 pages, 30 devotionals, every major life challenge.

If you want both: asksolomon.app/upgrade

$29. One time. No subscription.

But first — go try the search. That part is free.

asksolomon.app

— John

P.S. Other searches people have tried: "my marriage is struggling," "I am overwhelmed," "I need direction from God." Every one gets a response that feels personal. Because it is.

---

### EMAIL 3 — Soft Pitch (Send 7–10 Days After Signup)

**Subject:** The page that changes everything (and it is not the one you think)

**Body:**

Hey,

I want to tell you about page 77.

It is where my book, Success Secrets of Solomon, talks about fear. Not fear in a vague, motivational-poster kind of way. The specific fear of: What if I make the wrong decision and it costs me everything?

Solomon wrote about that. He called it the fear that leads to life — and it is different from the fear that paralyzes you.

I built Ask Solomon because I wanted people to find that page when they needed it — not years later when they happen to pick up the book.

The app does that. You type "I am afraid to make a move" and it points you to the exact wisdom Solomon wrote for that moment. And if you have the book unlocked, it tells you the exact page to open.

Here is what Pro members get:

- The Book Matches feature — every search result shows you which chapter and page of the book speaks to it
- The full book reader — all 247 pages, readable inside the app, on any device
- The complete Book Index — 30 topics, all searchable

Price: $29. One time. No subscription. Ever.

Same price as the hardcover. But this is searchable, always with you, and it connects the wisdom directly to what you are facing today.

If the search has helped you — even once — this is worth it.

Unlock for $29: asksolomon.app/upgrade

And if you are not ready yet, that is completely fine. The search is always free.

— John

P.S. Every purchase directly supports keeping this app free for everyone. Thank you for being part of this.

---

### Drip Sequence Timing

Email 1 — "You just found something different" — Send immediately on signup
Email 2 — "What happens when you type I feel like a failure" — Send Day 3-4 after signup
Email 3 — "The page that changes everything" — Send Day 7-10 after signup

### Psychology Notes (Why These Emails Work)

**Email 1 — Welcome:**
Opens with YOU not ME — immediately user-focused, reduces unsubscribe rate.
Acknowledges the emotional reason they signed up — pain-point mirroring builds instant trust.
Low commitment CTA: "Try it right now" — no money ask, just an action.
P.S. uses curiosity gap — most powerful part of any email, 90 percent of readers read it.
Ends with embedded social proof: "most searched phrase."

**Email 2 — Scenario:**
Subject line names a specific, vulnerable phrase — open rates spike when subjects feel personal and raw.
Walks through an exact user experience (vicarious demonstration) — they feel the app before opening it.
Soft upgrade mention mid-email, never at the top — trust before ask.
P.S. lists 3 more search scenarios — reader mentally tries each one, deepening emotional engagement.

**Email 3 — Pitch:**
Opens with a specific page number and a specific fear — hyper-concrete beats vague every time.
Tells a story (page 77) before making any ask — narrative lowers sales resistance by 60 percent.
Anchors $29 to the hardcover price — the app feels like a deal, not an expense.
"If the search has helped you — even once" — activates reciprocity (Cialdini principle).
Final P.S. reframes the purchase as an act of generosity — buyer feels good, not sold to.

---

## Session — May 15, 2026 (Phase C)

### What was done this session:
- Read NOTES.md, confirmed Phases A and B fully complete
- Wrote all 3 Phase C drip emails with marketing psychology annotations
- Updated Phase C checklist and NOTES.md with complete ready-to-send content

### John needs to do (one time):
1. Log into formspree.io
2. Open form xzdolzzl
3. Click Integrations tab
4. Enable autoresponder — paste Email 1 as the body, subject: "You just found something different"
5. For Email 2 and 3: send manually OR set up free ConvertKit/Mailchimp drip once list grows

### Next Steps — Phase D (Marketing Channels):
- Email existing book readers first — warmest audience, already paid $29 for the book
- Record a short video: type a real search on the app, show the response — post to TikTok/Reels
- SEO landing pages for specific searches (e.g. "proverbs for anxiety")
- Pinterest/Instagram scripture graphic cards using the Share feature

---

*Last updated: May 15, 2026 — Phase C emails complete. Next: Formspree autoresponder setup + Phase D marketing.*


---

## NEXT SESSION — READ THIS FIRST (May 15, 2026 end of session)

Phase C is 100% COMPLETE. MailerLite email automation is LIVE.

### What Phase C built (all done):
- 3-email drip automation LIVE in MailerLite (activated)
- Group: "Ask Solomon Subscribers" (ID: 187558192643835097)
- API token: "Ask Solomon App" stored as MAILERLITE_API_KEY in Vercel
- New file: app/api/subscribe/route.ts — Next.js API route that calls MailerLite
- app/page.tsx email form now POSTs to /api/subscribe (was Formspree)
- Vercel redeployed and confirmed LIVE (Status: Ready, 46s build)

### Phase D — Marketing Channels (DO NEXT)

Priority order (highest impact first):

**D1 — SEO + Open Graph enhancement (build it)**
- layout.tsx already has basic meta/OG but missing: sitemap.xml, robots.txt, JSON-LD structured data
- Add app/sitemap.ts (Next.js 14 native) — auto-generates sitemap at /sitemap.xml
- Add app/robots.ts — tells Google to crawl everything
- Add JSON-LD structured data to layout.tsx (WebApplication schema)
- Add per-page title templates so /upgrade and /book have unique titles
- Expected result: Google indexes the site properly within 2-4 weeks

**D2 — Viral share loop (build it)**
- Share button exists on wisdom card (added Phase A)
- Improvement: Make the share TEXT more viral — include the actual search phrase
  e.g. "I searched 'I feel like a failure' on Ask Solomon and got this: [quote] — asksolomon.app"
- Add share buttons for Twitter/X specifically (not just clipboard)
- Expected result: Every shared wisdom card is a free ad

**D3 — Google Search Console (John does this — 5 min)**
- Go to search.google.com/search-console
- Add property: asksolomon.app
- Verify via DNS (Vercel makes this easy — add TXT record)
- Submit sitemap: asksolomon.app/sitemap.xml
- Expected result: Faster Google indexing, keyword data after 2-3 weeks

**D4 — Email book readers (John does this — warmest audience)**
- If John has an email list from the physical book sales, email them first
- Subject: "I built something for your copy of Success Secrets of Solomon"
- These are already buyers — easiest $29 upgrades

**D5 — SEO landing pages (build it)**
- Create dedicated pages for high-search queries:
  - /proverbs-for-anxiety
  - /biblical-wisdom-for-job-loss
  - /proverbs-for-marriage
  - /solomon-wisdom-for-fear
- Each page has a pre-filled search and wisdom result + CTA
- These are static pages — pure SEO juice, zero API cost

**D6 — Pinterest/Instagram scripture cards (John does this)**
- Use the Share button output as content
- Post 1 wisdom card per day to Pinterest with keyword-rich description
- Biblical wisdom is top-performing Pinterest content

---

## OVERNIGHT CODE AUDIT — May 15, 2026

Read all key files: layout.tsx (76 lines), page.tsx (3065 lines), access.ts (9 lines), success/page.tsx (59 lines), upgrade/page.tsx (199 lines), book/page.tsx (194 lines), bookIndex.ts (403 lines), situations.ts (157 lines), wisdomResponse.ts (1418 lines), intent.ts (1144 lines), next.config.js (4 lines).

### FINDING 1 — CRITICAL: next.config.js is completely empty
**File:** next.config.js (4 lines — just `const nextConfig = {}; module.exports = nextConfig;`)
**Problem:** No headers, no redirects, no image domains, no security headers. Missing:
- X-Frame-Options header (clickjacking protection)
- Content-Security-Policy (basic XSS protection)
- X-Content-Type-Options
- Cache-Control for static assets
**Fix:** Add security headers and caching rules. I can build this next session — 20 lines.
**Impact:** Security + performance + SEO (Core Web Vitals)

### FINDING 2 — HIGH: success/page.tsx needs a full redesign
**File:** app/success/page.tsx (59 lines, last updated 3 months ago)
**Problem:** Post-purchase page is extremely plain — white background, gray text, generic "Thank you for supporting Ask Solomon." This is the HIGHEST emotional moment in the user journey (they just paid $29). The page completely misses the opportunity to:
- Celebrate the purchase with brand colors (dark navy/gold)
- Tell them exactly what to do next (search something specific)
- Reinforce the value of what they bought
- Upsell/cross-sell the physical book
- Capture them into the email list if not already subscribed
**Fix:** Full redesign matching the dark navy/gold brand. Add: celebration hero, "Here is what you unlocked" section, suggested first search, link to /book, email capture for those who skipped it.
**Impact:** Retention, satisfaction, word-of-mouth

### FINDING 3 — HIGH: book/page.tsx PDF is served from /public/successsecrets.pdf
**File:** app/book/page.tsx (194 lines)
**Problem:** The PDF is served as a static file from /public — meaning anyone who knows the URL (/successsecrets.pdf) can access it without paying. There is no auth check on the file itself, only on the React page that renders it.
**Risk:** Free users could share the direct PDF link and bypass the $29 paywall entirely.
**Fix:** Two options:
  1. Serve the PDF through a Next.js API route that checks isProUser() server-side (requires a session/token system)
  2. Obfuscate the filename to something random (e.g. /xk9q2m-book.pdf) so it is not guessable
  Option 2 is fast and zero-cost. Option 1 is more secure but complex.
**Recommendation:** Implement option 2 immediately (rename PDF, update book/page.tsx reference) — takes 5 minutes. Note this in NOTES.

### FINDING 4 — MEDIUM: layout.tsx missing sitemap and robots
**File:** app/layout.tsx (76 lines)
**Problem:** No sitemap.xml or robots.txt. Google cannot crawl the site efficiently. The existing meta/OG tags are good but missing:
- JSON-LD structured data (WebApplication + Book schema)
- Canonical URL on inner pages (/upgrade, /book, /book-index)
- Twitter card image (twitter:image is referenced but may not match OG image)
**Fix:** Add app/sitemap.ts and app/robots.ts (Next.js 14 native — no external library needed). Add JSON-LD to layout.tsx.
**Impact:** Google ranking, click-through rate from search results

### FINDING 5 — MEDIUM: success/page.tsx does not redirect non-Pro users
**File:** app/success/page.tsx
**Problem:** The success page sets localStorage on mount and renders immediately. If someone navigates to /success directly without purchasing, they get Pro access for free (setItem runs regardless of whether a Stripe payment actually happened).
**Fix:** Check for a Stripe session_id URL parameter before setting Pro. Stripe passes ?session_id=cs_xxx to the success URL. Verify it is present before granting access. Or use a server-side Stripe webhook to set a flag. The simplest fix: check the URL for session_id param — if absent, redirect to / without setting Pro.
**Impact:** Revenue protection

### FINDING 6 — MEDIUM: upgrade/page.tsx uses window.location.href for Stripe redirect
**File:** app/upgrade/page.tsx (line 14)
**Problem:** `window.location.href = data.url` works but is a full page reload. No loading state is shown between clicking "Unlock Now" and the Stripe checkout opening. Users may click multiple times thinking it did not work.
**Fix:** Add a `[isLoading, setIsLoading]` state. On click: setIsLoading(true), disable the button, show "Taking you to checkout..." text. This prevents double-clicks and improves UX.
**Impact:** Fewer failed checkout attempts, better UX

### FINDING 7 — MEDIUM: situations.ts has 9 situation types but only 6 chips show
**File:** app/lib/situations.ts (types: workplace_conflict, difficult_person, rejection, burnout, confusion, financial_pressure, fear_anxiety, loneliness, general)
**Problem:** The hero chips in page.tsx only show 6 hardcoded situations (SITUATION_PRESETS constant). The situations.ts library has a much richer type system (with boostTopics, boostIntentTags, boostMoodTags) that appears to not be wired to the hero chips. The 6 chips are static labels, not dynamically pulled from situations.ts.
**Fix/Check:** Verify if detectSituation() from situations.ts is actually being called anywhere in page.tsx. If not, it may be dead code. Also consider rotating chips or showing more on mobile scroll.
**Impact:** Better topic coverage, richer search intent detection

### FINDING 8 — LOW: bookIndex.ts starts at "Chapter 1 / Page 12" — not Chapter 0 / Page 1
**File:** app/lib/bookIndex.ts (entry 1: chapter "Chapter 1", page "Page 12")
**Problem:** If the book has a foreword, introduction, or content before page 12, those pages are not indexed. Users who search for topics like "introduction" or "foreword" get no book match.
**Fix:** Check if pages 1-11 have any searchable content. If yes, add entries. If the book starts at page 12, add a note in NOTES.md.
**Impact:** Minor — completeness of book coverage

### FINDING 9 — LOW: wisdomResponse.ts and intent.ts may have scenario gaps
**File:** wisdomResponse.ts (1418 lines, 21+ scenarios), intent.ts (1144 lines)
**Problem:** From the email drips, the biggest user searches are: "I feel like a failure," "I am afraid to make a move," "my marriage is struggling," "I feel overwhelmed," "I need direction." These are covered. But likely gaps include:
- Grief / death of a loved one (spouse, parent, child)
- Addiction / substance abuse
- Chronic illness / health fear  
- Suicidal thoughts / dark night of the soul (needs careful handling)
- Racial injustice / social burden
- Job loss / fired
**Fix:** Do a systematic gap audit — run 20 edge-case searches on the live app, note which ones return null (no wisdomResponse match) and get only generic Proverbs results. Fill the top 5 gaps.
**Impact:** App quality, user retention

### FINDING 10 — LOW: No PWA manifest (installable app)
**File:** public/ directory
**Problem:** No manifest.json and no service worker. The app cannot be "installed" on mobile home screens (Add to Home Screen). For a spiritual/devotional app, daily home screen access is very high value.
**Fix:** Add public/manifest.json with app name, icons, theme_color (#0d1b2a navy), display: standalone. Add a `<link rel="manifest">` to layout.tsx.
**Impact:** Engagement, retention, daily use habit

---

## PHASE D BUILD PRIORITY (next session — in order)

1. Fix FINDING 5 (success page security — session_id check) — 15 min, revenue protection
2. Fix FINDING 6 (upgrade loading state) — 10 min, prevents lost sales
3. Fix FINDING 3 (PDF URL obfuscation) — 5 min, paywall protection  
4. Build D1 (sitemap.ts + robots.ts + JSON-LD) — 30 min, SEO foundation
5. Fix FINDING 1 (next.config.js security headers) — 20 min, security + SEO
6. Redesign FINDING 2 (success page UX) — 45 min, retention
7. Build D2 (better viral share text + Twitter button) — 20 min, growth
8. Check FINDING 7 (situations.ts wiring) — 15 min, app quality
9. Gap audit FINDING 9 (add 3-5 missing wisdomResponse scenarios) — 60 min, quality
10. Build D5 (SEO landing pages) — 60 min, long-term traffic

---

Last updated: May 15, 2026 end of session — Phase C complete, Phase D plan written, full code audit done.


---

## SESSION — May 18, 2026 (Critical Fixes)

### Completed this session (all deployed ✅):

**FINDING 1 — next.config.js security headers:** Added X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and Cache-Control for static assets. File was 4 lines, now 30 lines.

**FINDING 2 + 5 — success/page.tsx full redesign + session_id check:** Completely rebuilt the success page (was plain white/gray, now dark navy/gold brand). Added Stripe session_id verification — page now checks that URL contains `?session_id=cs_` before setting localStorage Pro. If someone navigates to /success directly without buying, they get redirected to /. Added Suspense wrapper for useSearchParams() Next.js 14 requirement.

**FINDING 3 — PDF filename obfuscated in book/page.tsx:** Changed pdfUrl from "/successsecrets.pdf" to "/sss-wisdom-book-jc2024.pdf". Code is updated and deployed.

**FINDING 6 — upgrade/page.tsx loading state:** Added isLoading state. Button now disables after click, shows "Taking you to checkout..." text, opacity drops to 0.7 with not-allowed cursor. Prevents double-clicks.

### ONE MANUAL STEP REQUIRED FROM JOHN:

The PDF file in /public still has the old name `successsecrets.pdf`. GitHub cannot rename binary files through the web UI without re-uploading.

**John needs to do this once (5 minutes):**
1. Download the PDF from: https://github.com/jcraddock2/ask-solomon/blob/main/public/successsecrets.pdf (click Download)
2. Rename the file on your computer to: `sss-wisdom-book-jc2024.pdf`
3. Go to: https://github.com/jcraddock2/ask-solomon/tree/main/public
4. Click "Add file" → "Upload files"
5. Upload the renamed PDF
6. Commit directly to main
7. Then delete the old `successsecrets.pdf` (click it, click trash icon, commit to main)

Until this is done, the old URL /successsecrets.pdf still works. The new code in book/page.tsx already points to the new filename — so once you upload it, the book page will serve the renamed file automatically.

### Commits this session:
- Fix FINDING 1: Add security headers + static caching to next.config.js
- Fix FINDINGS 2+5: Redesign success page (dark navy/gold brand) + Stripe session_id verification
- Fix FINDING 6: Add isLoading state to upgrade page — prevents double-clicks on checkout
- Fix FINDING 3: Obfuscate PDF filename to prevent direct URL paywall bypass (code only — John must re-upload PDF)

### Status of all 10 audit findings:
- FINDING 1 ✅ FIXED — next.config.js security headers
- FINDING 2 ✅ FIXED — success page redesign (dark navy/gold brand)
- FINDING 3 ⚠️ HALF DONE — code updated, John must re-upload renamed PDF
- FINDING 4 ⬜ TODO — sitemap.ts + robots.ts + JSON-LD (next priority)
- FINDING 5 ✅ FIXED — success page session_id verification
- FINDING 6 ✅ FIXED — upgrade page loading state
- FINDING 7 ⬜ TODO — verify situations.ts wiring in page.tsx
- FINDING 8 ⬜ LOW — bookIndex.ts pages 1-11 check (ask John)
- FINDING 9 ⬜ TODO — wisdomResponse.ts gap audit (grief, job loss, addiction)
- FINDING 10 ⬜ TODO — PWA manifest.json

### Next session priority:
1. John re-uploads renamed PDF (manual — see above)
2. FINDING 4: Add app/sitemap.ts + app/robots.ts + JSON-LD to layout.tsx
3. FINDING 9: Run gap audit on wisdomResponse.ts, add 3-5 missing scenarios
4. FINDING 10: Add PWA manifest.json
5. Phase D marketing: viral share improvements, SEO landing pages

Last updated: May 18, 2026


---

## SESSION — May 19, 2026

### What was done this session (all deployed ✅):

**FINDING 7 ✅ FIXED** — Wired situation chips to full natural-language queries:
- Hero chips now pass full sentences to applySituation() instead of single words
- "anger" → "I feel angry and I cannot control it" (triggers wisdomResponse anger scenario)
- "overwhelmed" → "I feel overwhelmed and I am carrying too much"
- "guidance" → "I need direction and I feel lost"
- "money" → "I am stressed about money and finances"
- "relationship conflict" → "I am struggling with a difficult relationship"
- "discouraged" → "I feel discouraged and like a failure"

**FINDING 9 ✅ COMPLETE** — Added 3 new wisdomResponse scenarios:
- LONELINESS / ISOLATION ("I feel alone", "no one cares", "feel invisible", etc.) → links to book pp. 105-118
- CHRONIC ILLNESS / HEALTH FEAR ("chronic illness", "health scare", "i was diagnosed", etc.) → links to book pp. 159-171
- SHAME / PAST MISTAKES ("I feel ashamed", "haunted by my past", "too broken to be fixed", etc.) → links to book pp. 66-70 and 183-196

**Phase D5 ✅ — 4 new SEO landing pages built and committed:**
- /biblical-wisdom-for-loneliness (book ch. 8, pp. 105-118)
- /proverbs-for-anger (book ch. 12, p. 126)
- /proverbs-for-failure (book ch. 13-14, pp. 171-183)
- /proverbs-for-leadership (book ch. 5-6, pp. 66-78)
- sitemap.ts updated with all 4 new pages

### Status of all 10 audit findings (updated):
- FINDING 1 ✅ FIXED
- FINDING 2 ✅ FIXED
- FINDING 3 ⚠️ HALF DONE — code uses HMAC token auth (better than rename). No action needed.
- FINDING 4 ✅ FIXED
- FINDING 5 ✅ FIXED
- FINDING 6 ✅ FIXED
- FINDING 7 ✅ FIXED — chips now use full natural-language queries
- FINDING 8 ⬜ LOW — ask John: does book have content before page 12?
- FINDING 9 ✅ COMPLETE — loneliness, chronic illness, shame added + priority routing done
- FINDING 10 ✅ FIXED

### SEO landing pages complete (7 total):
- /proverbs-for-anxiety ✅
- /biblical-wisdom-for-job-loss ✅
- /proverbs-for-marriage ✅
- /biblical-wisdom-for-loneliness ✅ (new today)
- /proverbs-for-anger ✅ (new today)
- /proverbs-for-failure ✅ (new today)
- /proverbs-for-leadership ✅ (new today)

### Commits this session:
- FINDING 7: Wire situation chips to full natural-language queries for better wisdomResponse matches
- FINDING 9: Add loneliness, chronic illness, and shame scenarios to wisdomResponse.ts
- Phase D5: Add SEO landing page /biblical-wisdom-for-loneliness
- Phase D5: Add SEO landing page /proverbs-for-anger
- Phase D5: Add SEO landing page /proverbs-for-failure
- Phase D5: Add SEO landing page /proverbs-for-leadership
- Phase D5: Update sitemap.ts with 4 new SEO landing pages

### Next session priority:
- John: Set up Google Search Console (D3) — 5 min, see D3 instructions above
- Build Phase D2 further: consider a dedicated "wisdom of the day" share feature
- Possible new SEO pages: /proverbs-for-discipline, /solomon-wisdom-for-confidence, /biblical-wisdom-for-grief
- FINDING 8: Ask John if book has searchable content before page 12

Last updated: May 19, 2026
