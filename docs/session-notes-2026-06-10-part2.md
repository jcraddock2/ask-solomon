# Session Notes — 2026-06-10 (Part 2)

## Mobile keyboard STILL covered the search bar — changed strategy entirely

User confirmed: after the "pin2" float-to-bottom fix (commit d6dfdfc), the mobile keyboard
still covered the search bar. Desktop was fine. So we stopped iterating on JS positioning
and researched the actual platform behavior.

### Why every fixed-position attempt failed (root cause)
Researched MDN viewport docs. Key facts:
- iOS Safari does NOT resize the layout viewport when the keyboard opens — it overlays the
  keyboard on top of the page.
- iOS will NOT scroll a position:fixed element above the keyboard. So pin1/pin2 (both fixed)
  were always going to sit under the keyboard no matter how we computed bottom/top.
- interactive-widget=resizes-content is mainly a Chrome-on-Android feature; iOS still relies
  on native scroll-into-view of the focused input.

### New approach (v3 - "scroll", marker data-search-fix=scroll3)
Two commits:
1. layout.tsx (commit f825a53): added a Next.js viewport export:
   width=device-width, initialScale=1, interactiveWidget=resizes-content.
   (Previously there was NO explicit viewport meta at all.)
2. page.tsx (commit f72266e):
   - REMOVED all position:fixed pinning and the searchKbBottom/visualViewport math.
   - Search row stays in normal document flow.
   - On focus, call searchInputRef.scrollIntoView({block:center}) and retry at
     120/320/550/800ms plus on visualViewport resize (to catch the keyboard animation).
   - Added scrollMarginBottom:120 on the input + its row so the browser leaves clearance.

### Verified live on asksolomon.app
- marker = scroll3
- viewport meta = "width=device-width, initial-scale=1, interactive-widget=resizes-content"
- Vercel commit f72266e, Ready, Production (~46s build).

### STILL must be tested on a real phone
The automation browser cannot render <=640px, so the mobile path can't be exercised here.
Test: hard-refresh asksolomon.app on the phone, tap search, type. The page should now scroll
the search field up into view above the keyboard.

### If THIS still fails on the phone
Next options, in order:
1. Move the search bar HIGHER in the layout (above all the topic chips) so even without any
   scrolling it sits well above where the keyboard appears. This is the most bulletproof fix
   and sidesteps iOS quirks entirely — but it changes layout order, so needs user sign-off.
2. Add padding-bottom to the page equal to ~40vh while the input is focused, giving iOS room
   to scroll.
3. Use the VirtualKeyboard API (Chrome only) as progressive enhancement.

### Still-open enhancements (unchanged, awaiting go-ahead)
- Duplicate "Hope" topic chip appears twice.
- June 13, 2026: switch STRIPE_PRICE_ID from 19 to 29 dollars.
- Two Vercel projects deploy from same repo (ask-solomon, ask-solomon-icd1).


---

## Follow-up (same day): Pro upsell popup was blocking the search on mobile

User feedback: the v3 scroll fix made mobile search "some better" (it scrolls up now),
but the "UNLOCK THE FULL LIBRARY / Unlock Pro $19" nudge popped up and covered the search.

Cause: the nudge is a position:fixed card (bottom-right) triggered after the first search
(searchCount >= 1) for non-pro users. With the keyboard up, it overlapped the search area.

Fix (commit 3b34b05): added !searchFocused to the nudge's render guard:
  {showProNudge && !isProUser() && !searchFocused && ( ... )}
So the upsell is hidden WHILE the user is typing in the search box, and reappears when they
tap away. The upsell feature itself is unchanged - it just no longer blocks active typing.

Verified live on asksolomon.app: while the search input is focused the nudge stays hidden.
(Note: this browser session has localStorage asksolomon_pro=1, so isProUser() is true here and
the nudge is fully suppressed regardless - could not visually reproduce the nudge, but the
!searchFocused guard is confirmed present in the live bundle.)
