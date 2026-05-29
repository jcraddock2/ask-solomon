// app/lib/access.ts
// Checks if the current user has paid for Pro access.
// Checks both cookie (cross-device, set by magic link) and localStorage (legacy, set by /success page).
// Cookie is the preferred method going forward.

export function isProUser(): boolean {
    if (typeof window === "undefined") return false; // SSR safety
  // Check cookie first (cross-device magic link system)
  const match = document.cookie.match(/(?:^|;\s*)asksolomon_pro=([^;]*)/);
    if (match && match[1] === "1") return true;
    // Fallback: localStorage (legacy — set by /success page on original device)
  return localStorage.getItem("asksolomon_pro") === "1";
}
