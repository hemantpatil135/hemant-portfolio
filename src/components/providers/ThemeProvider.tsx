"use client";

/**
 * Theme engine — the site ships a single, deliberate warm-dark "Solar" theme.
 * The `dark` class is applied pre-paint by the inline script in `layout.tsx`
 * (no flash, no stored preference to drift out of sync). This provider is a
 * thin pass-through kept so the composition in `Providers` stays explicit and
 * a theme layer can be reintroduced later without touching the tree.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
