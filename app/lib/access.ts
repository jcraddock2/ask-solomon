// app/lib/access.ts
// Checks if the current user has paid for Pro access.
// Pro status is stored in localStorage after Stripe payment completes (set by /success page).
// This is client-side only — appropriate for this architecture with no database.

export function isProUser(): boolean {
  if (typeof window === "undefined") return false; // SSR safety
  return localStorage.getItem("asksolomon_pro") === "1";
}
