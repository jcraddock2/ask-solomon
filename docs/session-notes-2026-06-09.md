# Session Notes — 2026-06-09

Focus of this session: fix the mobile search bar problem where, on the homepage,
tapping the search input opens the phone keyboard which covers the search bar so
you can't see what you're typing (and the layout felt jumpy).

## STATUS AT END OF SESSION: NOT FULLY SOLVED

The code changes below ARE committed to `main` and ARE confirmed live in production
(new build is serving on asksolomon.app — verified via a new chunk hash, a
`data-search-fix="vv2"` marker on the input, and the sticky->static behavior firing
on focus in an automated browser). HOWEVER, on a real phone the keyboard still
appears to cover the search bar. So the deployment pipeline is fixed, but the
fix approach itself is not yet working on real mobile devices and needs another pass.

## File touched
`app/page.tsx` — the homepage. The search input is the only place "Search a keyword"
appears (confirmed via code search), so there is no duplicate/other search component.

## Changes attempted (all committed to main)
1. Commit df-era fix: added a `searchInputRef` (useRef) on the search input and an
   onFocus handler. First attempt used `scrollIntoView({ block: "center" })`. Also
   changed the input `minWidth` from 260 -> 0 to stop horizontal reflow/jumpiness on
   narrow screens. (The jumpiness improved after this; user confirmed.)
2. Stronger attempt (commit 66c7c15): replaced the onFocus handler with a
   visualViewport-based approach — on focus, measure window.visualViewport height
   (the area above the keyboard) and window.scrollBy() to lift the input above the
   keyboard, retrying at 150/350/600ms to cover keyboard animation timing. Also made
   the sticky search container `position: searchFocused ? "static" : "sticky"` so it
   stops fighting the browser's auto-scroll while focused.
3. Commit b5afaea: added a harmless `data-search-fix="vv2"` attribute to the input
   purely to verify which build was live. (TODO: can be removed later — it is
   invisible to users and harmless.)

## The big time-sink: stale Vercel build artifact
For a long time the live site kept serving OLD JavaScript even though the dashboard
showed the new commit as the production deployment. Root cause: using the Vercel
dashboard "Redeploy" button redeployed an EXISTING build artifact instead of
rebuilding from source, so the served chunk hash never changed. A manual redeploy
(even with build cache unchecked) did not fix it.

Resolution: pushing a brand-new commit to `main` (b5afaea) forced a genuine fresh
build from source, which finally served the new code (chunk hash changed from
page-8386d2c0... to page-cac95def...).

Lesson for next time: to be SURE new code goes live, push a real git commit to
`main` rather than using the dashboard "Redeploy" button.

## Infrastructure note (worth cleaning up)
There are TWO Vercel production projects both deploying from jcraddock2/ask-solomon:
- `ask-solomon`  -> owns the custom domain asksolomon.app (this is the live one)
- `ask-solomon-icd1` -> ask-solomon-icd1.vercel.app
This doubles builds and made verification confusing. Consider consolidating to one.

## Why it still may not work on real mobile (hypotheses for next session)
- iOS Safari does NOT resize the layout viewport when the keyboard opens; it only
  changes visualViewport. window.scrollBy may not move content the way expected, or
  the page may not be scrollable enough to lift the input clear of the keyboard.
- The search card sits well down the page; even scrolled, the keyboard (~half the
  screen) may still overlap it.
- Possible better approaches to try:
  * Listen to visualViewport "resize"/"scroll" events (not just a focus timeout) and
    reposition continuously while focused.
  * On focus (mobile only), move/anchor the search bar to the TOP of the screen
    (e.g., position: fixed; top: 0) so it sits above the keyboard, then restore on blur.
  * Use scrollIntoView({ block: "start" }) plus extra top offset, or scroll the
    nearest scroll container rather than window.
  * Test against real iOS Safari + Android Chrome; behavior differs.

## Carry-over reminders (not this session)
- June 13, 2026: switch STRIPE_PRICE_ID from the $19 founding price to the $29 price
  (owner switches manually).
- Magic-link email work from 2026-06-03 is done/deployed.
