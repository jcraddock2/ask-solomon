# Session Notes — 2026-06-10

## Mobile keyboard covering the search bar — root cause found & fixed

### The real problem (finally diagnosed)
The previous attempts ("pin1", commit ce61c06) tried to pin the **entire filter/mode block**
(mode buttons + Image Template + all topic chips + Situation Mode chips + the search input)
to the **top** of the visible viewport using position: fixed; top: 0 when the input was focused.

Why that failed:
- The search input sits at the **bottom** of that ~600px-tall block. Pinning the block's TOP to
  the viewport top pushed the input right back down toward (and under) the keyboard. The chips
  ended up pinned up top while the search bar stayed near the keyboard.
- On desktop the same fixed-positioning logic could engage in edge cases and make the search bar
  appear to "disappear," which is what showed up in the PC screenshot.

### The fix (commit d6dfdfc, marker data-search-fix="pin2")
1. Wrap **only the search input + Clear Filters button** in their own flex container.
2. On small screens (window.innerWidth <= 640) while the input is focused, that small row becomes
   position: fixed and floats to the **bottom of the visible viewport**, sitting directly on top
   of the keyboard: bottom: searchKbBottom + 8.
3. searchKbBottom is computed from window.visualViewport:
   Math.max(0, window.innerHeight - (visualViewport.height + visualViewport.offsetTop))
   i.e. the height of the area hidden by the keyboard. Re-measured on vv resize/scroll plus
   timed re-checks (250ms, 600ms) to catch the keyboard's open animation.
4. The big filter/mode block reverted to normal flow (no more fixed/top pinning, no spacer).
5. Removed the old broken state (searchBarTop, searchWrapHeight) and the non-working scroll logic.

### Result
- Desktop: search bar is in normal flow next to Clear Filters — verified visible & correct.
- Mobile: the search input row should now float just above the keyboard so you can always see
  the bar and what you're typing. (Could not be verified in the automation browser because its
  content viewport is locked at ~1459-1536px and never reports <=640px; must be tested on a real phone.)

### How to verify on your phone
Hard-refresh asksolomon.app (pull to refresh / clear cache), tap the search bar, start typing.
The search field should ride on top of the keyboard, never hidden behind it.

### Deploy mechanics reminder
A real new git commit to main was pushed (d6dfdfc) — NOT a dashboard "Redeploy" (those reuse the
stale build artifact and were the cause of earlier "nothing updated for 24 min"). Build went
Queued -> Building -> Ready (~44s) and is live on asksolomon.app, serving the pin2 marker.

### Open items / enhancements flagged (NOT changed — awaiting your go-ahead)
- Duplicate "Hope" topic chip appears twice in the topic row.
- June 13, 2026: switch STRIPE_PRICE_ID from 19 to 29 dollars.
- Two Vercel projects (ask-solomon and ask-solomon-icd1) deploy from the same repo — redundant.
- Billing notice in Vercel: "Action Required — billing address missing/incomplete."
