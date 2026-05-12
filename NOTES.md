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
        - [ ] **Add more emotional scenarios** to `wisdomResponse.ts`:
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

                      *Last updated: May 11, 2026 — High-impact tasks complete. wisdomResponse.ts now 961 lines / 21 scenarios. book-index has live search.*
                      
