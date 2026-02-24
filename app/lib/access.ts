export function isProUser(): boolean {
  if (typeof window === "undefined") return false;

  return localStorage.getItem("asksolomon_pro") === "1";
}
