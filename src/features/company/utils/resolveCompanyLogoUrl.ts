/** API dan kelgan logo (string yoki { image }) uchun to‘liq rasm URL */
export function resolveCompanyLogoUrl(logo: unknown): string | null {
  if (logo == null || logo === "") return null;

  if (typeof logo === "string") {
    const s = logo.trim();
    if (!s) return null;
    if (s.startsWith("http")) return s;
    const base = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
    return `${base}${s.startsWith("/") ? "" : "/"}${s}`;
  }

  if (typeof logo === "object" && logo !== null && "image" in logo) {
    const img = (logo as { image?: unknown }).image;
    if (typeof img === "string") return resolveCompanyLogoUrl(img);
  }

  return null;
}
