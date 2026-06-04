# Session Notes — 2026-06-03

Focus of this session: make the magic-link login email actually work and be production-ready for real buyers. Three phases completed: (1) fixed the verify-route 500 bug, (2) verified the asksolomon.app sending domain in Resend, (3) added a DMARC record. All changes are deployed to Production.

## 1. Fixed verify-route immutable-headers 500 bug

**File:** `app/api/auth/verify/route.ts`
**Commit:** df698cd ("Refactor GET method for better redirect handling")

**Root cause:** The success path used `Response.redirect()`, which returns a Response whose headers are immutable. Calling `res.headers.set("Set-Cookie", ...)` on it threw `TypeError: immutable` (seen in Vercel logs as GET 500 / `_Headers.set`). Because the call threw, the login cookie was NEVER set, so users clicking a valid magic link could not actually get logged in.

**Fix:** Replaced `Response.redirect()` + `headers.set()` with a single constructed response:
`new Response(null, { status: 302, headers: { Location, "Set-Cookie" } })`.
This sets the redirect location AND the cookie atomically without touching immutable headers. No other app features were changed.

**Verification:** After deploy, Vercel logs showed GET 302 (no error) for the verify route, replacing the prior GET 500 TypeErrors. Navigating a valid verify URL landed on the app home page (logged-in) instead of `/login?error=expired`.

## 2. Verified asksolomon.app sending domain in Resend

Previously email sent from `onboarding@resend.dev` (shared Resend domain), which hurts deliverability for real buyers. We added and verified our own domain.

- Added domain `asksolomon.app` in Resend (region us-east-1, provider Vercel). Domain ID: 42446c39-1c15-40d8-81fe-bff9cd49ae9a
- Used Resend "Auto configure" (Option A) to write the required DNS records into Vercel DNS automatically.
- Records written and confirmed in Vercel DNS:
  - DKIM: `resend._domainkey` TXT (p=MIGf... public key)
    - SPF MX: `send` -> feedback-smtp.us-east-1.amazonses.com (priority 10)
      - SPF TXT: `send` -> v=spf1 include:amazonses.com ~all
      - Clicked Resend verify; status advanced to **Verified** ("Your domain is ready to send emails").

      ### RESEND_FROM env var

      - The send-link route uses `process.env.RESEND_FROM` with a fallback to `onboarding@resend.dev`, so no code change was needed.
      - Added Vercel env var `RESEND_FROM` = `Ask Solomon <noreply@asksolomon.app>`.
      - Redeployed Production (Redeploy of 8PdjcaytR) so the new env var took effect.
      - **Verification:** Sent a test link to jcraddock2@yahoo.com; Resend Emails dashboard showed status Delivered with FROM = `Ask Solomon <noreply@asksolomon.app>`.

      ## 3. Added DMARC record

      Resend Auto configure only manages the three required records (DKIM/SPF MX/SPF TXT) and leaves DMARC blank, so we added it manually in Vercel's DNS panel.

      - `_dmarc` TXT = `v=DMARC1; p=none;` (TTL 60). Confirmed live in the Vercel records list.
      - p=none is a safe monitor-only starting policy; can tighten to quarantine/reject later once monitoring confirms alignment.

      ## Key technical reference

      - Verify-route fix commit: df698cd. Prior commits: 2979c3d (removed single-use token deletion), TTL extended to 10 years.
      - Magic token TTL: 315360000 (10 years). Login cookie: asksolomon_pro=1; Path=/; Max-Age 10yr; SameSite=Lax; Secure.
      - Redis keys: pro:{email}, magic:{token}.
      - Sender now: Ask Solomon <noreply@asksolomon.app> (was onboarding@resend.dev).
      - Env vars in Vercel: RESEND_API_KEY, RESEND_FROM, NEXT_PUBLIC_BASE_URL, LIFETIME_GROUP_ID, STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY, ADMIN_SECRET, UPSTASH_REDIS_REST_*.
      - Vercel nameservers: ns1/ns2.vercel-dns.com.

      ## Outstanding / next steps

      - Real-world inbox test from a NON-Yahoo address (Gmail/Outlook) that owns Lifetime/Pro access, to prove the last-mile delivery to a real inbox (not spam). Only confirmed Pro test address so far is jcraddock2@yahoo.com.
      - Leftover MailerLite DNS records (from May 25) still in the Vercel zone — left for owner to optionally delete: mailerlite-domain-verification TXT, v=spf1 a mx include:_spf.mlsend.com ?all TXT, litesrv._domainkey CNAME -> litesrv._domainkey.mlsend.com.
      - Optional: rebrand NEXT_PUBLIC_BASE_URL from ask-solomon-ten.vercel.app to asksolomon.app so magic-link URLs use the branded domain.
- Reminder (not this session): on June 13, 2026 switch STRIPE_PRICE_ID from the $19 founding price to the $29 price. (Extended from June 10 to June 13; owner switches manually when ready.)
      - Old exposed Resend API keys — owner is not concerned; deprioritized.
      
