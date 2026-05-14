# Ask Solomon — Project Notes for AI Sessions

> **For Claude:** Read this file first at the start of every session to orient yourself before touching any code.

---

## What This App Is

**Ask Solomon** is a Next.js web app that lets users search for biblical wisdom from Proverbs based on what they are feeling or facing in life. It is paired with a book called **"Success Secrets of Solomon"** by the owner (John / jcraddock2).

**Live URL:** Deployed on Vercel (auto-deploys from main branch)
**Repo:** github.com/jcraddock2/ask-solomon
**Owner:** jcraddock2 (John) — self-described novice, wants Claude to do as much as possible

---

## Core Product Goals

1. **Feel AI-like** without using any paid AI/API (zero cost constraint — NO OpenAI, Anthropic API, etc.)
2. **Biblically accurate** — all wisdom content grounded in Proverbs
3. **Emotionally intelligent** — user should feel heard and understood, not just given a Bible verse
4. **Book connections** — every response should connect to the "Success Secrets of Solomon" book (chapters + page numbers)
5. **No paid external services** — Stripe for $29 lifetime purchase is already in place and is the only allowed paid integration

---

## Tech Stack

- **Framework:** Next.js 14 (App Router), TypeScript, React 18
- **Styling:** Inline styles (no Tailwind, no CSS modules)
- **Deployment:** Vercel (500+ deployments, auto-deploy on push to main)
- **Database:** None — all content lives in TypeScript files
- **Payment:** Stripe ($29 lifetime unlock)
- **Editor note:** GitHub web editor uses CodeMirror 6 — use CM6 API (`document.querySelector('.cm-content').cmTile.view`) for surgical edits on large files

---

## Key Files

### App Pages
| File | Purpose |
|------|---------|
| `app/page.tsx` | Main search page (~2630 lines) — the core of the app |
| `app/book/page.tsx` | Shows the full book PDF (Pro users) or preview (free) |
| `app/book-index/page.tsx` | Topic index for the book — lists chapters/pages by topic |
| `app/upgrade/page.tsx` | Stripe upgrade/purchase page |
| `app/success/page.tsx` | Post-purchase success page |
| `app/layout.tsx` | Root layout |

### Library Files (`app/lib/`)
| File | Purpose |
|------|---------|
| `wisdomResponse.ts` | **CORE** — Emotional intelligence layer. 21 scenarios with AI-like responses, book connections. Returns `WisdomResponse` object. |
| `intent.ts` | Smart query interpretation — `expandSmartTerms()`, `interpretQueryAdvanced()`, `smartSearch()` |
| `proverbs.ts` | Proverb search — `searchProverbsScored(query)` returns scored proverb matches |
| `verses.ts` | Bible verse data, modes, topics, `findBookMatches()`, `searchVerseItemsScored()` |
| `bookIndex.ts` | Structured book entries with chapters, pages, excerpts, keywords |
| `situations.ts` | Situation presets |
| `access.ts` | `isProUser()` — currently hardcoded to `true` during development |
| `proverbs/` | Subfolder with core.ts, index.ts, shared.ts — proverb data |

---

## What Has Been Completed (as of May 2026)

### Session 1 (prior — details lost)
- Initial project setup and review

