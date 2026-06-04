# Session Notes - June 4, 2026

Summary of work completed today on Ask Solomon (asksolomon.app). All changes committed to `main` and auto-deployed to Vercel Production. Each item was verified with a real live test, not just committed.

## 1. Magic-link / access URL rebranded to asksolomon.app
- Changed Vercel env var `NEXT_PUBLIC_BASE_URL` from `https://ask-solomon-ten.vercel.app` to `https://asksolomon.app` (plaintext, non-sensitive).
- Redeployed Production so the new base URL takes effect in access emails and the verify redirect.
- VERIFIED: hitting the live verify endpoint with a bad token redirects to `https://asksolomon.app/login?error=expired` (stays on the branded domain). Access emails sent from here on use asksolomon.app links.
- Note: any access email sent BEFORE this change still shows the old ask-solomon-ten.vercel.app link.

## 2. "Pro" wording renamed to "Lifetime Access" on the login page
- File: `app/login/page.tsx` (commit b9e01ae).
- Updated 3 user-facing strings: heading "Access your Lifetime Access", subtext "...send a link to activate Lifetime Access on this device.", and the queued-email confirmation "If {email} has Lifetime Access, a login link is on its way."
- Also updated the wrong-email error to "That email does not have Lifetime access. Did you use a different email at checkout?" and fixed a pre-existing typo in that message ("hDid" -> "Did").
- Kept the internal `notpro` error KEY unchanged (renaming it would break the ?error=notpro redirect from the verify route).
- VERIFIED live on asksolomon.app/login and asksolomon.app/login?error=notpro - all new wording renders correctly and the error param still works.

## 3. Founding-price banner countdown extended to June 13, 2026
- File: `app/FoundingBanner.tsx` (commit e7864ea).
- Changed the countdown target `END` from `2026-06-10T23:59:59Z` to `2026-06-13T23:59:59Z`.
- The banner uses a live countdown clock (days/hours/minutes/seconds) - there is NO literal "June 10" text in the app UI; the date is only this one constant.
- VERIFIED: the live production JS bundle now contains `2026-06-13` and no longer contains `2026-06-10`. Countdown math computes correctly (9 days remaining as of June 4).
- Banner only shows for non-Pro visitors (`if (isPro) return null`); it is hidden in the owner's Pro browser, which is expected.

## 4. Stripe price switch - MANUAL, owner does this
- Price is controlled solely by the `STRIPE_PRICE_ID` env var. There is NO date logic in code.
- $19 founding price (ACTIVE now): `price_1TZXqADAMsgblXx3oA3yRaex`
- $29 regular price (switch to when ready): `price_1T447hDAMsgblXx3uX0PmdCc`
- PLAN: owner will manually swap `STRIPE_PRICE_ID` to the $29 price on or around June 13, 2026 (was June 10, extended to match the banner). The $19 price stays active until the owner does this swap. Assistant cannot change pricing or access the Stripe dashboard.

## Still outstanding / optional (not done today)
- Leftover MailerLite DNS records (May 25) in the Vercel zone - owner's call to delete.
- The header still shows a small "PRO" badge/nav label on the homepage (separate from the login page that was rebranded today) - could be renamed to "Lifetime Access" later for full consistency if desired.

## Commits today
- b9e01ae - Update access message from Pro to Lifetime Access (login page)
- e7864ea - Extend founding price countdown deadline to June 13 (FoundingBanner)
- (Also earlier this session: NEXT_PUBLIC_BASE_URL env change + Production redeploy for the asksolomon.app rebrand.)

- e7864ea - Extend founding price countdown deadline to June 13 (FoundingBanner)
- (Also earlier this session: NEXT_PUBLIC_BASE_URL env change + Production redeploy for the asksolomon.app rebrand.)