### Session 2 (May 11, 2026)
- ✅ **Rewrote `wisdomResponse.ts`** — 724 lines, 21 emotional scenarios, AI-like language, book connections for every scenario, absorbed `getWisdomForMoment.ts`
- ✅ **Deleted `getWisdomForMoment.ts`** — redundant file, absorbed into wisdomResponse.ts
- ✅ **Updated `app/page.tsx`** with:
  - Import: `import { getWisdomResponse, type WisdomResponse } from "./lib/wisdomResponse"`
    - State: `const [wisdomCard, setWisdomCard] = useState<WisdomResponse | null>(null)`
      - useEffect: calls `getWisdomResponse(q)` whenever query `q` changes
        - Full wisdom card UI JSX rendered above proverb results
        - ✅ **Removed `SMART_TOPIC_MAP`** from page.tsx — was dead code (never referenced), 25 lines deleted
        - ✅ **Kept `scoreProverbMatch`** in page.tsx — it IS used as a fallback scorer inside `proverbMatches` useMemo (different role from imported `searchProverbsScored`)
        - ✅ **Enhanced book connection UI** in wisdom card — now shows "📖 IN THE BOOK" label + connection text + clickable "Explore Topic in Book Index →" button linking to `/book-index`
        - ✅ **Added "Book Index" header button** — navigates to `/book-index`, sits between "Book" and "Upgrade (Lifetime)" in the header nav

        ---

        ## What Still Needs Work (Priority Order)

        ### High Impact (do these first)
        - [x] **Improve `wisdomResponse.ts` book connection strings** — exact page ranges added (e.g. "pp. 80–82"), matching `book-index/page.tsx` data ✅ May 11, 2026
        - [x] **Add more keyword triggers** — expanded to 20–25 triggers per scenario (stressed, insomnia, can't sleep, job loss, layoff, etc.) ✅ May 11, 2026
        - [x] **Add search/filter to `book-index/page.tsx`** — live search input filters 30 topics by label, summary, and chapter in real time ✅ May 11, 2026

        ### Medium Impact
        - [x] **Add more emotional scenarios** to `wisdomResponse.ts` ✅ May 12, 2026:
          - Job loss / unemployment
            - Betrayal / broken trust
              - Grief / loss of loved one
                - Parenting struggles
                  - Marriage / divorce
                    - Financial debt / bankruptcy
                      - Addiction / bad habits
                      - [ ] **Improve Smart Topic Mapping chips** in search results display

                      ### Lower Priority
                      - [ ] Review `verses.ts` content for richness and accuracy
                      - [ ] Review `situations.ts` presets — currently: Angry, Overwhelmed, Need Direction, Money Stress, Relationship Conflict, Feeling Discouraged

                      ---

                      ## Critical Rules for Claude

                      1. **NO paid services** — zero external AI API costs. Simulate AI behavior through comprehensive keyword matching.
                      2. **Read all relevant files before coding** — never make changes without understanding context.
                      3. **No hunt-and-peck coding** — do complete, coherent edits. Don't add small snippets that conflict with existing code.
                      4. **Do as much as possible for John** — he is a novice and prone to errors. Minimize what he has to do manually.
                      5. **Commit directly to main** — always select "Commit directly to the main branch" in GitHub commit dialog.
                      6. **`isProUser()` returns `true`** — this is intentional during development. Do not change it.
                      7. **CM6 editor API** — for surgical edits in large files, access CodeMirror 6 via `document.querySelector('.cm-content').cmTile.view` in javascript_tool.
                      8. **Vercel auto-deploys** — every commit to main triggers a Vercel build. Orange dot = building, green checkmark = deployed.

                      ---

                      ## Page Numbers Reference (book-index/page.tsx)

                      | Topic | Pages |
                      |-------|-------|
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

                      ## How to Resume a Session

                      Start a new Claude chat and say:
                      > "I want to continue working on my GitHub project jcraddock2/ask-solomon. Please read the NOTES.md file and all key source files to orient yourself, then we can pick up where we left off."

                      Claude will read this file, then read the current state of the code, and be ready to work immediately.

                      ---
*Last updated: May 14, 2026 — Search score ~95/100, paywall fixed, SEO + analytics added, email capture fixed. See SESSION NOTES below.*

---

## SESSION NOTES — May 14, 2026
What Was Done This Session
- Executed 5-phase fix plan from May 13 (Phases 1–5, all committed to main)
- Fixed paywall: isProUser() now reads localStorage("asksolomon_pro") instead of hardcoded true
- Stripe flow confirmed correct: checkout → payment → /success sets localStorage → Pro unlocks
- Fixed 3 remaining medium-priority failures: "owe people money", "stressed about money", "feel called by God"
- Added full SEO metadata to layout.tsx: title, description, keywords, Open Graph, Twitter Card, canonical URL
- Added Plausible analytics script to layout.tsx (privacy-first, no cookies)
- Mobile QA: confirmed looks good on phone

Search Score: ~95/100 (up from 80/100)

- Fixed email capture form placement: was nested inside Smart Topic Mapping label div (bug from prior commit), moved to standalone block shown after search results for free users
What Still Needs Doing
- ✅ Email capture: Formspree form added and placement fixed — shows after search results for free users (endpoint: https://formspree.io/f/xzdolzzl)
- GitHub README: add project description
- Plausible.io: John needs to register the domain to activate analytics tracking
  Go to plausible.io → Add site → enter domain → analytics will start working
- OG image: create a 1200x630 image named og-image.png and add to /public folder
  Currently og:image tag points to /og-image.png which doesn't exist yet
- Custom domain: if John connects a custom domain in Vercel, update the canonical URL
  and Plausible data-domain in layout.tsx to match

SESSION NOTES — May 13, 2026

### What Was Done This Session
- Fixed Vercel build error: BOOK_INDEX not exported from bookIndex.ts (commit 87363b3)
- Ran 100 live test searches using Next.js router client-side navigation
- Scored 80/100 fully working (specific banner + 5+ proverb results + book matches)

### 100-Search Test Results — Score: 80/100

#### CRITICAL (1) — Complete failure
- DEBT | "i have no savings" — nothing shown, "savings" maps to no lane

#### HIGH — Generic Banner (14 queries — no emotional wisdom card)
- ADDICTION: "i cant stop drinking", "i want to get sober", "i am in bondage to sin"
- GRIEF: "i cant stop crying", "i am dealing with loss"
- FEAR: "i dont feel safe"
- ANGER: "i cant control my temper", "i want to hurt someone"
- DEBT: "i have no savings"
- PARENTING: "i dont know how to raise my kids", "i am a single parent struggling"
- BETRAYAL: "my best friend stabbed me in the back"
- PRIDE: "i think i am better than others"
- SPEECH: "i speak before i think"

#### HIGH — Zero Proverb Results but Wisdom Card OK (4 queries)
- FEAR: "i am terrified"
- PARENTING: "my child is rebelling"
- PARENTING: "i feel like a bad parent"
- PRIDE: "i need to be humble"

#### HIGH — Wrong Intent / False Positive Lane Matches (4 queries)
- "i cant stop crying" -> "cant stop" triggers ADDICTION lane -> gets Discipline books not Grief
- "i am a single parent struggling" -> "struggling" triggers TEMPTATION lane -> gets lust/sin topics
- "i struggle with pride" -> "struggle" triggers ADDICTION lane -> gets addiction topics
- "i want to hurt someone" -> "hurting/hurt" triggers GRIEF lane -> gets Grief books not Anger

#### MEDIUM — Emotion/Book Mismatch
- "my husband died" -> "husband" triggers MARRIAGE scenario -> gets love/pain response not grief
- "i am stressed about money" -> "stressed" pulls fear -> gets Confidence books not Money books
- "i owe people money" -> "owe" not in debt lane -> gets Leadership books
- "i cant find work" -> gets Leadership books not Work/Diligence books
- "i feel called by God" -> gets Rejection/Trust books not Purpose/Calling books
- All 10 JOB_LOSS queries -> same emotional state (not differentiated by situation)

---

### 5-PHASE FIX PLAN — COMPLETED May 14, 2026

#### PHASE 1 — app/lib/wisdomResponse.ts — Add missing triggers to existing scenarios
Find each scenario's triggers array and ADD these new trigger strings:

ADDICTION scenario triggers — ADD:
"cant stop drinking", "i cant stop drinking", "drinking", "alcohol", "i drink too much",
"i want to get sober", "want to get sober", "sober", "sobriety", "get sober",
"bondage to sin", "in bondage", "i am in bondage"

GRIEF scenario triggers — ADD:
"i cant stop crying", "cant stop crying", "i keep crying", "i cry all the time",
"dealing with loss", "i am dealing with loss", "trying to deal with loss",
"dealing with grief", "lost and grieving"

FEAR scenario triggers — ADD:
"i dont feel safe", "dont feel safe", "i do not feel safe", "not safe", "unsafe", "i feel unsafe"

ANGER scenario triggers — ADD:
"i cant control my temper", "cant control my temper", "temper", "lose my temper",
"lost my temper", "i want to hurt someone", "want to hurt someone", "hurt someone"

DEBT scenario triggers — ADD:
"i have no savings", "no savings", "have no savings", "spent all my savings"

PARENTING scenario triggers — ADD:
"i dont know how to raise my kids", "dont know how to raise", "raise my kids",
"raising kids", "i am a single parent struggling", "single parent struggling",
"single parent", "raising my kids alone"

BETRAYAL scenario triggers — ADD:
"my best friend stabbed me in the back", "stabbed me in the back", "best friend betrayed me",
"friend stabbed me", "best friend lied"

PRIDE scenario triggers — ADD:
"i think i am better than others", "think i am better", "better than everyone",
"act like i am better", "i am better than others"

SPEECH scenario triggers — ADD:
"i speak before i think", "speak before i think", "i say things without thinking",
"blurt things out", "think before i speak"

#### PHASE 2 — app/lib/intent.ts — Fix false positive lane matches
FIND the addiction lane terms array. REMOVE these standalone terms:
- "cant stop" (too generic — catches "cant stop crying")
- "can't stop" (same)
- "struggle" (too generic — catches "struggle with pride")
- "struggling" (too generic — catches "single parent struggling")
REPLACE with multi-word versions:
- "cant stop using", "cant stop drinking", "cant stop using drugs"

FIND the temptation lane terms array. REMOVE:
- "struggling" (catches "single parent struggling")

FIND the grief lane terms array. CHECK if "hurt" or "hurting" is there.
If yes, REMOVE bare "hurt" and "hurting" (too generic — catches "i want to hurt someone")
Keep: "heartbroken", "heartbreak", "broken heart"

ADD to anger lane terms:
"temper", "my temper", "lose my temper", "want to hurt", "hurt someone"

ADD to fear lane terms:
"terrified", "feel safe", "not safe", "unsafe", "dont feel safe"

ADD to debt lane terms:
"no savings", "savings", "no money saved", "spent everything i had"

ADD to grief lane terms (for "my husband died" type queries):
"my husband died", "my wife died", "my spouse died", "death of my", "passed away recently"

#### PHASE 3 — app/lib/proverbs.ts — Fix zero-result queries
FIND the INTENT_EXPANSIONS object closing brace. INSERT before it:
  terrified: ["fear", "afraid", "terror", "dread", "paralyzed", "scared", "courage", "trust", "strength", "safety"],
  rebelling: ["rebellion", "wayward", "prodigal", "discipline", "correction", "instruction", "consequences", "training"],
  "bad parent": ["parenting", "discipline", "correction", "instruction", "train", "child", "wisdom", "patient", "guidance"],
  humble: ["humility", "pride", "arrogance", "lowly", "servant", "meek", "exalt", "honor", "teachable", "selfless"],
  humility: ["humble", "pride", "arrogance", "lowly", "servant", "meek", "exalt", "honor", "teachable", "selfless"],
  "feel safe": ["safety", "refuge", "protect", "shield", "trust", "fortress", "shelter", "peace", "secure"],
  savings: ["money", "wealth", "stewardship", "debt", "diligence", "planning", "future", "provision", "financial"],
  "no savings": ["money", "wealth", "stewardship", "debt", "diligence", "planning", "provision", "financial"],

#### PHASE 4 — app/lib/wisdomResponse.ts — Add 2 differentiated job-loss scenarios
INSERT two new scenario objects. Each needs: id, triggers[], emotionalState, headline, whatIHear, insight, reflect, nextStep, bookRef.

Scenario A — SUDDEN JOB LOSS (shock):
- id: "job-loss-sudden"
- triggers: ["fired today", "was fired", "got fired", "laid off today", "lost my job today", "they let me go", "i was let go", "just got fired", "just got laid off"]
- emotionalState: "shocked, blindsided, and unsure what comes next"
- headline: "Wisdom Meets You in the Blindside"
- whatIHear: "You didn't see this coming — and the ground feels unsteady right now."
- insight: "Proverbs does not define your identity by your employment. Your worth precedes your work. Sudden loss can become sudden clarity about what you were meant for next."
- reflect: "What does this loss reveal about what you truly want — and what you were tolerating?"
- nextStep: "Give yourself 24 hours before making any major decisions. Then take one practical step: update a resume, call one trusted person, or sit quietly and ask what is next."
- bookRef: "Success Secrets of Solomon — Work Ethic (pp. 96–100) and Purpose (pp. 146–150)"

Scenario B — STUCK AT WORK:
- id: "job-stuck"
- triggers: ["hate my job", "stuck in my job", "feel stuck at work", "no purpose at work", "dread going to work", "i dread work", "going to work is torture", "my job drains me"]
- emotionalState: "trapped, purposeless, and wondering if this is all there is"
- headline: "Wisdom Speaks to the Stuck Place"
- whatIHear: "You're not lazy — you're misaligned. Something in you knows you were made for more than this."
- insight: "Proverbs connects diligence to meaning, not just output. When your work stops feeding your soul, it may be calling you toward something God is preparing. Wisdom does not say stay stuck — it says use this season to build and discern."
- reflect: "If fear were not a factor, what kind of work would you pursue? What gifts are you leaving unused right now?"
- nextStep: "Do not quit in frustration — plan in wisdom. Spend 15 minutes this week writing down what you are actually good at and what work feels alive to you."
- bookRef: "Success Secrets of Solomon — Purpose (pp. 146–150) and Diligence (pp. 72–76)"

#### PHASE 5 — app/lib/bookIndex.ts — Fix keyword mismatches
FIND these entries and ADD keywords:

Money & Wealth entry (id: "money-1") keywords — ADD:
"savings", "save money", "no savings", "owe", "owed", "owing", "borrowed money",
"financially ruined", "money stress", "stressed about money", "spending problem",
"in debt", "debt free", "cant pay", "bills"

Diligence / Work entries keywords — ADD:
"cant find work", "find work", "finding work", "job search", "unemployed",
"no job", "looking for work", "need a job"

Purpose/Direction entry keywords — ADD:
"called by God", "calling", "Gods calling", "Gods plan", "called to serve",
"my calling", "spiritual calling"

Addiction entry (id: "addiction-1") keywords — REMOVE:
"struggle", "struggling" (too broad — causes false matches for pride, parenting)

Confidence/Fear entries keywords — ADD:
"terrified", "feel safe", "not safe", "unsafe", "safety", "security"

Parenting entry (id: "parenting-1") keywords — ADD:
"rebelling", "rebel", "bad parent", "dont know how to raise", "single parent",
"raise kids", "raise children", "child wont listen"

Pride/Humility entry (id: "integrity-1" or relevant) keywords — ADD:
"humble", "humility", "arrogant", "better than others", "need to be humble",
"arrogance", "think i am better"

Speech/Words entry (id: "speech-1") keywords — ADD:
"speak before i think", "think before speaking", "blurt out", "say things impulsively",
"words hurt people", "hurt people with words"

---

### Resume Instructions for Next Session
Say: "I want to continue working on my GitHub project jcraddock2/ask-solomon. Please read NOTES.md first."
Then say: "Execute the 5-phase fix plan from the May 13 session notes."
Claude will know exactly what to do without re-testing.

Test URL: https://ask-solomon-pne8fjiwv-john-craddocks-projects.vercel.app/
